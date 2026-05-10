import { Link } from 'react-router-dom'
import './Home.css'

const TICK = Array.from({ length: 40 })

const BUILD_STAGES = [
  { num: '01', label: 'Concept',     status: 'done'   },
  { num: '02', label: 'Design',      status: 'active' },
  { num: '03', label: 'Fabrication', status: 'future' },
  { num: '04', label: 'Assembly',    status: 'future' },
  { num: '05', label: 'Ground Test', status: 'future' },
  { num: '06', label: 'Launch',      status: 'future' },
]

const STATS = [
  { value: '30',    unit: 'km',    label: 'Target apogee'   },
  { value: '2,633', unit: 'mm',    label: 'Rocket length'   },
  { value: '2.5',   unit: 'Mach',  label: 'Peak velocity'   },
  { value: '54.8',  unit: 'kg',    label: 'Launch mass'     },
  { value: '4',     unit: '×',     label: 'Landing motors'  },
  { value: '1,000', unit: 'mm',    label: 'Engine grain'    },
]

export default function Home() {
  return (
    <main className="home">

      {/* ── Dark hero ───────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-grid-bg" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-left">
            <div className="home-hero-eyebrow">
              <span>[ STAGE 02 / DESIGN ]</span>
              <span>·</span>
              <span className="home-hero-live">ACTIVE</span>
            </div>
            <h1 className="home-hero-h1">
              Australia's<br />
              largest student<br />
              <span className="home-hero-accent">rocket.</span>
            </h1>
            <p className="home-hero-sub">
              Beyond Stage Zero is an Australian student rocketry team designing,
              building, and flying <span className="mono">STRAVOX</span> to 30 km apogee.
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

      {/* ── Build stages ────────────────────────────── */}
      <section className="section dark home-stages">
        <div className="home-stages-grid-bg" aria-hidden="true" />
        <div className="container home-stages-inner">
          <p className="eyebrow" style={{ color: 'var(--ignition-400)', marginBottom: '2.5rem' }}>Build Progress</p>
          <div className="home-stages-track">
            {BUILD_STAGES.map((stage, i) => (
              <div className={`home-stage home-stage--${stage.status}`} key={stage.num}>
                <div className="home-stage-node">
                  <span className="home-stage-num mono">{stage.num}</span>
                  {stage.status === 'done' && <span className="home-stage-check">✓</span>}
                  {stage.status === 'active' && <span className="home-stage-pulse" />}
                </div>
                <span className="home-stage-label">{stage.label}</span>
                {i < BUILD_STAGES.length - 1 && (
                  <div className={`home-stage-connector${stage.status === 'done' ? ' home-stage-connector--done' : ''}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Numbers ─────────────────────────────────── */}
      <section className="section home-numbers">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: '2.5rem' }}>By the numbers</p>
          <div className="home-numbers-grid">
            {STATS.map(s => (
              <div className="home-number-card" key={s.label}>
                <div className="home-number-val">
                  <span className="home-number-figure mono">{s.value}</span>
                  <span className="home-number-unit mono">{s.unit}</span>
                </div>
                <span className="home-number-label">{s.label}</span>
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
