import { Link } from 'react-router-dom'
import { b1mEngineUpdates, b1mMilestones } from '../data'
import { useTitle } from '../useTitle'
import './Missions.css'

const engineSteps = [
  'B1M engine design',
  'Propellant characterisation',
  'B1M engine build',
  'B1M engine static fires',
]

export default function B1mEngine() {
  useTitle('B1M engine')
  const steps = b1mMilestones.filter((item) => engineSteps.includes(item.label))

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Next milestone · before B1M-01</p>
            <h1>B1M engine.</h1>
            <p className="lede">
              Engine development is the milestone in front of STRAVOX B1M flight one. The motor design is done. Three engines are in build, and propellant characterisation is in progress. Static fires are the gate before that flight.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/missions">B1M-01 mission</Link>
              <Link className="btn" to="/tests">Static fire log</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Design</span><span>Complete</span></div>
            <div className="side-row"><span>In build</span><span>3 engines</span></div>
            <div className="side-row"><span>Characterisation</span><span>In progress</span></div>
            <div className="side-row"><span>Next</span><span>Static fires</span></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="missions-card">
            <div className="missions-milestones missions-milestones--solo">
              <p className="missions-milestones-label">Pre-static fire milestones</p>
              <div className="missions-milestone-list">
                {steps.map((item, index) => (
                  <div className={`missions-milestone missions-milestone--${item.status}`} key={item.label}>
                    <div className="missions-milestone-marker">
                      <span className="missions-milestone-dot" />
                      {index < steps.length - 1 ? <span className="missions-milestone-line" /> : null}
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

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Log</p>
              <h2>Engine updates.</h2>
            </div>
            <p>Development updates for the B1M motor, published as the work moves toward the static fires and STRAVOX B1M-01.</p>
          </div>
          {b1mEngineUpdates.map((post) => (
            <article className="post" key={post.title}>
              <p className="kicker">{post.display}</p>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
