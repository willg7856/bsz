import './Contact.css'

export default function Contact() {
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

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            window.location.href = `mailto:beyondstagezero@gmail.com?subject=${encodeURIComponent(data.get('subject'))}&body=${encodeURIComponent(`Name: ${data.get('name')}\n\n${data.get('message')}`)}`
          }}
        >
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
          <button className="btn btn-primary" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}
