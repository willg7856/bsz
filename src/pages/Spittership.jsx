import { Link } from 'react-router-dom'
import './Spittership.css'

const TICK = Array.from({ length: 40 })

const goals = [
  {
    index: '01',
    title: 'Community first',
    desc: 'The first fully community-driven vehicle development — designed with people from all around the world, not a closed internal team.',
  },
  {
    index: '02',
    title: 'Powered by B1M',
    desc: 'Spittership rides on the B1M motor — the same KNSB engine series BSZ is building and characterising for flight.',
  },
  {
    index: '03',
    title: 'Open contribution',
    desc: 'A vehicle programme where contributors worldwide can shape design, systems, and flight prep alongside Beyond Stage Zero.',
  },
  {
    index: '04',
    title: 'Real hardware',
    desc: 'Not a paper rocket — Spittership is built to fly on a real B1M motor and return lessons for community rocketry and BSZ alike.',
  },
]

const milestones = [
  { label: 'Programme kickoff', status: 'active', note: 'Spittership announced as a community-driven vehicle powered by the B1M motor.' },
  { label: 'Community formation', status: 'active', note: 'Bringing contributors together from around the world to shape the vehicle.' },
  { label: 'Vehicle concept', status: 'upcoming', note: 'Airframe and systems concept sized around B1M propulsion and community design input.' },
  { label: 'B1M integration', status: 'upcoming', note: 'Motor interface, recovery, and avionics aligned with the B1M engine programme.' },
  { label: 'Build & flight prep', status: 'upcoming', note: 'Fabrication, integration, and range prep toward a community Spittership flight.' },
]

export default function Spittership() {
  return (
    <main className="spittership">

      <section className="spittership-hero">
        <div className="spittership-hero-grid-bg" aria-hidden="true" />
        <div className="container spittership-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Community vehicle ]
            </p>
            <h1 className="spittership-hero-h1">Spittership.</h1>
            <p className="spittership-hero-sub">
              Project Spittership — the first fully community-driven vehicle
              development, with people from all around the world, powered by B1M.
            </p>
            <div className="spittership-hero-actions">
              <Link className="btn btn-primary" to="/b1m">B1M motor →</Link>
              <Link className="btn btn-ghost-dark" to="/contact">Get involved</Link>
            </div>
          </div>
          <div className="spittership-hero-stat-row">
            <div className="spittership-hero-stat">
              <span className="spittership-hero-stat-val">ACTIVE</span>
              <span className="spittership-hero-stat-lbl">Programme status</span>
            </div>
            <div className="spittership-hero-stat">
              <span className="spittership-hero-stat-val">Global</span>
              <span className="spittership-hero-stat-lbl">Community-driven</span>
            </div>
            <div className="spittership-hero-stat">
              <span className="spittership-hero-stat-val">B1M</span>
              <span className="spittership-hero-stat-lbl">Powered by</span>
            </div>
          </div>
        </div>
        <div className="tick-rule spittership-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why Spittership</p>
              <h2>Built by many.</h2>
            </div>
            <p className="lead">
              Most student vehicles are built inside one team. Spittership flips
              that: a fully community-driven development effort — contributors
              worldwide — flying on a BSZ B1M motor. Open collaboration, real
              hardware, shared flight.
            </p>
          </div>

          <div className="spittership-goals">
            {goals.map((g) => (
              <div className="spittership-goal" key={g.index}>
                <span className="spittership-goal-index mono">{g.index}</span>
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
          <div className="spittership-milestones">
            {milestones.map((ms, idx) => (
              <div key={ms.label} className={`spittership-milestone spittership-milestone--${ms.status}`}>
                <div className="spittership-milestone-marker">
                  <span className="spittership-milestone-dot" />
                  {idx < milestones.length - 1 && <span className="spittership-milestone-line" />}
                </div>
                <div className="spittership-milestone-content">
                  <div className="spittership-milestone-head">
                    <span className="spittership-milestone-name">{ms.label}</span>
                    <span className="spittership-milestone-tag">{ms.status}</span>
                  </div>
                  <p className="spittership-milestone-note">{ms.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
