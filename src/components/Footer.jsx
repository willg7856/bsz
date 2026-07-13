import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/logo-banner.png" alt="Beyond Stage Zero" className="footer-logo" />
          <p>An Australian student rocketry team building Australia's first fully and rapidly reusable launch vehicle.</p>
        </div>
        <div className="footer-col">
          <h4>Pages</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/stravox">STRAVOX</Link>
          <Link to="/news">News</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href="mailto:beyondstagezero@gmail.com">beyondstagezero@gmail.com</a>
          <span className="footer-location">Creswick, VIC · Australia</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="mono">© {new Date().getFullYear()} Beyond Stage Zero</span>
        <span className="mono">Founded 2025</span>
      </div>
    </footer>
  )
}
