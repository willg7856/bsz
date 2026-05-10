import { Link } from 'react-router-dom'
import MissionProfile from '../components/MissionProfile'
import './Stravox.css'

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

const sections = [
  { label: 'Split Nosecone', info: 'Clamshell design that opens after burnout to expose a 3.5× larger drag area — passively braking the vehicle from Mach 2.5 down to ~64 m/s for the landing sequence.' },
  { label: 'Avionics + Battery Bay', info: 'Flight computer, altimeter, GPS, and recovery electronics. Controls nosecone deployment, drone arm extension, and the full propulsive landing sequence.' },
  { label: 'Airframe', info: '200 mm diameter tube, 2,633 mm total vehicle height. Upper and lower sections joined by a bolted coupler ring. Carries two independent fin sets.' },
  { label: 'KNSB Motor', info: 'Home-ground potassium nitrate / sorbitol propellant in a 1 m grain. Pushes STRAVOX past Mach 2.5 before burnout at approximately 10 km altitude.' },
  { label: 'Fins', info: 'Two fin sets: 520 mm-span base fins for boost-phase stability and 340 mm-span upper fins for supersonic control throughout flight.' },
  { label: 'Landing System', info: 'Four T-Motor U13 II motors extend on folding arms at apogee. Deliver 112 kgf of thrust at a 2.05× thrust-to-weight ratio for a controlled vertical touchdown.' },
]

export default function Stravox() {
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
      <section className="section dark stravox-specs-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Technical</p>
              <h2>Specifications</h2>
            </div>
          </div>
          <div className="stravox-specs-grid">
            {specs.map((s) => (
              <div className="stravox-spec-cell" key={s.label}>
                <span className="stravox-spec-lbl">{s.label}</span>
                <span className="stravox-spec-val mono">{s.value}</span>
              </div>
            ))}
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
