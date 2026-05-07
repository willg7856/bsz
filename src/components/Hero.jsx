import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="mission">
      <div className="hero-inner">
        <div className="hero-badge">Australia's Next Frontier</div>
        <h1 className="hero-heading">
          Reaching <span className="highlight">30km</span> to Replace the Weather Balloon
        </h1>
        <p className="hero-sub">
          Beyond Stage Zero is building the largest student rocket ever launched in Australia.
          Our mission: reach the stratosphere and deliver atmospheric data that rivals traditional weather balloons — at a fraction of the cost.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-blue">Get Involved</a>
          <a href="#features" className="btn btn-outline">Our Technology</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <strong>30km</strong>
            <span>Target Altitude</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>#1</strong>
            <span>Largest Australian Student Rocket</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>100%</strong>
            <span>Student Built</span>
          </div>
        </div>
      </div>
    </section>
  )
}
