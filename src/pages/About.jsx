import { Link } from 'react-router-dom'
import './About.css'

const TICK = Array.from({ length: 40 })

const values = [
  { index: '01', title: 'Student Led', desc: 'Every part of the project — from design to launch — is driven by students.' },
  { index: '02', title: 'Ambitious', desc: 'We set out to build Australia\'s first fully and rapidly reusable launch vehicle.' },
  { index: '03', title: 'Collaborative', desc: 'We bring together engineers, scientists, and builders from across disciplines.' },
  { index: '04', title: 'Open', desc: 'We share our progress, failures, and learnings with the broader community.' },
]

const capabilities = [
  {
    code: 'PROP',
    title: 'Propulsion',
    desc: 'Home-built KNSB motors — casing design, propellant casting, nozzle work, and static-fire campaigns from Mk I through B1M.',
  },
  {
    code: 'STRU',
    title: 'Structures',
    desc: 'Airframe, fins, and recovery bay design for B1M and full-scale STRAVOX — machined and assembled in Creswick.',
  },
  {
    code: 'AVIO',
    title: 'Avionics',
    desc: 'Flight computer, altimeter, GPS, and recovery electronics sized for sub-scale flight before the 30 km vehicle.',
  },
  {
    code: 'LINK',
    title: 'Range data',
    desc: 'Octopus — the pad and vehicle data link into Goods Shed mission control for live static fires and launches.',
  },
  {
    code: 'RECO',
    title: 'Recovery & landing',
    desc: 'Parachute recovery on B1M today; propulsive vertical landing on folding drone arms for full-scale STRAVOX.',
  },
  {
    code: 'OPS',
    title: 'Mission ops',
    desc: 'CASA range path, Victorian launch planning, and Goods Shed operations for the flight programme.',
  },
]

const proof = [
  { val: '4', lbl: 'Static fires completed', note: 'Mk I & Mk II campaigns logged and published' },
  { val: '9', lbl: 'Engines built', note: 'From early ground motors to B1M production' },
  { val: 'Apr 2025', lbl: 'Founded', note: 'Creswick, Victoria — programme start' },
  { val: 'Q4\'26–Q1\'27', lbl: 'First flight window', note: 'STRAVOX B1M-01 · 3 km systems validation' },
]

const partners = [
  {
    name: 'Creswick Railway Workshops Association',
    href: 'https://www.crwa.org.au',
    logo: '/partner-crwa.svg',
    role: 'Workshop & base',
    desc: 'Our home at the Creswick Goods Shed — machining, assembly, and mission control for static fires and launches.',
  },
  {
    name: 'Ballarat Tech School',
    href: 'https://ballarattech.school',
    logo: '/partner-bts.svg',
    role: 'Education partner',
    desc: 'Supporting the student programme with skills, facilities, and a pathway into hands-on aerospace engineering.',
  },
]

const roster = [
  { name: 'Will', role: 'CEO' },
  { name: 'Seb', role: 'STRAVOX B1M Lead' },
  { name: 'Jet', role: 'Ceramics Lead' },
  { name: 'Columbus', role: 'Drone Propulsion Lead' },
  { name: 'Arnav', role: 'TVC Development' },
  { name: 'Wave', role: 'Spittership Lead' },
  { name: 'Sage', role: 'Fibreglass Lead' },
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
            An Australian student rocketry team designing, building, and flying
            hardware from Creswick, Victoria — with published tests, institutional
            partners, and a clear path to first flight.
          </p>
          <div className="about-hero-stats">
            <div className="about-stat">
              <span className="about-stat-val">17</span>
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
                our own propellant, writing our own range data links (Octopus), and learning everything
                the hard way. Every failure is logged. Every test is published.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Base ────────────────────────────────────── */}
      <section className="section dark about-base-section">
        <div className="container about-base">
          <div className="about-base-copy">
            <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Base of operations</p>
            <h2>Creswick Goods Shed.</h2>
            <p className="lead">
              We design and build out of the historic railway workshops in Creswick —
              real industrial floor space for motors, airframes, and Goods Shed mission control.
            </p>
          </div>
          <dl className="about-base-facts">
            <div className="about-base-fact">
              <dt>Location</dt>
              <dd>Creswick, Victoria · Australia</dd>
            </div>
            <div className="about-base-fact">
              <dt>Workshop</dt>
              <dd>Machining, assembly, propellant work</dd>
            </div>
            <div className="about-base-fact">
              <dt>Mission control</dt>
              <dd>Goods Shed ops via Octopus data link</dd>
            </div>
            <div className="about-base-fact">
              <dt>Launch path</dt>
              <dd>CASA-cleared Victorian range planning</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Partners ────────────────────────────────── */}
      <section className="section about-partners-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Partners</p>
              <h2>Who stands with us.</h2>
            </div>
            <p className="lead">
              Institutional partners give the programme a real workshop, education pathway,
              and a place to run range operations — not just a logo row.
            </p>
          </div>
          <div className="about-partners">
            {partners.map((p) => (
              <a
                key={p.name}
                className="about-partner"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={p.logo} alt="" />
                <div className="about-partner-body">
                  <span className="about-partner-role mono">{p.role}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roster ──────────────────────────────────── */}
      <section className="section about-roster-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">The team</p>
              <h2>Who leads it.</h2>
            </div>
            <p className="lead">
              Programme leads across vehicles, propulsion, and materials — part of a
              twelve-person student team building STRAVOX from Creswick.
            </p>
          </div>
          <div className="about-roster">
            {roster.map((m) => (
              <div className="about-roster-row" key={m.name}>
                <span className="about-roster-name">{m.name}</span>
                <span className="about-roster-role mono">{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ────────────────────────────── */}
      <section className="section about-capabilities-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Coverage</p>
              <h2>What we cover.</h2>
            </div>
            <p className="lead">
              Twelve students across the disciplines that make a flight programme real —
              from home-built motors to Goods Shed mission ops.
            </p>
          </div>
          <div className="about-capabilities">
            {capabilities.map((c) => (
              <div className="about-capability" key={c.code}>
                <span className="about-capability-code mono">{c.code}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────── */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Our Values</p>
              <h2>How we work.</h2>
            </div>
            <p className="lead">
              Student-led, ambitious, collaborative, and open — the same standards we hold
              for the hardware apply to how the team operates.
            </p>
          </div>
          <div className="about-values">
            {values.map((v) => (
              <div className="about-value" key={v.index}>
                <span className="about-value-index mono">{v.index}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ───────────────────────────────────── */}
      <section className="section dark about-proof-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Track record</p>
              <h2>Built in public.</h2>
            </div>
            <p className="lead">
              Static fires, engine iterations, and programme milestones are published as we go —
              including the failures that shaped the next design.
            </p>
          </div>
          <div className="about-proof">
            {proof.map((p) => (
              <div className="about-proof-item" key={p.lbl}>
                <span className="about-proof-val">{p.val}</span>
                <span className="about-proof-lbl">{p.lbl}</span>
                <span className="about-proof-note">{p.note}</span>
              </div>
            ))}
          </div>
          <div className="about-proof-actions">
            <Link className="btn btn-primary" to="/news">Read the updates →</Link>
            <Link className="btn btn-ghost-dark" to="/tests">Test campaigns</Link>
          </div>
        </div>
      </section>

      {/* ── Join ────────────────────────────────────── */}
      <section className="section about-join-section">
        <div className="container about-join">
          <div>
            <p className="eyebrow">Get involved</p>
            <h2>Build with us.</h2>
            <p className="lead">
              Sponsorship, team applications, Spittership, or media — tell us why you're
              reaching out and we'll take it from there.
            </p>
          </div>
          <div className="about-join-actions">
            <Link className="btn btn-primary" to="/contact">Contact the team →</Link>
            <a
              className="btn btn-outline"
              href="https://x.com/beyondstagezero"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on X
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
