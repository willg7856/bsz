import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normaliseEmail, subscribe } from './subscribe.js'

const req = (body, method = 'POST') =>
  new Request('https://beyondstagezero.com/api/subscribe', { method, body: method === 'POST' ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined })

function deps(response = () => Response.json({ object: 'contact', id: 'c_1' }), overrides = {}) {
  const calls = []
  return {
    calls,
    resendKey: 're_test_123',
    fetch: async (url, init) => {
      calls.push({ url, init })
      return response()
    },
    ...overrides,
  }
}

test('adds a new address to Resend contacts', async () => {
  const d = deps()
  const res = await subscribe(req({ email: '  Ada@Example.com ' }), d)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { ok: true })
  assert.equal(d.calls.length, 1)
  assert.equal(d.calls[0].url, 'https://api.resend.com/contacts')
  assert.equal(d.calls[0].init.headers.Authorization, 'Bearer re_test_123')
  assert.deepEqual(JSON.parse(d.calls[0].init.body), { email: 'ada@example.com', unsubscribed: false })
})

test('uses the audience endpoint when an audience id is set', async () => {
  const d = deps(undefined, { audienceId: 'aud_123' })
  await subscribe(req({ email: 'ada@example.com' }), d)
  assert.equal(d.calls[0].url, 'https://api.resend.com/audiences/aud_123/contacts')
})

test('treats an address that is already subscribed as success', async () => {
  const d = deps(() => Response.json({ name: 'validation_error', message: 'Contact already exists' }, { status: 409 }))
  const res = await subscribe(req({ email: 'ada@example.com' }), d)
  assert.equal(res.status, 200)
})

test('rejects a bad address without calling Resend', async () => {
  for (const email of ['', 'nope', 'a@b', 'a b@c.com', 42, undefined]) {
    const d = deps()
    const res = await subscribe(req({ email }), d)
    assert.equal(res.status, 400, String(email))
    assert.equal(d.calls.length, 0)
  }
})

test('quietly accepts bots that fill the hidden field, without subscribing them', async () => {
  const d = deps()
  const res = await subscribe(req({ email: 'bot@example.com', website: 'http://spam' }), d)
  assert.equal(res.status, 200)
  assert.equal(d.calls.length, 0)
})

test('rejects non-JSON, oversized bodies and other methods', async () => {
  assert.equal((await subscribe(req('not json'), deps())).status, 400)
  assert.equal((await subscribe(req({ email: 'a@b.co', pad: 'x'.repeat(3000) }), deps())).status, 413)
  assert.equal((await subscribe(req(null, 'GET'), deps())).status, 405)
})

test('reports a failure when Resend errors or no key is set', async () => {
  const failing = deps(() => Response.json({ message: 'boom' }, { status: 500 }))
  assert.equal((await subscribe(req({ email: 'ada@example.com' }), failing)).status, 502)
  const noKey = deps(undefined, { resendKey: undefined })
  assert.equal((await subscribe(req({ email: 'ada@example.com' }), noKey)).status, 503)
  assert.equal(noKey.calls.length, 0)
})

test('normaliseEmail trims and lowercases', () => {
  assert.equal(normaliseEmail(' X@Y.Co '), 'x@y.co')
  assert.equal(normaliseEmail('a'.repeat(250) + '@b.co'), null)
})
