import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 769)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 769)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const link = (path) => `nav-link${pathname === path ? ' active' : ''}`
  const close = () => setOpen(false)

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  return (
    <>
      <nav className="nav">
        <Link className="nav-logo" to="/" onClick={close}>Beyond Stage Zero</Link>

        {isMobile ? (
          <button
            className={`nav-burger${open ? ' is-open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        ) : (
          <div className="nav-links">
            <Link className={link('/')} to="/">Home</Link>
            <Link className={link('/about')} to="/about">About</Link>
            <Link className={link('/stravox')} to="/stravox">STRAVOX</Link>
            <Link className={link('/news')} to="/news">News</Link>
            <Link className="nav-cta" to="/contact">Contact</Link>
          </div>
        )}
      </nav>

      {isMobile && (
        <div className={`nav-mobile${open ? ' is-open' : ''}`}>
          <Link className={link('/')} to="/" onClick={close}>Home</Link>
          <Link className={link('/about')} to="/about" onClick={close}>About</Link>
          <Link className={link('/stravox')} to="/stravox" onClick={close}>STRAVOX</Link>
          <Link className={link('/news')} to="/news" onClick={close}>News</Link>
          <Link className="nav-cta-mobile" to="/contact" onClick={close}>Contact</Link>
        </div>
      )}
    </>
  )
}
