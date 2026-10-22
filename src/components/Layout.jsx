import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { site } from '../data'

const projects = [
  { path: '/stravox', label: 'STRAVOX', note: 'Full-scale reusable launch vehicle' },
  { path: '/b1m', label: 'STRAVOX B1M', note: 'Sub-scale 3 km test vehicle' },
  { path: '/b1m-engine', label: 'B1M engine', note: 'Motor casing, figures, and build log' },
  { path: '/nozzles', label: 'Ceramic Nozzles', note: 'Ceramic nozzle development programme' },
  { path: '/octopus', label: 'Octopus', note: 'Pad and vehicle data link to mission control' },
  { path: '/starship', label: 'Starship tracker', note: 'Live public tracker · 20,000 views in under 24 hours' },
]

const company = [
  { path: '/about', label: 'About', note: 'Team, base, and partners' },
  { path: '/news', label: 'News', note: 'Programme updates and milestones' },
  { path: '/gallery', label: 'Gallery', note: 'Build photos from the programme' },
  { path: '/support', label: 'Support', note: 'Donations and sponsorships' },
  { path: '/contact', label: 'Contact', note: 'Sponsorship, joining, and enquiries' },
]

function Logo() {
  return (
    <span className="brand-logo">
      <svg className="brand-logo-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="25.6" cy="60" r="18" fill="currentColor" />
        <path d="M45.1 23 L55.1 23 L55.1 97 L45.1 97" fill="none" stroke="currentColor" strokeWidth="9" />
        <line x1="70.7" y1="82" x2="90.7" y2="38" stroke="currentColor" strokeWidth="9" />
        <line x1="88.3" y1="82" x2="108.3" y2="38" stroke="currentColor" strokeWidth="9" />
      </svg>
      <span className="brand-logo-text">
        Beyond <span className="brand-logo-bracket">[Stage Zero]</span>
      </span>
    </span>
  )
}

function Dropdown({ label, items, pathname }) {
  const active = items.some((item) => item.path === pathname)
  return (
    <div className={`nav-dropdown${active ? ' active' : ''}`}>
      <button type="button" className={`nav-btn${active ? ' active' : ''}`} aria-haspopup="true">
        {label}
        <span className="nav-dropdown-caret" aria-hidden="true" />
      </button>
      <div className="nav-dropdown-menu" role="menu">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            role="menuitem"
            className={`nav-dropdown-item${pathname === item.path ? ' active' : ''}`}
          >
            <span className="nav-dropdown-item-label">{item.label}</span>
            <span className="nav-dropdown-item-note">{item.note}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

function MobileGroup({ label, items, pathname, onNavigate }) {
  const active = items.some((item) => item.path === pathname)
  const [open, setOpen] = useState(active)
  return (
    <div className={`nav-mobile-group${open ? ' is-open' : ''}${active ? ' has-active' : ''}`}>
      <button
        type="button"
        className={`nav-mobile-group-trigger${active ? ' active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <span className="nav-dropdown-caret" aria-hidden="true" />
      </button>
      <div className="nav-mobile-group-links" hidden={!open}>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`nav-mobile-project${pathname === item.path ? ' active' : ''}`}
            onClick={onNavigate}
          >
            <span className="nav-mobile-project-label">{item.label}</span>
            <span className="nav-mobile-project-note">{item.note}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default function Layout() {
  const location = useLocation()
  const [menuPath, setMenuPath] = useState(null)
  const menuOpen = menuPath === location.pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuPath(null)
  }

  return (
    <div className="app">
      <a className="skip" href="#content">Skip to content</a>
      <header className="nav">
        <div className="container nav-inner">
          <Link className="nav-brand" to="/" aria-label="Beyond Stage Zero home" onClick={closeMenu}>
            <Logo />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            <Dropdown label="Projects" items={projects} pathname={location.pathname} />
            <NavLink className="nav-btn" to="/missions">Missions</NavLink>
            <NavLink className="nav-btn" to="/tests">Tests</NavLink>
            <Dropdown label="Company" items={company} pathname={location.pathname} />
            <a className="nav-cta" href={site.space} target="_blank" rel="noopener noreferrer">.space</a>
          </nav>
          <button
            type="button"
            className={`nav-burger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-panel"
            onClick={() => setMenuPath(menuOpen ? null : location.pathname)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="nav-mobile-panel" className={`nav-mobile${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nav-mobile-panel">
          <div className="nav-mobile-head">
            <p className="nav-mobile-eyebrow">Menu</p>
            <span className="nav-mobile-path">{location.pathname === '/' ? '/home' : location.pathname}</span>
          </div>
          <nav className="nav-mobile-links" aria-label="Mobile">
            <MobileGroup label="Projects" items={projects} pathname={location.pathname} onNavigate={closeMenu} />
            <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to="/missions" onClick={closeMenu}>Missions</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to="/tests" onClick={closeMenu}>Tests</NavLink>
            <MobileGroup label="Company" items={company} pathname={location.pathname} onNavigate={closeMenu} />
          </nav>
          <div className="nav-mobile-foot">
            <a className="nav-cta-mobile" href={site.space} target="_blank" rel="noopener noreferrer">Open .space</a>
            <p className="nav-mobile-foot-note">{site.place}</p>
          </div>
        </div>
      </div>
      <main id="content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Beyond Stage Zero home"><Logo /></Link>
            <p>An Australian student rocketry team building Australia&apos;s first fully and rapidly reusable launch vehicle.</p>
          </div>
          <div className="footer-col">
            <h4>Pages</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/stravox">STRAVOX</Link>
            <Link to="/b1m">B1M</Link>
            <Link to="/b1m-engine">B1M engine</Link>
            <Link to="/missions">Missions</Link>
            <Link to="/tests">Tests</Link>
            <Link to="/news">News</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/nozzles">Nozzles</Link>
            <Link to="/octopus">Octopus</Link>
            <Link to="/starship">Starship tracker</Link>
            <Link to="/support">Support</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.x}>X · @beyondstagezero</a>
            <span className="footer-location">{site.place}</span>
          </div>
        </div>
        <div className="container footer-sites">
          <h4>Other sites</h4>
          <a href={site.starship} target="_blank" rel="noopener noreferrer">Starship tracker</a>
          <a href={site.space} target="_blank" rel="noopener noreferrer">.space</a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Beyond Stage Zero</span>
          <span>Founded 2025</span>
        </div>
      </footer>
    </div>
  )
}
