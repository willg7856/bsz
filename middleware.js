import { next, rewrite } from '@vercel/functions'

const SPACE_HOSTS = new Set([
  'beyondstagezero.space',
  'www.beyondstagezero.space',
])

function isStaticAsset(pathname) {
  if (pathname === '/space-landing.html') return false
  return pathname.includes('.')
}

export default function middleware(request) {
  const host = (request.headers.get('host') || '').split(':')[0]
  if (!SPACE_HOSTS.has(host)) {
    return next()
  }

  const url = new URL(request.url)
  const { pathname } = url

  // Old bookmark / shared link → clean apex path
  if (pathname === '/space-landing.html') {
    url.pathname = '/'
    return Response.redirect(url, 308)
  }

  // Favicon, fonts, logo, etc. — serve as normal
  if (isStaticAsset(pathname)) {
    return next()
  }

  // Keep the browser URL as / (or current path) while serving the landing page.
  // Middleware runs before filesystem, so Vite's index.html cannot win here.
  return rewrite(new URL('/space-landing.html', request.url))
}
