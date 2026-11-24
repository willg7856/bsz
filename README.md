# Beyond Stage Zero

Monorepo for both public sites:

| Domain | App | Folder | Stack |
|--------|-----|--------|-------|
| [beyondstagezero.com](https://beyondstagezero.com) | Main site | repo root | Vite + React |
| [beyondstagezero.space](https://beyondstagezero.space) | Live test page | separate repo [`willg7856/bsz-space`](https://github.com/willg7856/bsz-space) | static HTML |

## beyondstagezero.com (root)

```bash
npm install
npm run dev
```

Vercel project settings:
- **Root Directory:** `.` (repository root)
- **Framework:** Vite
- Uses root `vercel.json` (SPA rewrites)

## beyondstagezero.space

The live test page now has its own repo, [`willg7856/bsz-space`](https://github.com/willg7856/bsz-space), and its own
Vercel project (`.space`), which serves `beyondstagezero.space` and `www.beyondstagezero.space`. It's run from
Octopus's Test day page. The `space/` folder here is an older, unused Next.js version.

## Custom nozzle pre-orders (`/nozzles/preorder`)

Customers upload an STL, check the throat/exit/angle numbers measured in the
browser (`src/nozzle/analyzeNozzle.js`), and pre-order.

**Free or paid:** `takingPayment` in `src/nozzle/order.js`.
- `false`: pre-orders are free. The form posts to `/api/nozzle-register`,
  which emails the team the order with the STL attached and the customer a
  confirmation that nothing has been charged. Needs `RESEND_API_KEY` and
  `BLOB_READ_WRITE_TOKEN`. Every pre-order is in the team inbox
  (`ORDER_EMAIL_TO`), with an order number.
- `true` (now): the customer pays a fixed price in Stripe's payment form on our own page (setup below, plus `VITE_STRIPE_PUBLISHABLE_KEY`; see [STRIPE_INTEGRATION_TODO.md](STRIPE_INTEGRATION_TODO.md)). Price, currency, ship-to countries and the upload limit live in
`src/nozzle/order.js`.

Vercel project setup:

1. **Storage → Create → Blob**, choose **Private** access, and connect it to this
   project. That adds `BLOB_READ_WRITE_TOKEN`. (If you make a public store
   instead, set `blobAccess: 'public'` in `src/nozzle/order.js`.)
2. **Settings → Environment Variables:** add `STRIPE_SECRET_KEY` (a restricted
   key with write access to Checkout Sessions is enough). Use a `sk_test_…` key
   on Preview to try it without real payments.

3. **Order emails** (team gets the order with the STL attached; customer gets
   a confirmation):
   - Create a [Resend](https://resend.com) account, add the domain
     `beyondstagezero.com` and add the DNS records it shows. Create an API key
     and add it in Vercel as `RESEND_API_KEY`.
   - Stripe Dashboard → **Developers → Webhooks → Add destination**:
     endpoint `https://beyondstagezero.com/api/stripe-webhook`, events
     `checkout.session.completed` and `checkout.session.async_payment_succeeded`.
     Copy its signing secret (`whsec_…`) into Vercel as `STRIPE_WEBHOOK_SECRET`.
   - Optional: `ORDER_EMAIL_TO` (default `contact@beyondstagezero.com`, comma
     separated for several) and `ORDER_EMAIL_FROM` (default
     `Beyond Stage Zero <orders@beyondstagezero.com>`).

   If an email fails, the webhook returns an error and Stripe retries; each
   email is sent with an idempotency key, so retries don't send duplicates.
   Files over 15 MB are linked, not attached.

Each paid order appears in the Stripe Dashboard under **Payments**. The order
number, measured and submitted numbers, notes and the uploaded file's path are
in the payment's **Metadata**. Download the file from Vercel → Storage → the
Blob store → `nozzle-uploads/`. Refund from the payment page in Stripe.

## Email updates sign-up (footer, every page)

People enter their email in the footer; `api/subscribe.js` adds them to the
Resend contact list. Logic and tests: `src/newsletter/subscribe.js`.

Setup (uses the same Resend account as the order emails):

1. Resend → **API Keys → Create**, permission **Full access** (a sending-only
   key can't add contacts). Add it in Vercel as `RESEND_CONTACTS_KEY`, then
   redeploy. (If `RESEND_API_KEY` is already full access, that is used instead.)
2. Optional: to collect sign-ups into one specific audience, put its id in
   `RESEND_AUDIENCE_ID`.

Sign-ups appear in Resend under **Audience / Contacts**. To email everyone,
use Resend → **Broadcasts**: write the update, choose the contacts, send.
Broadcasts add an unsubscribe link and skip anyone who has unsubscribed.

Until the key is set, the form shows "Sign-ups are not working right now".

`npm test` runs the geometry, checkout and sign-up tests.
