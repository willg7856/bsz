import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">Beyond Stage Zero</span>
        <div className="footer-links">
          <a href="/#mission">Mission</a>
          <a href="/#rocket">Rocket</a>
          <a href="/#stages">Stages</a>
          <a href="/#team">Team</a>
          <Link to="/news">Press</Link>
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Beyond Stage Zero. Founded 2025.</span>
      </div>
    </footer>
  )
}
