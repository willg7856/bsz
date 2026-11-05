// ─────────────────────────────────────────────────────────────
//  Ceramic nozzle pre-order — EDIT THIS FILE to update the page.
//  Everything marked TODO is a placeholder and needs real values.
// ─────────────────────────────────────────────────────────────

// Where custom-design requests are emailed. TODO: confirm address.
export const ORDER_EMAIL = 'orders@beyondstagezero.com'

// Shown in the hero and FAQ. TODO: set real ship window.
export const SHIP_WINDOW = 'Q1 2027'

// Standard sizes. For each one, create a Stripe Payment Link
// (Stripe Dashboard → Payment Links → New) and paste its URL into
// `stripeLink`. Leave it empty and the button shows "Opening soon".
export const STANDARD_NOZZLES = [
  {
    id: 'bsz-cn-29',
    name: 'CN-29',
    motor: '29 mm motors', // TODO
    throat: '6.0 mm', // TODO
    exit: '14.0 mm', // TODO
    price: 39, // TODO (USD)
    stripeLink: '', // TODO: https://buy.stripe.com/...
  },
  {
    id: 'bsz-cn-38',
    name: 'CN-38',
    motor: '38 mm motors', // TODO
    throat: '9.0 mm', // TODO
    exit: '21.0 mm', // TODO
    price: 49, // TODO
    stripeLink: '', // TODO
    popular: true,
  },
  {
    id: 'bsz-cn-54',
    name: 'CN-54',
    motor: '54 mm motors', // TODO
    throat: '13.0 mm', // TODO
    exit: '30.0 mm', // TODO
    price: 69, // TODO
    stripeLink: '', // TODO
  },
  {
    id: 'bsz-cn-75',
    name: 'CN-75',
    motor: '75 mm motors', // TODO
    throat: '18.0 mm', // TODO
    exit: '42.0 mm', // TODO
    price: 99, // TODO
    stripeLink: '', // TODO
  },
]
