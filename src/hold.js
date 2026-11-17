/**
 * Holds: when a countdown's status in Octopus is "hold", its clock stops instead of running on.
 *
 * If Octopus sends when the hold began (`heldAt`, an ISO time or ms timestamp), the clock stops at
 * that moment, so every visitor sees the same frozen time. Otherwise it stops at the moment this
 * page first saw the hold (remembered for the tab, so a reload doesn't jump it). A held clock never
 * runs past T−0. When the hold is lifted the clock goes back to counting down to the set time.
 */

const KEY = 'bsz-holds'
const idOf = (c) => `${c.name}|${c.date}|${c.time || ''}`

let seen = (() => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
})()

function save() {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(seen))
  } catch {
    /* private mode — fine */
  }
}

function parseHeldAt(v) {
  if (v == null || v === '') return null
  const t = typeof v === 'number' ? v : Date.parse(v)
  return Number.isFinite(t) ? t : null
}

export const isHeld = (c) => c?.status === 'hold'

/**
 * The "now" to draw a countdown's clock with: the real time normally, or the frozen moment while
 * it's on hold. `c.at` is the countdown's target timestamp.
 */
export function clockNow(c, now) {
  const id = idOf(c)
  if (!isHeld(c)) {
    if (id in seen) {
      delete seen[id]
      save()
    }
    return now
  }
  let from = parseHeldAt(c.heldAt)
  if (from == null) {
    if (!(id in seen)) {
      seen[id] = now
      save()
    }
    from = seen[id]
  }
  return Math.min(from, c.at)
}

/** Only for tests. */
export function _resetHolds() {
  seen = {}
}
