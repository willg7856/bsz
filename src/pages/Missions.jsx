import { Link } from 'react-router-dom'
import { missions, upcoming } from '../data'
import { useTitle } from '../useTitle'
import './Missions.css'

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
              Every flight we run has a mission designation, a set of objectives, and a public record. This is the full picture — what we&apos;re flying, when, and why.
            </p>
          </div>
          <div className="masthead-side missions-hero-stat-row">
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">0</span>
              <span className="missions-hero-stat-lbl">Active missions</span>
            </div>
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">0</span>
              <span className="missions-hero-stat-lbl">Flights completed</span>
            </div>
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">Q4&apos;26–Q1&apos;27</span>
              <span className="missions-hero-stat-lbl">First launch</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Before STRAVOX B1M-01</p>
            <h2>Next milestone.</h2>
          </div>
          <div>
            <p className="copy">
              B1M engine development. Design is complete. The first engine is done and pending regulatory approval; two are still in build, and propellant characterisation is in progress. This is the update log for that work, ahead of the static fires and flight one.
            </p>
            <Link className="btn btn-ink" to="/b1m-engine">Engine updates</Link>
          </div>
        </div>
      </section>

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
                    {mission.objectives.map((item) => (
                      <div className="missions-obj-row" key={item}>
                        <span className="missions-obj-icon">○</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="missions-card-specs">
                  {mission.specs.map(([label, value]) => (
                    <div className="missions-spec-row" key={label}>
                      <span className="missions-spec-lbl">{label}</span>
                      <span className="missions-spec-val">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="missions-milestones">
                <p className="missions-milestones-label">Pre-flight milestones</p>
                <div className="missions-milestone-list">
                  {mission.milestones.map((item, index) => (
                    <div className={`missions-milestone missions-milestone--${item.status}`} key={item.label}>
                      <div className="missions-milestone-marker">
                        <span className="missions-milestone-dot" />
                        {index < mission.milestones.length - 1 ? <span className="missions-milestone-line" /> : null}
                      </div>
                      <div className="missions-milestone-content">
                        <div className="missions-milestone-head">
                          <span className="missions-milestone-name">{item.label}</span>
                          <span className="missions-milestone-tag">{item.status}</span>
                        </div>
                        <p className="missions-milestone-note">{item.note}</p>
                      </div>
                    </div>
                  ))}
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
