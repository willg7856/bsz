import './About.css'

const TICK = Array.from({ length: 40 })

const values = [
  { index: '01', title: 'Student Led', desc: 'Every part of the project — from design to launch — is driven by students.' },
  { index: '02', title: 'Ambitious', desc: 'We set out to build Australia\'s first fully and rapidly reusable launch vehicle.' },
  { index: '03', title: 'Collaborative', desc: 'We bring together engineers, scientists, and builders from across disciplines.' },
  { index: '04', title: 'Open', desc: 'We share our progress, failures, and learnings with the broader community.' },
]

export default function About() {
  return (
    <main className="about">

      {/* ── Dark hero ───────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-grid-bg" aria-hidden="true" />
        <div className="container about-hero-inner">
          <p className="eyebrow">Who We Are</p>
          <h1 className="about-hero-h1">
            Beyond<br />
            Stage<br />
            <span className="about-hero-accent">Zero.</span>
          </h1>
          <p className="about-hero-sub">
            An Australian student rocketry team pushing the limits of what students
            can design, build, and launch.
          </p>
          <div className="about-hero-stats">
            <div className="about-stat">
              <span className="about-stat-val">12</span>
              <span className="about-stat-lbl">Team Members</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-val">2025</span>
              <span className="about-stat-lbl">Founded</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-val">Creswick</span>
              <span className="about-stat-lbl">Based In, VIC</span>
            </div>
          </div>
        </div>
        <div className="tick-rule about-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────── */}
      <section className="section about-mission-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Our Mission</p>
              <h2>Why we build.</h2>
            </div>
            <p className="lead">
              We exist to prove that students can compete at the highest levels of rocketry.
              From our first designs to the launch pad, we are building the experience,
              knowledge, and hardware to send <span className="mono">STRAVOX</span> into
              the sky — and to inspire the next generation of Australian aerospace engineers.
            </p>
          </div>
          <div className="about-mission-body">
            <blockquote className="about-mission-quote">
              Stage Zero is the ground.<br />Everything beyond it is what we're building toward.
            </blockquote>
            <div className="about-mission-detail">
              <p>
                Beyond Stage Zero started with a simple question: why can't Australian students
                build something that competes with the best rocketry programmes in the world?
                We didn't have a good answer, so we started building.
              </p>
              <p>
                We're based in Creswick, Victoria — machining our own motor casings, casting
                our own propellant, writing our own flight software, and learning everything
                the hard way. Every failure is logged. Every test is published.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────── */}
      <section className="section dark about-values-section">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '3rem' }}>Our Values</p>
          <div className="about-values">
            {values.map((v) => (
              <div className="about-value-card" key={v.index}>
                <span className="about-value-index mono">{v.index}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
