import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  const { pathname } = useLocation()
  const link = (path) => `nav-link${pathname === path ? ' active' : ''}`

  return (
    <nav className="nav">
      <Link className="nav-logo" to="/">Beyond Stage Zero</Link>
      <div className="nav-links">
        <Link className={link('/')} to="/">Home</Link>
        <Link className={link('/about')} to="/about">About</Link>
        <Link className={link('/stravox')} to="/stravox">STRAVOX</Link>
        <Link className={link('/news')} to="/news">News</Link>
        <Link className="nav-cta" to="/contact">Contact</Link>
      </div>
    </nav>
  )
}
