import './Nozzles.css'

const TICK = Array.from({ length: 40 })

const goals = [
  {
    index: '01',
    title: 'Survive the burn',
    desc: 'Ceramic throats and inserts that hold geometry under chamber temperature and pressure — no melt-back, no washout.',
  },
  {
    index: '02',
    title: 'Stay retained',
    desc: 'Fix the ejection failures from early Mk I fires with a nozzle stack designed to stay locked through pressure spikes.',
  },
  {
    index: '03',
    title: 'Scale to B1M',
    desc: 'Take lessons from small-motor inserts into nozzles sized for the B1M and, later, full-scale STRAVOX motors.',
  },
  {
    index: '04',
    title: 'Prove on the stand',
    desc: 'Every ceramic design earns its place through static fire — measured, inspected, and published with the rest of the test log.',
  },
]

const milestones = [
  { label: 'Problem definition', status: 'done', note: 'Mk I nozzle ejections and Mk II burn-throughs established retention and thermal survival as hard requirements.' },
  { label: 'Material research', status: 'active', note: 'Evaluating ceramic formulations and insert geometries for throat and exit-cone duty.' },
  { label: 'Prototype inserts', status: 'active', note: 'First ceramic nozzle inserts in design and fabrication for small-motor verification.' },
  { label: 'Static-fire validation', status: 'upcoming', note: 'Fire ceramic nozzles on the stand; inspect throat erosion, retention, and post-burn integrity.' },
  { label: 'B1M integration', status: 'upcoming', note: 'Scale a proven ceramic stack into the B1M motor before flight.' },
]

export default function Nozzles() {
  return (
    <main className="nozzles">

      <section className="nozzles-hero">
        <div className="nozzles-hero-grid-bg" aria-hidden="true" />
        <div className="container nozzles-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Propulsion programme ]
            </p>
            <h1 className="nozzles-hero-h1">Ceramic<br />Nozzles.</h1>
            <p className="nozzles-hero-sub">
              A dedicated programme to design, fire, and qualify ceramic nozzles
              that survive our motors — after early tests lost nozzles to ejection
              and thermal damage.
            </p>
          </div>
          <div className="nozzles-hero-stat-row">
            <div className="nozzles-hero-stat">
              <span className="nozzles-hero-stat-val">ACTIVE</span>
              <span className="nozzles-hero-stat-lbl">Programme status</span>
            </div>
            <div className="nozzles-hero-stat">
              <span className="nozzles-hero-stat-val">Mk I–II</span>
              <span className="nozzles-hero-stat-lbl">Driven by test failures</span>
            </div>
            <div className="nozzles-hero-stat">
              <span className="nozzles-hero-stat-val">B1M</span>
              <span className="nozzles-hero-stat-lbl">First flight target</span>
            </div>
          </div>
        </div>
        <div className="tick-rule nozzles-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Why ceramics</p>
              <h2>Nozzles that stay put.</h2>
            </div>
            <p className="lead">
              Our first static fires made the problem obvious: metal nozzles either
              ejected under pressure or began to burn through. The ceramic nozzle
              programme exists to replace that weak link with inserts that retain,
              resist heat, and keep thrust on axis for the full burn.
            </p>
          </div>

          <div className="nozzles-goals">
            {goals.map((g) => (
              <div className="nozzles-goal" key={g.index}>
                <span className="nozzles-goal-index mono">{g.index}</span>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '2.5rem' }}>
            Programme milestones
          </p>
          <div className="nozzles-milestones">
            {milestones.map((ms, idx) => (
              <div key={ms.label} className={`nozzles-milestone nozzles-milestone--${ms.status}`}>
                <div className="nozzles-milestone-marker">
                  <span className="nozzles-milestone-dot" />
                  {idx < milestones.length - 1 && <span className="nozzles-milestone-line" />}
                </div>
                <div className="nozzles-milestone-content">
                  <div className="nozzles-milestone-head">
                    <span className="nozzles-milestone-name">{ms.label}</span>
                    <span className="nozzles-milestone-tag">{ms.status}</span>
                  </div>
                  <p className="nozzles-milestone-note">{ms.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
