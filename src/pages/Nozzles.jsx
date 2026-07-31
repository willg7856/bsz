import { Link } from 'react-router-dom'
import './Nozzles.css'

const failures = [
  {
    fire: 'Mk I',
    result: 'Nozzle ejected',
    note: 'Pressure spikes threw the nozzle clear of the motor. Retention became a hard requirement.',
  },
  {
    fire: 'Mk II',
    result: 'Throat burn-through',
    note: 'Metal couldn’t hold geometry for the full burn. Thermal survival joined the brief.',
  },
]

const requirements = [
  {
    title: 'Hold the throat',
    desc: 'Ceramic inserts that keep geometry under chamber heat and pressure — no melt-back, no washout.',
  },
  {
    title: 'Stay locked in',
    desc: 'A stack that survives pressure spikes instead of ejecting like the early Mk I fires.',
  },
  {
    title: 'Earn it on the stand',
    desc: 'Every design gets fired, inspected, and written up with the rest of the test log before it flies on B1M.',
  },
]

const phases = [
  { name: 'Problem locked', detail: 'Ejection and burn-through logged from Mk I–II' },
  { name: 'Materials & inserts', detail: 'Formulations and geometries in design and fab' },
  { name: 'Static-fire proof', detail: 'Fire, inspect, publish — then scale to B1M' },
]

export default function Nozzles() {
  return (
    <main className="nozzles">

      <section className="nozzles-intro">
        <div className="container nozzles-intro-inner">
          <div className="nozzles-intro-copy">
            <p className="eyebrow">Propulsion</p>
            <h1>Ceramic nozzles</h1>
            <p className="nozzles-intro-lead">
              We started this programme because our early motors threw nozzles
              or burned through them. The goal is simple: inserts that stay put
              and survive the burn long enough to fly on B1M.
            </p>
            <Link className="btn btn-outline" to="/tests">Read the fire logs →</Link>
          </div>
          <aside className="nozzles-intro-aside" aria-label="Programme status">
            <p className="nozzles-aside-kicker">Now</p>
            <p className="nozzles-aside-status">Materials research &amp; first inserts</p>
            <p className="nozzles-aside-meta">Target · B1M motor stack</p>
          </aside>
        </div>
      </section>

      <section className="section nozzles-failures">
        <div className="container">
          <div className="nozzles-failures-head">
            <h2>What broke first</h2>
            <p>
              The ceramic brief is written from the stand, not from a wishlist.
              Two failure modes set the requirements.
            </p>
          </div>
          <div className="nozzles-failure-list">
            {failures.map((f) => (
              <article className="nozzles-failure" key={f.fire}>
                <header>
                  <span className="mono">{f.fire}</span>
                  <strong>{f.result}</strong>
                </header>
                <p>{f.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark nozzles-req">
        <div className="container nozzles-req-inner">
          <div className="nozzles-req-copy">
            <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>The brief</p>
            <h2>Three things the nozzle has to do</h2>
          </div>
          <ol className="nozzles-req-list">
            {requirements.map((r, i) => (
              <li key={r.title}>
                <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section nozzles-phases">
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: '2rem' }}>Path to flight</p>
          <div className="nozzles-phase-row">
            {phases.map((p, i) => (
              <div className="nozzles-phase" key={p.name}>
                <span className="nozzles-phase-num mono">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.name}</h3>
                <p>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
