import { useEffect, useState } from 'react'
import { countdownTarget, whenLabel } from '../countdownTime'
import { useOctopus } from '../octopus'

/**
 * "Coming up" T-minus clocks for countdowns marked "Shown publicly" in Octopus.
 *
 * Countdown times are entered in Octopus as Creswick wall-clock time, so they're read as
 * Australia/Melbourne time here — a visitor anywhere sees the same moment, labelled AEST/AEDT.
 */

const KIND = { launch: 'Launch', test: 'Test', deadline: 'Deadline', event: 'Event', milestone: 'Milestone' }

const pad = (n) => String(n).padStart(2, '0')

function Clock({ target, now }) {
  const diff = target - now
  let s = Math.floor(Math.abs(diff) / 1000)
  const days = Math.floor(s / 86400)
  s -= days * 86400
  const hms = `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
  return (
    <p className="countdown-clock" aria-label={`T ${diff >= 0 ? 'minus' : 'plus'} ${days} days ${hms}`}>
      <span className="countdown-t">T{diff >= 0 ? '−' : '+'}</span>
      {days > 0 && (
        <>
          {days}
          <span className="countdown-unit">d</span>
        </>
      )}
      {hms}
    </p>
  )
}

export default function Countdowns() {
  const feed = useOctopus()
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const upcoming = (feed?.countdowns || [])
    .map((c) => ({ ...c, at: countdownTarget(c) }))
    .filter((c) => c.at > now - 60 * 60 * 1000) // keep T+ showing for an hour
    .sort((a, b) => a.at - b.at)
    .slice(0, 3)

  if (!upcoming.length) return null

  return (
    <section className="countdowns-band" aria-labelledby="coming-up">
      <div className="container countdowns-inner">
        <h2 id="coming-up" className="countdowns-heading">Coming up</h2>
        <ul className={`countdowns-list count-${upcoming.length}`}>
          {upcoming.map((c) => (
            <li key={`${c.name}-${c.date}`}>
              <p className="countdowns-kind">{KIND[c.category] || 'Next'}</p>
              <h3>{c.name}</h3>
              <Clock target={c.at} now={now} />
              <p className="countdowns-when">{whenLabel(c.at, !!c.time)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
