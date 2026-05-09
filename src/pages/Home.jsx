import { Link } from 'react-router-dom'
import Stars from '../components/Stars'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Stars />

      <section className="home-hero">
        <p className="home-eyebrow">Founded 2025 — Australia</p>
        <h1>Beyond Stage Zero</h1>
        <div className="home-divider" />
        <p className="home-tagline">
          Building Australia's largest student rocket,{' '}
          <span className="mono accent">STRAVOX</span>.
        </p>
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-num">2.6 m</span>
            <span className="home-stat-label">Height</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">30 km</span>
            <span className="home-stat-label">Apogee</span>
          </div>
          <div className="home-stat">
            <span className="home-stat-num">1.4 t</span>
            <span className="home-stat-label">Thrust</span>
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

      <section className="home-rocket">
        <div className="home-rocket-inner">
          <div className="home-rocket-text">
            <p className="eyebrow">Currently in development</p>
            <h2 className="mono">STRAVOX</h2>
            <p>
              Australia's largest student-built rocket. Designed and constructed
              from scratch by the Beyond Stage Zero team — 2.6 m tall and built
              to reach a 30 km apogee on 1.4 tonnes of thrust.
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
