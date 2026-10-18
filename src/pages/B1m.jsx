import { Link } from 'react-router-dom'
import { b1mMilestones, b1mObjectives, b1mSpecs } from '../data'
import { useTitle } from '../useTitle'

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
            <div className="side-row"><span>Thrust</span><span>~150 kgf</span></div>
            <div className="side-row"><span>Burn time</span><span>3.5 s</span></div>
            <div className="side-row"><span>First flight</span><span>Q4&apos;26–Q1&apos;27</span></div>
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
            {b1mSpecs.map(([label, value]) => (
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
              <p className="kicker">Path to first flight</p>
              <h2>From drawing to launch.</h2>
            </div>
          </div>
          <div>
            {b1mMilestones.map((item, index) => (
              <div className={`milestone status-${item.status}`} key={item.label}>
                <div className="milestone-rail">
                  <span className="dot" />
                  {index < b1mMilestones.length - 1 ? <span className="rail" /> : null}
                </div>
                <div className="milestone-body">
                  <div className="milestone-head">
                    <strong>{item.label}</strong>
                    <span className={`status status-${item.status}`}>{item.status}</span>
                  </div>
                  <p className="note">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
