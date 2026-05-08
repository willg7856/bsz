import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PARTS } from '../components/RocketDiagram'
import './Stravox.css'

const PART_IMAGE = {
  nose:      '/stravox-nose.png',
  avionics:  '/stravox-avionics.png',
  body:      '/stravox-body.png',
  motor:     '/stravox-motor.png',
  fins:      '/stravox-fins.png',
  nozzle:    '/stravox-nozzle.png',
}

const specs = [
  { label: 'Height',          value: '2.6 m' },
  { label: 'Diameter',        value: '200 mm' },
  { label: 'Target Altitude', value: '30 km' },
  { label: 'Classification',  value: 'High Power Rocket' },
  { label: 'Country',         value: 'Australia' },
  { label: 'Team',            value: 'Beyond Stage Zero' },
  { label: 'Status',          value: 'In Development' },
]

function CrossfadeImage({ src, alt, className }) {
  const [shownSrc, setShownSrc]       = useState(src)
  const [nextSrc, setNextSrc]         = useState(null)
  const [fading, setFading]           = useState(false)
  const timerRef                      = useRef(null)

  useEffect(() => {
    if (src === shownSrc) return
    clearTimeout(timerRef.current)
    setNextSrc(src)
    setFading(true)
    timerRef.current = setTimeout(() => {
      setShownSrc(src)
      setNextSrc(null)
      setFading(false)
    }, 220)
    return () => clearTimeout(timerRef.current)
  }, [src])

  return (
    <div className="crossfade-wrap">
      <img src={shownSrc} alt={alt} className={`${className} ${fading ? 'cf-fade-out' : ''}`} />
      {nextSrc && (
        <img src={nextSrc} alt={alt} className={`${className} cf-fade-in`} />
      )}
    </div>
  )
}

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

  const imgSrc = activePart ? (PART_IMAGE[activePart] ?? '/stravox-render.png') : '/stravox-render.png'

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
          <CrossfadeImage
            src={imgSrc}
            alt="STRAVOX CAD render"
            className="stravox-model-img"
          />
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
