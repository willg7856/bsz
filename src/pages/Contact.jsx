import { useState } from 'react'
import { contactReasons, site } from '../data'
import { useTitle } from '../useTitle'

const ticks = Array.from({ length: 40 })

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
    <div className="contact">
      <section className="contact-hero">
        <div className="contact-hero-grid-bg" aria-hidden="true" />
        <div className="container contact-hero-inner">
          <div>
            <p className="eyebrow">[ Get in touch ]</p>
            <h1 className="contact-hero-h1">Contact.</h1>
            <p className="contact-hero-sub">
              Want to collaborate, sponsor, or just follow the journey? We&apos;d love to hear from you.
            </p>
          </div>
          <div className="contact-hero-direct">
            <p className="contact-hero-direct-lbl">Direct email</p>
            <a className="contact-hero-email" href={`mailto:${site.directEmail}`}>{site.directEmail}</a>
          </div>
        </div>
        <div className="tick-rule contact-tick" aria-hidden="true">
          {ticks.map((_, index) => <span key={index} />)}
        </div>
      </section>

      <section className="section">
        <div className="container contact-body">
          <div className="contact-info">
            <p className="eyebrow">Reasons to reach out</p>
            <div className="contact-reasons">
              {contactReasons.map((reason) => (
                <div className="contact-reason" key={reason}>{reason}</div>
              ))}
            </div>
          </div>

          {status === 'success' ? (
            <div className="contact-success">
              <span className="contact-success-icon" aria-hidden="true">✓</span>
              <h2>Message sent</h2>
              <p>Thanks for reaching out — we&apos;ll get back to you soon.</p>
              <button type="button" className="btn" onClick={() => setStatus('idle')}>Send another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <h2>Send a message</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="reason">Reason</label>
                <select id="reason" name="reason" required defaultValue="">
                  <option value="" disabled>Select a reason</option>
                  {contactReasons.map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="What's this about?" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} placeholder="Your message..." required />
              </div>
              {status === 'error' ? (
                <p className="contact-error">Something went wrong — please try again or email us directly.</p>
              ) : null}
              <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
