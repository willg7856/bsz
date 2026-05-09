import { Link } from 'react-router-dom'
import MissionProfile from '../components/MissionProfile'
import RocketSpinner from '../components/RocketSpinner'
import './Stravox.css'

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
  { label: 'Country',         value: 'Australia' },
  { label: 'Team',            value: 'Beyond Stage Zero' },
  { label: 'Status',          value: 'In Development' },
]

const sections = [
  {
    label: 'Split Nosecone',
    info: 'Clamshell design that opens after burnout to expose a 3.5× larger drag area — passively braking the vehicle from Mach 2.5 down to ~64 m/s for the landing sequence.',
  },
  {
    label: 'Avionics + Battery Bay',
    info: 'Flight computer, altimeter, GPS, and recovery electronics. Controls nosecone deployment, drone arm extension, and the full propulsive landing sequence.',
  },
  {
    label: 'Airframe',
    info: '200 mm diameter tube, 2,633 mm total vehicle height. Upper and lower sections joined by a bolted coupler ring. Carries two independent fin sets.',
  },
  {
    label: 'KNSB Motor',
    info: 'Home-ground potassium nitrate / sorbitol propellant in a 1 m grain. Pushes STRAVOX past Mach 2.5 before burnout at approximately 10 km altitude.',
  },
  {
    label: 'Fins',
    info: 'Two fin sets: 520 mm-span base fins for boost-phase stability (ejected before landing) and 340 mm-span upper fins for supersonic control throughout flight.',
  },
  {
    label: 'Landing System',
    info: 'Four T-Motor U13 II motors extend on folding arms at apogee. Deliver 112 kgf of thrust at a 2.05× thrust-to-weight ratio for a controlled vertical touchdown.',
  },
]

export default function Stravox() {
  return (
    <div className="stravox">

      {/* Full-screen hero */}
      <section className="stravox-hero">
        <div className="stravox-hero-inner">
          <p className="eyebrow">The Rocket</p>
          <h1 className="mono">STRAVOX</h1>
          <p className="stravox-hero-sub">
            Australia's largest student-built rocket. A 2,633 mm high-power vehicle
            with a split nosecone airbrake and propulsive vertical landing —
            designed and built entirely by the Beyond Stage Zero team.
          </p>
          <div className="stravox-hero-stats">
            <div className="stravox-hero-stat">
              <span className="mono">2,633 mm</span>
              <span>Height</span>
            </div>
            <div className="stravox-hero-stat">
              <span className="mono">30 km</span>
              <span>Target Apogee</span>
            </div>
            <div className="stravox-hero-stat">
              <span className="mono">Mach 2.5</span>
              <span>Peak Velocity</span>
            </div>
            <div className="stravox-hero-stat">
              <span className="mono">2.05×</span>
              <span>Landing T/W</span>
            </div>
          </div>
        </div>
        <div className="stravox-hero-scroll">
          <span />
        </div>
      </section>

      {/* Model + section breakdown */}
      <div className="stravox-content">
        <div className="stravox-split">
          <div className="stravox-sticky">
            <RocketSpinner className="stravox-model-img" />
          </div>

          <div className="stravox-descriptions">
            {sections.map((s) => (
              <div key={s.label} className="stravox-desc">
                <h3>{s.label}</h3>
                <p>{s.info}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stravox-specs">
          <h2>Specifications</h2>
          <div className="specs-grid">
            {specs.map((s) => (
              <div className="spec-item" key={s.label}>
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <MissionProfile />

        <div className="stravox-cta">
          <h2>Want to know more?</h2>
          <p>We'll be publishing updates on our progress as the build continues. Reach out to stay in the loop.</p>
          <Link className="btn btn-primary" to="/contact">Contact Us</Link>
        </div>
      </div>

    </div>
  )
}
