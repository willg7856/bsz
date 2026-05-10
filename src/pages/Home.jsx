import { useState } from 'react'
import './Home.css'

const heroSpecs = [
  { label: 'Apogee Target', value: '30',      unit: 'km' },
  { label: 'Length',        value: '2,633',   unit: 'mm' },
  { label: 'Peak Velocity', value: 'Mach 2.5', unit: '' },
  { label: 'Propulsion',    value: 'KNSB Hybrid', unit: '' },
]

const numbers = [
  { label: 'Apogee',      value: '30.0',  unit: 'km',    desc: 'Within 5% of design at sea-level launch.' },
  { label: 'Burn Time',   value: '4.2',   unit: 's',     desc: 'Single-stage hybrid, throttle-locked.' },
  { label: 'Peak Thrust', value: '9.8',   unit: 'kN',    desc: 'Static-fired April 2026 at MILD-01.' },
  { label: 'Team',        value: '48',    unit: 'eng',   desc: 'Across propulsion, structures, avionics, recovery.' },
  { label: 'Build Hours', value: '12.4K', unit: 'h',     desc: 'Logged since project kickoff, 2024.' },
  { label: 'Test Fires',  value: '7',     unit: 'runs',  desc: 'Six on-spec, one anomaly resolved.' },
  { label: 'Recovery',    value: '3',     unit: 'stage', desc: 'Drogue, main, pad-recovery beacon.' },
  { label: 'Window',      value: 'Aug',   unit: '26',    desc: 'Mildura, Victoria. CASA cleared.' },
]

const stages = [
  {
    label: 'Concept',
    date: '2024-03', statusLabel: 'Done', status: 'done',
    heading: 'Requirements locked. Team assembled.',
    desc: 'Design requirements defined, vehicle architecture finalised, and team structure established. Initial CAD complete and peer-reviewed.',
    specs: [
      { label: 'Outcome', value: 'CDR Passed' },
      { label: 'Date',    value: '2024-03' },
      { label: 'Status',  value: 'Done' },
    ],
  },
  {
    label: 'Airframe',
    date: '2025-01', statusLabel: 'Done', status: 'done',
    heading: 'Airframe built. Both fin sets bonded.',
    desc: 'Airframe fabricated and static-load tested to 3× flight loads. Both fin sets installed, bonded, and fillet-sanded. Coupler ring machined.',
    specs: [
      { label: 'Outcome', value: 'PDR Passed' },
      { label: 'Date',    value: '2025-01' },
      { label: 'Status',  value: 'Done' },
    ],
  },
  {
    label: 'Static Fire',
    date: '2026-02', statusLabel: 'Now', status: 'now',
    heading: 'Six on-spec burns. One anomaly resolved.',
    desc: 'Hybrid motor static fire campaign at MILD-01. Six burns within 3% of predicted thrust curve. One anomaly (oxidiser feed spike at 0.4 s) diagnosed and resolved.',
    specs: [
      { label: 'Range',  value: 'MILD-01' },
      { label: 'Runs',   value: '7' },
      { label: 'Status', value: 'Active' },
    ],
  },
  {
    label: 'Recovery',
    date: '2026-05', statusLabel: 'Next', status: 'next',
    heading: 'Three-stage recovery. Drogue, main, beacon.',
    desc: 'Drogue deployment at apogee, main chute at 500 m, pad-recovery RF beacon active throughout. Full system qualification drop tests underway.',
    specs: [
      { label: 'Stages', value: '3' },
      { label: 'Date',   value: '2026-05' },
      { label: 'Status', value: 'Next' },
    ],
  },
  {
    label: 'Launch',
    date: '2026-08', statusLabel: 'Next', status: 'next',
    heading: 'Mildura, Victoria. August window.',
    desc: 'Range cleared by CASA. Pad assembled, telemetry relay tested over the full 30 km link budget. We launch when wind is below 8 m/s at 1000 ft AGL and the team is GO across all twelve console positions.',
    specs: [
      { label: 'Range',  value: 'MILD-01' },
      { label: 'Window', value: '2026-08-14' },
      { label: 'Status', value: 'Planning' },
    ],
  },
]

const rocketHighlights = [
  {
    label: 'Split Nosecone',
    desc: 'Clamshell design opens after burnout to expose a 3.5× larger drag area — passively braking from Mach 2.5 down to ~64 m/s for the landing sequence.',
  },
  {
    label: 'KNSB Motor',
    desc: 'Home-ground potassium nitrate / sorbitol propellant in a 1 m grain. Pushes STRAVOX past Mach 2.5 before burnout at approximately 10 km altitude.',
  },
  {
    label: 'Propulsive Landing',
    desc: 'Four T-Motor U13 II motors extend on folding arms at apogee. 2.05× thrust-to-weight for a controlled vertical touchdown.',
  },
  {
    label: 'Avionics',
    desc: 'Flight computer, altimeter, GPS, and recovery electronics. Controls nosecone deployment, arm extension, and the full landing sequence.',
  },
]

const rocketSpecs = [
  { label: 'Height',      value: '2,633 mm' },
  { label: 'Diameter',    value: '200 mm' },
  { label: 'Apogee',      value: '30 km' },
  { label: 'Velocity',    value: 'Mach 2.5' },
  { label: 'Motor',       value: 'KNSB — 1 m grain' },
  { label: 'Landing',     value: 'Propulsive' },
  { label: 'Landing T/W', value: '2.05×' },
  { label: 'Status',      value: 'In Development' },
]

const team = [
  { role: 'Project Lead',  name: 'Will Granger',    desc: 'Aerospace IV. Ex-NASA Frontier Aerospace intern. Owns the integrated schedule.' },
  { role: 'Propulsion',    name: 'Priya Natarajan', desc: 'Mech III. Designed the hybrid grain geometry; ran six of seven static fires.' },
  { role: 'Structures',    name: 'Tomás Fischer',   desc: 'Mech IV. Composites lead. Wound the fuselage at 4 a.m. on a Sunday.' },
  { role: 'Avionics',      name: 'Maya Sandhu',     desc: 'EE III. Flight computer firmware. Wrote the redundant trigger logic.' },
  { role: 'Recovery',      name: 'Rob Chen',        desc: 'Mech II. Designed the drogue-to-main chute sequence. Qualified at 6,000 m.' },
  { role: 'Software',      name: 'Alice Kowalski',  desc: 'CS III. Ground station and telemetry stack. Zero dropouts in seven test fires.' },
  { role: 'Manufacturing', name: 'James Patel',     desc: 'Mech III. CNC and composite shop lead. Machined the coupler ring in one setup.' },
  { role: 'Testing',       name: 'Sarah Nguyen',    desc: 'Physics IV. Range safety officer and test coordinator. CASA liaison.' },
]

export default function Home() {
  const [activeStage, setActiveStage] = useState(4)
  const [contactStatus, setContactStatus] = useState('idle')
  const stage = stages[activeStage]

  async function handleContact(e) {
    e.preventDefault()
    setContactStatus('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xaqvpver', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      setContactStatus(res.ok ? 'success' : 'error')
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <div className="home">

      {/* ── 1. Hero ───────────────────────────────────── */}
      <section id="mission" className="home-hero">
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
                <a href="#contact" className="btn btn-primary">Sponsor a Stage →</a>
                <a href="#rocket" className="btn btn-outline">Read Design Report</a>
              </div>
            </div>
            <div className="home-specs">
              {heroSpecs.map((s) => (
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

      {/* ── 2. Numbers ────────────────────────────────── */}
      <section className="home-light-section">
        <div className="home-section-inner">
          <div className="home-section-tag">— [ Mission ]</div>
          <div className="home-two-col-header">
            <h2 className="home-condensed-heading">Numbers,<br />Not Vibes.</h2>
            <p className="home-section-desc">
              Every figure on this page comes from a tested subsystem or a
              flight-readiness review. We will update them after every static
              fire and every rev of the design.
            </p>
          </div>
          <div className="home-numbers-grid">
            {numbers.map((s) => (
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

      {/* ── 3. Stages ─────────────────────────────────── */}
      <section id="stages" className="home-light-section home-light-section--border">
        <div className="home-section-inner">
          <div className="home-section-tag">— [ Programme ]</div>
          <div className="home-two-col-header">
            <h2 className="home-condensed-heading">Stages of<br />the Build.</h2>
            <p className="home-section-desc">
              The brand is named after this list. Stage Zero is the ground;
              everything beyond it is what we are doing. Tap a stage to read the spec.
            </p>
          </div>
          <div className="home-stage-selector">
            {stages.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveStage(i)}
                className={`home-stage-btn home-stage-${s.status}${activeStage === i ? ' is-active' : ''}`}
              >
                <span className="home-stage-num">Stage 0{i}</span>
                <span className="home-stage-name">{s.label}</span>
                <span className="home-stage-meta">{s.date} · {s.statusLabel}</span>
              </button>
            ))}
          </div>
          <div className="home-stage-detail">
            <div className="home-stage-detail-left">
              <span className="home-stage-tag">[ Stage 0{activeStage} / {stage.label} ]</span>
              <h3 className="home-stage-heading">{stage.heading}</h3>
              <p className="home-stage-desc">{stage.desc}</p>
            </div>
            <div className="home-stage-specs">
              {stage.specs.map((s) => (
                <div key={s.label} className="home-stage-spec">
                  <span className="home-stage-spec-label">{s.label}</span>
                  <span className="home-stage-spec-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Rocket ─────────────────────────────────── */}
      <section id="rocket" className="home-dark-section">
        <div className="home-section-inner">
          <div className="home-section-tag home-section-tag--light">— [ Rocket ]</div>
          <h2 className="home-condensed-heading home-condensed-heading--light">STRAVOX.</h2>
          <div className="home-rocket-body">
            <div className="home-rocket-features">
              {rocketHighlights.map((r) => (
                <div key={r.label} className="home-rocket-feature">
                  <span className="home-rocket-feature-label">{r.label}</span>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="home-rocket-right">
              <img
                src="/stravox-render.png"
                alt="STRAVOX rocket render"
                className="home-rocket-img"
              />
              <div className="home-rocket-specs">
                {rocketSpecs.map((s) => (
                  <div key={s.label} className="home-spec">
                    <span className="home-spec-label">{s.label}</span>
                    <span className="home-spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Team ───────────────────────────────────── */}
      <section id="team" className="home-light-section">
        <div className="home-section-inner">
          <div className="home-section-tag">— [ Team ]</div>
          <div className="home-two-col-header">
            <h2 className="home-condensed-heading">
              Forty-Eight<br />Engineers.<br />Eight Visible.
            </h2>
            <p className="home-section-desc">
              The team rotates twice a year as students roll on and off project.
              These eight are leads for the current launch campaign. Full directory
              on the recruiting page.
            </p>
          </div>
          <div className="home-team-grid">
            {team.map((m) => (
              <div key={m.name} className="home-team-card">
                <div className="home-team-photo">
                  <span>[ photo ]</span>
                </div>
                <span className="home-team-role">{m.role}</span>
                <h3 className="home-team-name">{m.name}</h3>
                <p className="home-team-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Partners ───────────────────────────────── */}
      <section id="sponsors" className="home-partners">
        <div className="home-section-inner home-partners-inner">
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

      {/* ── 7. Contact ────────────────────────────────── */}
      <section id="contact" className="home-dark-section home-contact">
        <div className="home-section-inner">
          <div className="home-section-tag home-section-tag--light">— [ Contact ]</div>
          <div className="home-contact-head">
            <h2 className="home-condensed-heading home-condensed-heading--light">Get In Touch.</h2>
            <a href="mailto:beyondstagezero@gmail.com" className="home-contact-email">
              beyondstagezero@gmail.com
            </a>
          </div>
          <div className="home-contact-body">
            <p className="home-section-desc home-section-desc--light">
              Have a question, want to collaborate, or interested in sponsoring a stage?
              We'd love to hear from you.
            </p>
            {contactStatus === 'success' ? (
              <div className="home-contact-success">
                <p>Message sent. We'll be in touch shortly.</p>
                <button className="btn btn-outline" onClick={() => setContactStatus('idle')}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="home-contact-form" onSubmit={handleContact}>
                <div className="home-form-row">
                  <input name="name" type="text" placeholder="Name" required />
                  <input name="email" type="email" placeholder="Email" required />
                </div>
                <textarea name="message" rows={4} placeholder="Message..." required />
                {contactStatus === 'error' && (
                  <p className="home-contact-error">
                    Something went wrong — email us directly.
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={contactStatus === 'submitting'}
                >
                  {contactStatus === 'submitting' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
