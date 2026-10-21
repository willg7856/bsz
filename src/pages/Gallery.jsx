import { gallery } from '../data'
import { useTitle } from '../useTitle'

export default function Gallery() {
  useTitle('Gallery')

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
          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure className="gallery-item" key={item.src}>
                <a href={item.src} target="_blank" rel="noopener noreferrer">
                  <img src={item.src} alt={item.caption} />
                </a>
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
