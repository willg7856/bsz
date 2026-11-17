import { useState } from 'react'

const EURO = ['AT', 'BE', 'HR', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES']

const COUNTRY_CURRENCY = {
  US: 'USD', GB: 'GBP', NZ: 'NZD', CA: 'CAD', JP: 'JPY', SG: 'SGD', IN: 'INR',
  CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK',
  ...Object.fromEntries(EURO.map((code) => [code, 'EUR'])),
}

// Country from the cookie set by middleware.js (Vercel geolocation). Falls
// back to the browser's language region, e.g. "en-US" → "US", for local dev.
function detectCountry() {
  try {
    const match = document.cookie.match(/(?:^|;\s*)bsz_country=([A-Z]{2})/)
    if (match) return match[1]
    const region = new Intl.Locale(navigator.language).maximize().region
    return region || null
  } catch {
    return null
  }
}

// Returns a formatter for a local estimate of an AUD price, or null when the
// visitor is in Australia, unknown, or in a currency we don't list.
export function useLocalEstimate(localCurrencies) {
  const [country] = useState(detectCountry)
  const code = COUNTRY_CURRENCY[country]
  const local = code && localCurrencies[code]
  if (!local) return null
  return (aud) => {
    const value = aud * local.perAud
    const rounded = value >= 1000 ? Math.round(value / 10) * 10 : Math.round(value)
    return `${local.symbol}${rounded.toLocaleString('en-US')}`
  }
}
