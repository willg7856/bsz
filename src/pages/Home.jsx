import { Link } from 'react-router-dom'
import { partners, programme, vehicles } from '../data'
import { useTitle } from '../useTitle'

export default function Home() {
  useTitle('')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Student rocketry · Creswick, Victoria</p>
            <h1>
              Beyond Stage Zero<span className="accent">.</span>
            </h1>
            <p className="lede">
              Australia&apos;s first fully and rapidly reusable launch vehicle. An Australian student team designing, building, and flying from Creswick — starting with STRAVOX and the B1M sub-scale programme.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/stravox">Explore STRAVOX</Link>
              <Link className="btn" to="/missions">Mission pipeline</Link>
            </div>
          </div>
          <div className="masthead-side" aria-label="Flight pipeline">
            <div className="side-row"><span>Next up</span><span>B1M-01 · 3 km</span></div>
            <div className="side-row"><span>Hop test</span><span>100 m · Q3–Q4 2026</span></div>
            <div className="side-row"><span>Full scale</span><span>STRAVOX · 30 km</span></div>
          </div>
        </div>
      </header>

      <section className="hud" aria-label="Programme snapshot">
        <div className="hud-inner">
          <div className="metric">
            <span className="metric-label">In production</span>
            <span className="metric-value">4</span>
          </div>
          <div className="metric">
            <span className="metric-label">Team</span>
            <span className="metric-value">17</span>
          </div>
          <div className="metric">
            <span className="metric-label">Static fires</span>
            <span className="metric-value">4</span>
          </div>
          <div className="metric">
            <span className="metric-label">Founded</span>
            <span className="metric-value">2025</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Vehicles in production</p>
              <h2>On the floor.</h2>
            </div>
            <p>Four vehicles in build — a 100 m hopper and three B1M motors — ahead of the first flight window.</p>
          </div>
          <div className="rows">
            {vehicles.map((vehicle, index) => (
              <Link className="vehicle-row" key={vehicle.name} to={vehicle.to}>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <strong>{vehicle.name}</strong>
                <span className="status status-active">{vehicle.status}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">The programme</p>
              <h2>What we&apos;re building.</h2>
            </div>
          </div>
          <div className="rows">
            {programme.map((item) => (
              <article className="prog-row" key={item.title}>
                <p className="prog-kicker">{item.kicker}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link className="text-link" to={item.to}>{item.action}</Link>
                </div>
                <div className="meta-stack">
                  {item.meta.map(([label, value]) => (
                    <div className="meta-line" key={label}>
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Partners & supporters</p>
              <h2>Who stands with us.</h2>
            </div>
            <p>Institutional partners give the programme a real workshop, education pathway, and a place to run range operations.</p>
          </div>
          <div className="rows">
            {partners.map((partner) => (
              <a className="partner-row" key={partner.name} href={partner.href}>
                <span className="partner-name">{partner.name}</span>
                <span className="partner-role">{partner.role}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
