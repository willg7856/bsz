import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const link = (path) => `nav-link${pathname === path ? ' active' : ''}`
  const close = () => setOpen(false)

  return (
    <>
      <nav className="nav">
        <Link className="nav-logo" to="/" onClick={close}>Beyond Stage Zero</Link>
        <div className="nav-links">
          <Link className={link('/')} to="/">Home</Link>
          <Link className={link('/about')} to="/about">About</Link>
          <Link className={link('/stravox')} to="/stravox">STRAVOX</Link>
          <Link className={link('/news')} to="/news">News</Link>
          <Link className="nav-cta" to="/contact">Contact</Link>
        </div>
        <button
          className={`nav-burger${open ? ' is-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${open ? ' is-open' : ''}`} onClick={close}>
        <Link className={link('/')} to="/" onClick={close}>Home</Link>
        <Link className={link('/about')} to="/about" onClick={close}>About</Link>
        <Link className={link('/stravox')} to="/stravox" onClick={close}>STRAVOX</Link>
        <Link className={link('/news')} to="/news" onClick={close}>News</Link>
        <Link className="nav-cta-mobile" to="/contact" onClick={close}>Contact</Link>
      </div>
    </>
  )
}
