import { get, head } from '@vercel/blob'
import { NOZZLE_ORDER } from '../src/nozzle/order.js'
import { MAX_ATTACHMENT_BYTES } from '../src/nozzle/orderEmail.js'
import { registerPreorder } from '../src/nozzle/register.js'

// POST /api/nozzle-register — a free nozzle pre-order (no payment). Emails the
// team the order with the STL attached and the customer a confirmation.
// Needs RESEND_API_KEY and BLOB_READ_WRITE_TOKEN. Optional: ORDER_EMAIL_TO,
// ORDER_EMAIL_FROM.
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
  if (NOZZLE_ORDER.takingPayment) {
    return Response.json({ error: 'Pre-orders go through checkout now. Please reload the page.' }, { status: 409 })
  }
  return registerPreorder(request, {
    fetch,
    head: (url) => head(url),
    getFile,
    resendKey: process.env.RESEND_API_KEY,
    teamTo: process.env.ORDER_EMAIL_TO || 'contact@beyondstagezero.com',
    from: process.env.ORDER_EMAIL_FROM || 'Beyond Stage Zero <orders@beyondstagezero.com>',
  })
}
