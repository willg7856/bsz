import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import './Nav.css'

const projects = [
  {
    path: '/stravox',
    label: 'STRAVOX',
    note: 'Full-scale reusable launch vehicle',
  },
  {
    path: '/b1m',
    label: 'STRAVOX B1M',
    note: 'Sub-scale 3 km test vehicle',
  },
  {
    path: '/spittership',
    label: 'Spittership',
    note: 'Community-driven vehicle · powered by B1M',
  },
  {
    path: '/nozzles',
    label: 'Ceramic Nozzles',
    note: 'Ceramic nozzle development programme',
  },
  {
    path: '/octopus',
    label: 'Octopus',
    note: 'Pad and vehicle data link to mission control',
  },
]

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
  const [projectsOpen, setProjectsOpen] = useState(false)
  const isMobile = useIsMobile()
  const link = (path) => `nav-link${pathname === path ? ' active' : ''}`
  const projectActive = projects.some((v) => pathname === v.path)
  const close = () => {
    setOpen(false)
    setProjectsOpen(false)
  }

  useEffect(() => {
    if (!isMobile) {
      setOpen(false)
      setProjectsOpen(false)
    }
  }, [isMobile])

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Link className="nav-brand" to="/" onClick={close} aria-label="Beyond Stage Zero home">
            <BrandLogo />
          </Link>

          {isMobile ? (
            <button
              className={`nav-burger${open ? ' is-open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <span /><span /><span />
            </button>
          ) : (
            <nav className="nav-links">
              <Link className={link('/')} to="/">Home</Link>
              <Link className={link('/about')} to="/about">About</Link>

              <div className={`nav-dropdown${projectActive ? ' active' : ''}`}>
                <button
                  type="button"
                  className={`nav-dropdown-trigger${projectActive ? ' active' : ''}`}
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  Projects
                  <span className="nav-dropdown-caret" aria-hidden="true" />
                </button>
                <div className="nav-dropdown-menu" role="menu">
                  {projects.map((v) => (
                    <Link
                      key={v.path}
                      className={`nav-dropdown-item${pathname === v.path ? ' active' : ''}`}
                      to={v.path}
                      role="menuitem"
                    >
                      <span className="nav-dropdown-item-label">{v.label}</span>
                      <span className="nav-dropdown-item-note">{v.note}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link className={link('/missions')} to="/missions">Missions</Link>
              <Link className={link('/tests')} to="/tests">Tests</Link>
              <Link className={link('/contact')} to="/contact">Contact</Link>
              <a
                className="nav-cta"
                href="https://beyondstagezero.space"
                target="_blank"
                rel="noopener noreferrer"
              >
                .space
              </a>
            </nav>
          )}
        </div>
      </header>

      {isMobile && (
        <div className={`nav-mobile${open ? ' is-open' : ''}`}>
          <Link className={link('/')} to="/" onClick={close}>Home</Link>
          <Link className={link('/about')} to="/about" onClick={close}>About</Link>

          <div className={`nav-mobile-group${projectsOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className={`nav-mobile-group-trigger${projectActive ? ' active' : ''}`}
              onClick={() => setProjectsOpen((o) => !o)}
              aria-expanded={projectsOpen}
            >
              Projects
              <span className="nav-dropdown-caret" aria-hidden="true" />
            </button>
            {projectsOpen && (
              <div className="nav-mobile-group-links">
                {projects.map((v) => (
                  <Link
                    key={v.path}
                    className={link(v.path)}
                    to={v.path}
                    onClick={close}
                  >
                    {v.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link className={link('/missions')} to="/missions" onClick={close}>Missions</Link>
          <Link className={link('/tests')} to="/tests" onClick={close}>Tests</Link>
          <Link className={link('/contact')} to="/contact" onClick={close}>Contact</Link>
          <a
            className="nav-cta-mobile"
            href="https://beyondstagezero.space"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            .space
          </a>
        </div>
      )}
    </>
  )
}
