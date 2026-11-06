import { Link } from 'react-router-dom'
import { nozzlePreorder, site } from '../data'
import { useLocalEstimate } from '../localCurrency'
import NozzleConfigurator from '../nozzle/NozzleConfigurator'
import { NOZZLE_ORDER } from '../nozzle/order'
import { useTitle } from '../useTitle'

const { sizes, currency, shipWindow, localCurrencies } = nozzlePreorder

const tbc = (value) => value ?? 'TBC'
// Standard sizes only appear when nozzlePreorder.sizes in data.js has entries.
const hasSizes = sizes.length > 0

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
    q: 'What happens after I pay?',
    a: `Your $${NOZZLE_ORDER.amount} ${NOZZLE_ORDER.currency} pre-order sends us your model and numbers. We check that it can be cast, then email you to confirm it, suggest changes, or give you a full refund if we can't make it.`,
  },
  {
    q: 'Which files can I upload?',
    a: 'STL files, exported as a closed solid of the whole nozzle (inside bore and outside). Most CAD programs can export one: File → Export → STL. No STL? Send us a drawing on the contact page.',
    link: { to: '/contact?reason=Ceramic%20nozzle%20enquiries', label: 'Contact us' },
  },
  {
    q: 'How accurate are the measured numbers?',
    a: 'They are an automatic estimate from your mesh, usually within a few percent. Always check them against your design. Whatever you submit is what we review.',
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
              {hasSizes
                ? 'Pick one of our standard sizes, or send us your own design and we will make it in ceramic.'
                : 'Upload your nozzle design, check the numbers we measure from it, and pre-order it cast in ceramic.'}
            </p>
            <div className="actions">
              {hasSizes ? <a className="btn btn-ink" href="#standard">Standard sizes</a> : null}
              <a className={hasSizes ? 'btn' : 'btn btn-ink'} href="#custom">{hasSizes ? 'Your own design' : 'Upload your design'}</a>
              <Link className="btn" to="/nozzles">▶ Watch the video</Link>
            </div>
          </div>
          <div className="masthead-side">
            {hasSizes ? <div className="side-row"><span>Standard sizes</span><span className="num">{sizes.length}</span></div> : null}
            <div className="side-row"><span>Custom pre-order</span><span className="num">${NOZZLE_ORDER.amount} {NOZZLE_ORDER.currency}</span></div>
            <div className="side-row"><span>If we can&apos;t make it</span><span>Full refund</span></div>
            <div className="side-row"><span>Ships</span><span>{shipWindow ? shipWindow[0].toUpperCase() + shipWindow.slice(1) : 'TBC'}</span></div>
            <div className="side-row"><span>Programme</span><Link to="/nozzles">Ceramic nozzles</Link></div>
          </div>
        </div>
      </header>

      {hasSizes ? (
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
      ) : null}

      <section className="section dark" id="custom">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">{hasSizes ? 'Custom' : 'How it works'}</p>
              <h2>Your design, in ceramic.</h2>
            </div>
          </div>
          <ol className="nozzle-steps">
            {[
              ['Upload your STL', 'It opens in a 3D viewer, right here in your browser.'],
              ['Check the numbers', 'We measure the throat, exit and cone angles. Fix anything we got wrong.'],
              [`Pre-order for $${NOZZLE_ORDER.amount}`, 'Pay securely with Stripe. Your model and numbers come to us.'],
              ['We email you', 'To confirm it, suggest changes, or refund you in full.'],
            ].map(([title, body], index) => (
              <li key={title}>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <span>{body}</span>
              </li>
            ))}
          </ol>
          <NozzleConfigurator />
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
