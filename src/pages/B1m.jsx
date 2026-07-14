import { Link } from 'react-router-dom'
import './B1m.css'

const TICK = Array.from({ length: 40 })

const specs = [
  ['Role', 'Sub-scale test vehicle'],
  ['Target apogee', '3 km'],
  ['Motor', 'KNSB B1M — 550 mm × 80 mm'],
  ['Propellant', '~2 kg KNO₃/Sorbitol 65:35'],
  ['Expected thrust', '~150 kgf for 3.5 s'],
  ['Purpose', 'Systems validation for STRAVOX'],
  ['Launch site', 'Victoria, AUS'],
  ['Status', 'In development'],
  ['First flight', 'Q4 2026 – Q1 2027 — B1M-01'],
]

const objectives = [
  'Reach 3 km target apogee',
  'Validate KNSB engine in flight',
  'Avionics and flight computer in real conditions',
  'Recovery system deployment',
  'Collect full flight telemetry',
  'Inform full-scale STRAVOX design',
]

const milestones = [
  { label: 'B1M engine design', status: 'done', note: 'Design complete — 550 mm × 80 mm casing, ~2 kg KNO₃/Sorbitol 65:35.' },
  { label: 'Propellant characterisation', status: 'active', note: 'In progress — refining burn behaviour and propellant performance ahead of B1M static fires.' },
  { label: 'B1M engine build', status: 'active', note: 'In progress — engines in production for ground test and flight.' },
  { label: 'B1M engine static fires', status: 'upcoming', note: 'Ground firing campaign to validate the motor before flight (~150 kgf, 3.5 s burn).' },
  { label: 'Vehicle design & fabrication', status: 'upcoming', note: 'Airframe, fins, and recovery bay sized around the B1M engine.' },
  { label: 'Avionics integration', status: 'upcoming', note: 'Flight computer, altimeter, GPS, and recovery electronics.' },
  { label: 'CASA range clearance', status: 'upcoming', note: 'Regulatory approval for launch at a CASA-cleared site in Victoria.' },
  { label: 'STRAVOX B1M-01 launch', status: 'upcoming', note: 'Target window Q4 2026 – Q1 2027. 3 km apogee. Full flight telemetry. Recover and review.' },
]

export default function B1m() {
  return (
    <main className="b1m">

      <section className="b1m-hero">
        <div className="b1m-hero-grid-bg" aria-hidden="true" />
        <div className="container b1m-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Sub-scale vehicle ]
            </p>
            <h1 className="b1m-hero-h1">STRAVOX<br />B1M.</h1>
            <p className="b1m-hero-sub">
              Our sub-scale test vehicle — built to reach 3 km apogee on a home-built
              KNSB engine and return real flight data before we commit to full-scale
              STRAVOX. What works on B1M goes on STRAVOX.
            </p>
            <div className="b1m-hero-actions">
              <Link className="btn btn-primary" to="/missions">Mission pipeline →</Link>
              <Link className="btn btn-ghost-dark" to="/stravox">Full-scale STRAVOX</Link>
            </div>
          </div>
          <div className="b1m-hero-spec">
            <div className="b1m-spec-row">
              <span className="b1m-spec-lbl">Target apogee</span>
              <span className="b1m-spec-val accent">3.0 km</span>
            </div>
            <div className="b1m-spec-row">
              <span className="b1m-spec-lbl">Thrust</span>
              <span className="b1m-spec-val">~150 kgf</span>
            </div>
            <div className="b1m-spec-row">
              <span className="b1m-spec-lbl">Burn time</span>
              <span className="b1m-spec-val">3.5 s</span>
            </div>
            <div className="b1m-spec-row">
              <span className="b1m-spec-lbl">First flight</span>
              <span className="b1m-spec-val">Q4'26–Q1'27</span>
            </div>
          </div>
        </div>
        <div className="tick-rule b1m-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why B1M</p>
              <h2>Prove it at 3 km first.</h2>
            </div>
            <p className="lead">
              Flying B1M lets us validate avionics, recovery, and vehicle systems at
              a scale that avoids the regulatory complexity and risk of a 30 km flight.
              It is the bridge between ground test and full-scale STRAVOX.
            </p>
          </div>

          <div className="b1m-body">
            <div className="b1m-objectives">
              <p className="b1m-label">Flight objectives</p>
              {objectives.map((obj) => (
                <div key={obj} className="b1m-obj-row">
                  <span className="b1m-obj-icon">○</span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
            <div className="b1m-specs">
              {specs.map(([k, v]) => (
                <div key={k} className="b1m-detail-row">
                  <span className="b1m-detail-lbl">{k}</span>
                  <span className="b1m-detail-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '2.5rem' }}>
            Path to first flight
          </p>
          <div className="b1m-milestones">
            {milestones.map((ms, idx) => (
              <div key={ms.label} className={`b1m-milestone b1m-milestone--${ms.status}`}>
                <div className="b1m-milestone-marker">
                  <span className="b1m-milestone-dot" />
                  {idx < milestones.length - 1 && <span className="b1m-milestone-line" />}
                </div>
                <div className="b1m-milestone-content">
                  <div className="b1m-milestone-head">
                    <span className="b1m-milestone-name">{ms.label}</span>
                    <span className="b1m-milestone-tag">{ms.status}</span>
                  </div>
                  <p className="b1m-milestone-note">{ms.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
