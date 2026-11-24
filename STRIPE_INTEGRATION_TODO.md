# Stripe integration: remaining steps

The nozzle pre-order now takes payment **on our own page**, using Stripe's
payment form (`ui_mode: "form"`), instead of sending customers to a
Stripe-hosted checkout page. It only shows when `takingPayment` is `true` in
[src/nozzle/order.js](src/nozzle/order.js). Pre-orders are still free until you
switch that on.

## Values to Replace

None. The Checkout Session already used real values for the two
placeholder-type parameters, and they were kept:

**Files containing these values:**
- [src/nozzle/checkout.js](src/nozzle/checkout.js)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| mode | `payment` | Already correct. A pre-order is a one-time charge. Use `subscription` only for recurring billing. |
| line_items | `price_data`: "Custom ceramic nozzle pre-order", `amount` × 100 in `currency` | Already real. Change the price or currency in [src/nozzle/order.js](src/nozzle/order.js) (`amount`, `currency`). To use a Price from the Dashboard instead, replace `price_data` with `line_items[0][price]=price_…` (https://dashboard.stripe.com/prices). |

The only value you have to supply is the publishable key (see Setup below).

## Configured Parameters

These parameters were configured in Checkout Studio and are already set correctly.

**Files containing these parameters:**
- [src/nozzle/checkout.js](src/nozzle/checkout.js) (`checkoutForm`)
- [src/nozzle/StripeCheckoutForm.jsx](src/nozzle/StripeCheckoutForm.jsx) (appearance)

| Parameter | Value |
|-----------|-------|
| ui_mode | `form` |
| billing_address_collection | `auto` |
| phone_number_collection | `{ enabled: false }` |
| automatic_tax | `{ enabled: false }` |
| submit_type | `auto` |
| integration_identifier | `custom_embedded_web_0002` |
| payment_method_collection | `always`, **not sent**: it only applies to `subscription` mode, and this is `payment` mode |
| Stripe API version | `2026-03-25.dahlia` (sent as the `Stripe-Version` header, needed for `ui_mode: "form"`) |

### What else changed in the session, and what was kept

- `success_url` and `cancel_url` were replaced with `return_url`
  (`/nozzles/preorder?order=paid&id=<order>&session_id={CHECKOUT_SESSION_ID}`).
  A payment form on your own page needs `return_url`, and it doesn't accept
  `cancel_url`. Cancelling now means pressing "← Back to your design".
- These were **kept on purpose**, even though Checkout Studio doesn't list
  them. They carry the order itself, and removing them would break order
  emails and shipping:
  `customer_email`, `client_reference_id`, `metadata[...]`,
  `payment_intent_data[description]`, `payment_intent_data[metadata][...]`,
  `shipping_address_collection[allowed_countries][]`.
  The webhook ([src/nozzle/orderEmail.js](src/nozzle/orderEmail.js)) reads
  the metadata to email the order.
- The endpoint now returns `{ client_secret, orderId }` instead of `{ url }`.

## Setup

1. **Publishable key (new).** In Vercel → Settings → Environment Variables, add
   `VITE_STRIPE_PUBLISHABLE_KEY`:
   - Preview: `pk_test_…`
   - Production: `pk_live_…`

   Get both from https://dashboard.stripe.com/apikeys. It needs the `VITE_`
   prefix because the browser reads it. **Redeploy** after adding it, because
   Vite builds it into the page. For local dev, put it in `.env.local`, which
   git ignores.
2. **Secret key (unchanged).** `STRIPE_SECRET_KEY` stays server-only, with no
   `VITE_` prefix. Use the same mode (test or live) as the publishable key.
3. **Webhook (unchanged).** `STRIPE_WEBHOOK_SECRET` and the
   `checkout.session.completed` / `checkout.session.async_payment_succeeded`
   events, as in the README.
4. **No new npm dependencies.** The server calls Stripe's REST API with
   `fetch`. Stripe.js is loaded in [index.html](index.html) from
   `https://js.stripe.com/dahlia/stripe.js`. Never bundle or self-host it
   (PCI requirement).
5. **Turn payments on.** Set `takingPayment: true` in
   [src/nozzle/order.js](src/nozzle/order.js) when you're ready.

## Files

| File | Change |
|------|--------|
| [src/nozzle/checkout.js](src/nozzle/checkout.js) | Checkout Studio parameters, `return_url`, Dahlia API version, returns `client_secret` |
| [src/nozzle/checkout.test.js](src/nozzle/checkout.test.js) | Tests for the above |
| [src/nozzle/StripeCheckoutForm.jsx](src/nozzle/StripeCheckoutForm.jsx) | **New.** Mounts Stripe's payment form with the configured appearance |
| [src/nozzle/NozzleConfigurator.jsx](src/nozzle/NozzleConfigurator.jsx) | Shows the form on the page instead of redirecting to Stripe |
| [index.html](index.html) | Loads Stripe.js (Dahlia) |

## How it works

1. The customer uploads an STL, checks the numbers and presses "Pre-order".
2. The STL goes to Vercel Blob. The browser then POSTs the order to
   `/api/nozzle-checkout`.
3. The server validates the order and creates a Checkout Session with
   `ui_mode: "form"`. It returns the session's `client_secret`.
4. The page swaps the order form for Stripe's payment form
   (`stripe.initCheckoutFormSdk` → `createForm` → `mount('#checkout-form')`).
   The form renders in a Stripe iframe, so card details never touch our code.
5. On confirm, Stripe takes the payment and sends the customer to `return_url`.
   The page then shows "Pre-order received" with the order number.
6. Stripe calls `/api/stripe-webhook`, which emails the team the order with
   the STL and emails the customer a confirmation. This is unchanged.
   **Fulfil orders from the webhook, not from the return page.**

## Testing

Do this on a Preview deployment with `pk_test_…` / `sk_test_…` keys and
`takingPayment: true`:

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | Succeeds |
| `4000 0025 0000 3155` | Asks for 3D Secure authentication |
| `4000 0000 0000 9995` | Declined (insufficient funds) |

Use any future expiry date, any CVC and any postcode. More test cards:
https://docs.stripe.com/testing

Check:
- The payment appears in Stripe → Payments, with the order metadata.
- Both emails arrive.
- Shipping-address collection works inside the on-page form. This hasn't been
  run against a live Stripe account yet. If the form doesn't collect a
  shipping address, check Stripe's docs for `ui_mode: "form"` before going live.
- Stripe accepts `integration_identifier`. If session creation fails with an
  "unknown parameter" error, the server log (`Stripe checkout failed`) shows it.

## Next steps

- **Products:** change the price or currency in `src/nozzle/order.js`, or move
  to a Dashboard Price ID (see Values to Replace).
- **Fulfilment:** this is already handled by the webhook emails. Refunds are
  done from the payment in the Stripe Dashboard.
- **Order tracking:** orders live in Stripe (metadata) and the team inbox.
  There's no database. Add one only if you need order status pages.
- **Font:** the appearance uses `fontFamily: "Inconsolata"`. To make sure it
  loads inside Stripe's iframe, pass it through the `fonts` option of
  `initCheckoutFormSdk`. Otherwise Stripe falls back to a system font.

## Resources

- Stripe support: https://support.stripe.com
- Stripe MCP (lets AI tools work with your Stripe account): https://docs.stripe.com/mcp
