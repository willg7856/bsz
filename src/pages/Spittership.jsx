import { Link } from 'react-router-dom'
import './Spittership.css'

// Public visibility is controlled by SHOW_SPITTERSHIP in src/featureFlags.js
// (page + styles are kept even when the flag is false).

export default function Spittership() {
  return (
    <main className="spittership">

      <section className="spittership-hero">
        <div className="container spittership-hero-inner">
          <p className="spittership-kicker mono">Working name · Community vehicle</p>
          <h1 className="spittership-hero-h1">Spittership</h1>
          <p className="spittership-hero-sub">
            A vehicle for space Twitter — Spitter — to design and drive.
            Beyond Stage Zero manages the project and supplies the B1M engine.
            Everything else, including the name, can change.
          </p>
          <div className="spittership-hero-actions">
            <a
              className="btn btn-primary"
              href="https://x.com/beyondstagezero"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on X →
            </a>
            <Link className="btn btn-ghost-dark" to="/b1m">B1M motor</Link>
          </div>
        </div>
      </section>

      <section className="section spittership-split">
        <div className="container spittership-split-inner">
          <article className="spittership-col">
            <h2>Spitter owns</h2>
            <ul>
              <li>Direction and design decisions</li>
              <li>The vehicle concept — and the name</li>
              <li>Who joins and how the team forms</li>
              <li>Build work beyond the motor</li>
            </ul>
          </article>
          <article className="spittership-col spittership-col--bsz">
            <h2>BSZ provides</h2>
            <ul>
              <li>Project management and range ops</li>
              <li>The B1M engine</li>
              <li>A kickoff after the first B1M static fire</li>
              <li>A home base in Creswick</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section dark spittership-wait">
        <div className="container spittership-wait-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)' }}>Timing</p>
            <h2>Waiting on the first B1M fire</h2>
          </div>
          <div className="spittership-wait-copy">
            <p>
              Spittership does not open until Beyond Stage Zero has proved the
              B1M motor on the stand. After that fire, the call goes out on X —
              and Spitter takes it from there.
            </p>
            <ol className="spittership-steps">
              <li>First B1M static fire</li>
              <li>Programme kickoff on X</li>
              <li>Community forms and sets direction</li>
              <li>Vehicle concept + B1M integration</li>
            </ol>
          </div>
        </div>
      </section>

    </main>
  )
}
