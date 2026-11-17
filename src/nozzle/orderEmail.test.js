import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { handleStripeWebhook, MAX_ATTACHMENT_BYTES, verifyStripeSignature } from './orderEmail.js'

const SECRET = 'whsec_test_secret'
const NOW = 1_800_000_000

const session = (overrides = {}) => ({
  id: 'cs_test_123',
  object: 'checkout.session',
  payment_status: 'paid',
  payment_intent: 'pi_123',
  amount_total: 5000,
  currency: 'aud',
  customer_details: { email: 'ada@example.com', name: 'Ada Lovelace', phone: null },
  collected_information: {
    shipping_details: { name: 'Ada Lovelace', address: { line1: '1 Test St', city: 'Creswick', state: 'VIC', postal_code: '3363', country: 'AU' } },
  },
  metadata: {
    order_id: 'BSZ-N-ABC234',
    name: 'Ada',
    file_name: 'my nozzle.stl',
    file_url: 'https://x.private.blob.vercel-storage.com/nozzle-uploads/my-nozzle-1.stl',
    file_path: 'nozzle-uploads/my-nozzle-1.stl',
    file_units: 'mm',
    throat_mm: '8.2',
    exit_mm: '20',
    convergent_half_angle_deg: '30',
    divergent_half_angle_deg: '12',
    numbers_edited_by_customer: 'yes',
    make_to: 'numbers (customer says the model is out of date)',
    estimated: 'throat 8 mm, exit 20 mm, conv 30°, div 12°',
    notes: 'KNSB <b>38 mm</b>',
  },
  ...overrides,
})

function signed(event, { secret = SECRET, t = NOW } = {}) {
  const body = JSON.stringify(event)
  const sig = createHmac('sha256', secret).update(`${t}.${body}`).digest('hex')
  return new Request('https://beyondstagezero.com/api/stripe-webhook', {
    method: 'POST',
    body,
    headers: { 'stripe-signature': `t=${t},v1=${sig}` },
  })
}

function deps(overrides = {}) {
  const sent = []
  return {
    sent,
    webhookSecret: SECRET,
    resendKey: 're_test',
    teamTo: 'contact@beyondstagezero.com',
    from: 'Beyond Stage Zero <orders@beyondstagezero.com>',
    now: () => NOW,
    log: () => {},
    getFile: async () => ({ bytes: new TextEncoder().encode('solid test'), size: 10 }),
    fetch: async (url, init) => {
      sent.push({ url, headers: init.headers, body: JSON.parse(init.body) })
      return Response.json({ id: 'email_1' })
    },
    ...overrides,
  }
}

const paid = (s = session()) => ({ type: 'checkout.session.completed', data: { object: s } })

test('verifies Stripe signatures', async () => {
  const body = '{"a":1}'
  const sig = createHmac('sha256', SECRET).update(`${NOW}.${body}`).digest('hex')
  assert.equal(await verifyStripeSignature(body, `t=${NOW},v1=${sig}`, SECRET, NOW), true)
  assert.equal(await verifyStripeSignature(body, `t=${NOW},v1=${sig}`, 'whsec_other', NOW), false)
  assert.equal(await verifyStripeSignature('{"a":2}', `t=${NOW},v1=${sig}`, SECRET, NOW), false)
  assert.equal(await verifyStripeSignature(body, `t=${NOW},v1=${sig}`, SECRET, NOW + 600), false, 'too old')
  assert.equal(await verifyStripeSignature(body, `t=${NOW},v0=${sig}`, SECRET, NOW), false)
  assert.equal(await verifyStripeSignature(body, null, SECRET, NOW), false)
})

test('a paid order emails the team (with the STL) and the customer', async () => {
  const d = deps()
  const res = await handleStripeWebhook(signed(paid()), d)
  assert.equal(res.status, 200)
  assert.equal(d.sent.length, 2)
  const [team, cust] = d.sent
  assert.equal(team.url, 'https://api.resend.com/emails')
  assert.equal(team.headers.Authorization, 'Bearer re_test')
  assert.equal(team.headers['Idempotency-Key'], 'nozzle-cs_test_123-team')
  assert.deepEqual(team.body.to, ['contact@beyondstagezero.com'])
  assert.equal(team.body.reply_to, 'ada@example.com')
  assert.match(team.body.subject, /BSZ-N-ABC234: 50.00 AUD paid · make to their numbers/)
  assert.match(team.body.html, /8\.2 mm/)
  assert.match(team.body.html, /Creswick VIC 3363/)
  assert.match(team.body.html, /customer changed the numbers/)
  assert.match(team.body.html, /dashboard\.stripe\.com\/payments\/pi_123/)
  assert.match(team.body.html, /KNSB &lt;b&gt;38 mm&lt;\/b&gt;/, 'notes are escaped')
  assert.equal(team.body.attachments[0].filename, 'my-nozzle.stl')
  assert.equal(Buffer.from(team.body.attachments[0].content, 'base64').toString(), 'solid test')
  assert.deepEqual(cust.body.to, ['ada@example.com'])
  assert.equal(cust.body.reply_to, 'contact@beyondstagezero.com')
  assert.equal(cust.headers['Idempotency-Key'], 'nozzle-cs_test_123-customer')
  assert.match(cust.body.subject, /BSZ-N-ABC234/)
  assert.match(cust.body.text, /make it to the numbers you entered/)
  assert.equal(cust.body.attachments, undefined)
})

test('big files are linked instead of attached', async () => {
  const d = deps({ getFile: async () => ({ bytes: new Uint8Array(1), size: MAX_ATTACHMENT_BYTES + 1 }) })
  await handleStripeWebhook(signed(paid()), d)
  assert.equal(d.sent[0].body.attachments, undefined)
  assert.match(d.sent[0].body.html, /too big to attach.*nozzle-uploads\/my-nozzle-1\.stl/s)
})

test('a missing file still sends the email', async () => {
  const d = deps({ getFile: async () => { throw new Error('gone') } })
  assert.equal((await handleStripeWebhook(signed(paid()), d)).status, 200)
  assert.equal(d.sent.length, 2)
})

test('ignores bad signatures, unpaid sessions, other events and other payments', async () => {
  const d = deps()
  assert.equal((await handleStripeWebhook(signed(paid(), { secret: 'whsec_wrong' }), d)).status, 400)
  assert.equal((await handleStripeWebhook(signed(paid(session({ payment_status: 'unpaid' }))), d)).status, 200)
  assert.equal((await handleStripeWebhook(signed({ type: 'charge.refunded', data: { object: {} } }), d)).status, 200)
  const donation = session({ metadata: {} })
  assert.equal((await handleStripeWebhook(signed(paid(donation)), d)).status, 200)
  assert.equal(d.sent.length, 0)
})

test('delayed payments email when they succeed', async () => {
  const d = deps()
  await handleStripeWebhook(signed({ type: 'checkout.session.async_payment_succeeded', data: { object: session() } }), d)
  assert.equal(d.sent.length, 2)
})

test('an email failure returns 500 so Stripe retries', async () => {
  const d = deps({ fetch: async () => new Response('nope', { status: 422 }) })
  assert.equal((await handleStripeWebhook(signed(paid()), d)).status, 500)
  assert.equal((await handleStripeWebhook(signed(paid()), deps({ resendKey: undefined }))).status, 500)
})

test('older Stripe API shipping field still works', async () => {
  const s = session({ collected_information: undefined, shipping_details: { name: 'Ada', address: { line1: '9 Old Rd', country: 'NZ' } } })
  const d = deps()
  await handleStripeWebhook(signed(paid(s)), d)
  assert.match(d.sent[0].body.html, /9 Old Rd/)
})
