import { useState } from 'react'
import { Link } from 'react-router-dom'
import { flightPhases, stages, stravoxSpecs, systems } from '../data'
import { useTitle } from '../useTitle'

export default function Stravox() {
  useTitle('STRAVOX')
  const [active, setActive] = useState(2)
  const stage = stages[active]

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">The rocket</p>
            <h1>STRAVOX</h1>
            <p className="lede">
              Australia&apos;s first fully and rapidly reusable launch vehicle. A 2,633 mm high-power vehicle with a split nosecone airbrake and propulsive vertical landing.
            </p>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Height</span><span>2,633 mm</span></div>
            <div className="side-row"><span>Target apogee</span><span>30.0 km</span></div>
            <div className="side-row"><span>Peak velocity</span><span>Mach 2.5</span></div>
            <div className="side-row"><span>Landing T/W</span><span>2.05×</span></div>
          </div>
        </div>
      </header>

      <section className="stravox-living" aria-label="Development status">
        <div className="container stravox-living-inner">
          <p className="stravox-living-label">Living design</p>
          <h2 className="stravox-living-title">Full STRAVOX development is extremely dynamic.</h2>
          <p className="stravox-living-body">
            This vehicle changes with every new test and every bit of hardware we produce. Numbers, geometry, and systems on this page are the current working baseline — not a frozen final design.
          </p>
          <p className="stravox-living-body">
            Every figure comes from a simulated or tested subsystem. We update them after every design revision and every ground test.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Mission profile</p>
              <h2>Three phases of a flight.</h2>
            </div>
            <p>Powered ascent, drag-braked descent, and propulsive landing.</p>
          </div>
          <div className="phase-grid">
            {flightPhases.map((phase) => (
              <article className="phase" key={phase.id}>
                <p className="kicker">{phase.label}</p>
                <h3>{phase.title}</h3>
                <p>{phase.body}</p>
                <div className="stat-list">
                  {phase.stats.map(([label, value]) => (
                    <div className="meta-line" key={label}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
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
              <p className="kicker">Technical</p>
              <h2>Specifications.</h2>
            </div>
          </div>
          <dl className="spec-table">
            {stravoxSpecs.map((spec) => (
              <div className="spec-line" key={spec.lbl}>
                <dt>{spec.lbl}</dt>
                <dd>
                  {spec.val} {spec.unit}
                  <span className="note"> — {spec.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Vehicle</p>
              <h2>The stack.</h2>
            </div>
          </div>
          <div className="rows">
            {systems.map((system, index) => (
              <article className="prog-row" key={system.label}>
                <p className="prog-kicker">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3>{system.label}</h3>
                  <p>{system.info}</p>
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
              <p className="kicker">Programme</p>
              <h2>Stages of the build.</h2>
            </div>
            <p>The team is named after this list. Stage Zero is the ground — everything beyond it is what we&apos;re doing.</p>
          </div>
          <div className="stage-nav" role="tablist" aria-label="Build stages">
            {stages.map((item, index) => (
              <button
                key={item.num}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                {item.num}
              </button>
            ))}
          </div>
          <div className="stage-panel" role="tabpanel">
            <div>
              <p className="kicker">{stage.when} · {stage.state}</p>
              <h3>{stage.name}. {stage.headline}</h3>
              <p className="lede">{stage.body}</p>
            </div>
            <div className="meta-stack">
              {stage.readout.map(([label, value]) => (
                <div className="meta-line" key={label}>
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap callout">
          <div>
            <p className="kicker">Stay in the loop</p>
            <h2>Want to know more?</h2>
            <p className="note">We publish updates as the build continues.</p>
          </div>
          <Link className="btn btn-ink" to="/contact">Contact us</Link>
        </div>
      </section>
    </>
  )
}
