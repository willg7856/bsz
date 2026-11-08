import { head } from '@vercel/blob'
import { createCheckout } from '../src/nozzle/checkout.js'
import { NOZZLE_ORDER } from '../src/nozzle/order.js'

// POST /api/nozzle-checkout → { url } of a Stripe Checkout page.
// Needs STRIPE_SECRET_KEY and BLOB_READ_WRITE_TOKEN in the Vercel project.
export function POST(request) {
  if (!NOZZLE_ORDER.takingPayment) {
    return Response.json({ error: 'Pre-orders are free right now. Please reload the page.' }, { status: 409 })
  }
  return createCheckout(request, {
    fetch,
    head: (url) => head(url),
    stripeKey: process.env.STRIPE_SECRET_KEY,
  })
}
