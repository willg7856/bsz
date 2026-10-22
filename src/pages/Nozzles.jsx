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
              Early motors threw their nozzles or burned through them. Mould v13 is the current tool: 3 nozzles are complete, 5 are in production, and the inserts still have to survive a burn before they fly on B1M.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/tests">Read the fire logs</Link>
              <Link className="btn" to="/contact?reason=Ceramic%20nozzle%20enquiries">Special orders</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Mould</span><span className="num">v13</span></div>
            <div className="side-row"><span>Completed</span><span className="done">3</span></div>
            <div className="side-row"><span>In production</span><span className="num">5</span></div>
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
            <p>The ceramic brief comes from two failure modes on the early motors.</p>
          </div>
          <div className="two">
            {nozzleFailures.map((item) => (
              <article className="cell" key={item.fire}>
                <p className="kicker">{item.fire}</p>
                <h3>{item.result}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
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
                <p className="kicker idx">{String(index + 1).padStart(2, '0')}</p>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
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

      <section className="section">
        <div className="wrap two">
          <div>
            <p className="kicker">2026</p>
            <h2>Peter Doherty Science Award.</h2>
            <div className="copy">
              <p>
                We are entering this programme in the Peter Doherty Science Award at Ballarat Tech School this year. The entry is the nozzle work: why the early motors threw or burned through their nozzles, and the ceramic inserts we are building to survive that.
              </p>
              <p>
                <a className="home-project-link" href="https://ballarattechschool.vic.edu.au/programs/peter-doherty-science-award" target="_blank" rel="noopener noreferrer">About the award</a>
              </p>
            </div>
          </div>
          <div>
            <p className="kicker">Orders</p>
            <h2>Special orders.</h2>
            <div className="copy">
              <p>
                We are taking special orders for ceramic nozzles. For more information, contact us on the <Link to="/contact?reason=Ceramic%20nozzle%20enquiries">contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
