import { useEffect, useRef, useState } from 'react'

// Stripe's payment form, shown on our page. Stripe.js is loaded from
// js.stripe.com in index.html (it must never be bundled). The publishable key
// comes from VITE_STRIPE_PUBLISHABLE_KEY.
const appearance = {
  theme: 'stripe',
  labels: 'auto',
  inputs: 'spaced',
  variables: {
    borderRadius: '4px',
    colorBackground: '#ffffff',
    colorDanger: '#df1b41',
    colorPrimary: '#0570de',
    colorSuccess: '#00c853',
    colorText: '#30313d',
    fontFamily: 'Inconsolata',
    fontSizeBase: '16px',
    spacingUnit: '4px',
  },
}

export default function StripeCheckoutForm({ clientSecret }) {
  const ref = useRef(null)
  const [error, setError] = useState('')
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  const ready = Boolean(key && typeof window !== 'undefined' && window.Stripe)

  useEffect(() => {
    if (!ready) return

    let cancelled = false
    const stripe = window.Stripe(key)
    const checkout = stripe.initCheckoutFormSdk({ clientSecret: Promise.resolve(clientSecret), appearance })
    const form = checkout.createForm({ layout: 'expanded' })
    form.mount(ref.current)

    checkout.loadActions().then((result) => {
      if (cancelled || result.type !== 'success') return
      form.on('confirm', async (event) => {
        try {
          await result.actions.confirm({ formConfirmEvent: event })
        } catch (e) {
          console.error('Payment confirmation error:', e)
          setError('The payment did not go through. Please check your details and try again.')
        }
      })
    })

    return () => {
      cancelled = true
      form?.unmount?.()
    }
  }, [clientSecret, key, ready])

  if (!ready) return <p className="contact-error">Payments are not set up right now. Please email us instead.</p>

  return (
    <>
      <div id="checkout-form" ref={ref} />
      {error ? <p className="contact-error">{error}</p> : null}
    </>
  )
}
