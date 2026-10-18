import { Link } from 'react-router-dom'
import { b1mMilestones, b1mMotorSpecs, b1mObjectives, b1mSpecs } from '../data'
import { useTitle } from '../useTitle'
import './Missions.css'

const preStaticFire = [
  'B1M engine design',
  'Static fire stand design',
  'Propellant characterisation',
  'B1M engine build',
  'Static fire stand construction',
  'B1M engine static fires',
]

const shownOnSpecSheet = new Set([
  'Target apogee',
  'Motor',
  'Propellant',
  'Expected thrust',
  'Engines in production',
  'Pressure testing',
  'Collaboration',
])

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
            <div className="side-row"><span>Thrust</span><span>200 kgf</span></div>
            <div className="side-row"><span>Burn time</span><span>3 s</span></div>
            <div className="side-row"><span>First flight</span><span>Q4&apos;26–Q1&apos;27</span></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker accent">Technical</p>
              <h2>Specifications.</h2>
            </div>
            <div className="b1m-spec-aside">
              <a href="https://federation.edu.au" target="_blank" rel="noopener noreferrer">
                <img src="/partner-feduni.svg" alt="Federation University" />
              </a>
              <p>
                Current figures for the B1M motor, built in collaboration with{' '}
                <a className="b1m-spec-link" href="https://federation.edu.au" target="_blank" rel="noopener noreferrer">Federation University</a>.
              </p>
            </div>
          </div>
          <div className="stravox-numbers-grid cols-4">
            {b1mMotorSpecs.map((spec) => (
              <div className="spec-cell" key={spec.lbl}>
                <div className="lbl">{spec.lbl}</div>
                <div className="val">{spec.val}<small>{spec.unit}</small></div>
                <div className="note">{spec.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            {b1mSpecs.filter(([label]) => !shownOnSpecSheet.has(label)).map(([label, value]) => (
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
