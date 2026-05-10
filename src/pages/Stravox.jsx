import { useState } from 'react'
import { Link } from 'react-router-dom'
import MissionProfile from '../components/MissionProfile'
import './Stravox.css'
import './Home.css'

const TICK = Array.from({ length: 40 })

const specs = [
  { label: 'Height',          value: '2,633 mm' },
  { label: 'Diameter',        value: '200 mm' },
  { label: 'Base Fin Span',   value: '520 mm' },
  { label: 'Upper Fin Span',  value: '340 mm' },
  { label: 'Target Altitude', value: '30 km' },
  { label: 'Max Velocity',    value: 'Mach 2.5' },
  { label: 'Motor',           value: 'KNSB — 1 m grain' },
  { label: 'Landing Motors',  value: 'T-Motor U13 II × 4' },
  { label: 'Landing T/W',     value: '2.05×' },
  { label: 'Status',          value: 'In Development' },
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

const sections = [
  { label: 'Split Nosecone', info: 'Clamshell design that opens after burnout to expose a 3.5× larger drag area — passively braking the vehicle from Mach 2.5 down to ~64 m/s for the landing sequence.' },
  { label: 'Avionics + Battery Bay', info: 'Flight computer, altimeter, GPS, and recovery electronics. Controls nosecone deployment, drone arm extension, and the full propulsive landing sequence.' },
  { label: 'Airframe', info: '200 mm diameter tube, 2,633 mm total vehicle height. Upper and lower sections joined by a bolted coupler ring. Carries two independent fin sets.' },
  { label: 'KNSB Motor', info: 'Home-ground potassium nitrate / sorbitol propellant in a 1 m grain. Pushes STRAVOX past Mach 2.5 before burnout at approximately 10 km altitude.' },
  { label: 'Fins', info: 'Two fin sets: 520 mm-span base fins for boost-phase stability and 340 mm-span upper fins for supersonic control throughout flight.' },
  { label: 'Landing System', info: 'Four T-Motor U13 II motors extend on folding arms at apogee. Deliver 112 kgf of thrust at a 2.05× thrust-to-weight ratio for a controlled vertical touchdown.' },
]

export default function Stravox() {
  const [selected, setSelected] = useState(1)
  const s = stages[selected]

  return (
    <main className="stravox">

      {/* ── Dark hero ───────────────────────────────── */}
      <section className="stravox-hero">
        <div className="stravox-hero-grid-bg" aria-hidden="true" />
        <div className="container stravox-hero-inner">
          <div className="stravox-hero-left">
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>The Rocket</p>
            <h1 className="stravox-hero-h1">STRAVOX</h1>
            <p className="stravox-hero-sub">
              Australia's largest student-built rocket. A 2,633 mm high-power vehicle
              with a split nosecone airbrake and propulsive vertical landing.
            </p>
          </div>
          <div className="stravox-hero-spec">
            <div className="home-spec-row">
              <span className="home-spec-lbl">Height</span>
              <span className="home-spec-val">2,633 mm</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Target apogee</span>
              <span className="home-spec-val accent">30.0 km</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Peak velocity</span>
              <span className="home-spec-val">Mach 2.5</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Landing T/W</span>
              <span className="home-spec-val">2.05×</span>
            </div>
          </div>
        </div>
        <div className="tick-rule stravox-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Sections breakdown ──────────────────────── */}
      <section className="section stravox-breakdown">
        <div className="container stravox-split">
          <div className="stravox-img-col">
            <img src="/stravox-render.png" alt="STRAVOX render" className="stravox-model-img" />
          </div>
          <div className="stravox-descriptions">
            {sections.map((s, i) => (
              <div key={s.label} className="stravox-desc">
                <span className="stravox-desc-num mono">0{i + 1}</span>
                <h3>{s.label}</h3>
                <p>{s.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specs ───────────────────────────────────── */}
      <section className="section stravox-specs-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow accent">[ Technical ]</span>
              <h2>Specifications</h2>
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
          <div className="stravox-specs-grid" style={{ marginTop: '2px' }}>
            {specs.map((s) => (
              <div className="stravox-spec-cell" key={s.label}>
                <span className="stravox-spec-lbl">{s.label}</span>
                <span className="stravox-spec-val mono">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Build stages ─────────────────────────────── */}
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

      {/* ── Mission profile ──────────────────────────── */}
      <MissionProfile />

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="section stravox-cta-section">
        <div className="container stravox-cta-inner">
          <div>
            <p className="eyebrow">Stay in the loop</p>
            <h2>Want to know more?</h2>
            <p className="lead" style={{ marginTop: '16px' }}>
              We publish updates as the build continues. Reach out to follow the journey.
            </p>
          </div>
          <Link className="btn btn-primary" to="/contact">Contact Us →</Link>
        </div>
      </section>

    </main>
  )
}
