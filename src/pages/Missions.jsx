import { Link } from 'react-router-dom'
import { missions, upcoming } from '../data'
import { useTitle } from '../useTitle'
import './Missions.css'

const hiddenSpecs = new Set(['Role', 'Engines in production', 'First engine', 'Collaboration', 'Purpose', 'Status'])

const milestoneGroups = [
  { status: 'done', title: 'Done' },
  { status: 'active', title: 'In progress' },
  { status: 'upcoming', title: 'Still to do' },
]

export default function Missions() {
  useTitle('Missions')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Programme</p>
            <h1>Missions.</h1>
            <p className="lede">
              Nothing has flown yet. Our first flight is STRAVOX B1M-01, to 3 km, some time between Q1 and Q2 2027. Everything below is what has to happen first.
            </p>
          </div>
          <div className="masthead-side missions-hero-stat-row">
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">B1M-01</span>
              <span className="missions-hero-stat-lbl">First flight</span>
            </div>
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">3 km</span>
              <span className="missions-hero-stat-lbl">Target apogee</span>
            </div>
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">Q1–Q2&apos;27</span>
              <span className="missions-hero-stat-lbl">Launch window</span>
            </div>
          </div>
        </div>
      </header>

      {missions.map((mission) => (
        <section className="section missions-card-section" key={mission.id}>
          <div className="wrap">
            <div className="missions-card">
              <div className="missions-card-head">
                <div>
                  <span className="eyebrow accent">[ {mission.num} ]</span>
                  <h2 className="missions-card-name">{mission.name}</h2>
                  <p className="missions-card-tagline">{mission.tagline}</p>
                </div>
                <div className="missions-status missions-status--cyan">{mission.status}</div>
              </div>

              <div className="missions-card-body">
                <div className="missions-card-left">
                  <p className="missions-desc">{mission.description}</p>
                  <div>
                    <p className="missions-objectives-label">Mission objectives</p>
                    {mission.objectives.map((item, index) => (
                      <div className="missions-obj-row" key={item}>
                        <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="missions-card-specs">
                  {mission.specs.filter(([label]) => !hiddenSpecs.has(label)).map(([label, value]) => (
                    <div className="missions-spec-row" key={label}>
                      <span className="missions-spec-lbl">{label}</span>
                      <span className="missions-spec-val">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="missions-milestones">
                <div className="missions-milestones-head">
                  <p className="missions-milestones-label">Before launch</p>
                  <Link className="text-link" to="/b1m-engine">Engine updates</Link>
                </div>
                <div className="missions-groups">
                  {milestoneGroups.map((group) => {
                    const items = mission.milestones.filter((item) => item.status === group.status)
                    return (
                      <div className={`missions-group missions-group--${group.status}`} key={group.status}>
                        <p className="missions-group-title">
                          {group.title} <span>{items.length}</span>
                        </p>
                        <ul>
                          {items.map((item) => (
                            <li key={item.label}>
                              <span className="missions-group-name">{item.label}</span>
                              <span className="missions-group-note">{item.note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Pipeline</p>
              <h2>On the horizon.</h2>
            </div>
            <p>Future missions are subject to learnings from B1M-01. Nothing here is locked in — we plan by what the data tells us.</p>
          </div>
          <div className="rows">
            {upcoming.map((item) => (
              <article className="prog-row" key={item.id}>
                <p className="prog-kicker">{item.id}</p>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
                <div className="meta-stack">
                  <div className="meta-line">
                    <span>Window</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
