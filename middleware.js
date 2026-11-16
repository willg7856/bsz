import { geolocation, next } from '@vercel/functions'

// beyondstagezero.space is its own Vercel project now (repo willg7856/bsz-space).

function isStaticAsset(pathname) {
  return pathname.includes('.')
}

// Pass the visitor's country (from Vercel's IP geolocation) to the page in a
// readable cookie, so the nozzle pre-order page can show a local price estimate.
function withCountry(request) {
  const { pathname } = new URL(request.url)
  const country = geolocation(request).country
  if (pathname.startsWith('/api/') || isStaticAsset(pathname) || !country || !/^[A-Z]{2}$/.test(country)) {
    return next()
  }
  return next({
    headers: { 'Set-Cookie': `bsz_country=${country}; Path=/; Max-Age=86400; SameSite=Lax; Secure` },
  })
}

export default function middleware(request) {
  return withCountry(request)
}
