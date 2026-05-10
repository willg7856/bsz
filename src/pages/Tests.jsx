import './Tests.css'

const TICK = Array.from({ length: 40 })

const engineBatches = [
  { label: 'Mk I engines built', val: '3', sub: '250 mm × 32 mm — 2 fired, 1 held' },
  { label: 'Mk II engines built', val: '6', sub: '300 mm × 30 mm — 2 fired, 4 remaining' },
]

const fires = [
  {
    id: 'SF-01',
    date: '18 Feb 2025',
    engine: 'Mk I — 250 mm × 32 mm',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '~300 g',
    burnTime: '28 s',
    peakThrust: '—',
    avgThrust: '—',
    result: 'failure',
    resultLabel: 'FAILURE',
    observations: [
      'All thrust data lost — load cell issue.',
      'Nozzle ejected during burn.',
      'Engine casing began melting toward end of burn.',
      'Ground test infrastructure destroyed.',
    ],
    learned: 'Nozzle retention design inadequate for chamber pressure. Casing material insufficient for burn temperature. Infrastructure needs blast shielding.',
  },
  {
    id: 'SF-02',
    date: '18 Feb 2025',
    engine: 'Mk I — 250 mm × 32 mm',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '~300 g',
    burnTime: '14 s',
    peakThrust: '4.6 kgf (10 kgf on nozzle ejection)',
    avgThrust: '—',
    result: 'failure',
    resultLabel: 'FAILURE',
    observations: [
      'Faster burn rate than SF-01 — likely propellant density variation.',
      'Nozzle ejected again at pressure spike.',
      'Peak thrust of 4.6 kgf measured before nozzle loss; spike to 10 kgf on ejection.',
      'Accidental sonic boom generated on nozzle ejection.',
    ],
    learned: 'Nozzle ejection is a consistent failure mode in the Mk I design — confirmed not a one-off. Sonic boom indicates high-velocity gas jet on nozzle loss. Nozzle retention is the critical fix before any further firing.',
  },
  {
    id: 'SF-03',
    date: '26 Apr 2025',
    engine: 'Mk II — 300 mm × 30 mm',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '400 g',
    burnTime: '—',
    peakThrust: '6.8 kgf',
    avgThrust: '—',
    result: 'partial',
    resultLabel: 'PARTIAL',
    observations: [
      'New Mk II engine design — 300 mm long, 30 mm diameter.',
      'Significantly uneven burn rate throughout the firing.',
      'Peak thrust of 6.8 kgf recorded.',
      'Small burn-throughs observed on nozzle and forward closure post-fire.',
      'Case integrity maintained — no ejection or rupture.',
    ],
    learned: 'Propellant grain has significant density or geometry variation. Burn-throughs on both ends indicate hot-gas channeling. Forward closure design needs revision. First firing to return meaningful thrust data.',
  },
  {
    id: 'SF-04',
    date: '26 Apr 2025',
    engine: 'Mk II — 300 mm × 30 mm',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '400 g',
    burnTime: '—',
    peakThrust: '—',
    avgThrust: '—',
    result: 'failure',
    resultLabel: 'FAILURE',
    observations: [
      'Case rupture — catastrophic failure.',
      'All ground test infrastructure destroyed.',
      'Likely cause: burn-through progression from SF-03 failure mode at higher pressure or grain defect.',
    ],
    learned: 'Forward closure burn-through identified in SF-03 is a critical failure path — not cosmetic. Mk II design requires closure redesign and pressure testing before further static fire. Infrastructure rebuild required before next campaign.',
  },
]

const resultMeta = {
  failure: { cls: 'red',   label: 'FAILURE'  },
  partial: { cls: 'amber', label: 'PARTIAL'  },
  success: { cls: 'green', label: 'SUCCESS'  },
}

export default function Tests() {
  return (
    <main className="tests">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="tests-hero">
        <div className="tests-hero-grid-bg" aria-hidden="true" />
        <div className="container tests-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Ground Operations ]
            </p>
            <h1 className="tests-hero-h1">Static Fire<br />Test Log.</h1>
            <p className="tests-hero-sub">
              Every ground test we have run — including the ones that didn't go to plan.
              We publish everything: results, anomalies, and what we learned.
            </p>
          </div>
          <div className="tests-hero-stats">
            <div className="tests-hero-stat">
              <span className="tests-hero-stat-val">4</span>
              <span className="tests-hero-stat-lbl">Fires conducted</span>
            </div>
            <div className="tests-hero-stat">
              <span className="tests-hero-stat-val tests-hero-stat-val--amber">1</span>
              <span className="tests-hero-stat-lbl">Partial success</span>
            </div>
            <div className="tests-hero-stat">
              <span className="tests-hero-stat-val tests-hero-stat-val--red">3</span>
              <span className="tests-hero-stat-lbl">Failures</span>
            </div>
          </div>
        </div>
        <div className="tick-rule tests-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Engine batches ───────────────────────────── */}
      <section className="section" style={{ background: 'var(--paper-200)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="tests-batches">
            {engineBatches.map(b => (
              <div key={b.label} className="tests-batch-card">
                <div className="tests-batch-val">{b.val}</div>
                <div className="tests-batch-lbl">{b.label}</div>
                <div className="tests-batch-sub">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fire log ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="tests-log">
            {fires.map((f, i) => {
              const meta = resultMeta[f.result]
              return (
                <div key={f.id} className="tests-fire">
                  <div className="tests-fire-head">
                    <div className="tests-fire-id-block">
                      <span className="tests-fire-id">{f.id}</span>
                      <span className="tests-fire-date">{f.date}</span>
                    </div>
                    <div className={`tests-badge tests-badge--${meta.cls}`}>{meta.label}</div>
                  </div>

                  <div className="tests-fire-body">
                    <div className="tests-fire-specs">
                      <div className="tests-spec-row">
                        <span className="tests-spec-lbl">Engine</span>
                        <span className="tests-spec-val">{f.engine}</span>
                      </div>
                      <div className="tests-spec-row">
                        <span className="tests-spec-lbl">Propellant</span>
                        <span className="tests-spec-val">{f.propellant}</span>
                      </div>
                      <div className="tests-spec-row">
                        <span className="tests-spec-lbl">Prop. mass</span>
                        <span className="tests-spec-val">{f.mass}</span>
                      </div>
                      <div className="tests-spec-row">
                        <span className="tests-spec-lbl">Burn time</span>
                        <span className="tests-spec-val">{f.burnTime}</span>
                      </div>
                      <div className="tests-spec-row">
                        <span className="tests-spec-lbl">Peak thrust</span>
                        <span className="tests-spec-val">{f.peakThrust}</span>
                      </div>
                    </div>

                    <div className="tests-fire-notes">
                      <div className="tests-notes-section">
                        <p className="tests-notes-label">Observations</p>
                        <ul className="tests-obs-list">
                          {f.observations.map(o => (
                            <li key={o}>{o}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="tests-notes-section">
                        <p className="tests-notes-label">What we learned</p>
                        <p className="tests-learned">{f.learned}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </main>
  )
}
