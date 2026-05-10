import { Link } from 'react-router-dom'
import './Home.css'

const specs = [
  { label: 'APOGEE TARGET', value: '38.8', unit: 'km' },
  { label: 'LENGTH',        value: '4.28', unit: 'm' },
  { label: 'WET MASS',      value: '38.6', unit: 'kg' },
  { label: 'PROPULSION',    value: 'Hybrid · N₂O / HTPB', unit: '' },
]

const stats = [
  { label: 'APOGEE',      value: '30.0', unit: 'km',    desc: 'Within 5% of design at sea-level launch.' },
  { label: 'BURN TIME',   value: '4.2',  unit: 's',     desc: 'Single-stage hybrid, throttle-locked.' },
  { label: 'PEAK THRUST', value: '9.8',  unit: 'kN',    desc: 'Static-fired April 2026 at MILD-01.' },
  { label: 'TEAM',        value: '48',   unit: 'eng',   desc: 'Across propulsion, structures, avionics, recovery.' },
  { label: 'BUILD HOURS', value: '12.4K', unit: 'h',   desc: 'Logged since project kickoff, 2024.' },
  { label: 'TEST FIRES',  value: '7',    unit: 'runs',  desc: 'Six on-spec, one anomaly resolved.' },
  { label: 'RECOVERY',    value: '3',    unit: 'stage', desc: 'Drogue, main, pad-recovery beacon.' },
  { label: 'WINDOW',      value: 'Aug',  unit: '26',    desc: 'Mildura, Victoria. CASA cleared.' },
]

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-inner">
          <p className="home-status">
            [ Stage 02 / Static Fire ]&nbsp;&middot;&nbsp;
            <span className="home-status-accent">+T-87 Days</span>
          </p>

          <h1 className="home-heading">
            Australia's<br />
            Largest<br />
            Student<br />
            <span className="home-heading-orange">Rocket.</span>
          </h1>

          <div className="home-hero-bottom">
            <div className="home-hero-left">
              <p className="home-desc">
                Beyond Stage Zero is forty-eight engineering students designing,
                building, and flying a hybrid-propellant rocket to 30&nbsp;km apogee.
                First flight August 2026.
              </p>
              <div className="home-actions">
                <Link className="btn btn-primary" to="/contact">Sponsor a Stage →</Link>
                <Link className="btn btn-outline" to="/stravox">Read Design Report</Link>
              </div>
            </div>

            <div className="home-specs">
              {specs.map((s) => (
                <div className="home-spec" key={s.label}>
                  <span className="home-spec-label">{s.label}</span>
                  <span className="home-spec-value">
                    {s.value}
                    {s.unit && <span className="home-spec-unit">&nbsp;{s.unit}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-numbers">
        <div className="home-numbers-inner">
          <div className="home-numbers-tag">— [ Mission ]</div>
          <div className="home-numbers-header">
            <h2 className="home-numbers-heading">Numbers,<br />Not Vibes.</h2>
            <p className="home-numbers-desc">
              Every figure on this page comes from a tested subsystem or a
              flight-readiness review. We will update them after every static
              fire and every rev of the design.
            </p>
          </div>
          <div className="home-numbers-grid">
            {stats.map((s) => (
              <div className="home-number-card" key={s.label}>
                <span className="home-number-label">{s.label}</span>
                <div className="home-number-value">
                  <span className="home-number-num">{s.value}</span>
                  <span className="home-number-unit">{s.unit}</span>
                </div>
                <p className="home-number-desc">{s.desc}</p>
              </div>
            ))}
          </div>
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
    </div>
  )
}
