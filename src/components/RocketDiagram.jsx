import { useState, useRef } from 'react'
import './RocketDiagram.css'

export const PARTS = [
  {
    id: 'nose',
    label: 'Nose Cone',
    info: 'Ogive profile optimised for supersonic flight through the upper atmosphere.',
    shape: 'path',
    d: 'M 100,30 C 92,58 72,92 68,150 L 132,150 C 128,92 108,58 100,30 Z',
  },
  {
    id: 'avionics',
    label: 'Avionics Bay',
    info: 'Flight computer, altimeter, GPS, and recovery electronics packed into a compact bay.',
    shape: 'rect',
    x: 68, y: 150, width: 64, height: 65,
  },
  {
    id: 'body',
    label: 'Airframe',
    info: '200 mm diameter airframe — 2.6 m total vehicle height.',
    shape: 'rect',
    x: 68, y: 215, width: 64, height: 190,
  },
  {
    id: 'motor',
    label: 'Motor',
    info: 'High-power solid rocket motor designed to propel STRAVOX to a 30 km apogee.',
    shape: 'rect',
    x: 68, y: 405, width: 64, height: 65,
  },
  {
    id: 'fins',
    label: 'Fins',
    info: 'Trapezoidal fins providing aerodynamic stability through transonic and supersonic regimes.',
    shape: 'path',
    d: 'M 68,388 L 12,472 L 20,510 L 68,466 Z M 132,388 L 188,472 L 180,510 L 132,466 Z',
  },
  {
    id: 'nozzle',
    label: 'Nozzle',
    info: 'Exhaust nozzle converting combustion energy into thrust for the ascent to 30 km.',
    shape: 'path',
    d: 'M 80,470 L 120,470 L 113,524 L 87,524 Z',
  },
]

export default function RocketDiagram({ activePart: externalActive }) {
  const [hovered, setHovered] = useState(null)
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const active = hovered ?? externalActive ?? null
  const activePart = PARTS.find((p) => p.id === active)

  function handleMouseMove(e) {
    const rect = containerRef.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    setTilt({ x: dy * -6, y: dx * 6 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setHovered(null)
  }

  return (
    <div className="rocket-diagram" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <svg
        viewBox="0 0 200 560"
        className="rocket-svg"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s ease' : 'transform 0.08s ease',
        }}
      >
        {/* Centre axis */}
        <line x1="100" y1="30" x2="100" y2="524" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="5,4" />

        {/* Section dividers */}
        <line x1="68" y1="215" x2="132" y2="215" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />
        <line x1="68" y1="405" x2="132" y2="405" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />

        {PARTS.map((part) => {
          const isActive = active === part.id
          const fill = isActive ? 'rgba(232,83,10,0.35)' : 'rgba(255,255,255,0.05)'
          const stroke = isActive ? '#e8530a' : 'rgba(255,255,255,0.18)'
          const props = {
            key: part.id,
            fill,
            stroke,
            strokeWidth: isActive ? 1.5 : 1,
            onMouseEnter: () => setHovered(part.id),
            style: { cursor: 'pointer', transition: 'fill 0.2s, stroke 0.2s, stroke-width 0.2s' },
          }
          return part.shape === 'path'
            ? <path key={part.id} {...props} d={part.d} />
            : <rect key={part.id} {...props} x={part.x} y={part.y} width={part.width} height={part.height} />
        })}
      </svg>

      <div className={`rocket-tooltip ${activePart ? 'visible' : ''}`}>
        {activePart && (
          <>
            <div className="tooltip-label">{activePart.label}</div>
            <div className="tooltip-info">{activePart.info}</div>
          </>
        )}
        {!activePart && (
          <div className="tooltip-hint">Hover over a section</div>
        )}
      </div>
    </div>
  )
}
