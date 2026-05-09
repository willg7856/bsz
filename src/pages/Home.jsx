import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <p className="home-eyebrow">Founded 2025 — Australia</p>
        <h1>Beyond Stage Zero</h1>
        <div className="home-divider" />
        <p className="home-tagline">
          Building Australia's largest student rocket —{' '}
          <span className="mono accent">STRAVOX</span>.
        </p>
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-num">2,633 mm</span>
            <span className="home-stat-label">Height</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">30 km</span>
            <span className="home-stat-label">Apogee</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">Mach 2.5</span>
            <span className="home-stat-label">Peak Velocity</span>
          </div>
        </div>
        <div className="home-actions">
          <Link className="btn btn-primary" to="/stravox">Our Rocket</Link>
          <Link className="btn btn-outline" to="/contact">Get in Touch</Link>
        </div>
        <div className="home-scroll-hint">
          <span />
        </div>
      </section>

      <section className="home-partners">
        <div className="home-partners-inner">
          <p className="home-partners-label">Partners &amp; Supporters</p>
          <div className="home-partners-logos">
            <a
              className="home-partner"
              href="https://www.crwa.org.au"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/partner-crwa.svg" alt="Creswick Railway Workshops Association" />
              <span>Creswick Railway Workshops Association</span>
            </a>
            <a
              className="home-partner"
              href="https://ballarattech.school"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/partner-bts.svg" alt="Ballarat Tech School" />
              <span>Ballarat Tech School</span>
            </a>
          </div>
        </div>
      </section>

      <section className="home-rocket">
        <div className="home-rocket-inner">
          <div className="home-rocket-text">
            <p className="eyebrow">Currently in development</p>
            <h2 className="mono">STRAVOX</h2>
            <p>
              A 2,633 mm high-power rocket with a split nosecone airbrake and
              propulsive vertical landing on four folding drone arms. Designed
              and built from scratch by the Beyond Stage Zero team — targeting
              a 30 km apogee at Mach 2.5.
            </p>
            <Link className="home-rocket-link" to="/stravox">
              Explore the design <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-rocket-img-wrap">
            <img src="/stravox-render.png" alt="STRAVOX rocket render" className="home-rocket-img" />
          </div>
        </div>
      </section>
    </div>
  )
}
