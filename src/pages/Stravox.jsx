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
      <header className="masthead stravox-photo-hero">
        <img className="stravox-photo-hero-img" src="/stravox-workshop.jpg" alt="STRAVOX standing in the Creswick workshop" />
        <div className="stravox-photo-hero-shade" aria-hidden="true" />
        <div className="masthead-inner">
          <div>
            <p className="kicker">The rocket</p>
            <h1>STRAVOX</h1>
            <p className="lede">
              Full STRAVOX is a living design: 2,633 mm, a split nosecone airbrake, and a propulsive landing aimed at 30 km. B1M flies first, at 3 km, to prove the systems.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/b1m">STRAVOX B1M</Link>
              <Link className="btn" to="/contact">Contact us</Link>
            </div>
          </div>
        </div>
        <dl className="shed-hero-specs">
          <div><dt>Height</dt><dd>2,633 mm</dd></div>
          <div><dt>Target apogee</dt><dd>30.0 km</dd></div>
          <div><dt>Peak velocity</dt><dd>Mach 2.5</dd></div>
          <div><dt>Landing T/W</dt><dd>2.05×</dd></div>
        </dl>
      </header>

      <section className="stravox-living" aria-label="Development status">
        <div className="container stravox-living-inner">
          <p className="stravox-living-label">Living design</p>
          <h2 className="stravox-living-title">Full STRAVOX development is extremely dynamic.</h2>
          <p className="stravox-living-body">
            This vehicle changes with every new test and every bit of hardware we produce. Numbers, geometry, and systems on this page are the current working baseline — not a frozen final design.
          </p>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Mission profile</p>
              <h2>Three phases of a flight.</h2>
            </div>
            <p>Powered ascent, drag-braked descent, and propulsive landing.</p>
          </div>
          <div className="phase-grid">
            {flightPhases.map((phase, index) => (
              <article className="phase" key={phase.id}>
                <p className="kicker idx">{String(index + 1).padStart(2, '0')}</p>
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
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker accent">Technical</p>
              <h2>Specifications.</h2>
            </div>
            <p>Every figure on this page comes from a simulated or tested subsystem. We update them after every design revision and every ground test.</p>
          </div>
          <div className="stravox-numbers-grid">
            {stravoxSpecs.map((spec) => (
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
                <p className="prog-kicker idx">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3>{system.label}</h3>
                  <p>{system.info}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stravox-stages">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">Programme</p>
              <h2>Stages of the build.</h2>
            </div>
            <p>The team is named after this list. Stage Zero is the ground — everything beyond it is what we&apos;re doing. Click a stage to read the spec.</p>
          </div>
          <div className="stages-row" role="tablist" aria-label="Build stages">
            {stages.map((item, index) => {
              const selected = index === active
              const tone = selected ? 'now' : item.state === 'done' ? 'done' : ''
              return (
                <button
                  key={item.num}
                  type="button"
                  role="tab"
                  className={`stage-item${tone ? ` ${tone}` : ''}`}
                  aria-selected={selected}
                  onClick={() => setActive(index)}
                >
                  <span className="stage-num">{item.num}</span>
                  <span className="stage-name">{item.name}</span>
                  <span className="stage-when">{item.when} · {item.state}</span>
                </button>
              )
            })}
          </div>
          <div className="stage-detail" role="tabpanel">
            <div>
              <p className="kicker accent">[ {stage.num} / {stage.name} ]</p>
              <h3>{stage.headline}</h3>
              <p>{stage.body}</p>
            </div>
            <div className="stage-readout">
              {stage.readout.map(([label, value]) => (
                <div className="row" key={label}>
                  <span className="lbl">{label}</span>
                  <span className={`val${value === 'Active' ? ' status-active' : ''}`}>{value}</span>
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
