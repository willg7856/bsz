import { Link } from 'react-router-dom'
import './Octopus.css'

const TICK = Array.from({ length: 40 })

const goals = [
  {
    index: '01',
    title: 'Pad to Goods Shed',
    desc: 'Get live data off the pad during static fires and launches, and deliver it to mission control in the Goods Shed.',
  },
  {
    index: '02',
    title: 'Mission control link',
    desc: 'A reliable connection between the range and the Goods Shed so the team can watch burns and flights as they happen.',
  },
  {
    index: '03',
    title: 'Vehicle to MC',
    desc: 'Extend the same link for vehicle-to-mission-control data — telemetry from the rocket into the Goods Shed.',
  },
  {
    index: '04',
    title: 'Not the flight computer',
    desc: 'Octopus moves data. Flight control and onboard decision-making stay on separate systems — Octopus is the pipe, not the brain.',
  },
]

const milestones = [
  { label: 'Link architecture', status: 'active', note: 'Defining how Octopus carries pad and vehicle data into Goods Shed mission control.' },
  { label: 'Pad data path', status: 'active', note: 'Building the connection used during static fires and launches — pad instruments into the Goods Shed.' },
  { label: 'Goods Shed ops', status: 'upcoming', note: 'Mission control side of the link — receiving, displaying, and logging live range data.' },
  { label: 'Vehicle telemetry path', status: 'upcoming', note: 'Extend Octopus for vehicle-to-mission-control data on flight days.' },
  { label: 'B1M range use', status: 'upcoming', note: 'Run Octopus for STRAVOX B1M-01 static fires and launch support in the Q4 2026 – Q1 2027 window.' },
]

export default function Octopus() {
  return (
    <main className="octopus">

      <section className="octopus-hero">
        <div className="octopus-hero-grid-bg" aria-hidden="true" />
        <div className="container octopus-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Data link programme ]
            </p>
            <h1 className="octopus-hero-h1">Octopus.</h1>
            <p className="octopus-hero-sub">
              The connection that moves data from the pad — and later the vehicle —
              into Goods Shed mission control during static fires and launches.
              Not our flight computer.
            </p>
            <div className="octopus-hero-actions">
              <Link className="btn btn-primary" to="/tests">Engine tests →</Link>
              <Link className="btn btn-ghost-dark" to="/b1m">B1M vehicle</Link>
            </div>
          </div>
          <div className="octopus-hero-stat-row">
            <div className="octopus-hero-stat">
              <span className="octopus-hero-stat-val">ACTIVE</span>
              <span className="octopus-hero-stat-lbl">Programme status</span>
            </div>
            <div className="octopus-hero-stat">
              <span className="octopus-hero-stat-val">Pad → MC</span>
              <span className="octopus-hero-stat-lbl">Primary path</span>
            </div>
            <div className="octopus-hero-stat">
              <span className="octopus-hero-stat-val">Goods Shed</span>
              <span className="octopus-hero-stat-lbl">Mission control</span>
            </div>
          </div>
        </div>
        <div className="tick-rule octopus-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why Octopus</p>
              <h2>Data into the shed.</h2>
            </div>
            <p className="lead">
              Static fires and launches only help if the team can see what happened
              in real time. Octopus is the custom link that gets pad data — and,
              later, vehicle data — from the range into Goods Shed mission control.
              It is a connection layer, not the flight computer.
            </p>
          </div>

          <div className="octopus-goals">
            {goals.map((g) => (
              <div className="octopus-goal" key={g.index}>
                <span className="octopus-goal-index mono">{g.index}</span>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '2.5rem' }}>
            Programme milestones
          </p>
          <div className="octopus-milestones">
            {milestones.map((ms, idx) => (
              <div key={ms.label} className={`octopus-milestone octopus-milestone--${ms.status}`}>
                <div className="octopus-milestone-marker">
                  <span className="octopus-milestone-dot" />
                  {idx < milestones.length - 1 && <span className="octopus-milestone-line" />}
                </div>
                <div className="octopus-milestone-content">
                  <div className="octopus-milestone-head">
                    <span className="octopus-milestone-name">{ms.label}</span>
                    <span className="octopus-milestone-tag">{ms.status}</span>
                  </div>
                  <p className="octopus-milestone-note">{ms.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
