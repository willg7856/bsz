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
  'B1M pressure test campaign',
  'B1M engine static fires',
]

const engineBrief = [
  { title: '200 kgf for 3 s', desc: 'The target for the B1M motor.' },
  { title: '2.9 kg of propellant', desc: 'KNO₃/Sorbitol 65:35 in the 550 mm casing.' },
  { title: 'Prove it on the stand', desc: 'The first engine is done. The first static fire is pending regulatory approval. Two engines are still in production.' },
]
const photos = [
  { src: '/b1m-engine-complete.jpg', alt: 'The completed B1M engine on a bench', caption: 'The first B1M engine, complete.' },
  { src: '/b1m-engine-photo.jpg', alt: 'B1M engine casing standing on a workshop bench', caption: 'The casing.' },
  { src: '/b1m-engine-disassembled.jpg', alt: 'B1M engine disassembled on a workshop bench', caption: 'Disassembled on the bench.' },
]
const renders = [
  { src: '/b1m-cad.png', alt: 'Cutaway of the B1M motor casing, 550 mm by 80 mm', caption: 'CAD cutaway' },
  { src: '/b1m-external3.png', alt: 'Angled view of the B1M motor casing', caption: 'External, angled' },
  { src: '/b1m-external2.png', alt: 'Side view of the B1M motor casing', caption: 'Side view' },
]

export default function B1mEngine() {
  useTitle('B1M engine')
  const steps = b1mMilestones.filter((item) => engineSteps.includes(item.label))

  return (
    <>
      <header className="masthead b1m-hero">
        <div className="b1m-hero-figure">
          <img src="/b1m-engine-angle.png" alt="B1M engine" />
        </div>
        <div className="b1m-hero-shade" aria-hidden="true" />
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
        </div>
        <B1mStaticFireNotice />
        <dl className="shed-hero-specs">
          <div><dt>Design</dt><dd>Complete</dd></div>
          <div><dt>In production</dt><dd>2 engines</dd></div>
          <div><dt>First engine</dt><dd>Done · pending regulatory approval</dd></div>
          <div><dt>Target</dt><dd>200 kgf · 3 s</dd></div>
          <div><dt>Next</dt><dd>Pressure tests</dd></div>
        </dl>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Casing</p>
              <h2>550 mm by 80 mm.</h2>
            </div>
            <div className="b1m-casing-aside">
              <p>The first engine, the casing and the parts laid out on the bench, then the CAD of the same motor.</p>
              <Link className="text-link b1m-all-photos" to="/gallery">All photos</Link>
            </div>
          </div>
          <div className="b1m-photo-row">
            {photos.map((photo) => (
              <figure key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="b1m-render-row">
            {renders.map((render) => (
              <figure key={render.src}>
                <div className="b1m-render-panel">
                  <img src={render.src} alt={render.alt} loading="lazy" />
                </div>
                <figcaption>{render.caption}</figcaption>
              </figure>
            ))}
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
