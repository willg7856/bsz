import { missions, upcoming } from '../data'
import { useTitle } from '../useTitle'

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
          <div className="masthead-side">
            <div className="side-row"><span>Active missions</span><span>0</span></div>
            <div className="side-row"><span>Flights completed</span><span>0</span></div>
            <div className="side-row"><span>First launch</span><span>Q4&apos;26–Q1&apos;27</span></div>
          </div>
        </div>
      </header>

      {missions.map((mission) => (
        <section className="section" key={mission.id}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">{mission.num} · {mission.year}</p>
                <h2>{mission.name}</h2>
                <p>{mission.tagline}</p>
              </div>
              <span className="status status-planned">{mission.status}</span>
            </div>
            <div className="split">
              <div>
                <p className="copy">{mission.description}</p>
                <p className="kicker" style={{ marginTop: '1.4rem' }}>Mission objectives</p>
                <div className="rows">
                  {mission.objectives.map((item) => (
                    <div className="vehicle-row" key={item}>
                      <span className="idx">○</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <dl className="spec-table">
                {mission.specs.map(([label, value]) => (
                  <div className="spec-line" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="kicker" style={{ marginTop: '2rem' }}>Pre-flight milestones</p>
            <div>
              {mission.milestones.map((item, index) => (
                <div className={`milestone status-${item.status}`} key={item.label}>
                  <div className="milestone-rail">
                    <span className="dot" />
                    {index < mission.milestones.length - 1 ? <span className="rail" /> : null}
                  </div>
                  <div className="milestone-body">
                    <div className="milestone-head">
                      <strong>{item.label}</strong>
                      <span className={`status status-${item.status}`}>{item.status}</span>
                    </div>
                    <p className="note">{item.note}</p>
                  </div>
                </div>
              ))}
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
