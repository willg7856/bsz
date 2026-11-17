// Shared by the pre-order page and the /api functions.
export const NOZZLE_ORDER = {
  // false = pre-orders are free: the form registers the order and emails the
  // team and customer, and nothing is charged. true = the form goes to Stripe
  // Checkout for `amount` below.
  takingPayment: false,
  // Charged at Stripe checkout. Stripe Adaptive Pricing shows it in the
  // buyer's currency. Change both values together.
  amount: 50,
  currency: 'AUD',
  // Uploaded designs go to Vercel Blob. 'private' = only the team can download
  // them (needs a private Blob store). Use 'public' if the store is public.
  blobAccess: 'private',
  maxFileBytes: 50 * 1024 * 1024,
  // Countries Stripe will accept a shipping address from.
  shipTo: [
    'AU', 'NZ', 'US', 'CA', 'GB', 'IE', 'DE', 'FR', 'NL', 'BE', 'LU', 'AT', 'CH', 'IT', 'ES', 'PT',
    'DK', 'SE', 'NO', 'FI', 'IS', 'PL', 'CZ', 'SK', 'HU', 'SI', 'HR', 'EE', 'LV', 'LT', 'GR', 'CY', 'MT',
    'RO', 'BG', 'JP', 'KR', 'SG', 'HK', 'TW', 'MY', 'TH', 'PH', 'ID', 'IN', 'AE', 'IL', 'ZA', 'BR', 'MX', 'CL', 'AR',
  ],
}

export const UNITS = { mm: 1, cm: 10, m: 1000, in: 25.4 }
