import { useOctopus } from '../octopus'

/**
 * The "what's happening now" banner on Home, B1M and Tests. Edited in Octopus (BSZ site → Notice
 * banner); falls back to the built-in message if Octopus hasn't taken it over or can't be reached.
 */
const FALLBACK = { label: 'Static fire', title: 'Our first B1M static fire is pending regulatory approval.', link: null, linkText: null }

export default function B1mStaticFireNotice() {
  const feed = useOctopus()
  const notice = feed?.managed?.notice ? feed.notice : FALLBACK
  if (!notice) return null
  const external = notice.link && /^https?:/.test(notice.link) && !notice.link.includes('beyondstagezero.com')
  return (
    <aside className="hero-notice" aria-label={`${notice.label || 'Notice'} status`}>
      {notice.label && <p className="hero-notice-label">{notice.label}</p>}
      <p className="hero-notice-title">{notice.title}</p>
      {notice.link && (
        <p className="hero-notice-body">
          <a className="hero-notice-link" href={notice.link} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {notice.linkText || 'Find out more'} →
          </a>
        </p>
      )}
    </aside>
  )
}
