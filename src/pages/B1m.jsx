import { Link } from 'react-router-dom'
import { b1mMilestones, b1mObjectives, b1mSpecs } from '../data'
import { useTitle } from '../useTitle'
import './Missions.css'

const flightPath = [
  'Vehicle design',
  'Vehicle fabrication',
  'Avionics integration',
  'CASA range clearance',
  'STRAVOX B1M-01 launch',
]

const motorSpecLabels = new Set([
  'Motor',
  'Propellant',
  'Expected thrust',
  'Engines in production',
  'First engine',
  'Collaboration',
])

export default function B1m() {
  useTitle('B1M')
  const path = b1mMilestones.filter((item) => flightPath.includes(item.label))

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
              <Link className="btn btn-ink" to="/b1m-engine">B1M engine</Link>
              <Link className="btn" to="/missions">Mission pipeline</Link>
              <Link className="btn" to="/contact">Get involved</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Target apogee</span><span>3.0 km</span></div>
            <div className="side-row"><span>First flight</span><span>Q4&apos;26–Q1&apos;27</span></div>
            <div className="side-row"><span>Status</span><span>In development</span></div>
            <div className="side-row"><span>Motor</span><Link to="/b1m-engine">B1M engine</Link></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Why B1M</p>
          <h2>Prove it at 3 km first.</h2>
          <p className="lede">
            Flying B1M lets us validate avionics, recovery, and vehicle systems at a scale that avoids the regulatory complexity and risk of a 30 km flight. It is the bridge between ground test and full-scale STRAVOX.
          </p>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <p className="kicker">Motor</p>
          <h2>The engine is its own build.</h2>
          <p className="copy">
            The first B1M engine is done and waiting regulatory approval. Two are still in production with Federation University. The casing drawings, the motor figures, and the build log live on the engine page.
          </p>
          <Link className="home-rocket-link" to="/b1m-engine">Open the B1M engine</Link>
          <div className="b1m-motor-points">
            <div><span>Thrust</span><strong>200 kgf</strong></div>
            <div><span>Burn</span><strong>3 s</strong></div>
            <div><span>In production</span><strong>2 engines</strong></div>
          </div>
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
            {b1mSpecs.filter(([label]) => !motorSpecLabels.has(label)).map(([label, value]) => (
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
              <p className="missions-milestones-label">Path to flight</p>
              <div className="missions-milestone-list">
                {path.map((item, index) => (
                  <div className={`missions-milestone missions-milestone--${item.status}`} key={item.label}>
                    <div className="missions-milestone-marker">
                      <span className="missions-milestone-dot" />
                      {index < path.length - 1 ? <span className="missions-milestone-line" /> : null}
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
