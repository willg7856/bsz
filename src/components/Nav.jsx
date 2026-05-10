import { useState, useEffect } from 'react'
import './Nav.css'

const LINKS = [
  { label: 'Mission',  href: '#mission' },
  { label: 'Rocket',   href: '#rocket' },
  { label: 'Stages',   href: '#stages' },
  { label: 'Team',     href: '#team' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Press',    href: '#press' },
]

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const close = () => setOpen(false)

  useEffect(() => { if (!isMobile) setOpen(false) }, [isMobile])

  return (
    <>
      <header className="nav">
        <a className="nav-logo" href="#mission" onClick={close}>
          <svg viewBox="0 0 900 220" height="22" xmlns="http://www.w3.org/2000/svg" aria-label="Beyond Stage Zero">
            <path fill="white" d="M38,110 L130,65 L235,65 L248,35 L268,18 L345,18 L365,35 L378,65 L740,65 L768,38 L820,38 L848,110 L820,182 L768,182 L740,155 L378,155 L365,185 L345,202 L268,202 L248,185 L235,155 L130,155 Z" />
          </svg>
        </a>

        {isMobile ? (
          <button
            className={`nav-burger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        ) : (
          <div className="nav-links">
            {LINKS.map(l => (
              <a key={l.label} className="nav-link" href={l.href}>{l.label}</a>
            ))}
            <a className="nav-cta" href="#contact">Sponsor →</a>
          </div>
        )}
      </header>

      {isMobile && (
        <div className={`nav-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
          {LINKS.map(l => (
            <a key={l.label} className="nav-overlay-link" href={l.href} onClick={close}>{l.label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={close}>Sponsor →</a>
        </div>
      )}
    </>
  )
}
