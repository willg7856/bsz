import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

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
    <div className="contact">
      <div className="page-header">
        <p className="eyebrow">Get In Touch</p>
        <h1>Contact Us</h1>
        <p className="page-sub">
          Have a question, want to collaborate, or just want to follow our journey? We'd love to hear from you.
        </p>
      </div>

      <div className="contact-body">
        <div className="contact-info">
          <h2>Reach Out Directly</h2>
          <a className="contact-email" href="mailto:beyondstagezero@gmail.com">
            beyondstagezero@gmail.com
          </a>
        </div>

        {status === 'success' ? (
          <div className="contact-success">
            <p className="contact-success-icon">✓</p>
            <h2>Message sent</h2>
            <p>Thanks for reaching out — we'll get back to you soon.</p>
            <button className="btn btn-outline" onClick={() => setStatus('idle')}>
              Send another
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="What's this about?" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Your message..." required />
            </div>
            {status === 'error' && (
              <p className="contact-error">Something went wrong — please try again or email us directly.</p>
            )}
            <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
