import { useEffect, useRef, useState } from 'react'

/**
 * Full-screen photo viewer for the Gallery page: ← → or the arrow buttons to move, swipe on
 * touch screens, Esc to close. Shows the small version straight away, then the full photo, and
 * fetches the photos either side so moving between them is instant.
 */
export default function GalleryViewer({ items, index, onIndex, onClose }) {
  const item = items[index]
  // Which photo has finished loading (so moving to another starts from the small version again).
  const [loadedSrc, setLoadedSrc] = useState(null)
  const loaded = loadedSrc === item.src
  const closeRef = useRef(null)
  const touch = useRef(null)
  const prev = index > 0 ? index - 1 : null
  const next = index < items.length - 1 ? index + 1 : null

  // Keyboard, scroll lock and focus while open.
  useEffect(() => {
    const before = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && prev !== null) onIndex(prev)
      else if (e.key === 'ArrowRight' && next !== null) onIndex(next)
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      if (before instanceof HTMLElement && before.isConnected) before.focus()
    }
  }, [prev, next, onIndex, onClose])

  // Fetch the neighbours so the next photo is already there.
  useEffect(() => {
    for (const i of [prev, next]) {
      if (i === null || items[i].videoId) continue
      const img = new Image()
      img.src = items[i].src
    }
  }, [items, prev, next])

  const onTouchStart = (e) => {
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0 && next !== null) onIndex(next)
      if (dx > 0 && prev !== null) onIndex(prev)
    } else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) {
      onClose() // swipe down to close
    }
  }

  const small = item.thumb && item.thumb !== item.src ? item.thumb : null

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={item.caption || `Photo ${index + 1}`}>
      <div className="viewer-top">
        <span className="viewer-count">
          {String(index + 1).padStart(2, '0')} <span>/ {String(items.length).padStart(2, '0')}</span>
        </span>
        <div className="viewer-actions">
          <a className="viewer-link" href={item.src} target="_blank" rel="noopener noreferrer">
            {item.videoId ? 'YouTube ↗' : 'Original ↗'}
          </a>
          <button ref={closeRef} type="button" className="viewer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      <div
        className="viewer-stage"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {item.videoId ? (
          <iframe
            key={item.videoId}
            className={`viewer-video${item.vertical ? ' is-vertical' : ''}`}
            src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&playsinline=1`}
            title={item.caption || 'Video'}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <>
            {small && <img className={`viewer-img viewer-img-small${loaded ? ' is-hidden' : ''}`} src={small} alt="" aria-hidden="true" />}
            <img
              key={item.src}
              className={`viewer-img${loaded ? ' is-loaded' : ''}`}
              src={item.src}
              alt={item.caption}
              onLoad={() => setLoadedSrc(item.src)}
            />
            {!loaded && !small && <span className="viewer-loading" aria-hidden="true" />}
          </>
        )}
      </div>

      <button type="button" className="viewer-nav viewer-prev" onClick={() => prev !== null && onIndex(prev)} disabled={prev === null} aria-label="Previous photo">
        ‹
      </button>
      <button type="button" className="viewer-nav viewer-next" onClick={() => next !== null && onIndex(next)} disabled={next === null} aria-label="Next photo">
        ›
      </button>

      <div className="viewer-caption">
        {item.kind !== 'photo' && <span className="viewer-kind">{item.kind === 'render' ? 'Render' : item.kind === 'video' ? 'Video' : 'Team'}</span>}
        <p>{item.caption}</p>
      </div>
    </div>
  )
}
