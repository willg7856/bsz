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

Vercel project setup:

1. **Storage → Create → Blob**, choose **Private** access, and connect it to this
   project. That adds `BLOB_READ_WRITE_TOKEN`. (If you make a public store
   instead, set `blobAccess: 'public'` in `src/nozzle/order.js`.)
2. **Settings → Environment Variables:** add `STRIPE_SECRET_KEY` (a restricted
   key with write access to Checkout Sessions is enough). Use a `sk_test_…` key
   on Preview to try it without real payments.

Each paid order appears in the Stripe Dashboard under **Payments**. The order
number, measured and submitted numbers, notes and the uploaded file's path are
in the payment's **Metadata**. Download the file from Vercel → Storage → the
Blob store → `nozzle-uploads/`. Refund from the payment page in Stripe.

`npm test` runs the geometry and checkout tests.
