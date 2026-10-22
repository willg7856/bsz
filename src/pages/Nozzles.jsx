import { Link } from 'react-router-dom'
import { nozzleDesign, nozzleMould } from '../data'
import { useTitle } from '../useTitle'

function NoteSection({ note, dark = false }) {
  return (
    <section className={dark ? 'section dark' : 'section'}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">{note.kicker}</p>
            <h2>{note.title}</h2>
          </div>
        </div>
        {note.body ? <p className="copy">{note.body}</p> : null}
        {note.costs?.length ? (
          <div className="nozzle-costs">
            {note.costs.map((item) => (
              <div className="spec-cell" key={item.label}>
                <p className="lbl">{item.label}</p>
                <p className="val">{item.value}</p>
                <p className="note">{item.note}</p>
              </div>
            ))}
          </div>
        ) : null}
        {note.points?.length ? (
          <div className="rows">
            {note.points.map((item, index) => (
              <article className="vehicle-row" key={item.title}>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{item.title}</strong>
                  {item.body ? <span className="path-note">{item.body}</span> : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}
        {note.figures?.length ? (
          <div className="nozzle-figures">
            {note.figures.map((figure) => (
              <figure key={figure.id}>
                <div className="nozzle-figure-frame">
                  {figure.src ? <img src={figure.src} alt={figure.alt || figure.title} /> : null}
                </div>
                <figcaption>{figure.title}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

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
              To lower the cost of a nozzle compared to graphite. They still have to survive a burn before one flies on B1M.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/contact?reason=Ceramic%20nozzle%20enquiries">Special orders</Link>
              <Link className="btn" to="/tests">Read the fire logs</Link>
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

      <NoteSection note={nozzleDesign} />
      <NoteSection note={nozzleMould} dark />

      <section className="section">
        <div className="wrap">
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
      </section>

      <section className="section dark nozzle-orders">
        <div className="wrap">
          <p className="kicker">Orders</p>
          <h2>We are taking special orders.</h2>
          <p className="copy">
            Ceramic nozzles. For more information, contact us on the <Link to="/contact?reason=Ceramic%20nozzle%20enquiries">contact page</Link>.
          </p>
          <Link className="btn btn-ink" to="/contact?reason=Ceramic%20nozzle%20enquiries">Contact us</Link>
        </div>
      </section>
    </>
  )
}
