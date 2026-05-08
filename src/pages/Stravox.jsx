import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import RocketDiagram, { PARTS } from '../components/RocketDiagram'
import './Stravox.css'

const specs = [
  { label: 'Height', value: '2.6 m', partId: 'body' },
  { label: 'Diameter', value: '200 mm', partId: 'body' },
  { label: 'Target Altitude', value: '30 km', partId: 'motor' },
  { label: 'Classification', value: 'High Power Rocket', partId: null },
  { label: 'Country', value: 'Australia', partId: null },
  { label: 'Team', value: 'Beyond Stage Zero', partId: null },
  { label: 'Status', value: 'In Development', partId: null },
]

function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  const refs = useRef({})

  useEffect(() => {
    const observers = []
    ids.forEach((id) => {
      const el = refs.current[id]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.6 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])

  return { active, refs }
}

export default function Stravox() {
  const partIds = PARTS.map((p) => p.id)
  const { active: scrollActive, refs } = useActiveSection(partIds)

  return (
    <div className="stravox">
      <div className="page-header">
        <p className="eyebrow">The Rocket</p>
        <h1 className="mono">STRAVOX</h1>
        <p className="page-sub">
          Australia's largest student-built rocket, designed and constructed entirely by the Beyond Stage Zero team.
        </p>
      </div>

      <RocketDiagram activePart={scrollActive} />

      <div className="stravox-sections">
        {PARTS.map((part) => (
          <div
            key={part.id}
            className="stravox-section"
            ref={(el) => { refs.current[part.id] = el }}
          >
            <h3>{part.label}</h3>
            <p>{part.info}</p>
          </div>
        ))}
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
