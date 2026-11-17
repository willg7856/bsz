import { useState } from 'react'

export default function NewsletterSignup() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('submitting')
    setMessage('')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), website: data.get('website') }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.')
      form.reset()
      setStatus('done')
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-copy">
        <p className="newsletter-eyebrow">[ Updates ]</p>
        <h2 id="newsletter-title" className="newsletter-title">Follow the programme by email.</h2>
        <p className="newsletter-sub">Only for major milestones. Unsubscribe any time.</p>
      </div>
      {status === 'done' ? (
        <p className="newsletter-done" role="status">
          <span className="newsletter-done-mark" aria-hidden="true" />
          You&apos;re on the list. We&apos;ll email you when something big happens.
        </p>
      ) : (
        <form className="newsletter-form" onSubmit={onSubmit}>
          <label className="newsletter-label" htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-row">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              required
              maxLength={254}
              aria-describedby={message ? 'newsletter-error' : undefined}
            />
            <button className="newsletter-btn" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Signing up…' : 'Sign up'}
            </button>
          </div>
          {/* Hidden from people; bots that fill it in are ignored. */}
          <input className="newsletter-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          {message ? <p id="newsletter-error" className="newsletter-error" role="alert">{message}</p> : null}
        </form>
      )}
    </section>
  )
}
