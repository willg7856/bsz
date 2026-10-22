import { Link } from 'react-router-dom'
import { nozzleFailures } from '../data'
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
              Ceramic inserts for the B1M motor. They still have to survive a burn before one flies.
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
              <p className="kicker">Fire log</p>
              <h2>What the early motors did.</h2>
            </div>
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

      <section className="section">
        <div className="wrap two">
          <div>
            <p className="kicker">2026</p>
            <h2>Peter Doherty Science Award.</h2>
            <div className="copy">
              <p>
                Our entry this year, through Ballarat Tech School.
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
