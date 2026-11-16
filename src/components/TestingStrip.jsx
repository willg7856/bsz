import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { countdownTarget, whenLabel } from '../countdownTime'
import { news as builtInNews } from '../data'
import { liveNews, useOctopus } from '../octopus'
import { isTest, isTestPost } from '../testing'
import useNow from '../useNow'
import CountdownClock from './CountdownClock'

/**
 * The first thing on the home page: the next test (from Octopus countdowns of type Test) with a
 * live T-minus clock, and the latest test update (news tagged Testing). Hidden if there's neither.
 *
 * It reports its height as --test-strip-h so the full-screen hero below can shrink to fit.
 */
export default function TestingStrip() {
  const feed = useOctopus()
  const now = useNow()
  const ref = useRef(null)

  const next = (feed?.countdowns || [])
    .filter(isTest)
    .map((c) => ({ ...c, at: countdownTarget(c) }))
    .filter((c) => c.at > now - 60 * 60 * 1000) // keep T+ up for an hour
    .sort((a, b) => a.at - b.at)
  const latest = liveNews(feed, builtInNews).find(isTestPost)
  const show = next.length > 0 || !!latest

  useEffect(() => {
    const root = document.documentElement
    if (!show || !ref.current) {
      root.style.removeProperty('--test-strip-h')
      return undefined
    }
    const el = ref.current
    const update = () => root.style.setProperty('--test-strip-h', `${el.offsetHeight}px`)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      ro.disconnect()
      root.style.removeProperty('--test-strip-h')
    }
  }, [show])

  if (!show) return null
  const first = next[0]

  return (
    <section className="testing-strip" ref={ref} aria-label="Testing">
      <div className="container testing-strip-inner">
        <p className="testing-strip-label">Testing</p>
        {first && (
          <div className="testing-strip-next">
            <p className="testing-strip-kicker">{first.at > now ? 'Next test' : 'Test under way'}</p>
            <p className="testing-strip-name">{first.name}</p>
            <CountdownClock target={first.at} now={now} className="testing-strip-clock" />
            <p className="testing-strip-when">
              {whenLabel(first.at, !!first.time)}
              {next.length > 1 && ` · then ${next[1].name}`}
            </p>
          </div>
        )}
        {latest && (
          <Link className="testing-strip-latest" to="/news">
            <span className="testing-strip-kicker">Latest from testing · {latest.display}</span>
            <span className="testing-strip-headline">{latest.title}</span>
            <span className="testing-strip-more">Read the update →</span>
          </Link>
        )}
        <Link className="testing-strip-log" to="/tests">Full test log →</Link>
      </div>
    </section>
  )
}
