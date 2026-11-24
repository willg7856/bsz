// Adds an email address to the Resend contact list that update emails go to.
// Updates themselves are sent from the Resend dashboard as Broadcasts, which
// add the unsubscribe link and skip anyone who has unsubscribed.

const RESEND_API = 'https://api.resend.com'
const MAX_BODY_BYTES = 2048
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normaliseEmail(value) {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return null
  return email
}

function reply(status, body) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function subscribe(request, { fetch, resendKey, audienceId }) {
  if (request.method !== 'POST') return reply(405, { error: 'Method not allowed.' })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return reply(413, { error: 'Request too large.' })

  let body
  try {
    body = JSON.parse(raw)
  } catch {
    return reply(400, { error: 'Send JSON with an email address.' })
  }

  // Hidden field that people never see; bots that fill every field get a quiet "ok".
  if (body && typeof body.website === 'string' && body.website.trim() !== '') {
    return reply(200, { ok: true })
  }

  const email = normaliseEmail(body?.email)
  if (!email) return reply(400, { error: 'Enter a valid email address.' })

  if (!resendKey) {
    console.error('subscribe: RESEND_API_KEY is not set')
    return reply(503, { error: 'Sign-ups are not working right now. Please try again later.' })
  }

  const path = audienceId ? `/audiences/${encodeURIComponent(audienceId)}/contacts` : '/contacts'
  let res
  try {
    res = await fetch(`${RESEND_API}${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false }),
    })
  } catch (error) {
    console.error('subscribe: could not reach Resend', error)
    return reply(502, { error: 'Sign-ups are not working right now. Please try again later.' })
  }

  if (res.ok) return reply(200, { ok: true })

  // Already on the list: same answer as a new sign-up, so the form never reveals who has subscribed.
  const detail = await res.text().catch(() => '')
  if (res.status === 409 || /already exist/i.test(detail)) return reply(200, { ok: true })

  console.error(`subscribe: Resend returned ${res.status}`, detail)
  return reply(502, { error: 'Sign-ups are not working right now. Please try again later.' })
}
