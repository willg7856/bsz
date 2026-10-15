import { useState } from 'react'
import { contactReasons, site } from '../data'
import { useTitle } from '../useTitle'

export default function Contact() {
  useTitle('Contact')
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

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Get in touch</p>
            <h1>Contact.</h1>
            <p className="lede">
              Want to collaborate, sponsor, or just follow the journey? We&apos;d love to hear from you.
            </p>
          </div>
          <div className="masthead-side">
            <div className="side-row">
              <span>Direct email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="side-row"><span>Base</span><span>{site.place}</span></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="kicker">Reasons to reach out</p>
            <div className="rows">
              {contactReasons.map((reason) => (
                <div className="vehicle-row" key={reason}>
                  <span className="idx">→</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
          {status === 'success' ? (
            <div>
              <h2>Message sent</h2>
              <p className="lede">Thanks for reaching out — we&apos;ll get back to you soon.</p>
              <button type="button" className="btn" style={{ marginTop: '1rem' }} onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              <h2>Send a message</h2>
              <div className="form-row">
                <label>
                  Name
                  <input id="name" name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Email
                  <input id="email" name="email" type="email" placeholder="your@email.com" required />
                </label>
              </div>
              <label>
                Reason
                <select id="reason" name="reason" required defaultValue="">
                  <option value="" disabled>Select a reason</option>
                  {contactReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </label>
              <label>
                Subject
                <input id="subject" name="subject" type="text" placeholder="What's this about?" required />
              </label>
              <label>
                Message
                <textarea id="message" name="message" rows={6} placeholder="Your message..." required />
              </label>
              {status === 'error' ? (
                <p className="form-error">Something went wrong — please try again or email us directly.</p>
              ) : null}
              <button className="btn btn-ink" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
