/**
 * What counts as "testing" content from Octopus: countdowns of type Test, and news posts
 * tagged Testing (or Test / Tests). Tests lead the home page — they're the main thing.
 */
export const isTest = (countdown) => countdown?.category === 'test'

export const isTestPost = (post) => /\btests?\b|\btesting\b/i.test(post?.tag || '')

/** How far ahead of T-0 the testing banner appears, and how long after T-0 it stays up. */
export const BANNER_BEFORE_MS = 3 * 24 * 60 * 60 * 1000
export const BANNER_AFTER_MS = 60 * 60 * 1000

/**
 * Whether a test is "happening" enough to put the testing banner at the top of the site:
 * In progress or on Hold, or T-0 within the next 3 days (and up to an hour after it).
 * `c.at` is the test's T-0 as a timestamp. Finished (Complete/Scrubbed) tests never count.
 */
export function testHappening(c, now) {
  if (c.status === 'done' || c.status === 'scrubbed') return false
  if (c.status === 'live' || c.status === 'hold') return true
  return c.at > now - BANNER_AFTER_MS && c.at <= now + BANNER_BEFORE_MS
}
