// Free nozzle pre-orders (NOZZLE_ORDER.takingPayment = false): no Stripe. The
// order is checked the same way as a paid one, then emailed to the team (with
// the STL attached) and confirmed to the customer.
import { MAKE_TO_LABEL, OrderError, fmt, newOrderId, validateOrder } from './checkout.js'
import { NOZZLE_ORDER } from './order.js'
import { MAX_ATTACHMENT_BYTES, customerEmail, sendEmail, teamEmail, toBase64 } from './orderEmail.js'

export function orderForEmail(order, orderId) {
  return {
    orderId,
    name: order.name,
    email: order.email,
    phone: '',
    address: [],
    paid: '',
    throat: fmt(order.throat),
    exit: fmt(order.exit),
    conv: fmt(order.conv),
    div: fmt(order.div),
    measured: order.estimate
      ? `throat ${fmt(order.estimate.throat)} mm, exit ${fmt(order.estimate.exit)} mm, conv ${fmt(order.estimate.conv)}°, div ${fmt(order.estimate.div)}°`
      : '',
    edited: order.edited,
    makeTo: MAKE_TO_LABEL[order.makeTo ?? 'match'],
    notes: order.notes,
    fileName: order.fileName,
    filePath: order.filePath,
    fileUrl: order.fileUrl,
    fileUnits: order.fileUnits,
  }
}

/**
 * @param {Request} request
 * @param {{ fetch: typeof fetch, head: (url: string) => Promise<any>,
 *   getFile: (url: string) => Promise<{ bytes: Uint8Array | null, size: number } | null>,
 *   resendKey?: string, teamTo: string, from: string, random?: () => number,
 *   log?: (...a: unknown[]) => void }} deps
 */
export async function registerPreorder(request, deps) {
  const log = deps.log || console.error
  const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
  if (!deps.resendKey) {
    log('Nozzle pre-order received but RESEND_API_KEY is not set')
    return json({ error: 'Pre-orders are not working right now. Please email us instead.' }, 503)
  }

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
  const o = orderForEmail(order, orderId)

  let file = null
  try {
    file = await deps.getFile(order.fileUrl)
  } catch (e) {
    log('Could not fetch nozzle file', order.filePath, e?.message)
  }
  const attach = Boolean(file?.bytes && file.size <= MAX_ATTACHMENT_BYTES)
  const teamTo = deps.teamTo.split(',').map((s) => s.trim()).filter(Boolean)

  try {
    const team = teamEmail(o, { attached: attach, fileSize: file?.size || info.size || 0 })
    await sendEmail(deps, `nozzle-${orderId}-team`, {
      from: deps.from,
      to: teamTo,
      reply_to: o.email,
      subject: team.subject,
      html: team.html,
      text: team.text,
      ...(attach ? { attachments: [{ filename: o.fileName.replace(/[^\w.-]+/g, '-'), content: toBase64(file.bytes) }] } : {}),
    })
  } catch (e) {
    log('Nozzle pre-order team email failed', orderId, e?.message)
    return json({ error: 'We could not send your pre-order. Please try again, or email us.' }, 502)
  }

  // The team has the order now; a failed confirmation shouldn't make the customer submit it twice.
  try {
    const cust = customerEmail(o, { teamEmail: teamTo[0] })
    await sendEmail(deps, `nozzle-${orderId}-customer`, {
      from: deps.from,
      to: [o.email],
      reply_to: teamTo[0],
      subject: cust.subject,
      html: cust.html,
      text: cust.text,
    })
  } catch (e) {
    log('Nozzle pre-order confirmation email failed', orderId, e?.message)
  }

  return json({ ok: true, orderId })
}
