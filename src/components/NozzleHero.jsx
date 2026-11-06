import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const DOHERTY = 'https://ballarattechschool.vic.edu.au/programs/peter-doherty-science-award'

const stats = [
  { label: 'Mould', value: 'v13', tone: 'num' },
  { label: 'Completed', value: '3', tone: 'done' },
  { label: 'In production', value: '5', tone: 'num' },
  { label: 'Target', value: 'B1M motor stack' },
  { label: '2026', value: 'Doherty Award', href: DOHERTY },
]

const Icon = {
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  muted: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M15.5 9.5l5 5M20.5 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  sound: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  expand: <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />,
  shrink: <path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />,
}

function IconButton({ label, icon, onClick, pressed }) {
  return (
    <button type="button" className="nozzle-hero-btn" onClick={onClick} aria-label={label} title={label} aria-pressed={pressed}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">{Icon[icon]}</svg>
    </button>
  )
}

const fullscreenElement = () => document.fullscreenElement || document.webkitFullscreenElement || null

// Full-screen release video at the top of the Ceramic nozzles page: autoplays
// muted and looped, with the pre-order button bottom-left, stats bottom-right
// and play/pause, sound and full-screen controls.
export default function NozzleHero() {
  const hero = useRef(null)
  const video = useRef(null)
  const [reduceMotion] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [isFull, setIsFull] = useState(false)

  useEffect(() => {
    const v = video.current
    const sync = () => {
      setPlaying(!v.paused)
      setMuted(v.muted)
    }
    const onFull = () => setIsFull(fullscreenElement() === hero.current)
    for (const e of ['play', 'pause', 'volumechange']) v.addEventListener(e, sync)
    document.addEventListener('fullscreenchange', onFull)
    document.addEventListener('webkitfullscreenchange', onFull)
    sync()
    return () => {
      for (const e of ['play', 'pause', 'volumechange']) v.removeEventListener(e, sync)
      document.removeEventListener('fullscreenchange', onFull)
      document.removeEventListener('webkitfullscreenchange', onFull)
    }
  }, [])

  function togglePlay() {
    const v = video.current
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  function toggleMute() {
    const v = video.current
    v.muted = !v.muted
    if (!v.muted && v.paused) v.play().catch(() => {})
  }

  function toggleFullscreen() {
    const el = hero.current
    const v = video.current
    if (fullscreenElement()) {
      ;(document.exitFullscreen || document.webkitExitFullscreen)?.call(document)
      return
    }
    // Full-screen the whole hero so our controls stay; iPhones only allow the
    // video element itself, which brings up the native player.
    if (el.requestFullscreen) el.requestFullscreen().catch(() => v.webkitEnterFullscreen?.())
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
    else v.webkitEnterFullscreen?.()
    if (v.paused) v.play().catch(() => {})
  }

  return (
    <section className={`nozzle-hero${isFull ? ' is-full' : ''}`} ref={hero} aria-label="Ceramic nozzle release video">
      <video
        ref={video}
        className="nozzle-hero-video"
        src="/nozzle-release.mp4"
        poster="/nozzle-release-poster.jpg"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload={reduceMotion ? 'metadata' : 'auto'}
        onClick={togglePlay}
      />
      <div className="nozzle-hero-shade" aria-hidden="true" />

      <div className="nozzle-hero-ui">
        <div className="nozzle-hero-left">
          <p className="nozzle-hero-kicker">Ceramic nozzles · pre-orders open</p>
          <Link className="btn btn-ink nozzle-hero-cta" to="/nozzles/preorder">Pre-order a nozzle →</Link>
        </div>

        <div className="nozzle-hero-right">
          <dl className="nozzle-hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className={s.tone || undefined}>
                  {s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer">{s.value}</a> : s.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="nozzle-hero-controls">
            <IconButton label={playing ? 'Pause video' : 'Play video'} icon={playing ? 'pause' : 'play'} onClick={togglePlay} />
            <IconButton label={muted ? 'Turn sound on' : 'Turn sound off'} icon={muted ? 'muted' : 'sound'} onClick={toggleMute} pressed={!muted} />
            <IconButton label={isFull ? 'Exit full screen' : 'Full screen'} icon={isFull ? 'shrink' : 'expand'} onClick={toggleFullscreen} />
          </div>
        </div>
      </div>
    </section>
  )
}
