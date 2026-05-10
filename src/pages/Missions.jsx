import './Missions.css'

const TICK = Array.from({ length: 40 })

const missions = [
  {
    id: 'STRAVOX-B1M-01',
    num: 'Mission 01',
    name: 'STRAVOX B1M-01',
    status: 'PLANNED',
    statusColor: 'cyan',
    year: '2026',
    tagline: 'First flight. 30 km apogee. Propulsive landing.',
    description:
      'STRAVOX B1M-01 is the inaugural flight of the Beyond Stage Zero programme — a full-stack mission from liftoff to propulsive vertical touchdown. The vehicle will boost past Mach 2.5 on a KNSB solid motor, deploy its split nosecone airbrake at apogee, then extend four folding drone arms and fire four T-Motor U13 II motors for a controlled vertical landing.',
    objectives: [
      { label: 'Reach 30 km apogee', done: false },
      { label: 'Supersonic flight past Mach 2.5', done: false },
      { label: 'Split nosecone airbrake deployment', done: false },
      { label: 'Propulsive vertical landing', done: false },
      { label: 'KNSB motor full-scale static fire', done: false },
      { label: 'CASA range clearance — Victoria', done: false },
    ],
    specs: [
      ['Vehicle', 'STRAVOX'],
      ['Target apogee', '30 km'],
      ['Peak velocity', 'Mach 2.5'],
      ['Motor', 'KNSB — 1 m grain'],
      ['Landing system', 'T-Motor U13 II × 4'],
      ['Launch site', 'Victoria, AUS'],
      ['Status', 'PLANNED'],
      ['Target date', '2026'],
    ],
  },
]

const upcoming = [
  {
    id: 'STRAVOX-B1M-02',
    name: 'STRAVOX B1M-02',
    note: 'Extended-range mission. Details TBD after B1M-01.',
    year: 'TBD',
  },
  {
    id: 'KNSB-SCALE',
    name: 'KNSB Scale Tests',
    note: 'Sub-scale motor firings to validate propellant geometry before full grain.',
    year: '2025–2026',
  },
]

export default function Missions() {
  return (
    <main className="missions">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="missions-hero">
        <div className="missions-hero-grid-bg" aria-hidden="true" />
        <div className="container missions-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Programme ]
            </p>
            <h1 className="missions-hero-h1">Missions.</h1>
            <p className="missions-hero-sub">
              Every flight we run has a mission designation, a set of objectives,
              and a public record. This is the full picture — what we're flying,
              when, and why.
            </p>
          </div>
          <div className="missions-hero-stat-row">
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">0</span>
              <span className="missions-hero-stat-lbl">Active missions</span>
            </div>
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">0</span>
              <span className="missions-hero-stat-lbl">Flights completed</span>
            </div>
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">2026</span>
              <span className="missions-hero-stat-lbl">First launch target</span>
            </div>
          </div>
        </div>
        <div className="tick-rule missions-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Planned missions ─────────────────────────── */}
      {missions.map(m => (
        <section key={m.id} className="section missions-card-section">
          <div className="container">
            <div className="missions-card">
              <div className="missions-card-head">
                <div>
                  <span className="eyebrow accent">[ {m.num} ]</span>
                  <h2 className="missions-card-name">{m.name}</h2>
                  <p className="missions-card-tagline">{m.tagline}</p>
                </div>
                <div className={`missions-status missions-status--${m.statusColor}`}>
                  {m.status}
                </div>
              </div>

              <div className="missions-card-body">
                <div className="missions-card-left">
                  <p className="missions-desc">{m.description}</p>

                  <div className="missions-objectives">
                    <p className="missions-objectives-label">Mission objectives</p>
                    {m.objectives.map(obj => (
                      <div key={obj.label} className={`missions-obj-row${obj.done ? ' done' : ''}`}>
                        <span className="missions-obj-icon">{obj.done ? '✓' : '○'}</span>
                        <span>{obj.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="missions-card-specs">
                  {m.specs.map(([k, v]) => (
                    <div key={k} className="missions-spec-row">
                      <span className="missions-spec-lbl">{k}</span>
                      <span className="missions-spec-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Upcoming ─────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--paper-200)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">[ Pipeline ]</span>
              <h2>On the horizon.</h2>
            </div>
            <p className="lead">
              Future missions are subject to learnings from B1M-01. Nothing here
              is locked in — we plan by what the data tells us.
            </p>
          </div>
          <div className="missions-upcoming">
            {upcoming.map(u => (
              <div key={u.id} className="missions-upcoming-card">
                <div className="missions-upcoming-id">{u.id}</div>
                <div className="missions-upcoming-name">{u.name}</div>
                <div className="missions-upcoming-note">{u.note}</div>
                <div className="missions-upcoming-year">{u.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
