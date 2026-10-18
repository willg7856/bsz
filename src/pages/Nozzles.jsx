import { Link } from 'react-router-dom'
import { nozzleBrief, nozzleFailures, nozzlePath } from '../data'
import { useTitle } from '../useTitle'

export default function Nozzles() {
  useTitle('Ceramic nozzles')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Propulsion</p>
            <h1>Ceramic nozzles.</h1>
            <p className="lede">
              We started this programme because our early motors threw nozzles or burned through them. The goal is simple: inserts that stay put and survive the burn long enough to fly on B1M.
            </p>
            <div className="actions">
              <Link className="btn" to="/tests">Read the fire logs</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Now</span><span>Materials research</span></div>
            <div className="side-row"><span>Focus</span><span>First inserts</span></div>
            <div className="side-row"><span>Target</span><span>B1M motor stack</span></div>
            <div className="side-row"><span>2026</span><a href="https://ballarattechschool.vic.edu.au/programs/peter-doherty-science-award" target="_blank" rel="noopener noreferrer">Doherty Award</a></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">What broke first</p>
              <h2>Written from the stand.</h2>
            </div>
            <p>The ceramic brief is written from the stand, not from a wishlist. Two failure modes set the requirements.</p>
          </div>
          <div className="two">
            {nozzleFailures.map((item) => (
              <article className="cell" key={item.fire} style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
                <p className="kicker">{item.fire}</p>
                <h3>{item.result}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">The brief</p>
              <h2>Three things the nozzle has to do.</h2>
            </div>
          </div>
          <div className="phase-grid">
            {nozzleBrief.map((item, index) => (
              <article className="phase" key={item.title}>
                <p className="kicker">{String(index + 1).padStart(2, '0')}</p>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">2026</p>
            <h2>Peter Doherty Science Award.</h2>
          </div>
          <div className="copy">
            <p>
              We are entering this programme in the Peter Doherty Science Award at Ballarat Tech School this year. The entry is the nozzle work: why the early motors threw or burned through their nozzles, and the ceramic inserts we are building to survive that.
            </p>
            <p style={{ marginTop: '0.9rem' }}>
              <a className="home-project-link" href="https://ballarattechschool.vic.edu.au/programs/peter-doherty-science-award" target="_blank" rel="noopener noreferrer">About the award</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Path to flight</p>
              <h2>From the log to B1M.</h2>
            </div>
          </div>
          <div className="rows">
            {nozzlePath.map((item, index) => (
              <article className="vehicle-row" key={item.name}>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.name}</strong>
                <span className="partner-role">{item.detail}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
