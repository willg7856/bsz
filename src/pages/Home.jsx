import { useState } from 'react'
import './Home.css'

/* ── Data ──────────────────────────────────────────────── */

const heroSpecs = [
  { label: 'Apogee Target', value: '30 km' },
  { label: 'Length',        value: '2,633 mm' },
  { label: 'Peak Velocity', value: 'Mach 2.5' },
  { label: 'Propulsion',    value: 'KNSB Hybrid' },
]

const numbers = [
  { label: 'Apogee',      num: '30.0',  unit: 'km',    note: 'Within 5% of design at sea-level launch.' },
  { label: 'Burn Time',   num: '4.2',   unit: 's',     note: 'Single-stage hybrid, throttle-locked.' },
  { label: 'Peak Thrust', num: '9.8',   unit: 'kN',    note: 'Static-fired April 2026 at MILD-01.' },
  { label: 'Team',        num: '48',    unit: 'eng',   note: 'Propulsion, structures, avionics, recovery.' },
  { label: 'Build Hours', num: '12.4K', unit: 'h',     note: 'Logged since project kickoff, 2024.' },
  { label: 'Test Fires',  num: '7',     unit: 'runs',  note: 'Six on-spec, one anomaly resolved.' },
  { label: 'Recovery',    num: '3',     unit: 'stage', note: 'Drogue, main, pad-recovery beacon.' },
  { label: 'Window',      num: 'Aug',   unit: '26',    note: 'Mildura, Victoria. CASA cleared.' },
]

const stages = [
  {
    label: 'Concept',     date: '2024-03', status: 'done',
    heading: 'Requirements locked. Team assembled.',
    body: 'Design requirements defined, vehicle architecture finalised, and team structure established. Initial CAD complete and peer-reviewed.',
    specs: [{ k: 'Outcome', v: 'CDR Passed' }, { k: 'Date', v: '2024-03' }, { k: 'Status', v: 'Done' }],
  },
  {
    label: 'Airframe',    date: '2025-01', status: 'done',
    heading: 'Airframe built. Both fin sets bonded.',
    body: 'Airframe fabricated and static-load tested to 3× flight loads. Both fin sets installed, bonded, and fillet-sanded. Coupler ring machined.',
    specs: [{ k: 'Outcome', v: 'PDR Passed' }, { k: 'Date', v: '2025-01' }, { k: 'Status', v: 'Done' }],
  },
  {
    label: 'Static Fire', date: '2026-02', status: 'now',
    heading: 'Six on-spec burns. One anomaly resolved.',
    body: 'Hybrid motor static fire campaign at MILD-01. Six burns within 3% of predicted thrust curve. One anomaly (oxidiser feed spike at 0.4 s) diagnosed and resolved.',
    specs: [{ k: 'Range', v: 'MILD-01' }, { k: 'Runs', v: '7' }, { k: 'Status', v: 'Active' }],
  },
  {
    label: 'Recovery',    date: '2026-05', status: 'next',
    heading: 'Three-stage recovery. Drogue, main, beacon.',
    body: 'Drogue deployment at apogee, main chute at 500 m, pad-recovery RF beacon active throughout. Full system qualification drop tests underway.',
    specs: [{ k: 'Stages', v: '3' }, { k: 'Date', v: '2026-05' }, { k: 'Status', v: 'Next' }],
  },
  {
    label: 'Launch',      date: '2026-08', status: 'next',
    heading: 'Mildura, Victoria. August window.',
    body: 'Range cleared by CASA. Pad assembled, telemetry relay tested over the full 30 km link budget. We launch when wind is below 8 m/s at 1000 ft AGL and the team is GO across all twelve console positions.',
    specs: [{ k: 'Range', v: 'MILD-01' }, { k: 'Window', v: '2026-08-14' }, { k: 'Status', v: 'Planning' }],
  },
]

const rocketFeatures = [
  { label: 'Split Nosecone',     body: 'Clamshell design opens after burnout to expose a 3.5× larger drag area — passively braking from Mach 2.5 down to ~64 m/s for the landing sequence.' },
  { label: 'KNSB Motor',         body: 'Home-ground potassium nitrate / sorbitol propellant in a 1 m grain. Pushes STRAVOX past Mach 2.5 before burnout at approximately 10 km altitude.' },
  { label: 'Propulsive Landing', body: 'Four T-Motor U13 II motors extend on folding arms at apogee. 112 kgf thrust at 2.05× T/W for a controlled vertical touchdown.' },
  { label: 'Avionics',           body: 'Flight computer, altimeter, GPS, and recovery electronics. Controls nosecone deployment, arm extension, and the full landing sequence.' },
]

const rocketSpecs = [
  { k: 'Height',      v: '2,633 mm' },
  { k: 'Diameter',    v: '200 mm' },
  { k: 'Apogee',      v: '30 km' },
  { k: 'Velocity',    v: 'Mach 2.5' },
  { k: 'Motor',       v: 'KNSB — 1 m grain' },
  { k: 'Landing T/W', v: '2.05×' },
  { k: 'Status',      v: 'In Development' },
]

const team = [
  { role: 'Project Lead',  name: 'Will Granger',    bio: 'Aerospace IV. Ex-NASA Frontier Aerospace intern. Owns the integrated schedule.' },
  { role: 'Propulsion',    name: 'Priya Natarajan', bio: 'Mech III. Designed the hybrid grain geometry; ran six of seven static fires.' },
  { role: 'Structures',    name: 'Tomás Fischer',   bio: 'Mech IV. Composites lead. Wound the fuselage at 4 a.m. on a Sunday.' },
  { role: 'Avionics',      name: 'Maya Sandhu',     bio: 'EE III. Flight computer firmware. Wrote the redundant trigger logic.' },
  { role: 'Recovery',      name: 'Rob Chen',        bio: 'Mech II. Designed the drogue-to-main chute sequence. Qualified at 6,000 m.' },
  { role: 'Software',      name: 'Alice Kowalski',  bio: 'CS III. Ground station and telemetry stack. Zero dropouts in seven test fires.' },
  { role: 'Manufacturing', name: 'James Patel',     bio: 'Mech III. CNC and composite shop lead. Machined the coupler ring in one setup.' },
  { role: 'Testing',       name: 'Sarah Nguyen',    bio: 'Physics IV. Range safety officer and test coordinator. CASA liaison.' },
]

const press = [
  { date: 'Apr 2026', tag: 'Milestone', title: 'Static Fire Campaign Complete — Six Successful Burns', body: 'After seven test fires at MILD-01, six met the predicted thrust curve within 3%. One anomaly (oxidiser feed spike at 0.4 s) has been diagnosed and resolved ahead of the launch window.' },
  { date: 'Jan 2026', tag: 'Design',    title: 'Motor Selection Finalised for STRAVOX', body: 'After months of propulsion analysis, the team has locked in the KNSB grain configuration. Integration work is underway and static fire preparations have begun at MILD-01.' },
  { date: 'Sep 2025', tag: 'Design',    title: 'Full Airframe CAD Model Completed', body: 'The structural team has finished the full CAD model of STRAVOX, covering the nosecone, payload bay, avionics section, fin can, and motor mount. Manufacturing planning is now underway.' },
  { date: 'Mar 2025', tag: 'Team',      title: 'Avionics Subteam Assembled', body: 'A dedicated avionics subteam has been formed, responsible for flight computer, sensor integration, and recovery electronics. Bench tests on dual-deploy altimeters are running through April.' },
  { date: 'Jan 2025', tag: 'Design',    title: 'Preliminary Design Review Passed', body: 'BSZ completed its first internal PDR for STRAVOX. Key decisions on diameter, fin geometry, and staging were confirmed. Action items are being tracked ahead of the Critical Design Review.' },
]

const sponsors = [
  { name: 'Creswick Railway Workshops Association', img: '/partner-crwa.svg', url: 'https://www.crwa.org.au' },
  { name: 'Ballarat Tech School',                   img: '/partner-bts.svg',  url: 'https://ballarattech.school' },
]

/* ── Component ─────────────────────────────────────────── */

export default function Home() {
  const [activeStage, setActiveStage] = useState(4)
  const [formStatus, setFormStatus] = useState('idle')
  const stage = stages[activeStage]

  async function handleSubmit(e) {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xaqvpver', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      setFormStatus(res.ok ? 'sent' : 'error')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────── */}
      <section id="mission" className="hero">
        <div className="hero-inner">
          <p className="status-line">
            [ Stage 02 / Static Fire ]&nbsp;&middot;&nbsp;
            <span className="status-accent">+T-87 Days</span>
          </p>
          <h1 className="hero-heading">
            Australia's<br />
            Largest<br />
            Student<br />
            <span className="hero-orange">Rocket.</span>
          </h1>
          <div className="hero-foot">
            <div>
              <p className="hero-body">
                Beyond Stage Zero is forty-eight engineering students designing,
                building, and flying a hybrid-propellant rocket to 30&nbsp;km apogee.
                First flight August 2026.
              </p>
              <div className="hero-ctas">
                <a href="#contact" className="btn btn-orange">Sponsor a Stage →</a>
                <a href="#rocket"  className="btn btn-ghost">Read Design Report</a>
              </div>
            </div>
            <div className="spec-table">
              {heroSpecs.map(s => (
                <div key={s.label} className="spec-row">
                  <span className="spec-label">{s.label}</span>
                  <span className="spec-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Numbers ──────────────────────────────────── */}
      <section className="cream-section">
        <div className="section-inner">
          <p className="section-tag">— [ Mission ]</p>
          <div className="split-header">
            <h2 className="condensed-heading">Numbers,<br />Not Vibes.</h2>
            <p className="section-body">
              Every figure on this page comes from a tested subsystem or a
              flight-readiness review. Updated after every static fire and
              every rev of the design.
            </p>
          </div>
          <div className="numbers-grid">
            {numbers.map(s => (
              <div key={s.label} className="number-card">
                <span className="number-label">{s.label}</span>
                <p className="number-stat">
                  <span className="number-num">{s.num}</span>
                  <span className="number-unit">{s.unit}</span>
                </p>
                <p className="number-note">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stages ───────────────────────────────────── */}
      <section id="stages" className="cream-section cream-section--sep">
        <div className="section-inner">
          <p className="section-tag">— [ Programme ]</p>
          <div className="split-header">
            <h2 className="condensed-heading">Stages of<br />the Build.</h2>
            <p className="section-body">
              The brand is named after this list. Stage Zero is the ground;
              everything beyond it is what we are doing.
              Tap a stage to read the spec.
            </p>
          </div>
          <div className="stage-selector">
            {stages.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveStage(i)}
                className={`stage-btn stage-${s.status}${activeStage === i ? ' stage-active' : ''}`}
              >
                <span className="stage-num">Stage 0{i}</span>
                <span className="stage-name">{s.label}</span>
                <span className="stage-meta">
                  {s.date}&nbsp;·&nbsp;{s.status === 'done' ? 'Done' : s.status === 'now' ? 'Now' : 'Next'}
                </span>
              </button>
            ))}
          </div>
          <div className="stage-detail">
            <div className="stage-detail-left">
              <span className="stage-tag">[ Stage 0{activeStage} / {stage.label} ]</span>
              <h3 className="stage-heading">{stage.heading}</h3>
              <p className="stage-body">{stage.body}</p>
            </div>
            <div className="stage-specs">
              {stage.specs.map(s => (
                <div key={s.k} className="stage-spec-row">
                  <span className="stage-spec-key">{s.k}</span>
                  <span className="stage-spec-val">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Rocket ───────────────────────────────────── */}
      <section id="rocket" className="dark-section">
        <div className="section-inner">
          <p className="section-tag section-tag--light">— [ Rocket ]</p>
          <h2 className="condensed-heading condensed-heading--light">STRAVOX.</h2>
          <div className="rocket-body">
            <div className="rocket-features">
              {rocketFeatures.map(f => (
                <div key={f.label} className="rocket-feature">
                  <span className="feature-label">{f.label}</span>
                  <p className="feature-body">{f.body}</p>
                </div>
              ))}
            </div>
            <div className="rocket-aside">
              <img src="/stravox-render.png" alt="STRAVOX rocket render" className="rocket-img" />
              <div className="spec-table">
                {rocketSpecs.map(s => (
                  <div key={s.k} className="spec-row">
                    <span className="spec-label">{s.k}</span>
                    <span className="spec-value">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────── */}
      <section id="team" className="cream-section">
        <div className="section-inner">
          <p className="section-tag">— [ Team ]</p>
          <div className="split-header">
            <h2 className="condensed-heading">
              Forty-Eight<br />Engineers.<br />Eight Visible.
            </h2>
            <p className="section-body">
              The team rotates twice a year as students roll on and off project.
              These eight are the leads for the current launch campaign.
            </p>
          </div>
          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} className="team-card">
                <div className="team-photo" aria-hidden="true">
                  <span>[ photo ]</span>
                </div>
                <span className="team-role">{m.role}</span>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsors ─────────────────────────────────── */}
      <section id="sponsors" className="dark-section sponsors-section">
        <div className="section-inner sponsors-inner">
          <p className="sponsors-label">Partners &amp; Supporters</p>
          <div className="sponsors-logos">
            {sponsors.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="sponsor">
                <img src={s.img} alt={s.name} />
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press ────────────────────────────────────── */}
      <section id="press" className="cream-section cream-section--sep">
        <div className="section-inner">
          <p className="section-tag">— [ Press ]</p>
          <div className="split-header">
            <h2 className="condensed-heading">Latest<br />Updates.</h2>
            <p className="section-body">
              Build logs, milestones, and announcements from the Beyond Stage Zero team.
            </p>
          </div>
          <div className="press-list">
            {press.map((p, i) => (
              <article key={p.title} className={`press-item${i === 0 ? ' press-featured' : ''}`}>
                <div className="press-meta">
                  <span className="press-tag">{p.tag}</span>
                  <span className="press-date">{p.date}</span>
                </div>
                <h3 className="press-title">{p.title}</h3>
                <p className="press-body">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section id="contact" className="dark-section">
        <div className="section-inner">
          <p className="section-tag section-tag--light">— [ Contact ]</p>
          <div className="contact-head">
            <h2 className="condensed-heading condensed-heading--light">Get In Touch.</h2>
            <a href="mailto:beyondstagezero@gmail.com" className="contact-email">
              beyondstagezero@gmail.com
            </a>
          </div>
          <div className="contact-body">
            <p className="section-body section-body--light">
              Want to collaborate, sponsor a stage, or just follow along?
              Drop us a message.
            </p>
            {formStatus === 'sent' ? (
              <div className="form-success">
                <p>Message sent — we'll be in touch shortly.</p>
                <button className="btn btn-ghost" onClick={() => setFormStatus('idle')}>
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input name="name"  type="text"  placeholder="Name"  required />
                  <input name="email" type="email" placeholder="Email" required />
                </div>
                <textarea name="message" rows={4} placeholder="Message…" required />
                {formStatus === 'error' && (
                  <p className="form-error">Something went wrong — email us directly.</p>
                )}
                <button type="submit" className="btn btn-orange" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
