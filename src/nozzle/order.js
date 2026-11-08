// Shared by the pre-order page and the /api functions.
export const NOZZLE_ORDER = {
  // Pre-orders are closed until this is true. While closed, /nozzles/preorder
  // shows a countdown to `opensAt`, the buttons say "Pre-orders open soon", and
  // the checkout and upload APIs refuse orders. Flip to true to open them.
  open: false,
  opensAt: '2026-11-23T00:00:00+11:00', // midnight, Melbourne time
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

// e.g. "23 November", in Melbourne time so it matches `opensAt`.
export function formatOpensAt(options = { day: 'numeric', month: 'long' }) {
  return new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Melbourne', ...options }).format(new Date(NOZZLE_ORDER.opensAt))
}

export const UNITS = { mm: 1, cm: 10, m: 1000, in: 25.4 }
