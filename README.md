# Beyond Stage Zero

Monorepo for both public sites:

| Domain | App | Folder | Stack |
|--------|-----|--------|-------|
| [beyondstagezero.com](https://beyondstagezero.com) | Main site | repo root | Vite + React |
| [beyondstagezero.space](https://beyondstagezero.space) | Minimal brand page | [`space/`](./space) | Next.js |

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

Served from this same Vercel project (`beyondstagezero/bsz`). Edge middleware rewrites `.space` hosts to `public/space-landing.html` while keeping the URL as `https://beyondstagezero.space/` (static `index.html` would otherwise win before `vercel.json` rewrites).

In Vercel → Project **bsz** → Settings → Domains, add:

- `beyondstagezero.space`
- `www.beyondstagezero.space` (optional)

If the domain is still on an old/deleted project, remove it there first, then add it here. After that, every production deploy of this repo updates `.space` automatically.

The Next.js app under [`space/`](./space) remains available if you later want a separate Vercel project with Root Directory = `space`.


## Custom nozzle pre-orders (`/nozzles/preorder`)

Customers upload an STL, check the throat/exit/angle numbers measured in the
browser (`src/nozzle/analyzeNozzle.js`), and pay a fixed pre-order price through
Stripe Checkout. Price, currency, ship-to countries and the upload limit live in
`src/nozzle/order.js`.

**Opening and closing pre-orders:** `open` in `src/nozzle/order.js`. While it
is `false`, `/nozzles/preorder` shows a countdown to `opensAt`, every
pre-order button reads "Pre-orders open soon", and the checkout and upload APIs
refuse orders. Set it to `true` and deploy to open pre-orders.

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
