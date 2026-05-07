import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">Trusted by 200+ businesses</div>
        <h1 className="hero-heading">
          We Build <span className="highlight">Digital Experiences</span> That Drive Growth
        </h1>
        <p className="hero-sub">
          Apex Agency is a full-service digital agency helping brands stand out, convert visitors,
          and scale with strategy-led design and development.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-blue">Start a Project</a>
          <a href="#features" className="btn btn-outline">See Our Services</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <strong>200+</strong>
            <span>Projects Delivered</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>98%</strong>
            <span>Client Satisfaction</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>8 yrs</strong>
            <span>In Business</span>
          </div>
        </div>
      </div>
    </section>
  )
}
