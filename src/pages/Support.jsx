import { Link } from 'react-router-dom'
import { site } from '../data'
import { useTitle } from '../useTitle'

const uses = [
  {
    title: 'Propellant and casings',
    body: 'Every static fire uses up propellant, and some use up the engine too. SF-04 ruptured its Mk II case.',
  },
  {
    title: 'Test equipment',
    body: 'Load cells, pressure gear and the static fire stand. Two of our four static fires destroyed the ground equipment.',
  },
  {
    title: 'Nozzles',
    body: 'A graphite nozzle costs us about $300. We are trying to make ceramic ones for about $10, and every mould and test piece costs money.',
  },
  {
    title: 'Getting B1M flying',
    body: 'Airframe materials, avionics, recovery hardware and launch costs for B1M-01.',
  },
]

export default function Support() {
  useTitle('Support us')
  const hasStripe = Boolean(site.stripeSupport)

  return (
    <>
      <header className="masthead stravox-photo-hero support-hero">
        <img className="stravox-photo-hero-img" src="/sf-c02-dawn-range.jpg" alt="The range set up before sunrise for SF-03 and SF-04" />
        <div className="stravox-photo-hero-shade" aria-hidden="true" />
        <div className="masthead-inner">
          <div>
            <p className="kicker">Support us</p>
            <h1>Help us build the next one</h1>
            <p className="lede">
              We are a student team and we pay for most of this ourselves. Any amount helps us buy propellant, rebuild test gear and get B1M off the ground.
            </p>
            <div className="actions">
              {hasStripe ? (
                <a className="btn btn-ink" href={site.stripeSupport} target="_blank" rel="noopener noreferrer">Support with Stripe</a>
              ) : (
                <a className="btn btn-ink" href={`mailto:${site.email}?subject=Supporting%20Beyond%20Stage%20Zero`}>Email us to support</a>
              )}
              <Link className="btn" to="/contact?reason=Sponsorship%20or%20partnership">Sponsor us</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <p className="kicker accent">Where it goes</p>
          <h2>What your money pays for</h2>
          <ul className="project-list support-uses">
            {uses.map((item) => (
              <li key={item.title}>
                <span className="support-use-title">{item.title}</span>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark">
        <div className="container support-how">
          <div>
            <p className="kicker">How it works</p>
            <h2>Paying online</h2>
          </div>
          <div className="support-how-body">
            {hasStripe ? (
              <>
                <p>
                  The button takes you to a secure Stripe checkout, where you choose how much to give and pay by card, Apple Pay or Google Pay. Stripe handles the payment and emails you a receipt. We never see your card details.
                </p>
                <a className="btn btn-ink" href={site.stripeSupport} target="_blank" rel="noopener noreferrer">Support with Stripe</a>
              </>
            ) : (
              <p>
                Online payments are coming soon. Until then, email us at{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a> and we will sort it out.
              </p>
            )}
            <p>
              Want to help with materials, machining time or a test site instead, or sponsor the team?{' '}
              <Link to="/contact?reason=Sponsorship%20or%20partnership">Get in touch</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
