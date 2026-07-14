import { Link } from 'react-router-dom'
import './Spittership.css'

const TICK = Array.from({ length: 40 })

const goals = [
  {
    index: '01',
    title: 'Built by Spitter',
    desc: 'Spitter means space Twitter — the online space community on X. That is who Spittership is for and who will shape it.',
  },
  {
    index: '02',
    title: 'Community owns it',
    desc: 'Spittership is a working name. Design, direction, and even the name itself can be changed by the community.',
  },
  {
    index: '03',
    title: 'BSZ manages & motors',
    desc: 'Beyond Stage Zero manages the project and provides the B1M engine. Everything else is community-driven.',
  },
  {
    index: '04',
    title: 'Join on X',
    desc: 'People join from X. When the programme kicks off after the first B1M static fire, Spitter is where the call goes out.',
  },
]

const milestones = [
  { label: 'First B1M static fire', status: 'upcoming', note: 'Spittership kickoff waits on the first B1M static fire — BSZ proves the motor on the stand first.' },
  { label: 'Programme kickoff', status: 'upcoming', note: 'Open the project on X after the first B1M fire — Spitter is invited in.' },
  { label: 'Community formation', status: 'upcoming', note: 'Contributors from space Twitter form the team; the community sets direction from there.' },
  { label: 'Vehicle concept', status: 'upcoming', note: 'Community-led concept for the vehicle — name, design, and systems are all open to change.' },
  { label: 'B1M integration', status: 'upcoming', note: 'BSZ provides the B1M motor; the community integrates it into the vehicle they design.' },
  { label: 'Build & flight prep', status: 'upcoming', note: 'Community build and flight prep, with BSZ managing the project and supplying the engine.' },
]

export default function Spittership() {
  return (
    <main className="spittership">

      <section className="spittership-hero">
        <div className="spittership-hero-grid-bg" aria-hidden="true" />
        <div className="container spittership-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Community vehicle · Spitter ]
            </p>
            <h1 className="spittership-hero-h1">Spittership.</h1>
            <p className="spittership-hero-sub">
              The first fully community-driven vehicle development — for space
              Twitter (Spitter), joining via X. Beyond Stage Zero manages the
              project and provides the B1M engine; the community owns the rest.
              Even the name can change. Kickoff after the first B1M static fire.
            </p>
            <div className="spittership-hero-actions">
              <a
                className="btn btn-primary"
                href="https://x.com/beyondstagezero"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join on X →
              </a>
              <Link className="btn btn-ghost-dark" to="/b1m">B1M motor</Link>
            </div>
          </div>
          <div className="spittership-hero-stat-row">
            <div className="spittership-hero-stat">
              <span className="spittership-hero-stat-val">PLANNED</span>
              <span className="spittership-hero-stat-lbl">Programme status</span>
            </div>
            <div className="spittership-hero-stat">
              <span className="spittership-hero-stat-val">X / Spitter</span>
              <span className="spittership-hero-stat-lbl">Where people join</span>
            </div>
            <div className="spittership-hero-stat">
              <span className="spittership-hero-stat-val">B1M</span>
              <span className="spittership-hero-stat-lbl">Engine from BSZ</span>
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
              <h2>Spitter builds it.</h2>
            </div>
            <p className="lead">
              Spitter means space Twitter — the community on X. Spittership is
              our working name for a vehicle that community designs and drives.
              BSZ&apos;s job is simple: manage the project and provide the B1M
              engine. Everything else — including the name — is up to Spitter.
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
