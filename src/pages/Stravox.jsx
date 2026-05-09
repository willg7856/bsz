import { Link } from 'react-router-dom'
import Stars from '../components/Stars'
import './Stravox.css'

const specs = [
  { label: 'Height',          value: '2.6 m' },
  { label: 'Diameter',        value: '200 mm' },
  { label: 'Target Altitude', value: '30 km' },
  { label: 'Classification',  value: 'High Power Rocket' },
  { label: 'Country',         value: 'Australia' },
  { label: 'Team',            value: 'Beyond Stage Zero' },
  { label: 'Status',          value: 'In Development' },
]

const sections = [
  { label: 'Nose Cone',    info: 'Ogive profile optimised for supersonic flight through the upper atmosphere.' },
  { label: 'Avionics Bay', info: 'Flight computer, altimeter, GPS, and recovery electronics packed into a compact bay.' },
  { label: 'Airframe',     info: '200 mm diameter airframe — 2.6 m total vehicle height.' },
  { label: 'Motor',        info: 'High-power solid rocket motor designed to propel STRAVOX to a 30 km apogee.' },
  { label: 'Fins',         info: 'Trapezoidal fins providing aerodynamic stability through transonic and supersonic regimes.' },
  { label: 'Nozzle',       info: 'Exhaust nozzle converting combustion energy into thrust for the ascent to 30 km.' },
]

export default function Stravox() {
  return (
    <div className="stravox">
      <Stars />
      <div className="page-header">
        <p className="eyebrow">The Rocket</p>
        <h1 className="mono">STRAVOX</h1>
        <p className="page-sub">
          Australia's largest student-built rocket, designed and constructed entirely by the Beyond Stage Zero team.
        </p>
      </div>

      <div className="stravox-split">
        <div className="stravox-sticky">
          <img src="/stravox-render.png" alt="STRAVOX CAD render" className="stravox-model-img" />
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

      <div className="stravox-cta">
        <h2>Want to know more?</h2>
        <p>We'll be publishing updates on our progress as the build continues. Reach out to stay in the loop.</p>
        <Link className="btn btn-primary" to="/contact">Contact Us</Link>
      </div>
    </div>
  )
}
