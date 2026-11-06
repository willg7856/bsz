import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Mould', value: 'v13', tone: 'num' },
  { label: 'Completed', value: '3', tone: 'done' },
  { label: 'In production', value: '5', tone: 'num' },
  { label: 'Target', value: 'B1M motor stack' },
  { label: '2026', value: 'Doherty Award', to: '/nozzles/research#doherty' },
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

const clock = (t) => {
  const s = Math.max(0, Math.floor(t || 0))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
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
  const seekBar = useRef(null)
  const timeText = useRef(null)
  const dragging = useRef(false)

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

  useEffect(() => {
    const v = video.current
    let frame = 0
    let shown = ''
    const tick = () => {
      frame = requestAnimationFrame(tick)
      const d = v.duration
      if (!d || !Number.isFinite(d)) return
      const p = Math.min(1, v.currentTime / d)
      seekBar.current?.style.setProperty('--p', p)
      const label = `${clock(v.currentTime)} / ${clock(d)}`
      if (label !== shown) {
        shown = label
        if (timeText.current) timeText.current.textContent = label
        seekBar.current?.setAttribute('aria-valuenow', String(Math.floor(v.currentTime)))
        seekBar.current?.setAttribute('aria-valuemax', String(Math.floor(d)))
        seekBar.current?.setAttribute('aria-valuetext', label)
      }
    }
    tick()
    return () => cancelAnimationFrame(frame)
  }, [])

  function seekTo(clientX) {
    const v = video.current
    const bar = seekBar.current
    if (!v.duration || !Number.isFinite(v.duration)) return
    const r = bar.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
    v.currentTime = p * v.duration
    bar.style.setProperty('--p', p)
  }

  const seekHandlers = {
    onPointerDown(e) {
      dragging.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      e.currentTarget.classList.add('is-dragging')
      seekTo(e.clientX)
    },
    onPointerMove(e) {
      if (dragging.current) seekTo(e.clientX)
    },
    onPointerUp(e) {
      dragging.current = false
      e.currentTarget.classList.remove('is-dragging')
    },
    onPointerCancel(e) {
      dragging.current = false
      e.currentTarget.classList.remove('is-dragging')
    },
    onKeyDown(e) {
      const v = video.current
      const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key]
      if (step) v.currentTime = Math.min(v.duration || 0, Math.max(0, v.currentTime + step))
      else if (e.key === 'Home') v.currentTime = 0
      else if (e.key === 'End') v.currentTime = Math.max(0, (v.duration || 0) - 0.1)
      else return
      e.preventDefault()
    },
  }

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
                  {s.to ? <Link to={s.to}>{s.value}</Link> : s.value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="nozzle-hero-controls">
            <span className="nozzle-hero-time" ref={timeText} aria-hidden="true">0:00</span>
            <IconButton label={playing ? 'Pause video' : 'Play video'} icon={playing ? 'pause' : 'play'} onClick={togglePlay} />
            <IconButton label={muted ? 'Turn sound on' : 'Turn sound off'} icon={muted ? 'muted' : 'sound'} onClick={toggleMute} pressed={!muted} />
            <IconButton label={isFull ? 'Exit full screen' : 'Full screen'} icon={isFull ? 'shrink' : 'expand'} onClick={toggleFullscreen} />
          </div>
        </div>
      </div>

      <div
        ref={seekBar}
        className="nozzle-hero-seek"
        role="slider"
        tabIndex={0}
        aria-label="Video position"
        aria-valuemin={0}
        {...seekHandlers}
      >
        <div className="nozzle-hero-seek-track">
          <div className="nozzle-hero-seek-fill" />
          <div className="nozzle-hero-seek-thumb" />
        </div>
      </div>
    </section>
  )
}
