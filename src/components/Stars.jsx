export const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.5 + 0.5,
  twinkleDuration: Math.random() * 4 + 2,
  twinkleDelay: Math.random() * 6,
  driftDuration: Math.random() * 30 + 20,
  driftDelay: -(Math.random() * 20),
  driftX: ((Math.random() - 0.5) * 8).toFixed(2),
  driftY: ((Math.random() - 0.5) * 8).toFixed(2),
}))

const KEYFRAMES = STARS.map(
  (s) =>
    `@keyframes drift-${s.id} {
      from { transform: translate(0, 0); }
      to   { transform: translate(${s.driftX}vw, ${s.driftY}vh); }
    }`
).join('\n')

export default function Stars() {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="stars">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `twinkle ${s.twinkleDuration}s ${s.twinkleDelay}s ease-in-out infinite alternate, drift-${s.id} ${s.driftDuration}s ${s.driftDelay}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
    </>
  )
}
