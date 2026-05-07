import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <div className="footer-cta">
          <h2>Ready to Build Something Great?</h2>
          <p>Let's talk about your next project. No pressure, just a conversation.</p>
          <a href="mailto:hello@apexagency.com" className="btn btn-white">hello@apexagency.com</a>
        </div>
        <div className="footer-bottom">
          <span className="footer-logo">Apex Agency</span>
          <span>© {new Date().getFullYear()} Apex Agency. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
