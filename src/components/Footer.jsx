import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-cta">
          <h2>Ready to Build Something Great?</h2>
          <p>Let's talk about your next project. No pressure, just a conversation.</p>
          <a href="mailto:hello@beyondstagezero.com" className="btn btn-white">hello@beyondstagezero.com</a>
        </div>
        <div className="footer-bottom">
          <span className="footer-logo">Beyond Stage Zero</span>
          <span>© {new Date().getFullYear()} Beyond Stage Zero. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
