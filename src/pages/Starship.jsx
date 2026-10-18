import { site } from '../data'
import { useTitle } from '../useTitle'
import './Missions.css'

const shows = [
  { label: 'Live location', note: 'Position from SpaceX’s public vehicle tracker.' },
  { label: 'Altitude and speed', note: 'Readouts updated from that same public telemetry.' },
  { label: 'Time since landing', note: 'A clock from the last landing, shown beside the live fix.' },
  { label: 'Webcasts', note: 'Two players side by side. YouTube or Twitch, including the SpaceX webcast.' },
]

export default function Starship() {
  useTitle('Starship tracker')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Public tracker</p>
            <h1>Starship.</h1>
            <p className="lede">
              An unofficial live tracker for SpaceX Starship, built by Beyond Stage Zero. It passed 20,000 views in under 24 hours.
            </p>
            <div className="actions">
              <a className="btn btn-ink" href={site.starship} target="_blank" rel="noopener noreferrer">Open the tracker</a>
            </div>
          </div>
          <div className="masthead-side missions-hero-stat-row">
            <div className="missions-hero-stat">
              <span className="missions-hero-stat-val">20,000</span>
              <span className="missions-hero-stat-lbl">Views in under 24 hours</span>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">What it shows</p>
              <h2>The public feed.</h2>
            </div>
            <p>Live location from SpaceX’s public vehicle tracker. Not a SpaceX product, and not part of the STRAVOX flight computer.</p>
          </div>
          <div className="rows">
            {shows.map((item) => (
              <article className="vehicle-row" key={item.label}>
                <span className="idx">○</span>
                <span><strong>{item.label}. </strong>{item.note}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
