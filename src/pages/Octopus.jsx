import { Link } from 'react-router-dom'
import { octopusHops, octopusMilestones } from '../data'
import { useTitle } from '../useTitle'

export default function Octopus() {
  useTitle('Octopus')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Data link</p>
            <h1>Octopus.</h1>
            <p className="lede">
              The pipe from the pad — and later the vehicle — into Goods Shed mission control. The pad link is in progress. The vehicle link comes later. It moves data. It is not the flight computer.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/tests">Engine tests</Link>
              <Link className="btn" to="/b1m">B1M vehicle</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Pad link</span><span>In progress</span></div>
            <div className="side-row"><span>Vehicle link</span><span>Later</span></div>
            <div className="side-row"><span>First use</span><span>B1M-01</span></div>
            <div className="side-row"><span>Role</span><span>Not the flight computer</span></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Data path</p>
          <h2>Pad, then the shed.</h2>
          <div className="flow" aria-label="Data path">
            <div className="flow-node">
              <strong>Pad</strong>
              <span className="partner-role">Range / stand</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">→</span>
            <div className="flow-node">
              <strong>Octopus</strong>
              <span className="partner-role">Link layer</span>
            </div>
            <span className="flow-arrow" aria-hidden="true">→</span>
            <div className="flow-node">
              <strong>Goods Shed</strong>
              <span className="partner-role">Mission control</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">What gets built</p>
              <h2>The hops.</h2>
            </div>
            <p>Static fires and launches only help if someone in the shed can see what happened as it happens.</p>
          </div>
          <div className="phase-grid">
            {octopusHops.map((hop, index) => (
              <article className="phase" key={hop.from + hop.to}>
                <p className="kicker idx">{String(index + 1).padStart(2, '0')}</p>
                <h3>{hop.from} → {hop.to}</h3>
                <p>{hop.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Path</p>
              <h2>Programme milestones.</h2>
            </div>
          </div>
          <div className="rows">
            {octopusMilestones.map((item, index) => (
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
