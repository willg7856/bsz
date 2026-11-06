import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createCheckout } from './checkout.js'

const FILE = 'https://abc123.private.blob.vercel-storage.com/nozzle-uploads/my-nozzle-x1y2.stl'
const good = {
  name: 'Ada', email: 'ada@example.com', notes: 'KNSB, 38 mm case', fileUrl: FILE, fileName: 'my-nozzle.stl',
  units: 'mm', throatDiameter: 8, exitDiameter: 20, convergentHalfAngle: 30, divergentHalfAngle: 12,
  estimate: { throatDiameter: 8.03, exitDiameter: 19.9, convergentHalfAngle: 30, divergentHalfAngle: 12 }, edited: true,
}
const req = (body) => new Request('https://beyondstagezero.com/api/nozzle-checkout', { method: 'POST', body: JSON.stringify(body) })

function deps(overrides = {}) {
  const calls = []
  return {
    calls,
    stripeKey: 'sk_test_123',
    random: () => 0,
    head: async () => ({ pathname: 'nozzle-uploads/my-nozzle-x1y2.stl', size: 1234 }),
    fetch: async (url, init) => {
      calls.push({ url, init })
      return Response.json({ url: 'https://checkout.stripe.com/c/pay/cs_test_1' })
    },
    ...overrides,
  }
}

test('creates a $50 AUD Stripe checkout with the order on it', async () => {
  const d = deps()
  const res = await createCheckout(req(good), d)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { url: 'https://checkout.stripe.com/c/pay/cs_test_1', orderId: 'BSZ-N-AAAAAA' })
  const { url, init } = d.calls[0]
  assert.equal(url, 'https://api.stripe.com/v1/checkout/sessions')
  assert.equal(init.headers.Authorization, 'Bearer sk_test_123')
  const f = init.body
  assert.equal(f.get('mode'), 'payment')
  assert.equal(f.get('line_items[0][price_data][unit_amount]'), '5000')
  assert.equal(f.get('line_items[0][price_data][currency]'), 'aud')
  assert.equal(f.get('customer_email'), 'ada@example.com')
  assert.equal(f.get('metadata[file_url]'), FILE)
  assert.equal(f.get('payment_intent_data[metadata][throat_mm]'), '8')
  assert.equal(f.get('payment_intent_data[metadata][divergent_half_angle_deg]'), '12')
  assert.equal(f.get('payment_intent_data[metadata][numbers_edited_by_customer]'), 'yes')
  assert.match(f.get('payment_intent_data[metadata][estimated]'), /throat 8.03 mm/)
  assert.ok(f.getAll('shipping_address_collection[allowed_countries][]').includes('AU'))
  assert.equal(f.get('success_url'), 'https://beyondstagezero.com/nozzles/preorder?order=paid&id=BSZ-N-AAAAAA')
})

test('the price cannot be set by the customer', async () => {
  const d = deps()
  await createCheckout(req({ ...good, amount: 1, price: 1, unit_amount: 1 }), d)
  assert.equal(d.calls[0].init.body.get('line_items[0][price_data][unit_amount]'), '5000')
})

test('inches are converted to mm', async () => {
  const d = deps()
  await createCheckout(req({ ...good, units: 'in', throatDiameter: 0.5, exitDiameter: 1 }), d)
  assert.equal(d.calls[0].init.body.get('metadata[throat_mm]'), '12.7')
  assert.equal(d.calls[0].init.body.get('metadata[exit_mm]'), '25.4')
})

test('rejects files that are not in our blob store', async () => {
  for (const fileUrl of ['https://evil.example.com/x.stl', 'http://abc.private.blob.vercel-storage.com/nozzle-uploads/x.stl']) {
    const d = deps()
    const res = await createCheckout(req({ ...good, fileUrl }), d)
    assert.equal(res.status, 400)
    assert.equal(d.calls.length, 0)
  }
  const missing = deps({ head: async () => { throw new Error('not found') } })
  assert.equal((await createCheckout(req(good), missing)).status, 400)
  const elsewhere = deps({ head: async () => ({ pathname: 'other/thing.stl', size: 10 }) })
  assert.equal((await createCheckout(req(good), elsewhere)).status, 400)
})

test('rejects bad numbers and missing contact details', async () => {
  for (const bad of [
    { throatDiameter: -1 }, { exitDiameter: 'abc' }, { convergentHalfAngle: 120 }, { exitDiameter: 4 },
    { email: 'nope' }, { name: '' }, { units: 'furlongs' },
  ]) {
    const d = deps()
    const res = await createCheckout(req({ ...good, ...bad }), d)
    assert.equal(res.status, 400, JSON.stringify(bad))
    assert.ok((await res.json()).error)
    assert.equal(d.calls.length, 0)
  }
})

test('says ordering is not set up when there is no Stripe key', async () => {
  const res = await createCheckout(req(good), deps({ stripeKey: undefined }))
  assert.equal(res.status, 503)
})

test('reports a Stripe failure without leaking it', async () => {
  const d = deps({ fetch: async () => Response.json({ error: { message: 'Invalid API Key' } }, { status: 401 }) })
  const orig = console.error
  console.error = () => {}
  const res = await createCheckout(req(good), d)
  console.error = orig
  assert.equal(res.status, 502)
  assert.doesNotMatch((await res.json()).error, /API Key/)
})
