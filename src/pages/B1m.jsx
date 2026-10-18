import { Link } from 'react-router-dom'
import { b1mMilestones, b1mObjectives, b1mSpecs } from '../data'
import { useTitle } from '../useTitle'
import './Missions.css'
import './B1m.css'

const preStaticFire = [
  'B1M engine design',
  'Static fire stand design',
  'Propellant characterisation',
  'B1M engine build',
  'Static fire stand construction',
  'B1M engine static fires',
]

const shownOnMotorBoard = new Set([
  'Expected thrust',
  'Engines in production',
  'Pressure testing',
  'Collaboration',
])

const engines = [
  { id: 'build-1', status: 'In production', note: '', ready: false },
  { id: 'ready', status: 'Almost ready', note: 'Pressure testing', ready: true },
  { id: 'build-3', status: 'In production', note: '', ready: false },
]

export default function B1m() {
  useTitle('B1M')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Sub-scale vehicle</p>
            <h1>STRAVOX B1M</h1>
            <p className="lede">
              Our sub-scale test vehicle — built to reach 3 km apogee on a home-built KNSB engine and return real flight data before we commit to full-scale STRAVOX. What works on B1M goes on STRAVOX.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/b1m-engine">Engine updates</Link>
              <Link className="btn" to="/missions">Mission pipeline</Link>
              <Link className="btn" to="/contact">Get involved</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Target apogee</span><span>3.0 km</span></div>
            <div className="side-row"><span>First flight</span><span>Q4&apos;26–Q1&apos;27</span></div>
          </div>
        </div>
        <div className="b1m-motor-band">
          <div className="b1m-motor-band-inner">
            <div className="b1m-motor-target">
              <p className="kicker">Motor target</p>
              <h2 className="b1m-motor-heading">
                <span className="b1m-motor-figure">
                  <span className="b1m-motor-num">200</span>
                  <span className="b1m-motor-unit">kgf thrust</span>
                </span>
                <span className="b1m-motor-for">for</span>
                <span className="b1m-motor-figure">
                  <span className="b1m-motor-num">3</span>
                  <span className="b1m-motor-unit">seconds</span>
                </span>
              </h2>
            </div>
            <div className="b1m-motor-build">
              <p className="kicker">Three in production</p>
              <p className="b1m-motor-lead">One is almost ready for pressure testing.</p>
              <ul className="b1m-engine-row" aria-label="Three B1M engines">
                {engines.map((engine) => (
                  <li className={`b1m-engine${engine.ready ? ' is-ready' : ''}`} key={engine.id}>
                    <span className="b1m-casing" aria-hidden="true" />
                    <span className={`b1m-engine-status${engine.ready ? ' status-active' : ''}`}>{engine.status}</span>
                    <span className="b1m-engine-note">{engine.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="b1m-motor-credit">
            <a className="b1m-motor-partner" href="https://federation.edu.au" target="_blank" rel="noopener noreferrer">
              <img src="/partner-feduni.svg" alt="" />
              <span>Built in collaboration with Federation University</span>
            </a>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Why B1M</p>
            <h2>Prove it at 3 km first.</h2>
            <p className="lede">
              Flying B1M lets us validate avionics, recovery, and vehicle systems at a scale that avoids the regulatory complexity and risk of a 30 km flight. It is the bridge between ground test and full-scale STRAVOX.
            </p>
          </div>
          <figure className="cad">
            <img src="/b1m-cad.png" alt="Cutaway of the B1M motor casing, 550 mm by 80 mm" />
            <figcaption>B1M motor · CAD cutaway · 550 mm × 80 mm</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Flight objectives</p>
            <div className="rows">
              {b1mObjectives.map((item) => (
                <div className="vehicle-row" key={item}>
                  <span className="idx">○</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <dl className="spec-table">
            {b1mSpecs.filter(([label]) => !shownOnMotorBoard.has(label)).map(([label, value]) => (
              <div className="spec-line" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="missions-card">
            <div className="missions-milestones missions-milestones--solo">
              <p className="missions-milestones-label">Pre-static fire milestones</p>
              <div className="missions-milestone-list">
                {b1mMilestones.filter((item) => preStaticFire.includes(item.label)).map((item, index, list) => (
                  <div className={`missions-milestone missions-milestone--${item.status}`} key={item.label}>
                    <div className="missions-milestone-marker">
                      <span className="missions-milestone-dot" />
                      {index < list.length - 1 ? <span className="missions-milestone-line" /> : null}
                    </div>
                    <div className="missions-milestone-content">
                      <div className="missions-milestone-head">
                        <span className="missions-milestone-name">{item.label}</span>
                        <span className="missions-milestone-tag">{item.status}</span>
                      </div>
                      <p className="missions-milestone-note">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
