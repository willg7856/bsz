import { useEffect, useState } from 'react'

/**
 * Live site content from Octopus (ops.beyondstagezero.com) — the notice banner, track-record
 * numbers and news, edited on Octopus's "BSZ site" page.
 *
 * The feed is fetched once per visit and remembered for the session. If Octopus can't be
 * reached (or is slow), pages keep showing the built-in content from data.js, so the site
 * never breaks because of it.
 */

const FEED = (import.meta.env.VITE_OCTOPUS_URL || 'https://ops.beyondstagezero.com') + '/api/public/stats'
const CACHE_KEY = 'bsz-octopus-feed'
const TIMEOUT_MS = 4000

let pending = null

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function load() {
  if (!pending) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
    pending = fetch(FEED, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((feed) => {
        if (feed && feed.managed) {
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(feed))
          } catch {
            /* private mode — fine */
          }
          return feed
        }
        return null
      })
      .catch(() => null)
      .finally(() => clearTimeout(timer))
  }
  return pending
}

/** The Octopus feed, or null while loading / if unreachable. */
export function useOctopus() {
  const [feed, setFeed] = useState(readCache)
  useEffect(() => {
    let live = true
    load().then((f) => {
      if (live && f) setFeed(f)
    })
    return () => {
      live = false
    }
  }, [])
  return feed
}

/** Track-record numbers in data.js's shape ({ val, lbl, note }), from Octopus when it manages them. */
export function liveRecord(feed, fallback) {
  if (!feed?.managed?.numbers) return fallback
  return feed.numbers.map((n) => ({
    val: `${n.value}${n.suffix ? ` ${n.suffix}` : ''}`,
    lbl: n.label,
    note: n.description || '',
  }))
}

/** News posts in data.js's shape ({ date, display, tag, title, body, link }), newest first. */
export function liveNews(feed, fallback) {
  if (!feed?.managed?.news) return fallback
  return feed.news.map((p) => ({
    date: p.date,
    display: p.display,
    tag: p.tag || 'Update',
    title: p.title,
    body: p.body,
    link: p.link || null,
  }))
}
