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
              The pipe from the pad — and later the vehicle — into Goods Shed mission control. It moves data. It is not the flight computer.
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <p className="kicker">Data path</p>
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

      <section className="section">
        <div className="wrap split">
          <blockquote className="quote">
            <p>Octopus is the connection. Flight control stays somewhere else.</p>
          </blockquote>
          <div>
            <p className="copy">
              Static fires and launches only help if someone in the shed can see what happened as it happens. Octopus is the custom link that carries that stream — first from pad instruments, later from the vehicle.
            </p>
            <div className="actions">
              <Link className="btn" to="/tests">Engine tests</Link>
              <Link className="btn" to="/b1m">B1M vehicle</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">What gets built</p>
              <h2>The hops.</h2>
            </div>
          </div>
          <div className="rows">
            {octopusHops.map((hop) => (
              <article className="prog-row" key={hop.from + hop.to}>
                <p className="prog-kicker">{hop.from} → {hop.to}</p>
                <div>
                  <p>{hop.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Status</p>
              <h2>Programme milestones.</h2>
            </div>
          </div>
          <div>
            {octopusMilestones.map((item, index) => (
              <div className={`milestone status-${item.status}`} key={item.label}>
                <div className="milestone-rail">
                  <span className="dot" />
                  {index < octopusMilestones.length - 1 ? <span className="rail" /> : null}
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
