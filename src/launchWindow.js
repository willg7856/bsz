/**
 * The B1M-01 launch window, set in one place: the "First flight window" headline number in
 * Octopus (BSZ site → Headline numbers). Every mention of the window around the site is written
 * against the built-in window below and rewritten to the current one, in the same style
 * ("Q1–Q2'27", "Q1 – Q2 2027", "Q1 to Q2 2027", "between Q1 and Q2 2027").
 */

export const BUILT_IN = { from: 1, to: 2, year: 2027 }

/** Reads "Q2–Q3'27", "Q2 – Q3 2027", "Q2 to Q3 2027" or "Q3'27" into { from, to, year }. */
export function parseWindow(text) {
  const s = String(text || '').replace(/\s+/g, ' ')
  let m = /Q\s?([1-4])\s*(?:[–—-]|to|and)\s*Q\s?([1-4])\s*['’]?\s*(\d{4}|\d{2})\b/i.exec(s)
  if (m) return { from: Number(m[1]), to: Number(m[2]), year: year(m[3]) }
  m = /Q\s?([1-4])\s*['’]?\s*(\d{4}|\d{2})\b/i.exec(s)
  if (m) return { from: Number(m[1]), to: Number(m[1]), year: year(m[2]) }
  return null
}

const year = (y) => (y.length === 2 ? 2000 + Number(y) : Number(y))

/** The window written each way the site uses. */
export function formats(w) {
  const yy = String(w.year).slice(-2)
  const one = w.from === w.to
  const a = `Q${w.from}`
  const b = `Q${w.to}`
  return {
    short: one ? `${a}'${yy}` : `${a}–${b}'${yy}`,
    spaced: one ? `${a} ${w.year}` : `${a} – ${b} ${w.year}`,
    tight: one ? `${a} ${w.year}` : `${a}–${b} ${w.year}`,
    to: one ? `${a} ${w.year}` : `${a} to ${b} ${w.year}`,
    between: one ? `in ${a} ${w.year}` : `between ${a} and ${b} ${w.year}`,
  }
}

/** Rewrites every way the built-in window is written in `text` to the current window. */
export function rewrite(text, w) {
  if (typeof text !== 'string' || !w || (w.from === BUILT_IN.from && w.to === BUILT_IN.to && w.year === BUILT_IN.year)) return text
  const f = formats(w)
  const { from: a, to: b, year: y } = BUILT_IN
  const yy = String(y).slice(-2)
  return text
    .replace(new RegExp(`between Q${a} and Q${b} ${y}`, 'g'), f.between)
    .replace(new RegExp(`Q${a} to Q${b} ${y}`, 'g'), f.to)
    .replace(new RegExp(`Q${a} – Q${b} ${y}`, 'g'), f.spaced)
    .replace(new RegExp(`Q${a}–Q${b} ${y}`, 'g'), f.tight)
    .replace(new RegExp(`Q${a}–Q${b}'${yy}`, 'g'), f.short)
}

/** Applies rewrite() to every string inside arrays and objects (site data from data.js). */
export function rewriteAll(value, w) {
  if (typeof value === 'string') return rewrite(value, w)
  if (Array.isArray(value)) return value.map((v) => rewriteAll(v, w))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewriteAll(v, w)]))
  return value
}

/** The current window from Octopus's "First flight window" number, or the built-in one. */
export function windowFromFeed(feed) {
  const stat = (feed?.numbers || []).find((n) => /flight window|launch window/i.test(n.label || ''))
  return (stat && parseWindow(stat.value)) || BUILT_IN
}
