import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { applyTheme, getPreferredTheme } from '../theme'
import { footerNav, nav, site } from '../data'

export default function Layout() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || getPreferredTheme())
  const location = useLocation()
  const [openOn, setOpenOn] = useState(null)
  const menuOpen = openOn === location.pathname

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  const nextLabel = theme === 'dark' ? 'Light' : 'Dark'
  const year = new Date().getFullYear()

  return (
    <div className="app">
      <a className="skip" href="#content">Skip to content</a>
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">Beyond Stage Zero</span>
          </Link>
          <nav className="top-nav" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="top-actions">
            <a className="text-link" href={site.space}>.space</a>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {nextLabel}
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setOpenOn(menuOpen ? null : location.pathname)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
            <NavLink to="/">Home</NavLink>
            {footerNav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            <a href={site.space}>Open .space</a>
          </nav>
        ) : null}
      </header>
      <main id="content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <div className="footer-brand">
              <img className="footer-mark" src="/mark.svg" alt="" />
              <span>Beyond Stage Zero</span>
            </div>
            <p className="footer-blurb">
              An Australian student rocketry team building Australia&apos;s first fully and rapidly reusable launch vehicle.
            </p>
          </div>
          <div>
            <p className="footer-label">Programme</p>
            <div className="footer-links">
              {footerNav.map((item) => (
                <Link key={item.to} to={item.to}>{item.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <div className="footer-links">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.x}>X · @beyondstagezero</a>
              <a href={site.starship}>Starship tracker</a>
              <a href={site.space}>beyondstagezero.space</a>
              <span>{site.place}</span>
            </div>
          </div>
        </div>
        <div className="wrap footer-base">
          <span>Founded 2025</span>
          <span>© {year} Beyond Stage Zero</span>
        </div>
      </footer>
    </div>
  )
}
