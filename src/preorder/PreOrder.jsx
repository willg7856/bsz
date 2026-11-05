import { useState } from 'react'
import logoUrl from '../../bsz-logo.svg'
import cadUrl from '../../b1m-cad.png'
import { ORDER_EMAIL, SHIP_WINDOW, STANDARD_NOZZLES } from './nozzles'
import './PreOrder.css'

const FEATURES = [
  {
    title: 'Erosion-resistant throat',
    desc: 'Ceramic holds its throat diameter burn after burn, so your chamber pressure stays where you designed it.',
  },
  {
    title: 'High-temperature stable',
    desc: 'Rated for sustained exhaust temperatures that soften graphite and melt phenolic inserts.',
  },
  {
    title: 'Reusable',
    desc: 'Clean, inspect and fly again. One nozzle replaces a stack of single-use parts.',
  },
]

const FAQ = [
  {
    q: 'When will my nozzle ship?',
    a: `Pre-orders are expected to ship in ${SHIP_WINDOW}. We'll email you with production updates and tracking.`,
  },
  {
    q: 'Am I charged now?',
    a: 'Yes — standard-size pre-orders are paid at checkout through Stripe. If we can\'t fulfil your order you get a full refund.',
  },
  {
    q: 'How do custom designs work?',
    a: 'Send us your nozzle geometry (STEP, STL or a dimensioned drawing). We review it for manufacturability, then reply with a quote and lead time before you pay anything.',
  },
  {
    q: 'Which file formats do you accept?',
    a: 'STEP is preferred. STL, IGES, or a PDF drawing with throat, exit and convergent/divergent angles also work.',
  },
]

function money(n) {
  return `$${n.toLocaleString('en-US')}`
}

function NozzleCard({ n }) {
  return (
    <article className={`po-card${n.popular ? ' po-card--popular' : ''}`}>
      {n.popular && <span className="po-pill">Most popular</span>}
      <h3 className="po-card-name">{n.name}</h3>
      <p className="po-card-motor">{n.motor}</p>
      <dl className="po-specs">
        <div>
          <dt>Throat Ø</dt>
          <dd>{n.throat}</dd>
        </div>
        <div>
          <dt>Exit Ø</dt>
          <dd>{n.exit}</dd>
        </div>
      </dl>
      <p className="po-price">
        {money(n.price)} <span>USD</span>
      </p>
      {n.stripeLink ? (
        <a className="po-btn po-btn--primary" href={n.stripeLink} target="_blank" rel="noopener noreferrer">
          Pre-order {n.name}
        </a>
      ) : (
        <button className="po-btn po-btn--primary" disabled>
          Opening soon
        </button>
      )}
    </article>
  )
}

function CustomForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))
    const subject = `Custom ceramic nozzle request — ${d.name}`
    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Motor / case: ${d.motor || '-'}`,
      `Throat Ø: ${d.throat || '-'}`,
      `Exit Ø: ${d.exit || '-'}`,
      `Quantity: ${d.qty}`,
      '',
      'Notes:',
      d.notes || '-',
      '',
      '>> Please attach your design file (STEP / STL / drawing) to this email. <<',
    ].join('\n')
    window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="po-form" onSubmit={handleSubmit}>
      <div className="po-row">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="po-row po-row--3">
        <label>
          Motor / case
          <input name="motor" placeholder="e.g. 38 mm, 6-grain" />
        </label>
        <label>
          Throat Ø
          <input name="throat" placeholder="mm" />
        </label>
        <label>
          Exit Ø
          <input name="exit" placeholder="mm" />
        </label>
      </div>
      <label className="po-qty">
        Quantity
        <input name="qty" type="number" min="1" defaultValue="1" required />
      </label>
      <label>
        Notes
        <textarea name="notes" rows="4" placeholder="Propellant, expected chamber pressure, angles, anything else we should know." />
      </label>
      <button className="po-btn po-btn--primary" type="submit">
        Send design request
      </button>
      <p className="po-form-note">
        {sent
          ? `Your email app should now be open — attach your design file and hit send. Nothing opened? Email us at ${ORDER_EMAIL}.`
          : 'This opens an email to our team with your details filled in. Attach your design file before sending.'}
      </p>
    </form>
  )
}

export default function PreOrder() {
  return (
    <div className="po">
      <header className="po-nav">
        <div className="po-wrap po-nav-inner">
          <a href="/" className="po-brand">
            <img src={logoUrl} alt="" width="32" height="32" />
            Beyond Stage Zero
          </a>
          <a href="#standard" className="po-btn po-btn--small">Pre-order</a>
        </div>
      </header>

      <main>
        <section className="po-hero">
          <div className="po-wrap po-hero-grid">
            <div>
              <span className="po-eyebrow">Pre-orders open · Ships {SHIP_WINDOW}</span>
              <h1>Ceramic rocket motor nozzles</h1>
              <p className="po-lede">
                Precision ceramic nozzles that don't erode, don't warp and fly again. Choose a standard size,
                or send us your own design and we'll make it in ceramic.
              </p>
              <div className="po-actions">
                <a href="#standard" className="po-btn po-btn--primary">Shop standard sizes</a>
                <a href="#custom" className="po-btn po-btn--ghost">Submit a custom design</a>
              </div>
            </div>
            <figure className="po-hero-img">
              <img src={cadUrl} alt="Section view of a Beyond Stage Zero motor with ceramic nozzle" />
            </figure>
          </div>
        </section>

        <section className="po-features">
          <div className="po-wrap po-feature-grid">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="standard" className="po-section">
          <div className="po-wrap">
            <h2>Standard sizes</h2>
            <p className="po-section-sub">Pay now to reserve your nozzle from the first production run.</p>
            <div className="po-cards">
              {STANDARD_NOZZLES.map((n) => (
                <NozzleCard key={n.id} n={n} />
              ))}
            </div>
          </div>
        </section>

        <section id="custom" className="po-section po-section--alt">
          <div className="po-wrap po-custom-grid">
            <div>
              <h2>Your design, in ceramic</h2>
              <p className="po-section-sub">
                Running a non-standard motor or optimising expansion ratio? Send us your nozzle geometry.
              </p>
              <ol className="po-steps">
                <li><strong>Send your design.</strong> STEP, STL or a dimensioned drawing.</li>
                <li><strong>We review it.</strong> Manufacturability check and any suggested tweaks.</li>
                <li><strong>Get a quote.</strong> Price and lead time — no payment until you approve.</li>
              </ol>
            </div>
            <CustomForm />
          </div>
        </section>

        <section className="po-section">
          <div className="po-wrap po-faq">
            <h2>FAQ</h2>
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="po-footer">
        <div className="po-wrap po-footer-inner">
          <span>© {new Date().getFullYear()} Beyond Stage Zero</span>
          <a href={`mailto:${ORDER_EMAIL}`}>{ORDER_EMAIL}</a>
        </div>
      </footer>
    </div>
  )
}
