import { useState, useRef } from 'react'
import './RocketDiagram.css'

// Y boundaries (viewBox 0 0 200 580, rocket y=22..558)
// Proportions from actual STRAVOX STL section analysis
// nose 0-12%, avionics 12-30%, body 30-60%, motor 60-78%, fins 78-93%, nozzle 93-100%
const Y0 = 22   // nose tip
const Y1 = 88   // nose base / avionics top     (12%)
const Y2 = 183  // avionics base / body top      (30%)
const Y3 = 344  // body base / motor top         (60%)
const Y4 = 440  // motor base / fins zone top    (78%)
const Y5 = 520  // fins base / nozzle top        (93%)
const Y6 = 558  // nozzle exit                   (100%)

// Body: 28px wide (matches 200mm/2600mm aspect ratio), centred at x=100
const BL = 86   // body left
const BR = 114  // body right
// Avionics bay: 2px wider each side (slight shoulder)
const AL = 84
const AR = 116

export const PARTS = [
  {
    id: 'nose',
    label: 'Nose Cone',
    info: 'Ogive profile optimised for supersonic flight through the upper atmosphere.',
    shape: 'path',
    d: `M 100,${Y0} C 96,38 87,64 ${BL},${Y1} L ${BR},${Y1} C 113,64 104,38 100,${Y0} Z`,
  },
  {
    id: 'avionics',
    label: 'Avionics Bay',
    info: 'Flight computer, altimeter, GPS, and recovery electronics packed into a compact bay.',
    shape: 'rect',
    x: AL, y: Y1, width: AR - AL, height: Y2 - Y1,
  },
  {
    id: 'body',
    label: 'Airframe',
    info: '200 mm diameter airframe — 2.6 m total vehicle height.',
    shape: 'rect',
    x: BL, y: Y2, width: BR - BL, height: Y3 - Y2,
  },
  {
    id: 'motor',
    label: 'Motor',
    info: 'High-power solid rocket motor designed to propel STRAVOX to a 30 km apogee.',
    shape: 'rect',
    x: BL, y: Y3, width: BR - BL, height: Y4 - Y3,
  },
  {
    id: 'fins',
    label: 'Fins',
    info: 'Trapezoidal fins providing aerodynamic stability through transonic and supersonic regimes.',
    shape: 'path',
    // Swept leading edge, root along body from Y3+some to Y5, tip extends ~55px each side
    d: `M ${BL},${Y3 + 20} L 46,${Y5 - 14} L 46,${Y5} L ${BL},${Y5} Z ` +
       `M ${BR},${Y3 + 20} L 154,${Y5 - 14} L 154,${Y5} L ${BR},${Y5} Z`,
  },
  {
    id: 'nozzle',
    label: 'Nozzle',
    info: 'Exhaust nozzle converting combustion energy into thrust for the ascent to 30 km.',
    shape: 'path',
    d: `M 91,${Y5} L 109,${Y5} L 105,${Y6} L 95,${Y6} Z`,
  },
]

export default function RocketDiagram({ activePart: externalActive, onHover }) {
  const [hovered, setHovered]   = useState(null)
  const containerRef            = useRef(null)
  const [tilt, setTilt]         = useState({ x: 0, y: 0 })

  const active = hovered ?? externalActive ?? null

  function handleMouseMove(e) {
    const rect = containerRef.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
    setTilt({ x: dy * -6, y: dx * 6 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setHovered(null)
    onHover?.(null)
  }

  function handlePartEnter(id) {
    setHovered(id)
    onHover?.(id)
  }

  return (
    <div className="rocket-diagram" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <svg
        viewBox="0 0 200 580"
        className="rocket-svg"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s ease' : 'transform 0.08s ease',
        }}
      >
        {/* Centreline */}
        <line x1="100" y1={Y0} x2="100" y2={Y6} stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="5,4" />
        {/* Section dividers */}
        <line x1={AL} y1={Y2} x2={AR} y2={Y2} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />
        <line x1={BL} y1={Y3} x2={BR} y2={Y3} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />

        {PARTS.map((part) => {
          const isActive = active === part.id
          const props = {
            key: part.id,
            fill:        isActive ? 'rgba(232,83,10,0.35)' : 'rgba(255,255,255,0.06)',
            stroke:      isActive ? '#e8530a'              : 'rgba(255,255,255,0.20)',
            strokeWidth: isActive ? 1.5 : 1,
            onMouseEnter: () => handlePartEnter(part.id),
            style: { cursor: 'pointer', transition: 'fill 0.25s, stroke 0.25s' },
          }
          return part.shape === 'path'
            ? <path key={part.id} {...props} d={part.d} />
            : <rect key={part.id} {...props} x={part.x} y={part.y} width={part.width} height={part.height} />
        })}
      </svg>
    </div>
  )
}
