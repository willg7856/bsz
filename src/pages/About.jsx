import { Link } from 'react-router-dom'
import { disciplines, partners, record, values } from '../data'
import { useTitle } from '../useTitle'

export default function About() {
  useTitle('About')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Who we are</p>
            <h1>Beyond Stage Zero<span className="accent">.</span></h1>
            <p className="lede">
              An Australian student rocketry team designing, building, and flying hardware from Creswick, Victoria — with published tests, institutional partners, and a clear path to first flight.
            </p>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Team</span><span>17</span></div>
            <div className="side-row"><span>Founded</span><span>2025</span></div>
            <div className="side-row"><span>Based in</span><span>Creswick, VIC</span></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Our mission</p>
            <h2>Why we build.</h2>
          </div>
          <div className="copy">
            <p>
              Beyond Stage Zero started with a simple question: why can&apos;t Australian students build something that competes with the best rocketry programmes in the world? We didn&apos;t have a good answer, so we started building.
            </p>
            <p style={{ marginTop: '0.9rem' }}>
              We&apos;re based in Creswick, Victoria — machining our own motor casings, casting our own propellant, writing our own range data links (Octopus), and learning everything the hard way. Every failure is logged. Every test is published.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Base of operations</p>
              <h2>Creswick Goods Shed.</h2>
            </div>
            <p>We design and build out of the historic railway workshops in Creswick — real industrial floor space for motors, airframes, and Goods Shed mission control.</p>
          </div>
          <dl className="spec-table">
            <div className="spec-line"><dt>Location</dt><dd>Creswick, Victoria · Australia</dd></div>
            <div className="spec-line"><dt>Workshop</dt><dd>Machining, assembly, propellant work</dd></div>
            <div className="spec-line"><dt>Mission control</dt><dd>Goods Shed ops via Octopus data link</dd></div>
            <div className="spec-line"><dt>Launch path</dt><dd>CASA-cleared Victorian range planning</dd></div>
          </dl>
        </div>
      </section>

      <section className="section home-partners">
        <div className="wrap">
          <p className="eyebrow">Partners & supporters</p>
          <div className="home-partners-logos">
            {partners.map((partner) => (
              <a className="home-partner" key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer">
                <img src={partner.logo} alt="" />
                <span>{partner.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">The team</p>
              <h2>The people.</h2>
            </div>
            <p>Seventeen students building STRAVOX from all around the world, primarily Victoria.</p>
          </div>
          <div className="card-grid">
            {disciplines.map((item) => (
              <article className="cell" key={item.code}>
                <p className="kicker">{item.code}</p>
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
              <p className="kicker">Our values</p>
              <h2>How we work.</h2>
            </div>
            <p>Student-led, ambitious, collaborative, and open — the same standards we hold for the hardware apply to how the team operates.</p>
          </div>
          <div className="rows">
            {values.map((value) => (
              <article className="vehicle-row" key={value.index}>
                <span className="idx">{value.index}</span>
                <span><strong>{value.title}. </strong>{value.desc}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Track record</p>
              <h2>Built in public.</h2>
            </div>
            <p>Static fires, engine iterations, and programme milestones are published as we go — including the failures that shaped the next design.</p>
          </div>
          <div className="rows">
            {record.map((item) => (
              <article className="prog-row" key={item.lbl}>
                <p className="metric-value" style={{ fontSize: '1.4rem' }}>{item.val}</p>
                <div>
                  <h3>{item.lbl}</h3>
                  <p>{item.note}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="actions">
            <Link className="btn" to="/news">Read the updates</Link>
            <Link className="btn" to="/tests">Test campaigns</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap callout">
          <div>
            <p className="kicker">Get involved</p>
            <h2>Build with us.</h2>
            <p className="note">Sponsorship, team applications, or media — tell us why you&apos;re reaching out.</p>
          </div>
          <div className="actions">
            <Link className="btn btn-ink" to="/contact">Contact the team</Link>
            <a className="btn" href="https://x.com/beyondstagezero">Follow on X</a>
          </div>
        </div>
      </section>
    </>
  )
}
