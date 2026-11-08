// Creates the Stripe Checkout Session for a custom nozzle pre-order.
// Kept free of Vercel/Stripe SDKs so it can be tested with fakes.
import { NOZZLE_ORDER, UNITS } from './order.js'

export class OrderError extends Error {}

export const MAKE_TO_LABEL = {
  numbers: 'numbers (customer says the model is out of date)',
  model: 'model (customer says the measurement was off)',
  match: 'model (numbers match the measurement)',
}

const num = (value, label, min, max) => {
  const n = Number(value)
  if (!Number.isFinite(n) || n < min || n > max) throw new OrderError(`${label} must be between ${min} and ${max}.`)
  return n
}
// eslint-disable-next-line no-control-regex -- strip control characters from customer text
const text = (value, max) => String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max)
const fmt = (n) => String(Math.round(n * 1000) / 1000)

export function validateOrder(body) {
  if (!body || typeof body !== 'object') throw new OrderError('Missing order details.')
  const units = body.units in UNITS ? body.units : null
  if (!units) throw new OrderError('Unknown units.')
  const toMm = UNITS[units]
  const email = text(body.email, 200)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new OrderError('Please enter a valid email address.')
  const name = text(body.name, 120)
  if (!name) throw new OrderError('Please enter your name.')

  let fileUrl
  try { fileUrl = new URL(String(body.fileUrl)) } catch { throw new OrderError('The design file is missing. Please upload it again.') }
  if (fileUrl.protocol !== 'https:' || !fileUrl.hostname.endsWith('.blob.vercel-storage.com')) {
    throw new OrderError('The design file is missing. Please upload it again.')
  }

  const mm = (key, label) => num(body[key], label, 0.1 / toMm, 1000 / toMm) * toMm
  const throat = mm('throatDiameter', 'Throat diameter')
  const exit = mm('exitDiameter', 'Exit diameter')
  const conv = num(body.convergentHalfAngle, 'Convergent half-angle', 0, 90)
  const div = num(body.divergentHalfAngle, 'Divergent half-angle', 0, 90)
  if (exit < throat) throw new OrderError('The exit diameter should be larger than the throat.')

  if (body.edited && !['numbers', 'model'].includes(body.makeTo)) {
    throw new OrderError('Please tell us whether to make it to your numbers or to your model.')
  }
  const est = body.estimate && typeof body.estimate === 'object' ? body.estimate : null
  return {
    name,
    email,
    notes: text(body.notes, 480),
    fileUrl: fileUrl.toString(),
    fileName: text(body.fileName, 120) || 'design.stl',
    units,
    throat, exit, conv, div,
    estimate: est
      ? {
          throat: Number(est.throatDiameter) * toMm,
          exit: Number(est.exitDiameter) * toMm,
          conv: Number(est.convergentHalfAngle),
          div: Number(est.divergentHalfAngle),
        }
      : null,
    edited: Boolean(body.edited),
    makeTo: ['numbers', 'model', 'match'].includes(body.makeTo) ? body.makeTo : null,
    fileUnits: body.fileUnits in UNITS ? body.fileUnits : units,
  }
}

export function newOrderId(random = Math.random) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = ''
  for (let i = 0; i < 6; i++) id += alphabet[Math.floor(random() * alphabet.length)]
  return `BSZ-N-${id}`
}

export function checkoutForm(order, { orderId, origin }) {
  const f = new URLSearchParams()
  const add = (k, v) => f.append(k, v)
  const summary = `Throat ${fmt(order.throat)} mm · exit ${fmt(order.exit)} mm · conv ${fmt(order.conv)}° · div ${fmt(order.div)}°${order.makeTo === 'model' ? ' · make to the uploaded model' : ''}`
  const meta = {
    order_id: orderId,
    name: order.name,
    file_name: order.fileName,
    file_url: order.fileUrl,
    file_path: order.filePath ?? '',
    file_units: order.fileUnits,
    throat_mm: fmt(order.throat),
    exit_mm: fmt(order.exit),
    convergent_half_angle_deg: fmt(order.conv),
    divergent_half_angle_deg: fmt(order.div),
    numbers_edited_by_customer: order.edited ? 'yes' : 'no',
    make_to: MAKE_TO_LABEL[order.makeTo ?? 'match'],
    ...(order.estimate
      ? {
          estimated: `throat ${fmt(order.estimate.throat)} mm, exit ${fmt(order.estimate.exit)} mm, conv ${fmt(order.estimate.conv)}°, div ${fmt(order.estimate.div)}°`,
        }
      : {}),
    ...(order.notes ? { notes: order.notes } : {}),
  }

  add('mode', 'payment')
  add('customer_email', order.email)
  add('client_reference_id', orderId)
  add('line_items[0][quantity]', '1')
  add('line_items[0][price_data][currency]', NOZZLE_ORDER.currency.toLowerCase())
  add('line_items[0][price_data][unit_amount]', String(Math.round(NOZZLE_ORDER.amount * 100)))
  add('line_items[0][price_data][product_data][name]', 'Custom ceramic nozzle pre-order')
  add('line_items[0][price_data][product_data][description]', `${orderId} · ${summary}`)
  add('payment_intent_data[description]', `${orderId} · custom ceramic nozzle · ${summary}`)
  for (const c of NOZZLE_ORDER.shipTo) add('shipping_address_collection[allowed_countries][]', c)
  for (const [k, v] of Object.entries(meta)) {
    add(`metadata[${k}]`, String(v).slice(0, 500))
    add(`payment_intent_data[metadata][${k}]`, String(v).slice(0, 500))
  }
  add('success_url', `${origin}/nozzles/preorder?order=paid&id=${orderId}`)
  add('cancel_url', `${origin}/nozzles/preorder?order=cancelled`)
  return f
}

/**
 * @param {Request} request
 * @param {{ fetch: typeof fetch, head: (url: string) => Promise<unknown>, stripeKey?: string, random?: () => number }} deps
 */
export async function createCheckout(request, deps) {
  const json = (data, status = 200) => Response.json(data, { status })
  if (deps.open === false) return json({ error: 'Pre-orders are not open yet.' }, 403)
  if (!deps.stripeKey) return json({ error: 'Online ordering is not set up yet. Please email us instead.' }, 503)
  let order
  try {
    order = validateOrder(await request.json().catch(() => null))
  } catch (e) {
    if (e instanceof OrderError) return json({ error: e.message }, 400)
    throw e
  }
  const info = await deps.head(order.fileUrl).catch(() => null)
  if (!info || !String(info.pathname).startsWith('nozzle-uploads/') || info.size > NOZZLE_ORDER.maxFileBytes) {
    return json({ error: 'We could not find your uploaded file. Please upload it again.' }, 400)
  }
  order.filePath = info.pathname
  const orderId = newOrderId(deps.random)
  const origin = new URL(request.url).origin
  const res = await deps.fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${deps.stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: checkoutForm(order, { orderId, origin }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.url) {
    console.error('Stripe checkout failed', res.status, data?.error?.message)
    return json({ error: 'We could not start the payment. Please try again, or email us.' }, 502)
  }
  return json({ url: data.url, orderId })
}
