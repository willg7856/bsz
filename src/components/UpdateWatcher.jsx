import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Picks up new deploys without asking anyone to refresh.
 *
 * Every build loads a uniquely named script (/assets/index-<hash>.js). This checks the live
 * index.html every few minutes and when the tab comes back into view. If the script name has
 * changed, a new version is out — and the next time the visitor clicks a link, the page loads
 * fresh instead of switching in place. To them it's just a normal page change; nobody is pulled
 * away from what they're reading.
 */

const CHECK_MS = 3 * 60_000

function currentBuild() {
  const s = document.querySelector('script[type="module"][src*="/assets/"]')
  return s ? new URL(s.getAttribute('src'), location.origin).pathname : null
}

async function liveBuild() {
  try {
    const res = await fetch('/', { cache: 'no-store', headers: { Accept: 'text/html' } })
    if (!res.ok) return null
    const html = await res.text()
    const m = html.match(/<script[^>]+type="module"[^>]+src="([^"]*\/assets\/[^"]+)"/)
    return m ? new URL(m[1], location.origin).pathname : null
  } catch {
    return null
  }
}

export default function UpdateWatcher() {
  const { pathname } = useLocation()
  const stale = useRef(false)
  const first = useRef(true)

  useEffect(() => {
    const mine = currentBuild()
    if (!mine) return undefined // dev server — nothing to compare
    const check = async () => {
      if (stale.current || document.visibilityState !== 'visible') return
      const live = await liveBuild()
      if (live && live !== mine) stale.current = true
    }
    const id = setInterval(check, CHECK_MS)
    const onVisible = () => document.visibilityState === 'visible' && check()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  // A new version is out and the visitor has moved to another page: load it for real.
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (stale.current) window.location.reload()
  }, [pathname])

  return null
}
