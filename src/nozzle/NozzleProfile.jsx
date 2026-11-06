// Half-section drawing of the measured bore, inlet on the left, exit on the right.
// Values are in mm (already scaled from the file's units).
export default function NozzleProfile({ profile, length, throatPosition, values, flipped }) {
  if (!profile?.length) return null
  const pts = flipped ? profile.map((p) => ({ ...p, z: length - p.z })).sort((a, b) => a.z - b.z) : profile
  const tz = flipped ? length - throatPosition : throatPosition
  const rMax = Math.max(...pts.map((p) => p.rOut))
  const W = 640
  const pad = 28
  const sx = (W - 2 * pad) / length
  const H = Math.max(160, Math.min(360, 2 * rMax * sx + 2 * pad))
  const s = Math.min(sx, (H - 2 * pad) / (2 * rMax))
  const x = (z) => pad + z * s + ((W - 2 * pad) - length * s) / 2
  const y = (r) => H / 2 - r * s

  const wall = (sign) => {
    const outer = pts.map((p) => `${x(p.z)},${y(sign * p.rOut)}`)
    const inner = pts.slice().reverse().map((p) => `${x(p.z)},${y(sign * p.rIn)}`)
    return [...outer, ...inner].join(' ')
  }
  const bore = (sign) => pts.map((p) => `${x(p.z)},${y(sign * p.rIn)}`).join(' ')
  const last = pts.at(-1)
  const first = pts[0]

  return (
    <figure className="nozzle-profile">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Cross-section of the measured nozzle bore">
        <line className="axis" x1={pad / 2} x2={W - pad / 2} y1={H / 2} y2={H / 2} />
        <polygon className="wall" points={wall(1)} />
        <polygon className="wall" points={wall(-1)} />
        <polyline className="bore" points={bore(1)} />
        <polyline className="bore" points={bore(-1)} />
        <line className="dim" x1={x(tz)} x2={x(tz)} y1={y(values.throat / 2)} y2={y(-values.throat / 2)} />
        <line className="dim" x1={x(last.z)} x2={x(last.z)} y1={y(values.exit / 2)} y2={y(-values.exit / 2)} />
        <text x={x(tz)} y={y(-rMax) + 14} textAnchor="middle">Throat</text>
        <text x={x(last.z) - 4} y={y(-rMax) + 14} textAnchor="end">Exit</text>
        <text x={x(first.z) + 4} y={y(-rMax) + 14}>Inlet</text>
      </svg>
      <figcaption>Measured cross-section. The orange lines show the throat and exit diameters in the form.</figcaption>
    </figure>
  )
}
