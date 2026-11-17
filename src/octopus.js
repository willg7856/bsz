import { useSyncExternalStore } from 'react'

/**
 * Live site content from Octopus (ops.beyondstagezero.com) — the notice banner, track-record
 * numbers, news and countdowns, edited on Octopus's "BSZ site" page.
 *
 * One shared copy of the feed for the whole page. It's refreshed every minute while the tab is
 * visible, every 5 seconds on test day, and straight away when someone comes back to the tab, so
 * open pages pick up edits without a reload. If Octopus can't be reached, pages keep showing what they had — or the
 * built-in content from data.js — so the site never breaks because of it.
 */

const FEED = (import.meta.env.VITE_OCTOPUS_URL || 'https://ops.beyondstagezero.com') + '/api/public/stats'
const CACHE_KEY = 'bsz-octopus-feed'
const TIMEOUT_MS = 4000
const REFRESH_MS = 60_000
// On test day (a test on Hold or Live, or within 2 hours of T-0) check far more often, so a hold
// freezes the clock here within seconds of being called in Octopus.
const TEST_DAY_REFRESH_MS = 5_000

function testDay(feed) {
  const now = Date.now()
  return (feed?.countdowns || []).some((c) => {
    if (c.category !== 'test' && c.category !== 'launch') return false
    if (c.status === 'hold' || c.status === 'live') return true
    const at = typeof c.at === 'string' ? Date.parse(c.at) : NaN
    return c.status !== 'done' && c.status !== 'scrubbed' && Math.abs(at - now) < 2 * 3600_000
  })
}

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
  lastFetch = Date.now()
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

let lastFetch = 0

// Ticks every 5 s; fetches on every tick on test day, otherwise once a minute. Deciding on each
// tick (not when scheduling) means the faster pace starts as soon as the feed says it's test day.
function schedule() {
  timer = setTimeout(() => {
    const due = Date.now() - lastFetch >= (testDay(current) ? TEST_DAY_REFRESH_MS : REFRESH_MS) - 250
    const go = due && document.visibilityState === 'visible' ? fetchFeed() : Promise.resolve()
    go.finally(() => {
      if (timer) schedule()
    })
  }, TEST_DAY_REFRESH_MS)
}

function start() {
  if (timer) return
  fetchFeed()
  schedule()
  document.addEventListener('visibilitychange', onVisible)
}

function stop() {
  clearTimeout(timer)
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
/**
 * Gallery photos: Octopus's list once it manages the gallery (photos uploaded, captioned and
 * ordered there), otherwise the built-in list from data.js. `thumb` is a small version for the grid.
 */
export function liveGallery(feed, fallback) {
  if (!feed?.managed?.gallery) return fallback
  return (feed.gallery || []).map((g) => ({
    src: g.src,
    thumb: g.thumb || g.src,
    caption: g.caption || '',
    kind: g.kind || 'photo',
    width: g.width || undefined,
    height: g.height || undefined,
  }))
}

/**
 * The "Next tests" cards on the Tests page: Octopus's list once it manages them (even if every
 * card is hidden), otherwise the built-in list from data.js. Same shape either way.
 */
export function liveUpNext(feed, fallback) {
  if (!feed?.managed?.upnext) return fallback
  return (feed.upnext || []).map((u, i) => ({
    id: u.code || '',
    key: `${u.code || ''}-${u.title}-${i}`,
    label: u.title,
    engine: u.engine || '',
    status: u.status || '',
    note: u.note || '',
    steps: u.steps && u.steps.length ? u.steps : null,
    link: u.link || null,
    linkText: u.linkText || null,
  }))
}

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
