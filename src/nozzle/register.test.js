import { test } from 'node:test'
import assert from 'node:assert/strict'
import { registerPreorder } from './register.js'

const FILE = 'https://abc123.private.blob.vercel-storage.com/nozzle-uploads/my-nozzle-x1y2.stl'
const good = {
  name: 'Ada Lovelace', email: 'ada@example.com', notes: 'KNSB, 38 mm case', fileUrl: FILE, fileName: 'my-nozzle.stl',
  units: 'mm', throatDiameter: 8, exitDiameter: 20, convergentHalfAngle: 30, divergentHalfAngle: 12,
  estimate: { throatDiameter: 8.03, exitDiameter: 19.9, convergentHalfAngle: 30, divergentHalfAngle: 12 }, edited: true, makeTo: 'numbers',
}
const req = (body) => new Request('https://beyondstagezero.com/api/nozzle-register', { method: 'POST', body: JSON.stringify(body) })

function deps(overrides = {}) {
  const sent = []
  const logs = []
  return {
    sent,
    logs,
    resendKey: 're_test',
    teamTo: 'team@example.com, second@example.com',
    from: 'BSZ <orders@example.com>',
    random: () => 0,
    log: (...a) => logs.push(a.join(' ')),
    head: async () => ({ pathname: 'nozzle-uploads/my-nozzle-x1y2.stl', size: 4 }),
    getFile: async () => ({ bytes: new Uint8Array([1, 2, 3, 4]), size: 4 }),
    fetch: async (url, init) => {
      sent.push({ url, key: init.headers['Idempotency-Key'], body: JSON.parse(init.body) })
      return Response.json({ id: 'email_1' })
    },
    ...overrides,
  }
}

test('emails the team (with the STL) and the customer, and charges nothing', async () => {
  const d = deps()
  const res = await registerPreorder(req(good), d)
  assert.equal(res.status, 200)
  const data = await res.json()
  assert.equal(data.ok, true)
  assert.match(data.orderId, /^BSZ-N-[A-Z2-9]{6}$/)

  assert.equal(d.sent.length, 2)
  assert.ok(d.sent.every((s) => s.url === 'https://api.resend.com/emails'))
  const [team, customer] = d.sent
  assert.deepEqual(team.body.to, ['team@example.com', 'second@example.com'])
  assert.equal(team.body.reply_to, 'ada@example.com')
  assert.match(team.body.subject, /free, no payment taken · make to their numbers/)
  assert.doesNotMatch(team.body.html, /Stripe|Ship to/)
  assert.equal(team.body.attachments[0].filename, 'my-nozzle.stl')
  assert.equal(team.body.attachments[0].content, 'AQIDBA==')
  assert.equal(team.key, `nozzle-${data.orderId}-team`)

  assert.deepEqual(customer.body.to, ['ada@example.com'])
  assert.match(customer.body.text, /nothing has been charged/)
  assert.doesNotMatch(customer.body.text, /refund|received \d/)
})

test('rejects a bad order without sending anything', async () => {
  const d = deps()
  const res = await registerPreorder(req({ ...good, email: 'nope' }), d)
  assert.equal(res.status, 400)
  assert.equal(d.sent.length, 0)
})

test('rejects a file that was not uploaded to the nozzle folder', async () => {
  const d = deps({ head: async () => ({ pathname: 'other/thing.stl', size: 4 }) })
  assert.equal((await registerPreorder(req(good), d)).status, 400)
  assert.equal(d.sent.length, 0)
})

test('links the file instead of attaching it when it is too big', async () => {
  const d = deps({ getFile: async () => ({ bytes: null, size: 40 * 1024 * 1024 }) })
  assert.equal((await registerPreorder(req(good), d)).status, 200)
  assert.equal(d.sent[0].body.attachments, undefined)
  assert.match(d.sent[0].body.html, /too big to attach/)
})

test('fails when the team email fails, so the customer can try again', async () => {
  const d = deps({ fetch: async () => new Response('down', { status: 500 }) })
  const res = await registerPreorder(req(good), d)
  assert.equal(res.status, 502)
})

test('still succeeds if only the customer confirmation fails', async () => {
  let n = 0
  const d = deps({ fetch: async () => (++n === 1 ? Response.json({ id: 'e1' }) : new Response('down', { status: 500 })) })
  assert.equal((await registerPreorder(req(good), d)).status, 200)
  assert.ok(d.logs.some((l) => l.includes('confirmation email failed')))
})

test('refuses when email is not set up', async () => {
  const d = deps({ resendKey: undefined })
  assert.equal((await registerPreorder(req(good), d)).status, 503)
  assert.equal(d.sent.length, 0)
})
