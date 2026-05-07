function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    twinkleDuration: Math.random() * 4 + 2,
    twinkleDelay: Math.random() * 6,
    driftDuration: Math.random() * 40 + 30,
    driftDelay: Math.random() * -30,
    driftX: (Math.random() - 0.5) * 3,
    driftY: (Math.random() - 0.5) * 3,
  }))

  return (
    <div className="stars">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            '--twinkle-duration': `${s.twinkleDuration}s`,
            '--twinkle-delay': `${s.twinkleDelay}s`,
            '--drift-duration': `${s.driftDuration}s`,
            '--drift-delay': `${s.driftDelay}s`,
            '--drift-x': `${s.driftX}vw`,
            '--drift-y': `${s.driftY}vh`,
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div className="page">
      <Stars />
      <div className="content">
        <div className="eyebrow">Est. 2025 — Australia</div>
        <h1>Beyond Stage Zero</h1>
        <div className="divider" />
        <p className="tagline">
          Building Australia's Largest Student Rocket,{' '}
          <span className="mono accent">STRAVOX</span>.
        </p>
        <p className="coming-soon">Full website coming soon</p>
      </div>
      <a className="email" href="mailto:beyondstagezero@gmail.com">
        beyondstagezero@gmail.com
      </a>
    </div>
  )
}
