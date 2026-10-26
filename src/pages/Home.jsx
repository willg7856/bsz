import { Link } from 'react-router-dom'
import B1mStaticFireNotice from '../components/B1mStaticFireNotice'
import { useTitle } from '../useTitle'

const vehiclesInProduction = [
  { label: '100 m Hopper' },
  { label: 'B1M-02', to: '/b1m' },
  { label: 'B1M-03', to: '/b1m' },
]

const onTheBench = [
  ...vehiclesInProduction,
  { label: 'Ceramic nozzle engine', to: '/nozzles' },
  { label: 'B1M static fire stand', to: '/tests' },
]

const projects = [
  {
    title: 'Missions',
    to: '/missions',
    body: 'Every flight we have planned: B1M to 3 km, a 100 m hop on drone motors, and eventually STRAVOX to 30 km.',
  },
  {
    title: 'Engine tests',
    to: '/tests',
    body: 'Static fires, engine builds and propellant work. The Mk I and Mk II results are up. The first B1M static fire is pending regulatory approval, and we are still building the stand.',
  },
  {
    title: 'Ceramic nozzles',
    to: '/nozzles',
    body: 'We want nozzles that cost less than graphite ones. We are on mould v13, with 3 nozzles finished and 5 more being made.',
  },
  {
    title: 'Octopus',
    to: '/octopus',
    body: 'Our data link. It gets pad data (and later, vehicle data) back to mission control in the Goods Shed during static fires and launches. It is not the flight computer.',
  },
  {
    title: 'Starship tracker',
    to: '/starship',
    body: 'An unofficial live tracker for SpaceX Starship, built from SpaceX’s public telemetry. It passed 20,000 views in under 24 hours.',
  },
]

export default function Home() {
  useTitle('')

  return (
    <div className="home">
      <header className="masthead stravox-photo-hero home-photo-hero">
        <img className="stravox-photo-hero-img" src="/b1m-engine-street.jpg" alt="The completed B1M engine on a bench, ready for static fire" />
        <div className="stravox-photo-hero-shade" aria-hidden="true" />
        <div className="masthead-inner">
          <div>
            <p className="kicker">Creswick, Victoria</p>
            <h1 className="home-wordmark">Beyond <span className="home-wordmark-line"><span className="home-wordmark-bracket">[</span>Stage Zero<span className="home-wordmark-bracket">]</span></span></h1>
            <p className="lede">
              We are a student team building rockets from scratch. The goal is to lower the cost and the barrier to entry for whoever comes after us. Our first B1M engine is finished.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/stravox">See STRAVOX</Link>
              <Link className="btn" to="/about">Meet the team</Link>
            </div>
          </div>
        </div>
        <B1mStaticFireNotice />
        <dl className="shed-hero-specs">
          <div><dt>Vehicles in production</dt><dd>{vehiclesInProduction.length}</dd></div>
          <div><dt>B1M-01</dt><dd>Build complete</dd></div>
          <div><dt>B1M engines</dt><dd>1 complete · 2 in production</dd></div>
          <div><dt>Ceramic nozzles</dt><dd>3 complete · 5 in production</dd></div>
        </dl>
      </header>

      <section className="section home-build" aria-labelledby="on-the-bench">
        <div className="container home-build-inner">
          <h2 id="on-the-bench">On the bench right now</h2>
          <ul className="home-build-list">
            {onTheBench.map((item) => (
              <li key={item.label}>
                {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-feature" aria-labelledby="home-stravox">
        <img className="home-feature-img" src="/stravox-workshop.jpg" alt="STRAVOX standing in the Creswick workshop" />
        <div className="home-feature-shade" aria-hidden="true" />
        <div className="container home-feature-inner">
          <div className="home-feature-text">
            <p className="eyebrow">The big one</p>
            <h2 id="home-stravox">STRAVOX</h2>
            <p className="home-rocket-desc">
              Our full-size rocket. It is 2,633 mm tall, the nosecone splits open to act as an airbrake, and it is meant to land itself on four folding drone arms. We are designing and building all of it ourselves.
            </p>
            <Link className="home-rocket-link" to="/stravox">Read about STRAVOX</Link>
          </div>
        </div>
      </section>

      <section className="section home-rocket home-rocket--light">
        <div className="container home-rocket-inner">
          <div className="home-rocket-text">
            <p className="eyebrow accent">Flies first</p>
            <h2>STRAVOX B1M</h2>
            <p className="home-rocket-desc">
              A smaller rocket that goes to 3 km on a KNSB motor we made ourselves. It is there to test the avionics, recovery and flight systems before we risk any of it on STRAVOX. The first engine is done, and its first static fire is pending regulatory approval. Two more are being built.
            </p>
            <Link className="home-project-link" to="/b1m">Read about B1M</Link>
          </div>
          <div className="home-rocket-img-wrap">
            <img src="/b1m-engine-cutout.png" alt="B1M engine external render" className="home-rocket-img home-rocket-img--b1m" />
          </div>
        </div>
      </section>

      <section className="section home-projects" aria-labelledby="home-projects">
        <div className="container">
          <h2 id="home-projects">Everything else we are working on</h2>
          <ul className="project-list">
            {projects.map((item) => (
              <li key={item.title}>
                <Link to={item.to}>{item.title}</Link>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="home-help">
            Want to help? We are always after materials, machining time, test sites and funding, and we are happy to hear from students who want to join. <Link to="/contact">Get in touch</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
