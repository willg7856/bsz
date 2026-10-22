import { Link } from 'react-router-dom'
import { partners, site } from '../data'
import { useTitle } from '../useTitle'

const paths = [
  {
    title: 'Donation',
    body: 'A donation is a gift to the programme, with no partnership attached. Write to us and we will reply with how to give.',
    to: '/contact?reason=Donation',
  },
  {
    title: 'Sponsorship',
    body: 'A sponsorship is a partnership with the team. Write to us, tell us who you are, and we will reply.',
    to: '/contact?reason=Sponsorship%20or%20partnership',
  },
]

export default function Support() {
  useTitle('Support')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Support</p>
            <h1>Donations and sponsorship.</h1>
            <p className="lede">
              Beyond Stage Zero is a student team in Creswick. We take donations and sponsorships. Send a message and we will reply with how to give.
            </p>
            <div className="actions">
              <Link className="btn btn-ink" to={paths[0].to}>Donate</Link>
              <Link className="btn" to={paths[1].to}>Sponsor</Link>
            </div>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Donations</span><span>By message</span></div>
            <div className="side-row"><span>Sponsorships</span><span>By message</span></div>
            <div className="side-row"><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">How to give</p>
              <h2>Two ways in.</h2>
            </div>
          </div>
          <div className="two">
            {paths.map((item) => (
              <article className="cell" key={item.title} style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p style={{ marginTop: '0.9rem' }}>
                  <Link className="home-project-link" to={item.to}>Contact us</Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-partners">
        <div className="wrap">
          <p className="eyebrow">Already with us</p>
          <div className="home-partners-logos">
            {partners.map((partner) => (
              <a className="home-partner" key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer">
                <img src={partner.logo} alt="" />
                <span>{partner.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
