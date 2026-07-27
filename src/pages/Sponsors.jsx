import { Link } from 'react-router-dom'
import './Sponsors.css'

const TICK = Array.from({ length: 40 })

const why = [
  {
    index: '01',
    title: 'Real hardware, not a club poster',
    desc: 'Four static fires completed, nine engines built, vehicles in production — and every campaign published. Sponsors back a working programme, not a pitch deck.',
  },
  {
    index: '02',
    title: 'Australia\'s reusable path',
    desc: 'We are building toward the country\'s first fully and rapidly reusable launch vehicle — starting with B1M at 3 km, then the 100 m hopper, then full-scale STRAVOX.',
  },
  {
    index: '03',
    title: 'Student-led, institution-backed',
    desc: 'Seventeen students design, machine, cast, and fly from the Creswick Goods Shed — with workshop and education partners already on the programme.',
  },
  {
    index: '04',
    title: 'Clear first flight window',
    desc: 'STRAVOX B1M-01 targets Q4\'26–Q1\'27. Sponsorship now buys materials, motors, avionics, and range readiness before that window closes.',
  },
]

const needs = [
  {
    code: 'PROP',
    title: 'Propulsion & propellant',
    desc: 'KNSB ingredients, casing stock, nozzle materials, and static-fire consumables for the B1M motor campaign.',
  },
  {
    code: 'STRU',
    title: 'Airframe & structures',
    desc: 'Tube, fin, recovery bay, and machining stock for B1M airframes and the 100 m hopper.',
  },
  {
    code: 'AVIO',
    title: 'Avionics & recovery',
    desc: 'Flight computers, altimeters, GPS, batteries, parachutes, and harness hardware for flight-ready vehicles.',
  },
  {
    code: 'OPS',
    title: 'Range & mission ops',
    desc: 'CASA path costs, range logistics, Octopus ground hardware, and Goods Shed mission-control kit.',
  },
  {
    code: 'TOOL',
    title: 'Workshop tooling',
    desc: 'Metrology, casting fixtures, test stand instrumentation, and shop upgrades that accelerate every build.',
  },
  {
    code: 'KIND',
    title: 'In-kind & expertise',
    desc: 'Materials, CNC time, composites, electronics, legal, or logistics — if it gets a vehicle closer to the pad, we want to talk.',
  },
]

const tiers = [
  {
    name: 'Mission Partner',
    level: '01',
    blurb: 'Anchor support for a vehicle or campaign — B1M flight, hopper hop, or a named static-fire series.',
    benefits: [
      'Primary logo on vehicle / test stand where practical',
      'Featured placement on site and programme materials',
      'Named partnership in news and flight updates',
      'Workshop visit and flight-day observer access',
      'Direct line to the team leads',
    ],
  },
  {
    name: 'Programme Sponsor',
    level: '02',
    blurb: 'Sustained support across propulsion, structures, or avionics — cash or in-kind that keeps the pipeline moving.',
    benefits: [
      'Logo on beyondstagezero.com partners section',
      'Credit in relevant test logs and mission pages',
      'Social recognition on @beyondstagezero',
      'Invitation to static fires and build days',
    ],
  },
  {
    name: 'Supporter',
    level: '03',
    blurb: 'Targeted help — a material run, a tool, a component lot, or a one-off cash gift that unblocks a milestone.',
    benefits: [
      'Name listed with partners & supporters',
      'Thank-you in the related campaign update',
      'Open invitation to follow the programme',
    ],
  },
]

const returns = [
  { label: 'Brand association', note: 'Tie your name to Australia\'s student-built reusable flight programme.' },
  { label: 'Visible hardware', note: 'Logos and credits on real vehicles, stands, and published test campaigns.' },
  { label: 'Talent pipeline', note: 'Seventeen builders learning propulsion, structures, avionics, and ops the hard way.' },
  { label: 'Regional story', note: 'Creswick and Ballarat — regional Victoria doing aerospace in a Goods Shed, not a CBD.' },
  { label: 'Open progress', note: 'We publish fires, failures, and milestones. Your support shows up in the public record.' },
  { label: 'Access', note: 'Come to the workshop. Watch a static fire. See the hardware you helped fund.' },
]

const partners = [
  {
    name: 'Creswick Railway Workshops Association',
    href: 'https://www.crwa.org.au',
    logo: '/partner-crwa.svg',
    role: 'Workshop & base',
  },
  {
    name: 'Ballarat Tech School',
    href: 'https://ballarattech.school',
    logo: '/partner-bts.svg',
    role: 'Education partner',
  },
]

export default function Sponsors() {
  return (
    <main className="sponsors">

      <section className="sponsors-hero">
        <div className="sponsors-hero-grid-bg" aria-hidden="true" />
        <div className="container sponsors-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Sponsorship ]
            </p>
            <h1 className="sponsors-hero-h1">
              Beyond Stage<br />
              <span className="sponsors-hero-accent">Zero.</span>
            </h1>
            <p className="sponsors-hero-sub">
              Partner with Australia&apos;s student rocketry team building a fully
              and rapidly reusable launch vehicle — from Creswick, with published
              tests and a clear path to first flight.
            </p>
            <div className="sponsors-hero-actions">
              <Link className="btn btn-primary" to="/contact">Start a conversation →</Link>
              <a className="btn btn-ghost-dark" href="mailto:beyondstagezero@gmail.com?subject=Sponsorship%20enquiry">
                Email the team
              </a>
            </div>
          </div>
          <div className="sponsors-hero-stat-row">
            <div className="sponsors-hero-stat">
              <span className="sponsors-hero-stat-val">4</span>
              <span className="sponsors-hero-stat-lbl">Static fires completed</span>
            </div>
            <div className="sponsors-hero-stat">
              <span className="sponsors-hero-stat-val">9</span>
              <span className="sponsors-hero-stat-lbl">Engines built</span>
            </div>
            <div className="sponsors-hero-stat">
              <span className="sponsors-hero-stat-val">Q4&apos;26–Q1&apos;27</span>
              <span className="sponsors-hero-stat-lbl">First flight window</span>
            </div>
          </div>
        </div>
        <div className="tick-rule sponsors-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why sponsor</p>
              <h2>Back a programme already on the stand.</h2>
            </div>
            <p className="lead">
              Sponsorship here funds propellant, metal, electronics, and range
              readiness — not overhead theatre. You help students put flight
              hardware on a Victorian pad.
            </p>
          </div>
          <div className="sponsors-why">
            {why.map((item) => (
              <div className="sponsors-why-item" key={item.index}>
                <span className="sponsors-why-index mono">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Where support goes</p>
              <h2>What we need next.</h2>
            </div>
            <p className="lead" style={{ color: 'var(--ink-400)' }}>
              Cash or in-kind. If it moves B1M, the hopper, or STRAVOX closer to
              flight, it belongs on this list.
            </p>
          </div>
          <div className="sponsors-needs">
            {needs.map((n) => (
              <div className="sponsors-need" key={n.code}>
                <span className="sponsors-need-code mono">{n.code}</span>
                <h3>{n.title}</h3>
                <p>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Partnership levels</p>
              <h2>Pick the depth that fits.</h2>
            </div>
            <p className="lead">
              Levels describe relationship and visibility — not a fixed price list.
              We shape packages around what you can give and what the flight
              programme needs.
            </p>
          </div>
          <div className="sponsors-tiers">
            {tiers.map((t) => (
              <div className="sponsors-tier" key={t.name}>
                <div className="sponsors-tier-head">
                  <span className="sponsors-tier-level mono">{t.level}</span>
                  <h3>{t.name}</h3>
                  <p>{t.blurb}</p>
                </div>
                <ul className="sponsors-tier-list">
                  {t.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark sponsors-return-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Sponsor return</p>
              <h2>What you get back.</h2>
            </div>
          </div>
          <dl className="sponsors-returns">
            {returns.map((r) => (
              <div className="sponsors-return" key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Already with us</p>
              <h2>Partners &amp; supporters.</h2>
            </div>
            <p className="lead">
              Institutional partners already host and teach alongside the team.
              Sponsorship expands that circle into industry and community.
            </p>
          </div>
          <div className="sponsors-partners">
            {partners.map((p) => (
              <a
                key={p.name}
                className="sponsors-partner"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={p.logo} alt={p.name} />
                <div>
                  <span className="sponsors-partner-role">{p.role}</span>
                  <span className="sponsors-partner-name">{p.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark sponsors-cta-section">
        <div className="container sponsors-cta">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Next step</p>
            <h2>Tell us what you can bring.</h2>
            <p className="lead" style={{ color: 'var(--ink-400)' }}>
              Cash, materials, machining time, components, or advice — start with
              a short note. We&apos;ll reply with where it fits in the flight programme.
            </p>
          </div>
          <div className="sponsors-cta-actions">
            <Link className="btn btn-primary" to="/contact">Contact for sponsorship →</Link>
            <a
              className="btn btn-ghost-dark"
              href="mailto:beyondstagezero@gmail.com?subject=Sponsorship%20enquiry"
            >
              beyondstagezero@gmail.com
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
