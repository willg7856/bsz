import { countdownTarget, heldTime, whenLabel } from '../countdownTime'
import { isTest } from '../testing'
import useNow from '../useNow'
import CountdownClock from './CountdownClock'
import { useOctopus } from '../octopus'

/**
 * "Coming up" T-minus clocks for countdowns marked "Shown publicly" in Octopus.
 *
 * Countdown times are entered in Octopus as Creswick wall-clock time, so they're read as
 * Australia/Melbourne time here — a visitor anywhere sees the same moment, labelled AEST/AEDT.
 */

const KIND = { launch: 'Launch', test: 'Test', deadline: 'Deadline', event: 'Event', milestone: 'Milestone' }

export default function Countdowns() {
  const feed = useOctopus()
  const now = useNow()

  // Tests are shown in the testing strip at the top of the home page instead.
  const upcoming = (feed?.countdowns || [])
    .filter((c) => !isTest(c))
    .map((c) => ({ ...c, at: countdownTarget(c) }))
    .filter((c) => c.at > now - 60 * 60 * 1000 || heldTime(c) !== undefined) // keep T+ showing for an hour
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
              <CountdownClock target={c.at} now={now} held={heldTime(c)} />
              <p className="countdowns-when">{whenLabel(c.at, !!c.time)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
