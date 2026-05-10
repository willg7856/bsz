import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const TICK = Array.from({ length: 40 })

const stages = [
  { id: 0, num: 'STAGE 00', name: 'Concept', when: '2025-Q1', state: 'done',
    headline: 'From whiteboard to mission spec.',
    body: 'Trade studies across propulsion, airframe, and recovery systems. Settled on a KNSB solid motor, 30 km target apogee, and propulsive vertical landing as the core mission profile.',
    readout: [['Design revs', '8'], ['Trade studies', '4'], ['Sign-off', '2025-04']] },
  { id: 1, num: 'STAGE 01', name: 'Design', when: '2025-Q2', state: 'now',
    headline: 'Full vehicle design underway.',
    body: 'Aerodynamic modelling, structural analysis, and avionics architecture in progress. Defining the split nosecone airbrake geometry and propulsive landing motor placement on folding arms.',
    readout: [['CAD revision', 'Rev 4'], ['Simulations run', '23'], ['CDR target', '2025-Q3']] },
  { id: 2, num: 'STAGE 02', name: 'Fabrication', when: '2025-Q4', state: 'next',
    headline: 'Airframe, fins, and motor casing.',
    body: 'Manufacturing the 200 mm diameter airframe, CNC-cutting both fin sets, and assembling the KNSB motor with a 1 m propellant grain.',
    readout: [['Airframe length', '2,633 mm'], ['Motor grain', '1,000 mm'], ['Status', 'UPCOMING']] },
  { id: 3, num: 'STAGE 03', name: 'Testing', when: '2026-Q1', state: 'next',
    headline: 'Static fire and systems qualification.',
    body: 'Ground static fire of the KNSB motor, landing system deployment tests, avionics integration, and a full vehicle systems review before flight clearance.',
    readout: [['Static fires', '0 / 3'], ['Avionics', 'PENDING'], ['Status', 'UPCOMING']] },
  { id: 4, num: 'STAGE 04', name: 'Launch', when: '2026', state: 'next',
    headline: 'First flight to 30 km apogee.',
    body: 'Vertical propulsive landing demonstration at a CASA-cleared range in Victoria. A full mission — boost, airbrake descent, and controlled touchdown on four landing legs.',
    readout: [['Target apogee', '30 km'], ['Peak velocity', 'Mach 2.5'], ['Status', 'PLANNING']] },
]

const numbers = [
  { lbl: 'Apogee',         val: '30',    unit: 'km',   note: 'Target altitude above sea level.' },
  { lbl: 'Peak velocity',  val: '2.5',   unit: 'Mach', note: 'At motor burnout, ~10 km AGL.' },
  { lbl: 'Length',         val: '2,633', unit: 'mm',   note: 'Full vehicle height, fins included.' },
  { lbl: 'Diameter',       val: '200',   unit: 'mm',   note: 'Airframe outer diameter.' },
  { lbl: 'Landing thrust', val: '112',   unit: 'kgf',  note: 'T-Motor U13 II × 4, combined.' },
  { lbl: 'Landing T/W',    val: '2.05',  unit: '×',    note: 'Thrust-to-weight at touchdown.' },
  { lbl: 'Engine grain',   val: '1,000', unit: 'mm',   note: 'KNSB propellant grain length.' },
  { lbl: 'Launch mass',    val: '54.8',  unit: 'kg',   note: 'Full vehicle mass at liftoff.' },
]

export default function Home() {
  const [selected, setSelected] = useState(1)
  const s = stages[selected]

  return (
    <main className="home">

      {/* ── Dark hero ───────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-grid-bg" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-left">
            <div className="home-hero-eyebrow">
              <span>[ STAGE 01 / DESIGN ]</span>
              <span>·</span>
              <span className="home-hero-live">ACTIVE</span>
            </div>
            <h1 className="home-hero-h1">
              Beyond<br />
              Stage<br />
              <span className="home-hero-accent">Zero.</span>
            </h1>
            <p className="home-hero-sub">
              An Australian student rocketry team designing, building, and flying
              the country's largest student rocket — <span className="mono">STRAVOX</span> — to 30 km apogee.
            </p>
            <div className="home-hero-actions">
              <Link className="btn btn-primary" to="/stravox">Explore the rocket →</Link>
              <Link className="btn btn-ghost-dark" to="/contact">Get involved</Link>
            </div>
          </div>

          <div className="home-hero-spec">
            <div className="home-spec-row">
              <span className="home-spec-lbl">Apogee target</span>
              <span className="home-spec-val accent">30.0 km</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Length</span>
              <span className="home-spec-val">2,633 mm</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Peak velocity</span>
              <span className="home-spec-val">Mach 2.5</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Founded</span>
              <span className="home-spec-val">2025 · Creswick VIC</span>
            </div>
          </div>
        </div>
        <div className="tick-rule home-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Partners ────────────────────────────────── */}
      <section className="section home-partners">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: '2.5rem' }}>Partners &amp; Supporters</p>
          <div className="home-partners-logos">
            <a className="home-partner" href="https://www.crwa.org.au" target="_blank" rel="noopener noreferrer">
              <img src="/partner-crwa.svg" alt="Creswick Railway Workshops Association" />
              <span>Creswick Railway Workshops Association</span>
            </a>
            <a className="home-partner" href="https://ballarattech.school" target="_blank" rel="noopener noreferrer">
              <img src="/partner-bts.svg" alt="Ballarat Tech School" />
              <span>Ballarat Tech School</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Numbers ─────────────────────────────────── */}
      <section className="section home-numbers">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow accent">[ Mission ]</span>
              <h2>Numbers, not vibes.</h2>
            </div>
            <p className="lead">
              Every figure on this page comes from a simulated or tested subsystem.
              We update them after every design revision and every ground test.
            </p>
          </div>
          <div className="spec-grid">
            {numbers.map(c => (
              <div className="spec-cell" key={c.lbl}>
                <div className="lbl">{c.lbl}</div>
                <div className="val">{c.val}<small>{c.unit}</small></div>
                <div className="note">{c.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Build stages ────────────────────────────── */}
      <section className="section" style={{ background: 'var(--paper-200)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">[ Programme ]</span>
              <h2>Stages of the build.</h2>
            </div>
            <p className="lead">
              The team is named after this list. Stage Zero is the ground — everything
              beyond it is what we're doing. Click a stage to read the spec.
            </p>
          </div>
          <div className="stages-row">
            {stages.map((st, i) => {
              const cls = [
                'stage-item',
                st.state === 'done' && i !== selected ? 'done' : '',
                i === selected ? 'now' : '',
                st.state === 'next' && i !== selected ? 'next' : '',
              ].filter(Boolean).join(' ')
              return (
                <div key={st.id} className={cls} onClick={() => setSelected(i)}>
                  <div className="stage-num">{st.num}</div>
                  <div className="stage-name">{st.name}</div>
                  <div className="stage-when">{st.when} · {st.state.toUpperCase()}</div>
                </div>
              )
            })}
          </div>
          <div className="stage-detail">
            <div>
              <span className="eyebrow accent">[ {s.num} / {s.name.toUpperCase()} ]</span>
              <h3>{s.headline}</h3>
              <p>{s.body}</p>
            </div>
            <div className="stage-readout">
              {s.readout.map(([k, v]) => (
                <div className="row" key={k}>
                  <span className="lbl">{k}</span>
                  <span className="val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Rocket preview ──────────────────────────── */}
      <section className="section dark home-rocket">
        <div className="container home-rocket-inner">
          <div className="home-rocket-text">
            <p className="eyebrow" style={{ color: 'var(--ignition-400)' }}>Currently in development</p>
            <h2>STRAVOX</h2>
            <p className="home-rocket-desc">
              A 2,633 mm high-power rocket with a split nosecone airbrake and
              propulsive vertical landing on four folding drone arms. Designed
              and built from scratch by the Beyond Stage Zero team.
            </p>
            <Link className="home-rocket-link" to="/stravox">
              Explore the design →
            </Link>
          </div>
          <div className="home-rocket-img-wrap">
            <img src="/stravox-render.png" alt="STRAVOX rocket render" className="home-rocket-img" />
          </div>
        </div>
      </section>

    </main>
  )
}
