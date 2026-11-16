import { useSyncExternalStore } from 'react'

/**
 * Live site content from Octopus (ops.beyondstagezero.com) — the notice banner, track-record
 * numbers, news and countdowns, edited on Octopus's "BSZ site" page.
 *
 * One shared copy of the feed for the whole page. It's refreshed every minute while the tab is
 * visible (and straight away when someone comes back to the tab), so open pages pick up edits
 * without a reload. If Octopus can't be reached, pages keep showing what they had — or the
 * built-in content from data.js — so the site never breaks because of it.
 */

const FEED = (import.meta.env.VITE_OCTOPUS_URL || 'https://ops.beyondstagezero.com') + '/api/public/stats'
const CACHE_KEY = 'bsz-octopus-feed'
const TIMEOUT_MS = 4000
const REFRESH_MS = 60_000

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

let current = readCache()
let inflight = null
let timer = null
const listeners = new Set()

function fetchFeed() {
  if (inflight) return inflight
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  inflight = fetch(FEED, { signal: ctrl.signal, cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((feed) => {
      if (!feed || !feed.managed) return
      // Only notify when something actually changed, so pages don't re-render every minute.
      if (JSON.stringify(stripVolatile(feed)) === JSON.stringify(stripVolatile(current))) return
      current = feed
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(feed))
      } catch {
        /* private mode — fine */
      }
      listeners.forEach((fn) => fn())
    })
    .catch(() => {})
    .finally(() => {
      clearTimeout(t)
      inflight = null
    })
  return inflight
}

/** updatedAt changes on every request; ignore it when comparing. */
function stripVolatile(feed) {
  if (!feed) return null
  const rest = { ...feed }
  delete rest.updatedAt
  return rest
}

function onVisible() {
  if (document.visibilityState === 'visible') fetchFeed()
}

function start() {
  if (timer) return
  fetchFeed()
  timer = setInterval(() => {
    if (document.visibilityState === 'visible') fetchFeed()
  }, REFRESH_MS)
  document.addEventListener('visibilitychange', onVisible)
}

function stop() {
  clearInterval(timer)
  timer = null
  document.removeEventListener('visibilitychange', onVisible)
}

function subscribe(onChange) {
  listeners.add(onChange)
  start()
  return () => {
    listeners.delete(onChange)
    if (listeners.size === 0) stop()
  }
}

const getSnapshot = () => current

/** The Octopus feed (kept up to date), or null while loading / if unreachable. */
export function useOctopus() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
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
