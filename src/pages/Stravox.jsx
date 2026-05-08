import { Link } from 'react-router-dom'
import './Stravox.css'

const specs = [
  { label: 'Classification', value: 'High Power Rocket' },
  { label: 'Country', value: 'Australia' },
  { label: 'Team', value: 'Beyond Stage Zero' },
  { label: 'Status', value: 'In Development' },
]

export default function Stravox() {
  return (
    <div className="stravox">
      <div className="page-header">
        <p className="eyebrow">The Rocket</p>
        <h1 className="mono">STRAVOX</h1>
        <p className="page-sub">
          Australia's largest student-built rocket, designed and constructed entirely by the Beyond Stage Zero team.
        </p>
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
        <p>We'll be publishing updates on our progress as the build continues. Reach out to us directly to stay in the loop.</p>
        <Link className="btn btn-primary" to="/contact">Contact Us</Link>
      </div>
    </div>
  )
}
