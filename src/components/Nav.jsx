import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { SHOW_SPITTERSHIP } from '../featureFlags'
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
  ...(SHOW_SPITTERSHIP
    ? [{
        path: '/spittership',
        label: 'Spittership',
        note: 'Spitter / X community vehicle · BSZ + B1M',
      }]
    : []),
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

const company = [
  {
    path: '/about',
    label: 'About',
    note: 'Team, base, and partners',
  },
  {
    path: '/news',
    label: 'News',
    note: 'Programme updates and milestones',
  },
  {
    path: '/sponsors',
    label: 'Sponsors',
    note: 'Partnership pitch and support levels',
  },
  {
    path: '/contact',
    label: 'Contact',
    note: 'Sponsorship, joining, and enquiries',
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

function Dropdown({ label, items, active, pathname }) {
  return (
    <div className={`nav-dropdown${active ? ' active' : ''}`}>
      <button
        type="button"
        className={`nav-dropdown-trigger${active ? ' active' : ''}`}
        aria-expanded="false"
        aria-haspopup="true"
      >
        {label}
        <span className="nav-dropdown-caret" aria-hidden="true" />
      </button>
      <div className="nav-dropdown-menu" role="menu">
        {items.map((v) => (
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
  )
}

function MobileGroup({ label, items, open, setOpen, active, pathname, onNavigate }) {
  return (
    <div className={`nav-mobile-group${open ? ' is-open' : ''}${active ? ' has-active' : ''}`}>
      <button
        type="button"
        className={`nav-mobile-group-trigger${active ? ' active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <span className="nav-dropdown-caret" aria-hidden="true" />
      </button>
      <div className="nav-mobile-group-links" hidden={!open}>
        {items.map((v) => (
          <Link
            key={v.path}
            className={`nav-mobile-project${pathname === v.path ? ' active' : ''}`}
            to={v.path}
            onClick={onNavigate}
          >
            <span className="nav-mobile-project-label">{v.label}</span>
            <span className="nav-mobile-project-note">{v.note}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const isMobile = useIsMobile()
  const link = (path) => `nav-link${pathname === path ? ' active' : ''}`
  const projectActive = projects.some((v) => pathname === v.path)
  const companyActive = company.some((v) => pathname === v.path)
  const close = () => {
    setOpen(false)
    setProjectsOpen(false)
    setCompanyOpen(false)
  }

  useEffect(() => {
    if (!isMobile) {
      setOpen(false)
      setProjectsOpen(false)
      setCompanyOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    close()
  }, [pathname])

  useEffect(() => {
    if (!isMobile) return undefined
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, isMobile])

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Link className="nav-brand" to="/" onClick={close} aria-label="Beyond Stage Zero home">
            <BrandLogo />
          </Link>

          {isMobile ? (
            <button
              type="button"
              className={`nav-burger${open ? ' is-open' : ''}`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav-mobile-panel"
            >
              <span /><span /><span />
            </button>
          ) : (
            <nav className="nav-links">
              <Dropdown
                label="Projects"
                items={projects}
                active={projectActive}
                pathname={pathname}
              />
              <Link className={link('/missions')} to="/missions">Missions</Link>
              <Link className={link('/tests')} to="/tests">Tests</Link>
              <Dropdown
                label="Company"
                items={company}
                active={companyActive}
                pathname={pathname}
              />
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
        <div
          id="nav-mobile-panel"
          className={`nav-mobile${open ? ' is-open' : ''}`}
          aria-hidden={!open}
        >
          <div className="nav-mobile-panel">
            <div className="nav-mobile-head">
              <p className="nav-mobile-eyebrow mono">Menu</p>
              <span className="nav-mobile-path mono">{pathname === '/' ? '/home' : pathname}</span>
            </div>

            <nav className="nav-mobile-links" aria-label="Mobile">
              <MobileGroup
                label="Projects"
                items={projects}
                open={projectsOpen}
                setOpen={setProjectsOpen}
                active={projectActive}
                pathname={pathname}
                onNavigate={close}
              />

              <Link className={link('/missions')} to="/missions" onClick={close}>Missions</Link>
              <Link className={link('/tests')} to="/tests" onClick={close}>Tests</Link>

              <MobileGroup
                label="Company"
                items={company}
                open={companyOpen}
                setOpen={setCompanyOpen}
                active={companyActive}
                pathname={pathname}
                onNavigate={close}
              />
            </nav>

            <div className="nav-mobile-foot">
              <a
                className="nav-cta-mobile"
                href="https://beyondstagezero.space"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                Open .space →
              </a>
              <p className="nav-mobile-foot-note mono">Creswick, VIC · Australia</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
