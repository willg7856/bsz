import { useState } from 'react'
import './Contact.css'

const TICK = Array.from({ length: 40 })

const REASONS = [
  'Sponsorship or partnership',
  'Joining the team',
  'Join Spittership',
  'Media enquiries',
  'General questions',
]

export default function Contact() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xaqvpver', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="contact">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="contact-hero">
        <div className="contact-hero-grid-bg" aria-hidden="true" />
        <div className="container contact-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>[ Get in touch ]</p>
            <h1 className="contact-hero-h1">Contact.</h1>
            <p className="contact-hero-sub">
              Want to collaborate, sponsor, or just follow the journey?
              We'd love to hear from you.
            </p>
          </div>
          <div className="contact-hero-direct">
            <p className="contact-hero-direct-lbl">Direct email</p>
            <a className="contact-hero-email" href="mailto:beyondstagezero@gmail.com">
              beyondstagezero@gmail.com
            </a>
          </div>
        </div>
        <div className="tick-rule contact-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Form ─────────────────────────────────────── */}
      <section className="section">
        <div className="container contact-body">
          <div className="contact-info">
            <p className="eyebrow" style={{ marginBottom: '20px' }}>Reasons to reach out</p>
            <div className="contact-reasons">
              {REASONS.map(r => (
                <div key={r} className="contact-reason">{r}</div>
              ))}
            </div>
          </div>

          {status === 'success' ? (
            <div className="contact-success">
              <span className="contact-success-icon">✓</span>
              <h2>Message sent</h2>
              <p>Thanks for reaching out — we'll get back to you soon.</p>
              <button className="btn btn-outline" onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
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
                  {REASONS.map(r => (
                    <option key={r} value={r}>{r}</option>
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
              {status === 'error' && (
                <p className="contact-error">Something went wrong — please try again or email us directly.</p>
              )}
              <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Message →'}
              </button>
            </form>
          )}
        </div>
      </section>

    </main>
  )
}
