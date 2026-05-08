import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">Beyond Stage Zero</span>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/stravox">STRAVOX</Link>
          <Link to="/news">News</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Beyond Stage Zero. Founded 2025.</span>
      </div>
    </footer>
  )
}
