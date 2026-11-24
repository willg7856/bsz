import { get } from '@vercel/blob'
import { NOZZLE_ORDER } from '../src/nozzle/order.js'
import { handleStripeWebhook, MAX_ATTACHMENT_BYTES } from '../src/nozzle/orderEmail.js'

// POST /api/stripe-webhook — Stripe calls this when a checkout is paid.
// Emails the team the full order (with the STL attached) and the customer a
// confirmation. Needs STRIPE_WEBHOOK_SECRET, RESEND_API_KEY and
// BLOB_READ_WRITE_TOKEN. Optional: ORDER_EMAIL_TO, ORDER_EMAIL_FROM.
async function getFile(url) {
  const result = await get(url, { access: NOZZLE_ORDER.blobAccess })
  if (!result || result.statusCode !== 200) return null
  const { size } = result.blob
  if (size > MAX_ATTACHMENT_BYTES) {
    await result.stream.cancel()
    return { bytes: null, size }
  }
  return { bytes: new Uint8Array(await new Response(result.stream).arrayBuffer()), size }
}

export function POST(request) {
  return handleStripeWebhook(request, {
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    resendKey: process.env.RESEND_API_KEY,
    teamTo: process.env.ORDER_EMAIL_TO || 'contact@beyondstagezero.com',
    from: process.env.ORDER_EMAIL_FROM || 'Beyond Stage Zero <orders@beyondstagezero.com>',
    fetch,
    getFile,
  })
}
