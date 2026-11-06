import { Link } from 'react-router-dom'
import B1mStaticFireNotice from '../components/B1mStaticFireNotice'
import { b1mMilestones, b1mObjectives, b1mSpecs } from '../data'
import { useTitle } from '../useTitle'

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
              A 3 km vehicle that flies before full-scale STRAVOX. Vehicle design is complete. The first engine is done and pending regulatory approval, and two engines are still in production. First flight is aimed at Q1 to Q2 2027.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/b1m-engine">B1M engine</Link>
              <Link className="btn" to="/missions">Mission pipeline</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Apogee</span><span className="num">3.0 km</span></div>
            <div className="side-row"><span>Design</span><span className="done">Complete</span></div>
            <div className="side-row"><span>In production</span><span className="num">2 engines</span></div>
            <div className="side-row"><span>First flight</span><span>Q1–Q2&apos;27</span></div>
          </div>
        </div>
        <B1mStaticFireNotice />
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
          <div className="section-head">
            <div>
              <p className="kicker">Flight objectives</p>
              <h2>What the flight has to prove.</h2>
            </div>
          </div>
          <div className="rows">
            {b1mObjectives.map((item, index) => (
              <div className="vehicle-row" key={item}>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Vehicle</p>
            <h2>The airframe around that motor.</h2>
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
          <div className="section-head">
            <div>
              <p className="kicker">Path to flight</p>
              <h2>From design to B1M-01.</h2>
            </div>
          </div>
          <div className="rows">
            {path.map((item, index) => (
              <article className="vehicle-row" key={item.label}>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{item.label}</strong>
                  <span className="path-note">{item.note}</span>
                </div>
                <span className={`status status-${item.status}`}>{item.status}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
