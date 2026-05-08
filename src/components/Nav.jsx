import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <nav className="nav">
      <Link className="nav-logo" to="/">
        <img src="/logo.svg" alt="Beyond Stage Zero" className="nav-logo-img" />
      </Link>
      <div className="nav-links">
        <Link className={pathname === '/' ? 'active' : ''} to="/">Home</Link>
        <Link className={pathname === '/about' ? 'active' : ''} to="/about">About</Link>
        <Link className={pathname === '/stravox' ? 'active' : ''} to="/stravox">STRAVOX</Link>
        <Link className="nav-cta" to="/contact">Contact</Link>
      </div>
    </nav>
  )
}
