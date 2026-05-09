import { useState, useRef } from 'react'
import './RocketDiagram.css'

// viewBox 0 0 200 600  — rocket occupies y=20..580 (560 px)
// Section boundaries derived from tracing the CAD render
const Y0 = 20   // nose tip
const Y1 = 121  // nose base / avionics top     18%
const Y2 = 194  // avionics base / body top      31%
const Y3 = 356  // body base / motor top         60%
const Y4 = 457  // motor base / fin root top     78%
const Y5 = 541  // fin root base / nozzle top    93%
const Y6 = 580  // nozzle exit

// Body tube width: 52 px  (maps 200 mm / 2600 mm proportionally)
const BL = 74, BR = 126
// Avionics bay max width: 76 px (octagonal wider section from render)
const AL = 62, AR = 138

export const PARTS = [
  {
    id: 'nose',
    label: 'Nose Cone',
    info: 'Ogive profile optimised for supersonic flight through the upper atmosphere.',
    shape: 'path',
    d: `M 100,${Y0} C 96,50 80,90 ${BL},${Y1} L ${BR},${Y1} C 120,90 104,50 100,${Y0} Z`,
  },
  {
    id: 'avionics',
    label: 'Avionics Bay',
    info: 'Flight computer, altimeter, GPS, and recovery electronics packed into a compact bay.',
    shape: 'path',
    // Octagonal wider section — chamfered shoulders top and bottom
    d: `M ${BL},${Y1} L ${AL},${Y1 + 14} L ${AL},${Y2 - 16} L ${BL},${Y2}
        L ${BR},${Y2} L ${AR},${Y2 - 16} L ${AR},${Y1 + 14} L ${BR},${Y1} Z`,
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
    // Swept leading edge from fin-root-top to tip; short tip chord; trailing along body
    d: `M ${BL},${Y4} L 24,${Y4 + 68} L 24,${Y5} L ${BL},${Y5} Z ` +
       `M ${BR},${Y4} L 176,${Y4 + 68} L 176,${Y5} L ${BR},${Y5} Z`,
  },
  {
    id: 'nozzle',
    label: 'Nozzle',
    info: 'Exhaust nozzle converting combustion energy into thrust for the ascent to 30 km.',
    shape: 'path',
    d: `M 88,${Y5} L 112,${Y5} L 108,${Y6} L 92,${Y6} Z`,
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
        viewBox="0 0 200 600"
        className="rocket-svg"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s ease' : 'transform 0.08s ease',
        }}
      >
        {/* Centreline */}
        <line x1="100" y1={Y0} x2="100" y2={Y6}
          stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5,4" />

        {/* Section dividers */}
        <line x1={AL} y1={Y2} x2={AR} y2={Y2}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />
        <line x1={BL} y1={Y3} x2={BR} y2={Y3}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" />

        {PARTS.map((part) => {
          const isActive = active === part.id
          const shapeProps = {
            fill:        isActive ? 'rgba(10,126,255,0.35)' : 'rgba(255,255,255,0.06)',
            stroke:      isActive ? '#0a7eff'              : 'rgba(255,255,255,0.20)',
            strokeWidth: isActive ? 1.5 : 1,
            onMouseEnter: () => handlePartEnter(part.id),
            style: { cursor: 'pointer', transition: 'fill 0.25s, stroke 0.25s' },
          }
          return part.shape === 'path'
            ? <path key={part.id} {...shapeProps} d={part.d} />
            : <rect key={part.id} {...shapeProps} x={part.x} y={part.y} width={part.width} height={part.height} />
        })}
      </svg>
    </div>
  )
}
