import './Missions.css'

const TICK = Array.from({ length: 40 })

const missions = [
  {
    id: 'STRAVOX-B1M-01',
    num: 'Mission 01',
    name: 'STRAVOX B1M-01',
    status: 'PLANNED',
    statusColor: 'cyan',
    year: 'Q4 2026 – Q1 2027',
    tagline: 'Sub-scale test flight. 3 km apogee. Real-world flight data.',
    description:
      'STRAVOX B1M is our sub-scale test vehicle — designed to reach 3 km apogee on one of our own KNSB engines and return real-world flight data before we commit to the full STRAVOX programme. Flying B1M lets us validate avionics, recovery, and vehicle systems at a scale that avoids the regulatory complexity and risk of a 30 km flight. What works on B1M goes on STRAVOX.',
    objectives: [
      { label: 'Reach 3 km target apogee', done: false },
      { label: 'Validate KNSB engine in flight', done: false },
      { label: 'Avionics and flight computer in real conditions', done: false },
      { label: 'Recovery system deployment', done: false },
      { label: 'Collect full flight telemetry', done: false },
      { label: 'CASA range clearance', done: false },
    ],
    milestones: [
      { label: 'B1M engine design',        status: 'done',     note: 'Design complete — 550 mm × 80 mm casing, ~2 kg KNO₃/Sorbitol 65:35.' },
      { label: 'Propellant characterisation', status: 'active', note: 'In progress — refining burn behaviour and propellant performance ahead of B1M static fires.' },
      { label: 'B1M engine build',         status: 'active',  note: 'In progress — engines in production for ground test and flight.' },
      { label: 'B1M engine static fires',  status: 'upcoming', note: 'Ground firing campaign to validate B1M motor before flight (~150 kgf, 3.5 s burn).' },
      { label: 'Vehicle design',           status: 'upcoming', note: 'Airframe, fins, and recovery bay sized for B1M engine.' },
      { label: 'Vehicle fabrication',      status: 'upcoming', note: 'Airframe construction and component manufacture.' },
      { label: 'Avionics integration',     status: 'upcoming', note: 'Flight computer, altimeter, GPS, and recovery electronics.' },
      { label: 'Ground systems test',      status: 'upcoming', note: 'Full vehicle systems check on the pad before flight.' },
      { label: 'CASA range clearance',     status: 'upcoming', note: 'Regulatory approval for launch at a CASA-cleared site in Victoria.' },
      { label: 'Launch readiness review',  status: 'upcoming', note: 'Final internal review before committing to launch day.' },
      { label: 'STRAVOX B1M-01 launch',   status: 'upcoming', note: 'Target window Q4 2026 – Q1 2027. 3 km apogee. Full flight telemetry. Recover and review.' },
    ],
    specs: [
      ['Vehicle', 'STRAVOX B1M'],
      ['Role', 'Sub-scale test vehicle'],
      ['Target apogee', '3 km'],
      ['Motor', 'KNSB B1M — 550 mm × 80 mm'],
      ['Propellant mass', '~2 kg KNO₃/Sorbitol 65:35'],
      ['Expected thrust', '~150 kgf for 3.5 s'],
      ['Purpose', 'Systems validation'],
      ['Launch site', 'Victoria, AUS'],
      ['Status', 'PLANNED'],
      ['Target date', 'Q4 2026 – Q1 2027'],
    ],
  },
]

const upcoming = [
  {
    id: 'STRAVOX-HOP-01',
    name: 'STRAVOX — 100 m Hop Test',
    note: 'Low-altitude hop of STRAVOX to roughly 100 m under drone-engine power only — no main motor. Validates propulsive landing, drone-arm deployment, and vehicle handling before higher-energy flights.',
    year: '2026',
  },
  {
    id: 'STRAVOX-B1M-02',
    name: 'STRAVOX B1M-02',
    note: 'Second B1M flight incorporating fixes and improvements from B1M-01. Objectives TBD based on B1M-01 data.',
    year: 'TBD',
  },
  {
    id: 'STRAVOX-01',
    name: 'STRAVOX — Full Scale',
    note: 'The main event. 30 km apogee, Mach 2.5, propulsive vertical landing. Timeline depends on B1M programme outcomes.',
    year: 'TBD',
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
              <span className="missions-hero-stat-val">Q4'26–Q1'27</span>
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

              {m.milestones && (
                <div className="missions-milestones">
                  <p className="missions-milestones-label">Pre-flight milestones</p>
                  <div className="missions-milestone-list">
                    {m.milestones.map((ms, idx) => (
                      <div key={ms.label} className={`missions-milestone missions-milestone--${ms.status}`}>
                        <div className="missions-milestone-marker">
                          <span className="missions-milestone-dot" />
                          {idx < m.milestones.length - 1 && <span className="missions-milestone-line" />}
                        </div>
                        <div className="missions-milestone-content">
                          <div className="missions-milestone-head">
                            <span className="missions-milestone-name">{ms.label}</span>
                            <span className="missions-milestone-tag">{ms.status}</span>
                          </div>
                          <p className="missions-milestone-note">{ms.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
