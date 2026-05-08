import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import RocketDiagram, { PARTS } from '../components/RocketDiagram'
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

export default function Stravox() {
  const [activePart, setActivePart] = useState(null)
  const sectionRefs = useRef({})

  useEffect(() => {
    const observers = []
    PARTS.forEach((part) => {
      const el = sectionRefs.current[part.id]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActivePart(part.id) },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="stravox">
      <div className="page-header">
        <p className="eyebrow">The Rocket</p>
        <h1 className="mono">STRAVOX</h1>
        <p className="page-sub">
          Australia's largest student-built rocket, designed and constructed entirely by the Beyond Stage Zero team.
        </p>
      </div>

      <div className="stravox-split">
        <div className="stravox-sticky">
          <RocketDiagram activePart={activePart} onHover={setActivePart} />
        </div>

        <div className="stravox-descriptions">
          {PARTS.map((part) => (
            <div
              key={part.id}
              className={`stravox-desc ${activePart === part.id ? 'active' : ''}`}
              ref={(el) => { sectionRefs.current[part.id] = el }}
            >
              <h3>{part.label}</h3>
              <p>{part.info}</p>
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
