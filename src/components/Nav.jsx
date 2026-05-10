import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
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

const navLinks = [
  { label: 'Mission',  href: '/#mission' },
  { label: 'Rocket',   href: '/#rocket' },
  { label: 'Stages',   href: '/#stages' },
  { label: 'Team',     href: '/#team' },
  { label: 'Sponsors', href: '/#sponsors' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const close = () => setOpen(false)

  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  return (
    <>
      <nav className="nav">
        <a className="nav-logo" href="/#mission" onClick={close}>
          <Logo height={28} />
        </a>

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
            {navLinks.map((l) => (
              <a key={l.label} className="nav-link" href={l.href}>{l.label}</a>
            ))}
            <Link
              className={`nav-link${pathname === '/news' ? ' active' : ''}`}
              to="/news"
            >
              Press
            </Link>
            <a className="nav-cta" href="#contact">Sponsor →</a>
          </div>
        )}
      </nav>

      {isMobile && (
        <div className={`nav-mobile${open ? ' is-open' : ''}`}>
          {navLinks.map((l) => (
            <a key={l.label} className="nav-link" href={l.href} onClick={close}>{l.label}</a>
          ))}
          <Link
            className={`nav-link${pathname === '/news' ? ' active' : ''}`}
            to="/news"
            onClick={close}
          >
            Press
          </Link>
          <a className="nav-cta-mobile" href="/#contact" onClick={close}>Sponsor →</a>
        </div>
      )}
    </>
  )
}
