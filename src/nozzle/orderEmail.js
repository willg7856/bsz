// Stripe webhook → order emails (team gets the full order + STL, customer gets
// a confirmation). Free of SDKs so it can be tested with fakes.
import { MAKE_TO_LABEL } from './checkout.js'

export const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024
const SIGNATURE_TOLERANCE_S = 300

// ── Stripe signature (Stripe-Signature: t=…,v1=…) ────────────────────────
async function hmacHex(secret, message) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('')
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifyStripeSignature(payload, header, secret, nowSeconds = Date.now() / 1000) {
  if (!header || !secret) return false
  let t = NaN
  const sigs = []
  for (const part of header.split(',')) {
    const [k, v] = part.trim().split('=')
    if (k === 't') t = Number(v)
    else if (k === 'v1' && v) sigs.push(v)
  }
  if (!Number.isFinite(t) || !sigs.length) return false
  if (Math.abs(nowSeconds - t) > SIGNATURE_TOLERANCE_S) return false
  const expected = await hmacHex(secret, `${t}.${payload}`)
  return sigs.some((s) => safeEqual(s, expected))
}

// ── Order details from a Checkout Session ────────────────────────────────
export function orderFromSession(session) {
  const m = session.metadata || {}
  const ship = session.collected_information?.shipping_details || session.shipping_details || session.shipping || null
  const a = ship?.address || {}
  const address = [ship?.name, a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(' '), a.country].filter(Boolean)
  const cur = String(session.currency || '').toUpperCase()
  return {
    orderId: m.order_id,
    sessionId: session.id,
    paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
    name: session.customer_details?.name || m.name || '',
    email: session.customer_details?.email || session.customer_email || '',
    phone: session.customer_details?.phone || '',
    address,
    paid: session.amount_total != null ? `${(session.amount_total / 100).toFixed(2)} ${cur}` : '',
    throat: m.throat_mm,
    exit: m.exit_mm,
    conv: m.convergent_half_angle_deg,
    div: m.divergent_half_angle_deg,
    measured: m.estimated || '',
    edited: m.numbers_edited_by_customer === 'yes',
    makeTo: m.make_to || MAKE_TO_LABEL.match,
    notes: m.notes || '',
    fileName: m.file_name || 'design.stl',
    filePath: m.file_path || '',
    fileUrl: m.file_url || '',
    fileUnits: m.file_units || 'mm',
  }
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

function table(rows) {
  return `<table cellpadding="6" style="border-collapse:collapse;font:14px/1.45 -apple-system,Segoe UI,Roboto,sans-serif">${rows
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `<tr><td style="color:#4a535d;vertical-align:top;white-space:nowrap">${esc(k)}</td><td>${v}</td></tr>`)
    .join('')}</table>`
}

function numberRows(o) {
  return [
    ['Throat Ø', `${esc(o.throat)} mm`],
    ['Exit Ø', `${esc(o.exit)} mm`],
    ['Convergent half-angle', `${esc(o.conv)}°`],
    ['Divergent half-angle', `${esc(o.div)}°`],
  ]
}

export function teamEmail(o, { attached, fileSize }) {
  const makeToNumbers = o.makeTo.startsWith('numbers')
  const status = o.paid ? `${o.paid} paid` : 'free, no payment taken'
  const kind = o.paid ? 'pre-order' : 'registration of interest'
  const subject = `New nozzle ${kind} ${o.orderId}: ${status}${makeToNumbers ? ' · make to their numbers' : ''}`
  const fileLine = attached
    ? `${esc(o.fileName)} is attached.`
    : `${esc(o.fileName)} is ${fileSize ? `${(fileSize / 1024 / 1024).toFixed(1)} MB, ` : ''}too big to attach. Download it from Vercel → Storage → the Blob store → <code>${esc(o.filePath)}</code>.`
  const html = `
<p style="font:16px -apple-system,Segoe UI,Roboto,sans-serif"><strong>${esc(o.orderId)}</strong> · ${esc(status)}</p>
${table([
  ['Customer', `${esc(o.name)} · <a href="mailto:${esc(o.email)}">${esc(o.email)}</a>${o.phone ? ` · ${esc(o.phone)}` : ''}`],
  ['Ship to', o.address.map(esc).join('<br>')],
  ...numberRows(o),
  ['Make to', `<strong>${esc(o.makeTo)}</strong>`],
  ['Measured', o.edited ? `${esc(o.measured)} <em>(customer changed the numbers)</em>` : esc(o.measured)],
  ['Model units', esc(o.fileUnits)],
  ['Notes', esc(o.notes)],
  ['File', fileLine],
  ['Stripe', o.paymentIntent ? `<a href="https://dashboard.stripe.com/payments/${esc(o.paymentIntent)}">Open the payment</a> (refund from there)` : ''],
])}
<p style="font:13px -apple-system,Segoe UI,Roboto,sans-serif;color:#4a535d">Reply to this email to contact the customer.</p>`
  const text = [
    `${o.orderId} · ${status}`,
    `Customer: ${o.name} <${o.email}>${o.phone ? ` · ${o.phone}` : ''}`,
    o.address.length ? `Ship to: ${o.address.join(', ')}` : '',
    `Throat Ø ${o.throat} mm · Exit Ø ${o.exit} mm · Conv ${o.conv}° · Div ${o.div}°`,
    `Make to: ${o.makeTo}`,
    o.measured ? `Measured: ${o.measured}${o.edited ? ' (customer changed the numbers)' : ''}` : '',
    o.notes ? `Notes: ${o.notes}` : '',
    attached ? `File: ${o.fileName} (attached)` : `File: too big to attach — Vercel → Storage → Blob → ${o.filePath}`,
    o.paymentIntent ? `Stripe: https://dashboard.stripe.com/payments/${o.paymentIntent}` : '',
  ].filter(Boolean).join('\n')
  return { subject, html, text }
}

const FREE_NOTE = "Registering is free, so nothing has been charged. We'll email you with the price before we take any payment, and you can change your mind then."

export function customerEmail(o, { teamEmail: team }) {
  const first = o.name.split(' ')[0] || 'there'
  const subject = `We've got your nozzle design (${o.orderId})`
  const makeTo = o.makeTo.startsWith('numbers') ? 'the numbers you entered' : 'your uploaded model'
  const thanks = o.paid
    ? `Thanks for pre-ordering a custom ceramic nozzle. Your order number is ${o.orderId} and we've received ${o.paid}.`
    : `Thanks for registering your interest in a custom ceramic nozzle. Your reference number is ${o.orderId}.`
  const nextStep = o.paid
    ? "we'll check your design can be cast, then email you to confirm it, suggest changes, or refund you in full if we can't make it."
    : "we'll check your design can be cast, then email you to confirm it or suggest changes."
  const html = `
<div style="font:15px/1.55 -apple-system,Segoe UI,Roboto,sans-serif;color:#0b0d0f">
<p>Hi ${esc(first)},</p>
<p>${esc(thanks)}</p>
${o.paid ? '' : `<p>${esc(FREE_NOTE)}</p>`}
<p>Here's what you sent us:</p>
${table([...numberRows(o), ['We will make it to', esc(makeTo)], ['File', esc(o.fileName)], ['Notes', esc(o.notes)]])}
<p><strong>What happens next:</strong> ${esc(nextStep)}</p>
<p>Spotted a mistake? Just reply to this email.</p>
<p>Beyond Stage Zero<br><a href="https://beyondstagezero.com">beyondstagezero.com</a> · ${esc(team)}</p>
</div>`
  const text = [
    `Hi ${first},`,
    '',
    thanks,
    o.paid ? '' : FREE_NOTE,
    '',
    `Throat Ø ${o.throat} mm · Exit Ø ${o.exit} mm · Conv ${o.conv}° · Div ${o.div}°`,
    `We will make it to ${makeTo}. File: ${o.fileName}`,
    o.notes ? `Notes: ${o.notes}` : '',
    '',
    `What happens next: ${nextStep}`,
    '',
    'Spotted a mistake? Just reply to this email.',
    '',
    'Beyond Stage Zero · https://beyondstagezero.com',
  ].join('\n')
  return { subject, html, text }
}

export function toBase64(bytes) {
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(bin)
}

export async function sendEmail(deps, idempotencyKey, message) {
  const res = await deps.fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${deps.resendKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(message),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 200)}`)
  }
}

const PAID_EVENTS = new Set(['checkout.session.completed', 'checkout.session.async_payment_succeeded'])

/**
 * @param {Request} request
 * @param {{ webhookSecret?: string, resendKey?: string, teamTo: string, from: string,
 *   fetch: typeof fetch, getFile: (url: string) => Promise<{ bytes: Uint8Array, size: number } | null>,
 *   now?: () => number, log?: (...a: unknown[]) => void }} deps
 */
export async function handleStripeWebhook(request, deps) {
  const log = deps.log || console.error
  const payload = await request.text()
  const ok = await verifyStripeSignature(payload, request.headers.get('stripe-signature'), deps.webhookSecret, deps.now?.())
  if (!ok) return new Response('Bad signature', { status: 400 })

  let event
  try { event = JSON.parse(payload) } catch { return new Response('Bad JSON', { status: 400 }) }
  const session = event?.data?.object
  if (!PAID_EVENTS.has(event.type) || session?.object !== 'checkout.session') return new Response('Ignored', { status: 200 })
  if (session.payment_status !== 'paid') return new Response('Not paid yet', { status: 200 })
  if (!session.metadata?.order_id?.startsWith('BSZ-N-')) return new Response('Not a nozzle order', { status: 200 })
  if (!deps.resendKey) {
    log('Nozzle order paid but RESEND_API_KEY is not set:', session.metadata.order_id)
    return new Response('Email not configured', { status: 500 })
  }

  const order = orderFromSession(session)
  let file = null
  let fileSize = 0
  try {
    file = order.fileUrl ? await deps.getFile(order.fileUrl) : null
    fileSize = file?.size || 0
  } catch (e) {
    log('Could not fetch nozzle file', order.filePath, e?.message)
  }
  const attach = Boolean(file && file.size <= MAX_ATTACHMENT_BYTES)

  try {
    const team = teamEmail(order, { attached: attach, fileSize })
    await sendEmail(deps, `nozzle-${session.id}-team`, {
      from: deps.from,
      to: deps.teamTo.split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: order.email || undefined,
      subject: team.subject,
      html: team.html,
      text: team.text,
      ...(attach ? { attachments: [{ filename: order.fileName.replace(/[^\w.-]+/g, '-'), content: toBase64(file.bytes) }] } : {}),
    })
    if (order.email) {
      const cust = customerEmail(order, { teamEmail: deps.teamTo.split(',')[0].trim() })
      await sendEmail(deps, `nozzle-${session.id}-customer`, {
        from: deps.from,
        to: [order.email],
        reply_to: deps.teamTo.split(',')[0].trim(),
        subject: cust.subject,
        html: cust.html,
        text: cust.text,
      })
    }
  } catch (e) {
    // 500 makes Stripe retry; the idempotency keys stop duplicate emails.
    log('Nozzle order email failed', order.orderId, e?.message)
    return new Response('Email failed', { status: 500 })
  }
  return new Response('Sent', { status: 200 })
}
