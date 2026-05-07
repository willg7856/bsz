import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-cta">
          <h2>Want to Be Part of This?</h2>
          <p>Whether you're a student, engineer, sponsor, or just excited about rockets — we'd love to hear from you.</p>
          <a href="mailto:hello@beyondstagehero.com" className="btn btn-white">Get in Touch</a>
        </div>
        <div className="footer-bottom">
          <span className="footer-logo">Beyond Stage Zero</span>
          <span>© {new Date().getFullYear()} Beyond Stage Zero. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
