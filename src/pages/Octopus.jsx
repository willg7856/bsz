import { Link } from 'react-router-dom'
import './Octopus.css'

const hops = [
  {
    from: 'Pad',
    to: 'Octopus',
    desc: 'Instruments and range data leave the pad during static fires and launches.',
  },
  {
    from: 'Octopus',
    to: 'Goods Shed',
    desc: 'The link delivers that stream into mission control so the team can watch the burn live.',
  },
  {
    from: 'Vehicle',
    to: 'Goods Shed',
    desc: 'Same pipe, later — telemetry from the rocket into the shed on flight days.',
  },
]

export default function Octopus() {
  return (
    <main className="octopus">

      <section className="octopus-hero">
        <div className="container octopus-hero-inner">
          <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Data link</p>
          <h1 className="octopus-hero-h1">Octopus</h1>
          <p className="octopus-hero-sub">
            The pipe from the pad — and later the vehicle — into Goods Shed
            mission control. It moves data. It is not the flight computer.
          </p>
        </div>

        <div className="octopus-flow" aria-label="Data path">
          <div className="container octopus-flow-inner">
            <div className="octopus-flow-node">
              <span className="octopus-flow-label">Pad</span>
              <span className="octopus-flow-hint">Range / stand</span>
            </div>
            <span className="octopus-flow-arrow" aria-hidden="true" />
            <div className="octopus-flow-node octopus-flow-node--core">
              <span className="octopus-flow-label">Octopus</span>
              <span className="octopus-flow-hint">Link layer</span>
            </div>
            <span className="octopus-flow-arrow" aria-hidden="true" />
            <div className="octopus-flow-node">
              <span className="octopus-flow-label">Goods Shed</span>
              <span className="octopus-flow-hint">Mission control</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section octopus-clarify">
        <div className="container octopus-clarify-inner">
          <blockquote className="octopus-quote">
            <p>Octopus is the connection. Flight control stays somewhere else.</p>
          </blockquote>
          <div className="octopus-clarify-copy">
            <p>
              Static fires and launches only help if someone in the shed can see
              what happened as it happens. Octopus is the custom link that carries
              that stream — first from pad instruments, later from the vehicle.
            </p>
            <div className="octopus-clarify-actions">
              <Link className="btn btn-outline" to="/tests">Engine tests →</Link>
              <Link className="btn btn-outline" to="/b1m">B1M vehicle</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark octopus-hops">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '2.5rem' }}>
            What gets built
          </p>
          <div className="octopus-hop-list">
            {hops.map((h, i) => (
              <article className="octopus-hop" key={h.from + h.to}>
                <span className="octopus-hop-index mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="octopus-hop-path">
                  <span>{h.from}</span>
                  <span className="octopus-hop-sep" aria-hidden="true">→</span>
                  <span>{h.to}</span>
                </div>
                <p>{h.desc}</p>
              </article>
            ))}
          </div>
          <p className="octopus-hops-foot mono">
            First use · B1M-01 static fires &amp; launch support · Q4 2026 – Q1 2027
          </p>
        </div>
      </section>

    </main>
  )
}
