/**
 * Countdown times from Octopus are Creswick wall-clock times (no zone attached), so the site
 * reads them as Australia/Melbourne time and every visitor counts down to the same moment.
 */
export const TZ = 'Australia/Melbourne'

/** Offset of Melbourne from UTC (ms) at a given instant. */
function melbourneOffset(utcMs) {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(new Date(utcMs))
  const get = (t) => Number(parts.find((p) => p.type === t)?.value)
  return Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second')) - utcMs
}

export function parseTime(t) {
  const m = /^\s*(\d{1,2})(?::?(\d{2}))?\s*([ap])?\.?\s*m?\.?\s*$/i.exec(t || '')
  if (!m) return [0, 0]
  let h = Number(m[1])
  const min = m[2] ? Number(m[2]) : 0
  const ap = m[3]?.toLowerCase()
  if (ap === 'a') h = h === 12 ? 0 : h
  else if (ap === 'p') h = h === 12 ? 12 : h + 12
  return [Math.min(h, 23), Math.min(min, 59)]
}

/** The countdown's moment as a UTC timestamp, treating date + time as Melbourne time. */
export function countdownTarget(c) {
  const [y, mo, d] = c.date.split('-').map(Number)
  const [h, mi] = parseTime(c.time)
  const wall = Date.UTC(y, mo - 1, d, h, mi)
  let t = wall - melbourneOffset(wall)
  t = wall - melbourneOffset(t) // second pass settles daylight-saving edges
  return t
}

export function whenLabel(t, hasTime) {
  const opts = { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' }
  const day = new Intl.DateTimeFormat('en-AU', opts).format(new Date(t))
  if (!hasTime) return day
  const time = new Intl.DateTimeFormat('en-AU', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' })
    .format(new Date(t))
    .replace(/\s?([ap])m/i, (_, x) => ` ${x.toLowerCase()}m`)
  return `${day} · ${time}`
}

