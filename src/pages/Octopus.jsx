import { Link } from 'react-router-dom'
import './Octopus.css'

const TICK = Array.from({ length: 40 })

const goals = [
  {
    index: '01',
    title: 'Fly our own stack',
    desc: 'A custom software system built for BSZ vehicles — not a black-box commercial flight computer bolted on at the last minute.',
  },
  {
    index: '02',
    title: 'Sense and decide',
    desc: 'Ingest sensor data, run flight logic, and drive recovery and landing systems with timing we can inspect and tune.',
  },
  {
    index: '03',
    title: 'Talk to the ground',
    desc: 'Telemetry, command, and post-flight review in one coherent pipeline — from pad checks through recovery.',
  },
  {
    index: '04',
    title: 'Prove on B1M',
    desc: 'Ship on STRAVOX B1M first. What works at 3 km scales into full-scale STRAVOX avionics.',
  },
]

const milestones = [
  { label: 'Architecture definition', status: 'active', note: 'Defining Octopus modules for flight computer, telemetry, and ground operations around B1M and STRAVOX needs.' },
  { label: 'Core flight software', status: 'active', note: 'Building the onboard stack that will fly on B1M — sensing, state estimation, and event logic.' },
  { label: 'Ground tools', status: 'upcoming', note: 'Pad-side software for preflight checks, live telemetry display, and post-flight data review.' },
  { label: 'Hardware-in-the-loop', status: 'upcoming', note: 'Bench integration with sensors, actuators, and recovery electronics before first flight.' },
  { label: 'B1M flight qualification', status: 'upcoming', note: 'Fly Octopus on STRAVOX B1M-01 in the Q4 2026 – Q1 2027 window.' },
]

export default function Octopus() {
  return (
    <main className="octopus">

      <section className="octopus-hero">
        <div className="octopus-hero-grid-bg" aria-hidden="true" />
        <div className="container octopus-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Software programme ]
            </p>
            <h1 className="octopus-hero-h1">Octopus.</h1>
            <p className="octopus-hero-sub">
              Beyond Stage Zero&apos;s custom flight and ground software — the stack
              that will sense, decide, and report from our vehicles, starting with
              STRAVOX B1M.
            </p>
            <div className="octopus-hero-actions">
              <Link className="btn btn-primary" to="/b1m">B1M vehicle →</Link>
              <Link className="btn btn-ghost-dark" to="/stravox">Full-scale STRAVOX</Link>
            </div>
          </div>
          <div className="octopus-hero-stat-row">
            <div className="octopus-hero-stat">
              <span className="octopus-hero-stat-val">ACTIVE</span>
              <span className="octopus-hero-stat-lbl">Programme status</span>
            </div>
            <div className="octopus-hero-stat">
              <span className="octopus-hero-stat-val">Custom</span>
              <span className="octopus-hero-stat-lbl">Built in-house</span>
            </div>
            <div className="octopus-hero-stat">
              <span className="octopus-hero-stat-val">B1M</span>
              <span className="octopus-hero-stat-lbl">First flight target</span>
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
              <h2>Software we own.</h2>
            </div>
            <p className="lead">
              Reusable rocketry is as much a software problem as a hardware one.
              Octopus is our answer: a single custom system for flight software and
              ground operations, designed around how BSZ actually builds and flies
              rockets — not a generic kit firmware we can&apos;t change.
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
