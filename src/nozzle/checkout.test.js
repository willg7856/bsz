import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createCheckout } from './checkout.js'

const FILE = 'https://abc123.private.blob.vercel-storage.com/nozzle-uploads/my-nozzle-x1y2.stl'
const good = {
  name: 'Ada', email: 'ada@example.com', notes: 'KNSB, 38 mm case', fileUrl: FILE, fileName: 'my-nozzle.stl',
  units: 'mm', throatDiameter: 8, exitDiameter: 20, convergentHalfAngle: 30, divergentHalfAngle: 12,
  estimate: { throatDiameter: 8.03, exitDiameter: 19.9, convergentHalfAngle: 30, divergentHalfAngle: 12 }, edited: true, makeTo: 'numbers',
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
      return Response.json({ id: 'cs_test_1', client_secret: 'cs_test_1_secret_abc' })
    },
    ...overrides,
  }
}

test('creates a $50 AUD Stripe checkout with the order on it', async () => {
  const d = deps()
  const res = await createCheckout(req(good), d)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { client_secret: 'cs_test_1_secret_abc', orderId: 'BSZ-N-AAAAAA' })
  const { url, init } = d.calls[0]
  assert.equal(url, 'https://api.stripe.com/v1/checkout/sessions')
  assert.equal(init.headers.Authorization, 'Bearer sk_test_123')
  assert.equal(init.headers['Stripe-Version'], '2026-03-25.dahlia')
  const f = init.body
  assert.equal(f.get('ui_mode'), 'form')
  assert.equal(f.get('mode'), 'payment')
  assert.equal(f.get('billing_address_collection'), 'auto')
  assert.equal(f.get('phone_number_collection[enabled]'), 'false')
  assert.equal(f.get('automatic_tax[enabled]'), 'false')
  assert.equal(f.get('submit_type'), 'auto')
  assert.equal(f.get('integration_identifier'), 'custom_embedded_web_0002')
  assert.equal(f.get('payment_method_collection'), null)
  assert.equal(f.get('line_items[0][price_data][unit_amount]'), '5000')
  assert.equal(f.get('line_items[0][price_data][currency]'), 'aud')
  assert.equal(f.get('customer_email'), 'ada@example.com')
  assert.equal(f.get('metadata[file_url]'), FILE)
  assert.equal(f.get('payment_intent_data[metadata][throat_mm]'), '8')
  assert.equal(f.get('payment_intent_data[metadata][divergent_half_angle_deg]'), '12')
  assert.equal(f.get('payment_intent_data[metadata][numbers_edited_by_customer]'), 'yes')
  assert.match(f.get('metadata[make_to]'), /^numbers/)
  assert.match(f.get('payment_intent_data[metadata][estimated]'), /throat 8.03 mm/)
  assert.ok(f.getAll('shipping_address_collection[allowed_countries][]').includes('AU'))
  assert.equal(f.get('return_url'), 'https://beyondstagezero.com/nozzles/preorder?order=paid&id=BSZ-N-AAAAAA&session_id={CHECKOUT_SESSION_ID}')
  assert.equal(f.get('success_url'), null)
  assert.equal(f.get('cancel_url'), null)
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

test('edited numbers need a make-to answer', async () => {
  const d = deps()
  const res = await createCheckout(req({ ...good, makeTo: undefined }), d)
  assert.equal(res.status, 400)
  assert.match((await res.json()).error, /your numbers or to your model/)
  const ok = deps()
  await createCheckout(req({ ...good, makeTo: 'model' }), ok)
  assert.match(ok.calls[0].init.body.get('metadata[make_to]'), /^model \(customer says/)
  assert.match(ok.calls[0].init.body.get('payment_intent_data[description]'), /make to the uploaded model/)
  const unedited = deps()
  await createCheckout(req({ ...good, edited: false, makeTo: 'match' }), unedited)
  assert.match(unedited.calls[0].init.body.get('metadata[make_to]'), /numbers match/)
})
