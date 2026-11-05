import { useState } from 'react'
import { Link } from 'react-router-dom'
import { nozzlePreorder, site } from '../data'
import { useLocalEstimate } from '../localCurrency'
import { useTitle } from '../useTitle'

const { sizes, currency, shipWindow, localCurrencies } = nozzlePreorder

const tbc = (value) => value ?? 'TBC'

const faq = [
  {
    q: 'When will it ship?',
    a: shipWindow
      ? `We expect to ship pre-orders in the ${shipWindow}. We will email you as production moves along.`
      : 'We will confirm a ship date by email once your order is in production.',
  },
  {
    q: 'Have these nozzles been fire-tested?',
    a: 'Not yet in flight. Our ceramic nozzles still have to survive a static fire before one flies on B1M, and we post every result on the Tests page.',
    link: { to: '/tests', label: 'Read the fire logs' },
  },
  {
    q: 'How do custom designs work?',
    a: 'Send us your nozzle geometry. We check it can be moulded, then reply with a price and lead time. You pay nothing until you approve the quote.',
  },
  {
    q: 'Which files can I send?',
    a: 'STEP is best. STL, or a drawing with the throat, exit and convergent/divergent angles, also works.',
  },
]

function SizeCard({ size, estimate }) {
  const price = size.price != null ? `$${size.price}` : 'TBC'
  return (
    <article className="preorder-size">
      <p className="lbl">{size.motor}</p>
      <h3>{size.name}</h3>
      <dl className="preorder-specs">
        <div><dt>Throat Ø</dt><dd>{tbc(size.throat)}</dd></div>
        <div><dt>Exit Ø</dt><dd>{tbc(size.exit)}</dd></div>
      </dl>
      <p className="val">
        {price}
        {size.price != null ? <small>{currency}</small> : null}
      </p>
      {estimate && size.price != null ? (
        <p className="preorder-local">≈ {estimate(size.price)} · final price shown at checkout</p>
      ) : null}
      {size.stripeLink ? (
        <a className="btn btn-ink" href={size.stripeLink} target="_blank" rel="noopener noreferrer">
          Pre-order {size.name}
        </a>
      ) : (
        <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent(`Pre-order: ${size.name} ceramic nozzle`)}`}>
          Email to pre-order
        </a>
      )}
    </article>
  )
}

function CustomForm() {
  const [status, setStatus] = useState('idle')

  async function onSubmit(event) {
    event.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch('https://formspree.io/f/xaqvpver', {
        method: 'POST',
        body: new FormData(event.target),
        headers: { Accept: 'application/json' },
      })
      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-success">
        <span className="contact-success-icon" aria-hidden="true">✓</span>
        <h2>Design received</h2>
        <p>
          Thanks. We will look over your design and email you a quote. If you have a file to send, email it to{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <button type="button" className="btn" onClick={() => setStatus('idle')}>Send another</button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <input type="hidden" name="reason" value="Ceramic nozzle enquiries" />
      <input type="hidden" name="subject" value="Ceramic nozzle pre-order: custom design" />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="po-name">Name</label>
          <input id="po-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="form-group">
          <label htmlFor="po-email">Email</label>
          <input id="po-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="po-motor">Motor / case</label>
        <input id="po-motor" name="motor" type="text" placeholder="e.g. 38 mm, 3-grain KNSB" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="po-throat">Throat Ø (mm)</label>
          <input id="po-throat" name="throat" type="text" inputMode="decimal" />
        </div>
        <div className="form-group">
          <label htmlFor="po-exit">Exit Ø (mm)</label>
          <input id="po-exit" name="exit" type="text" inputMode="decimal" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="po-qty">Quantity</label>
          <input id="po-qty" name="quantity" type="number" min="1" defaultValue="1" required />
        </div>
        <div className="form-group">
          <label htmlFor="po-link">Design file link</label>
          <input id="po-link" name="design_link" type="url" placeholder="Drive, Onshape, etc." />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="po-message">Notes</label>
        <textarea id="po-message" name="message" rows={5} placeholder="Propellant, chamber pressure, angles, anything else we should know." />
      </div>
      {status === 'error' ? (
        <p className="contact-error">Something went wrong. Please try again or email us at {site.email}.</p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send design →'}
      </button>
    </form>
  )
}

export default function NozzlePreorder() {
  useTitle('Pre-order ceramic nozzles')
  const estimate = useLocalEstimate(localCurrencies)

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Ceramic nozzles · Pre-order</p>
            <h1>Pre-order a nozzle.</h1>
            <p className="lede">
              Pick one of our standard sizes, or send us your own design and we will make it in ceramic.
            </p>
            <div className="actions">
              <a className="btn btn-ink" href="#standard">Standard sizes</a>
              <a className="btn" href="#custom">Your own design</a>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Standard sizes</span><span className="num">{sizes.length}</span></div>
            <div className="side-row"><span>Custom designs</span><span>Quoted</span></div>
            <div className="side-row"><span>Ships</span><span>{shipWindow ? shipWindow[0].toUpperCase() + shipWindow.slice(1) : 'TBC'}</span></div>
            <div className="side-row"><span>Programme</span><Link to="/nozzles">Ceramic nozzles</Link></div>
          </div>
        </div>
      </header>

      <section className="section dark preorder-video-section">
        <div className="wrap">
          <video
            className="preorder-video"
            src="/nozzle-release.mp4"
            poster="/nozzle-release-poster.jpg"
            controls
            playsInline
            preload="metadata"
          >
            <a href="/nozzle-release.mp4">Watch the ceramic nozzle release video</a>
          </video>
        </div>
      </section>

      <section className="section" id="standard">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Standard</p>
              <h2>Standard sizes.</h2>
            </div>
            <p>Prices are in Australian dollars. Checkout is through Stripe, which shows and charges the price in your own currency. Stripe emails you a receipt, and we never see your card details.</p>
          </div>
          <div className="preorder-sizes">
            {sizes.map((size) => <SizeCard key={size.id} size={size} estimate={estimate} />)}
          </div>
        </div>
      </section>

      <section className="section dark" id="custom">
        <div className="wrap preorder-custom">
          <div>
            <p className="kicker">Custom</p>
            <h2>Your design, in ceramic.</h2>
            <div className="rows">
              {[
                ['Send your design', 'Dimensions below, plus a link to your STEP, STL or drawing.'],
                ['We check it', 'Can it be moulded? We will suggest changes if needed.'],
                ['You get a quote', 'Price and lead time. Nothing to pay until you approve.'],
              ].map(([title, body], index) => (
                <article className="vehicle-row" key={title}>
                  <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{title}</strong>
                    <span className="path-note">{body}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <CustomForm />
        </div>
      </section>

      <section className="section">
        <div className="wrap preorder-faq">
          <p className="kicker">Questions</p>
          <h2>Before you order.</h2>
          {faq.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>
                {item.a}
                {item.link ? <> <Link to={item.link.to}>{item.link.label}</Link>.</> : null}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
