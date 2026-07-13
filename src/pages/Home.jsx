import { Link } from 'react-router-dom'
import './Home.css'

const TICK = Array.from({ length: 40 })

export default function Home() {
  return (
    <main className="home">

      {/* ── Dark hero ───────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-grid-bg" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-left">
            <div className="home-hero-eyebrow">
              <span>[ STAGE 01 / DESIGN ]</span>
              <span>·</span>
              <span className="home-hero-live">ACTIVE</span>
            </div>
            <h1 className="home-hero-h1">
              Beyond Stage <span className="home-hero-accent">Zero.</span>
              <span className="home-hero-h1-divider" aria-hidden="true" />
              <span className="home-hero-h1-sub">Australia's first fully and<br />rapidly reusable launch vehicle.</span>
            </h1>
            <p className="home-hero-sub">
              An Australian student rocketry team designing, building, and flying
              <span className="mono"> STRAVOX</span> to 30 km apogee.
            </p>
            <div className="home-hero-actions">
              <Link className="btn btn-primary" to="/stravox">Explore the rocket →</Link>
              <Link className="btn btn-ghost-dark" to="/contact">Get involved</Link>
            </div>
          </div>

          <div className="home-hero-spec">
            <div className="home-spec-row">
              <span className="home-spec-lbl">Apogee target</span>
              <span className="home-spec-val accent">30.0 km</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Length</span>
              <span className="home-spec-val">2,633 mm</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Peak velocity</span>
              <span className="home-spec-val">Mach 2.5</span>
            </div>
            <div className="home-spec-row">
              <span className="home-spec-lbl">Founded</span>
              <span className="home-spec-val">2025 · Creswick VIC</span>
            </div>
          </div>
        </div>
        <div className="tick-rule home-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Partners ────────────────────────────────── */}
      <section className="section home-partners">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: '2.5rem' }}>Partners &amp; Supporters</p>
          <div className="home-partners-logos">
            <a className="home-partner" href="https://www.crwa.org.au" target="_blank" rel="noopener noreferrer">
              <img src="/partner-crwa.svg" alt="Creswick Railway Workshops Association" />
              <span>Creswick Railway Workshops Association</span>
            </a>
            <a className="home-partner" href="https://ballarattech.school" target="_blank" rel="noopener noreferrer">
              <img src="/partner-bts.svg" alt="Ballarat Tech School" />
              <span>Ballarat Tech School</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Programme strip ─────────────────────────── */}
      <section className="section home-strip">
        <div className="container">
          <div className="home-strip-grid">
            {[
              { val: '4',    lbl: 'Static fires completed' },
              { val: '9',    lbl: 'Engines built' },
              { val: '4 km', lbl: 'First mission target' },
              { val: '2026', lbl: 'First launch year' },
            ].map(s => (
              <div key={s.lbl} className="home-strip-stat">
                <span className="home-strip-val">{s.val}</span>
                <span className="home-strip-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rocket preview ──────────────────────────── */}
      <section className="section dark home-rocket">
        <div className="container home-rocket-inner">
          <div className="home-rocket-text">
            <p className="eyebrow" style={{ color: 'var(--ignition-400)' }}>Currently in development</p>
            <h2>STRAVOX</h2>
            <p className="home-rocket-desc">
              A 2,633 mm high-power rocket with a split nosecone airbrake and
              propulsive vertical landing on four folding drone arms. Designed
              and built from scratch by the Beyond Stage Zero team.
            </p>
            <Link className="home-rocket-link" to="/stravox">
              Explore the design →
            </Link>
          </div>
          <div className="home-rocket-img-wrap">
            <img src="/stravox-render.png" alt="STRAVOX rocket render" className="home-rocket-img" />
          </div>
        </div>
      </section>

    </main>
  )
}
