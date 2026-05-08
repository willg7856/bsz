import { Link } from 'react-router-dom'
import Stars from '../components/Stars'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Stars />
      <div className="home-hero">
        <p className="home-eyebrow">Founded 2025 — Australia</p>
        <h1>Beyond Stage Zero</h1>
        <div className="home-divider" />
        <p className="home-tagline">
          Building Australia's Largest Student Rocket,{' '}
          <span className="mono accent">STRAVOX</span>.
        </p>
        <div className="home-actions">
          <Link className="btn btn-primary" to="/stravox">Our Rocket</Link>
          <Link className="btn btn-outline" to="/contact">Get in Touch</Link>
        </div>
      </div>
      <div className="home-glow" />
    </div>
  )
}
