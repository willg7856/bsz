import { Link } from 'react-router-dom'
import { useTitle } from '../useTitle'

const ticks = Array.from({ length: 40 })

const vehiclesInProduction = [
  { label: '100 m Hopper' },
  { label: 'B1M-02', to: '/b1m' },
  { label: 'B1M-03', to: '/b1m' },
]

const alsoInProduction = [
  { label: 'Ceramic nozzle engine', status: 'In production' },
  { label: 'B1M static fire stand', status: 'In production' },
]

export default function Home() {
  useTitle('')

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-grid-bg" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-left">
            <h1 className="home-hero-h1">
              Beyond Stage <span className="home-hero-accent">Zero.</span>
              <span className="home-hero-h1-divider" aria-hidden="true" />
              <span className="home-hero-h1-sub">
                To lower the cost<br />and the barrier to entry<br />for others to follow.
              </span>
            </h1>
            <p className="home-hero-sub">
              A student team in Creswick, Victoria, designing and building <span className="mono">STRAVOX</span>. <span className="mono">B1M</span> is the 3 km vehicle that flies first, to prove the systems.
            </p>
            <div className="home-hero-actions">
              <Link className="btn btn-primary" to="/stravox">Explore STRAVOX</Link>
              <Link className="btn btn-ghost-dark" to="/about">About the team</Link>
            </div>
          </div>
          <div className="home-hero-right">
          <figure className="home-hero-engine">
            <img src="/b1m-engine-bench.png" alt="The completed B1M engine on a bench, ready for static fire" />
            <figcaption>
              <Link to="/b1m-engine">B1M engine</Link> · ready for static fire
            </figcaption>
          </figure>
          <div className="home-hero-spec" role="region" aria-labelledby="current-production">
            <p className="eyebrow" id="current-production">Current production</p>
            <div className="home-spec-group">
              <div className="home-spec-row">
                <span className="home-spec-lbl">Vehicles in production</span>
                <span className="home-spec-val num accent">{vehiclesInProduction.length}</span>
              </div>
            </div>
            <div className="home-spec-group">
              <div className="home-spec-row">
                <span className="home-spec-lbl">
                  <Link to="/b1m">B1M-01</Link>
                </span>
                <span className="home-spec-val done">Build complete</span>
              </div>
            </div>
            <div className="home-spec-group">
              <div className="home-spec-stack">
                <div className="home-spec-row">
                  <span className="home-spec-lbl">
                    <Link to="/b1m-engine">B1M engines in production</Link>
                  </span>
                  <span className="home-spec-val num">2</span>
                </div>
                <p className="home-spec-note">First engine done. First static fire pending regulatory approval.</p>
              </div>
            </div>
            <div className="home-spec-group">
              <div className="home-spec-row">
                <span className="home-spec-lbl">
                  <Link to="/nozzles">Ceramic nozzles in production</Link>
                </span>
                <span className="home-spec-val num">5</span>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="tick-rule home-tick" aria-hidden="true">
          {ticks.map((_, index) => <span key={index} />)}
        </div>
      </section>

      <section className="section home-build" aria-labelledby="also-in-production">
        <div className="container">
          <p className="eyebrow accent" id="also-in-production">Also in production</p>
          <ol className="home-build-list">
            {[...vehiclesInProduction, ...alsoInProduction].map((item, index) => (
              <li className="home-build-item" key={item.label}>
                <span className="home-build-idx">{String(index + 1).padStart(2, '0')}</span>
                <span className="home-build-lbl">
                  {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
                </span>
                {item.status ? <span className="home-build-val">{item.status}</span> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dark home-rocket">
        <div className="container home-rocket-inner">
          <div className="home-rocket-text">
            <p className="eyebrow">Vehicle · Currently in development</p>
            <h2>STRAVOX</h2>
            <p className="home-rocket-desc">
              A 2,633 mm high-power rocket with a split nosecone airbrake and propulsive vertical landing on four folding drone arms. Designed and built from scratch by the Beyond Stage Zero team.
            </p>
            <Link className="home-rocket-link" to="/stravox">Explore the design</Link>
          </div>
          <div className="home-rocket-img-wrap">
            <img src="/stravox-render.png" alt="STRAVOX rocket render" className="home-rocket-img" />
          </div>
        </div>
      </section>

      <section className="section home-rocket home-rocket--light">
        <div className="container home-rocket-inner">
          <div className="home-rocket-text">
            <p className="eyebrow accent">Vehicle · Sub-scale</p>
            <h2>STRAVOX B1M</h2>
            <p className="home-rocket-desc">
              Our 3 km systems-validation vehicle — flying a home-built KNSB motor to prove avionics, recovery, and flight systems before full-scale STRAVOX. Engine design complete. The first engine is done and pending regulatory approval; two are still in production, and propellant work continues.
            </p>
            <Link className="home-project-link" to="/b1m">Explore B1M</Link>
          </div>
          <div className="home-rocket-img-wrap">
            <img src="/b1m-engine-cutout.png" alt="B1M engine external render" className="home-rocket-img home-rocket-img--b1m" />
          </div>
        </div>
      </section>

      <Project
        kicker="Flight programme"
        title="Missions"
        body="From the STRAVOX B1M 3 km sub-scale flight to the 100 m drone-powered hop and full-scale 30 km attempt — every planned flight, objective, and milestone in one place."
        to="/missions"
        action="View the mission pipeline"
        meta={[['Next up', 'B1M-01 · 3 km'], ['Hop test', '100 m · Q3–Q4 2026'], ['Full scale', 'STRAVOX · 30 km']]}
      />
      <Project
        dark
        kicker="Propulsion · Ground test"
        title="Engine tests"
        body="Static-fire campaigns, engine builds, and propellant work that feed every vehicle we fly. Mk I and Mk II results are public. The first B1M static fire is pending regulatory approval, and the stand is still in production."
        to="/tests"
        action="See the test log"
        meta={[['Static fires', '4 completed'], ['Engines built', '9 total'], ['Next campaign', 'B1M static fires']]}
      />
      <Project
        kicker="Propulsion · Materials"
        title="Ceramic nozzles"
        body="To lower the cost of a nozzle compared to graphite. Mould v13 is the current tool: 3 nozzles are complete, and 5 are in production."
        to="/nozzles"
        action="Explore the programme"
        meta={[['Mould', 'v13'], ['Completed', '3'], ['In production', '5']]}
      />
      <Project
        dark
        kicker="Data link · Mission control"
        title="Octopus"
        body="The connection that gets pad data — and later vehicle data — into Goods Shed mission control during static fires and launches. Not the flight computer."
        to="/octopus"
        action="Explore the programme"
        meta={[['Status', 'Active'], ['Path', 'Pad → Goods Shed'], ['Also', 'Vehicle → MC']]}
      />
      <Project
        kicker="Public tracker"
        title="Starship"
        body="An unofficial live tracker for SpaceX Starship, built by Beyond Stage Zero from SpaceX’s public telemetry. It passed 20,000 views in under 24 hours."
        to="/starship"
        action="About the tracker"
        meta={[['Views', '20,000'], ['Window', 'Under 24 hours'], ['Telemetry', 'SpaceX public']]}
      />
    </div>
  )
}

function Project({ kicker, title, body, to, action, meta, dark = false }) {
  return (
    <section className={`section home-project${dark ? ' dark home-project--dark' : ''}`}>
      <div className="container home-project-inner">
        <div className="home-project-text">
          <p className={`eyebrow${dark ? '' : ' accent'}`}>{kicker}</p>
          <h2>{title}</h2>
          <p className="home-project-desc">{body}</p>
          <Link className={dark ? 'home-rocket-link' : 'home-project-link'} to={to}>{action}</Link>
        </div>
        <div className={`home-project-meta${dark ? ' home-project-meta--dark' : ''}`}>
          {meta.map(([label, value]) => (
            <div className="home-project-meta-row" key={label}>
              <span>{label}</span>
              <span className={value === 'Active' ? 'status-active' : undefined}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
