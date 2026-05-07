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
    driftX: ((Math.random() - 0.5) * 3).toFixed(2),
    driftY: ((Math.random() - 0.5) * 3).toFixed(2),
  }))

  const keyframes = stars
    .map(
      (s) => `
        @keyframes drift-${s.id} {
          from { transform: translate(0, 0); }
          to   { transform: translate(${s.driftX}vw, ${s.driftY}vh); }
        }
      `
    )
    .join('')

  return (
    <>
      <style>{keyframes}</style>
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
              animation: `twinkle ${s.twinkleDuration}s ${s.twinkleDelay}s ease-in-out infinite alternate, drift-${s.id} ${s.driftDuration}s ${s.driftDelay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
    </>
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
