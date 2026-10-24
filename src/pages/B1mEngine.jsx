import { Link } from 'react-router-dom'
import B1mStaticFireNotice from '../components/B1mStaticFireNotice'
import { b1mEngineUpdates, b1mMilestones, b1mMotorSpecs } from '../data'
import { useTitle } from '../useTitle'

const engineSteps = [
  'B1M engine design',
  'Static fire stand design',
  'Propellant characterisation',
  'B1M engine build',
  'Static fire stand construction',
  'B1M engine static fires',
]

const engineBrief = [
  { title: '200 kgf for 3 s', desc: 'The target for the B1M motor.' },
  { title: '2.9 kg of propellant', desc: 'KNO₃/Sorbitol 65:35 in the 550 mm casing.' },
  { title: 'Prove it on the stand', desc: 'The first engine is done. The first static fire is pending regulatory approval. Two engines are still in production.' },
]
const views = [
  { src: '/b1m-external1.png', alt: 'Full external view of the B1M engine', caption: 'Engine', className: 'b1m-view-primary' },
  { src: '/b1m-external2.png', alt: 'Side view of the B1M motor casing', caption: 'Side' },
  { src: '/b1m-external3.png', alt: 'Angled view of the B1M motor casing', caption: 'External' },
]

export default function B1mEngine() {
  useTitle('B1M engine')
  const steps = b1mMilestones.filter((item) => engineSteps.includes(item.label))

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Motor · before B1M-01</p>
            <h1>B1M engine.</h1>
            <p className="lede">
              The motor for STRAVOX B1M. Design is complete. The first engine is done and pending regulatory approval. Two are still in production with Federation University. The target is 200 kgf for 3 seconds.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to="/b1m">STRAVOX B1M</Link>
              <Link className="btn" to="/tests">Static fire log</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Design</span><span className="done">Complete</span></div>
            <div className="side-row"><span>In production</span><span className="num">2 engines</span></div>
            <div className="side-row"><span>First engine</span><span>Done · pending regulatory approval</span></div>
            <div className="side-row"><span>Target</span><span className="num">200 kgf · 3 s</span></div>
            <div className="side-row"><span>Next</span><span>Static fires</span></div>
          </div>
        </div>
      </header>
      <B1mStaticFireNotice />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Casing</p>
              <h2>550 mm by 80 mm.</h2>
            </div>
            <div className="b1m-casing-aside">
              <p>Cutaway of the current B1M motor, the casing and the disassembled engine on the bench, and the external views of the same part.</p>
              <Link className="text-link b1m-all-photos" to="/gallery">All photos</Link>
            </div>
          </div>
          <figure className="cad">
            <img src="/b1m-cad.png" alt="Cutaway of the B1M motor casing, 550 mm by 80 mm" />
            <figcaption>B1M motor · CAD cutaway · 550 mm × 80 mm</figcaption>
          </figure>
          <div className="b1m-hardware-layout">
            <figure className="cad b1m-casing-photo">
              <img src="/b1m-engine-photo.jpg" alt="B1M engine casing standing on a workshop bench" />
              <figcaption>B1M engine casing.</figcaption>
            </figure>
            <figure className="cad b1m-disassembled-photo">
              <img src="/b1m-engine-disassembled.jpg" alt="B1M engine disassembled on a workshop bench" />
              <figcaption>B1M engine, disassembled.</figcaption>
            </figure>
            <div className="b1m-views">
            {views.map((view) => (
              <figure className={view.className ? `cad ${view.className}` : 'cad'} key={view.src}>
                {view.className ? (
                  <div className="b1m-render-frame">
                    <img src={view.src} alt={view.alt} />
                  </div>
                ) : (
                  <img src={view.src} alt={view.alt} />
                )}
                <figcaption>{view.caption}</figcaption>
              </figure>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">The brief</p>
              <h2>What this motor has to do.</h2>
            </div>
          </div>
          <div className="phase-grid">
            {engineBrief.map((item, index) => (
              <article className="phase" key={item.title}>
                <p className="kicker idx">{String(index + 1).padStart(2, '0')}</p>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker accent">Technical</p>
              <h2>Specifications.</h2>
            </div>
            <div className="b1m-spec-aside">
              <a href="https://federation.edu.au" target="_blank" rel="noopener noreferrer">
                <img src="/partner-feduni.svg" alt="Federation University" />
              </a>
              <p>
                Current figures for the B1M motor, built in collaboration with{' '}
                <a className="b1m-spec-link" href="https://federation.edu.au" target="_blank" rel="noopener noreferrer">Federation University</a>.
              </p>
            </div>
          </div>
          <div className="stravox-numbers-grid cols-4">
            {b1mMotorSpecs.map((spec) => (
              <div className="spec-cell" key={spec.lbl}>
                <div className="lbl">{spec.lbl}</div>
                <div className="val">{spec.val}<small>{spec.unit}</small></div>
                <div className="note">{spec.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Path</p>
              <h2>Before the static fires.</h2>
            </div>
          </div>
          <div className="rows">
            {steps.map((item, index) => (
              <article className="vehicle-row" key={item.label}>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{item.label}</strong>
                  <span className="path-note">{item.note}</span>
                </div>
                <span className={`status status-${item.status}`}>{item.status}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Log</p>
              <h2>Engine updates.</h2>
            </div>
            <p>Development updates for the B1M motor, published as the work moves toward the static fires and STRAVOX B1M-01.</p>
          </div>
          {b1mEngineUpdates.map((post) => (
            <article className="post" key={post.title}>
              <p className="kicker">{post.display}</p>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
