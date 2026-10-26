import { Link } from 'react-router-dom'
import { useTitle } from '../useTitle'

const ticks = Array.from({ length: 40 })

const vehiclesInProduction = [
  { label: '100 m Hopper', status: 'Vehicle' },
  { label: 'B1M-02', to: '/b1m', status: 'Vehicle' },
  { label: 'B1M-03', to: '/b1m', status: 'Vehicle' },
]

const alsoInProduction = [
  { label: 'Ceramic nozzle engine', status: 'Engine' },
  { label: 'B1M static fire stand', status: 'Ground test' },
]

const programmes = [
  {
    kicker: 'Flight programme',
    title: 'Missions',
    body: 'From the STRAVOX B1M 3 km sub-scale flight to the 100 m drone-powered hop and full-scale 30 km attempt — every planned flight, objective, and milestone in one place.',
    to: '/missions',
    action: 'View the mission pipeline',
    meta: [['Next up', 'B1M-01 · 3 km'], ['Hop test', '100 m · Q3–Q4 2026'], ['Full scale', 'STRAVOX · 30 km']],
  },
  {
    kicker: 'Propulsion · Ground test',
    title: 'Engine tests',
    body: 'Static-fire campaigns, engine builds, and propellant work that feed every vehicle we fly. Mk I and Mk II results are public. The first B1M static fire is pending regulatory approval, and the stand is still in production.',
    to: '/tests',
    action: 'See the test log',
    meta: [['Static fires', '4 completed'], ['Engines built', '9 total'], ['Next campaign', 'B1M static fires']],
  },
  {
    kicker: 'Propulsion · Materials',
    title: 'Ceramic nozzles',
    body: 'To lower the cost of a nozzle compared to graphite. Mould v13 is the current tool: 3 nozzles are complete, and 5 are in production.',
    to: '/nozzles',
    action: 'Explore the programme',
    meta: [['Mould', 'v13'], ['Completed', '3'], ['In production', '5']],
  },
  {
    kicker: 'Data link · Mission control',
    title: 'Octopus',
    body: 'The connection that gets pad data — and later vehicle data — into Goods Shed mission control during static fires and launches. Not the flight computer.',
    to: '/octopus',
    action: 'Explore the programme',
    meta: [['Status', 'Active'], ['Path', 'Pad → Goods Shed'], ['Also', 'Vehicle → MC']],
  },
  {
    kicker: 'Public tracker',
    title: 'Starship',
    body: 'An unofficial live tracker for SpaceX Starship, built by Beyond Stage Zero from SpaceX’s public telemetry. It passed 20,000 views in under 24 hours.',
    to: '/starship',
    action: 'About the tracker',
    meta: [['Views', '20,000'], ['Window', 'Under 24 hours'], ['Telemetry', 'SpaceX public']],
  },
]

export default function Home() {
  useTitle('')

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-top">
          <p className="hero-eyebrow">Student rocketry · Creswick, Victoria</p>
          <h1 className="hero-title">Beyond Stage <span>Zero.</span></h1>
          <p className="hero-mission">To lower the cost and the barrier to entry for others to follow.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/stravox">Explore STRAVOX</Link>
            <Link className="btn btn-ghost-dark" to="/about">About the team</Link>
          </div>
        </div>
        <figure className="hero-engine">
          <img src="/b1m-engine-bench.png" alt="The completed B1M engine on a bench, ready for static fire" />
          <figcaption className="hero-callout">
            <Link to="/b1m-engine">
              <span className="hero-callout-title">B1M engine</span>
              <span className="hero-callout-body">Complete. First static fire pending regulatory approval.</span>
            </Link>
          </figcaption>
        </figure>
        <div className="container hero-stats-wrap">
          <p className="hero-stats-label" id="current-production">Current production</p>
          <dl className="hero-stats" aria-labelledby="current-production">
            <div>
              <dt>Vehicles in production</dt>
              <dd className="accent">{vehiclesInProduction.length}</dd>
            </div>
            <div>
              <dt><Link to="/b1m">B1M-01</Link></dt>
              <dd className="done">Build complete</dd>
            </div>
            <div>
              <dt><Link to="/b1m-engine">B1M engines in production</Link></dt>
              <dd className="accent">2</dd>
            </div>
            <div>
              <dt><Link to="/nozzles">Ceramic nozzles in production</Link></dt>
              <dd className="accent">5</dd>
            </div>
          </dl>
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

      <section className="home-feature" aria-labelledby="home-stravox">
        <img className="home-feature-img" src="/stravox-workshop.jpg" alt="STRAVOX standing in the Creswick workshop" />
        <div className="home-feature-shade" aria-hidden="true" />
        <div className="container home-feature-inner">
          <div className="home-feature-text">
            <p className="eyebrow">Vehicle · Currently in development</p>
            <h2 id="home-stravox">STRAVOX</h2>
            <p className="home-rocket-desc">
              A 2,633 mm high-power rocket with a split nosecone airbrake and propulsive vertical landing on four folding drone arms. Designed and built from scratch by the Beyond Stage Zero team.
            </p>
            <Link className="home-rocket-link" to="/stravox">Explore the design</Link>
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

      <section className="section home-programmes" aria-labelledby="home-programmes">
        <div className="container">
          <p className="eyebrow accent">Across the team</p>
          <h2 id="home-programmes">Programmes</h2>
          <div className="programme-grid">
            {programmes.map((item) => <Programme key={item.title} {...item} />)}
            <Link className="programme-card programme-card--cta" to="/contact">
              <p className="programme-kicker">Sponsors · Partners · Students</p>
              <h3>Work with us</h3>
              <p className="programme-body">
                We build everything in-house in Creswick. If you can help with materials, machining, testing, or funding — or want to join the team — get in touch.
              </p>
              <span className="programme-action">Contact the team →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Programme({ kicker, title, body, to, action, meta }) {
  return (
    <Link className="programme-card" to={to}>
      <p className="programme-kicker">{kicker}</p>
      <h3>{title}</h3>
      <p className="programme-body">{body}</p>
      <dl className="programme-meta">
        {meta.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd className={value === 'Active' ? 'status-active' : undefined}>{value}</dd>
          </div>
        ))}
      </dl>
      <span className="programme-action">{action} →</span>
    </Link>
  )
}
