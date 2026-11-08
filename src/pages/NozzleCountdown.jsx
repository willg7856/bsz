import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NewsletterSignup from '../components/NewsletterSignup'
import { NOZZLE_ORDER, formatOpensAt } from '../nozzle/order'
import { useTitle } from '../useTitle'
import './NozzleCountdown.css'

const OPENS_AT = new Date(NOZZLE_ORDER.opensAt).getTime()

function partsUntil(now) {
  const left = Math.max(0, Math.floor((OPENS_AT - now) / 1000))
  return {
    done: left === 0,
    units: [
      ['Days', Math.floor(left / 86400)],
      ['Hrs', Math.floor((left % 86400) / 3600)],
      ['Min', Math.floor((left % 3600) / 60)],
      ['Sec', left % 60],
    ],
  }
}

const pad = (n) => String(n).padStart(2, '0')

// Shown at /nozzles/preorder while NOZZLE_ORDER.open is false.
export default function NozzleCountdown() {
  useTitle('Ceramic nozzle pre-orders open soon')
  const [now, setNow] = useState(() => Date.now())
  const { done, units } = partsUntil(now)

  useEffect(() => {
    if (done) return undefined
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [done])

  const opens = formatOpensAt({ day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="countdown-page">
      <section className="countdown-hero">
        <div className="countdown-grid-bg" aria-hidden="true" />
        <div className="container countdown-inner">
          <p className="countdown-kicker">[ Ceramic nozzles ]</p>
          <h1 className="countdown-title">{done ? 'Pre-orders opening shortly.' : 'Pre-orders open soon.'}</h1>
          <p className="countdown-sub">
            Custom nozzles, cast in ceramic to your design. Pre-orders open {opens}.
          </p>

          <div className="countdown-clock" role="timer" aria-label={done ? 'Pre-orders are opening shortly' : `Time until pre-orders open: ${units.map(([l, v]) => `${v} ${l}`).join(', ')}`}>
            <span className="countdown-t" aria-hidden="true">T−</span>
            {units.map(([label, value], index) => (
              <Fragment key={label}>
                {index > 0 ? <span className="countdown-sep" aria-hidden="true">:</span> : null}
                <div className="countdown-unit" aria-hidden="true">
                  <span className="countdown-val">{pad(value)}</span>
                  <span className="countdown-lbl">{label}</span>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="countdown-actions">
            <Link className="btn btn-primary" to="/nozzles">About the nozzles</Link>
            <Link className="btn countdown-btn-ghost" to="/nozzles/research">Read the research</Link>
          </div>
        </div>
      </section>

      <section className="countdown-signup">
        <div className="container">
          <NewsletterSignup
            id="countdown-signup"
            title="Get an email when pre-orders open."
            sub="We'll also send major programme updates. Unsubscribe any time."
          />
        </div>
      </section>
    </div>
  )
}
