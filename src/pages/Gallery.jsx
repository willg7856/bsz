import { useState } from 'react'
import { gallery } from '../data'
import { useTitle } from '../useTitle'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'photo', label: 'Photos' },
  { id: 'render', label: 'Renders' },
  { id: 'team', label: 'Team' },
]

export default function Gallery() {
  useTitle('Gallery')
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? gallery : gallery.filter((item) => item.kind === filter)

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Photos</p>
            <h1>Gallery.</h1>
            <p className="lede">
              Build photos from the programme. Extra hardware shots live here so the project pages stay about the work.
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="gallery-filter" role="group" aria-label="Filter gallery">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {filter === 'team' && shown.length === 0 ? (
            <p className="gallery-empty">No team photos yet.</p>
          ) : (
            <div className="gallery-grid">
              {shown.map((item) => (
                <figure className="gallery-item" key={item.src}>
                  <a href={item.src} target="_blank" rel="noopener noreferrer">
                    <img src={item.src} alt={item.caption} />
                  </a>
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
