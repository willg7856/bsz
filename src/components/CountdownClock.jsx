const pad = (n) => String(n).padStart(2, '0')

/** "T− 3d 04:12:09" before the moment, "T+ 00:05:31" after. */
export default function CountdownClock({ target, now, held = false, className = 'countdown-clock' }) {
  const diff = target - now
  let s = Math.floor(Math.abs(diff) / 1000)
  const days = Math.floor(s / 86400)
  s -= days * 86400
  const hms = `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`
  return (
    <p className={className} aria-label={`${held ? 'Holding at ' : ''}T ${diff >= 0 ? 'minus' : 'plus'} ${days} days ${hms}`}
      data-held={held || undefined}
    >
      <span className="countdown-t">T{diff >= 0 ? '−' : '+'}</span>
      {days > 0 && (
        <>
          {days}
          <span className="countdown-unit">d</span>
        </>
      )}
      {hms}
    </p>
  )
}
