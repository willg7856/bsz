import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GalleryViewer from '../components/GalleryViewer'
import { gallery } from '../data'
import { liveGallery, useOctopus } from '../octopus'
import { useTitle } from '../useTitle'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'photo', label: 'Photos' },
  { id: 'render', label: 'Renders' },
  { id: 'team', label: 'Team' },
  { id: 'video', label: 'Videos' },
]

/** How many masonry columns fit, from the page width. */
function useColumns() {
  const pick = () => {
    if (typeof window === 'undefined') return 3
    const w = window.innerWidth
    return w >= 2000 ? 5 : w >= 1500 ? 4 : w >= 1000 ? 3 : w >= 560 ? 2 : 1
  }
  const [cols, setCols] = useState(pick)
  useEffect(() => {
    const on = () => setCols(pick())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return cols
}

/**
 * Puts each photo in the currently shortest column, in order, so the wall reads left to right
 * and top to bottom while every photo keeps its own shape.
 */
function masonry(items, cols, ratioOf) {
  const columns = Array.from({ length: cols }, () => ({ height: 0, items: [] }))
  items.forEach((item, index) => {
    const col = columns.reduce((a, b) => (b.height < a.height ? b : a))
    col.items.push({ item, index })
    col.height += ratioOf(item) + 0.12 // caption allowance
  })
  return columns
}

export default function Gallery() {
  useTitle('Gallery')
  const [filter, setFilter] = useState('all')
  // Managed in Octopus (its Gallery page); the built-in photos until then.
  const photos = liveGallery(useOctopus(), gallery)
  const cols = useColumns()
  const location = useLocation()
  const navigate = useNavigate()

  // Shapes we only learn once an image loads (photos without saved dimensions).
  const [measured, setMeasured] = useState({})
  const ratioOf = useCallback(
    (item) => (item.width && item.height ? item.height / item.width : measured[item.src] || 0.75),
    [measured],
  )

  const counts = useMemo(() => {
    const c = { all: photos.length, photo: 0, render: 0, team: 0, video: 0 }
    for (const p of photos) c[p.kind] = (c[p.kind] || 0) + 1
    return c
  }, [photos])
  const shown = useMemo(() => (filter === 'all' ? photos : photos.filter((p) => p.kind === filter)), [photos, filter])
  const columns = useMemo(() => masonry(shown, cols, ratioOf), [shown, cols, ratioOf])

  // The open photo lives in the address (#photo-4), so it can be shared and Back closes it.
  const match = /^#photo-(\d+)$/.exec(location.hash)
  const open = match ? Number(match[1]) - 1 : -1
  const openAt = (i) => navigate({ hash: `photo-${i + 1}` }, { replace: open >= 0 })
  const close = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate({ hash: '' }, { replace: true }))
  const lastOpen = useRef(-1)
  useEffect(() => {
    // Back on the grid: return focus to the photo that was open.
    if (open < 0 && lastOpen.current >= 0) document.getElementById(`gallery-photo-${lastOpen.current}`)?.focus()
    lastOpen.current = open
  }, [open])

  const renders = counts.render || 0
  const videos = counts.video || 0
  const pics = photos.length - renders - videos

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner gallery-masthead">
          <div>
            <p className="kicker">Photos</p>
            <h1>Gallery.</h1>
            <p className="lede">
              The programme in pictures: test days at the range, engines on the bench, nozzles in the mould and the goods shed we work from.
            </p>
          </div>
          <dl className="masthead-side gallery-stats" aria-label="Gallery size">
            <div>
              <dt>Photos</dt>
              <dd>{pics}</dd>
            </div>
            {videos > 0 && (
              <div>
                <dt>Videos</dt>
                <dd>{videos}</dd>
              </div>
            )}
            {renders > 0 && (
              <div>
                <dt>Renders</dt>
                <dd>{renders}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      {/* Full width: the photos use the whole screen, with a slim edge. */}
      <section className="section gallery-section">
        <div className="gallery-full">
          <div className="gallery-bar">
            <div className="gallery-filter" role="group" aria-label="Filter gallery">
              {FILTERS.filter((f) => f.id === 'all' || counts[f.id] > 0).map((f) => (
                <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                  <span className="gallery-filter-count">{counts[f.id] || 0}</span>
                </button>
              ))}
            </div>
            <p className="gallery-hint">Click a photo to see it full size{counts.video ? ', or a video to play it' : ''}.</p>
          </div>

          {shown.length === 0 ? (
            <p className="gallery-empty">No photos here yet.</p>
          ) : (
            <div className="gallery-wall" style={{ '--cols': cols }}>
              {columns.map((col, c) => (
                <div className="gallery-col" key={c}>
                  {col.items.map(({ item, index }) => (
                    <GalleryTile
                      key={item.src}
                      item={item}
                      index={index}
                      ratio={ratioOf(item)}
                      onOpen={() => openAt(index)}
                      onMeasure={(r) => setMeasured((m) => (m[item.src] ? m : { ...m, [item.src]: r }))}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {open >= 0 && open < shown.length && (
        <GalleryViewer items={shown} index={open} onIndex={openAt} onClose={close} />
      )}
    </>
  )
}

function GalleryTile({ item, index, ratio, onOpen, onMeasure }) {
  const [loaded, setLoaded] = useState(false)
  const small = item.thumb && item.thumb !== item.src
  return (
    <figure className="gallery-tile">
      <button
        type="button"
        id={`gallery-photo-${index}`}
        className={`gallery-tile-img${loaded ? ' is-loaded' : ''}`}
        style={{ aspectRatio: `1 / ${ratio}` }}
        onClick={onOpen}
        aria-label={`${item.videoId ? 'Play video' : 'Open photo'} ${index + 1}${item.caption ? `: ${item.caption}` : ''}`}
      >
        <img
          src={item.src}
          srcSet={small ? `${item.thumb} 640w, ${item.src} 2000w` : undefined}
          sizes="(max-width: 560px) 100vw, (max-width: 1000px) 50vw, (max-width: 1500px) 33vw, 25vw"
          alt={item.caption}
          loading={index < 6 ? 'eager' : 'lazy'}
          decoding="async"
          width={item.width}
          height={item.height}
          onLoad={(e) => {
            setLoaded(true)
            const el = e.currentTarget
            if (!item.width && el.naturalWidth) onMeasure(el.naturalHeight / el.naturalWidth)
          }}
        />
        <span className="gallery-tile-no" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        {item.videoId && <span className="gallery-tile-play" aria-hidden="true" />}
        {item.kind !== 'photo' && (
          <span className="gallery-tile-kind">{item.kind === 'render' ? 'Render' : item.kind === 'video' ? 'Video' : 'Team'}</span>
        )}
      </button>
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  )
}
