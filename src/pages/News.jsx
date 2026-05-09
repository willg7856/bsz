import './News.css'
import { Link } from 'react-router-dom'

const posts = [
  {
    date: 'April 2025',
    tag: 'Milestone',
    title: 'Motor Selection Finalised for STRAVOX',
    body: 'After months of propulsion analysis and trade studies, the team has locked in the motor configuration for STRAVOX. The selected motor meets our target apogee of 30,000 ft while keeping the vehicle within competition mass limits. Detailed integration work begins next month.',
  },
  {
    date: 'March 2025',
    tag: 'Design',
    title: 'Full Airframe CAD Model Completed',
    body: 'The structural design team has finished the full CAD model of STRAVOX, covering the nosecone, payload bay, avionics section, fin can, and motor mount. The model is now entering internal review before we begin manufacturing planning.',
  },
  {
    date: 'February 2025',
    tag: 'Team',
    title: 'Avionics Subteam Assembled',
    body: 'We have formed a dedicated avionics subteam responsible for flight computer selection, sensor integration, and recovery system electronics. The team will be running bench tests on dual-deploy altimeters throughout March.',
  },
  {
    date: 'January 2025',
    tag: 'Design',
    title: 'Preliminary Design Review Passed',
    body: 'BSZ completed its first internal Preliminary Design Review (PDR) for STRAVOX. Key decisions on vehicle diameter, fin geometry, and staging were confirmed. Action items from the review are being tracked and closed ahead of the Critical Design Review.',
  },
  {
    date: 'May 2025',
    tag: 'Founding',
    title: 'Beyond Stage Zero Founded',
    body: 'We officially launched Beyond Stage Zero with one goal: build Australia\'s largest student rocket. The team is assembled, the mission is set, and work on STRAVOX has begun.',
  },
]

// Sort newest first
const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
const [featured, ...rest] = sorted

export default function News() {
  return (
    <div className="news">

      <section className="news-hero">
        <div className="news-hero-inner">
          <p className="eyebrow">Latest Update</p>
          <span className="news-hero-tag">{featured.tag}</span>
          <h1>{featured.title}</h1>
          <p className="news-hero-body">{featured.body}</p>
          <span className="news-hero-date mono">{featured.date}</span>
        </div>
        <div className="news-hero-scroll">
          <span />
        </div>
      </section>

      <div className="news-archive">
        <p className="news-archive-label eyebrow">Previous Updates</p>
        <div className="news-list">
          {rest.map((post) => (
            <article className="news-post" key={post.title}>
              <div className="news-post-meta">
                <span className="news-date mono">{post.date}</span>
                <span className="news-tag">{post.tag}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      </div>

    </div>
  )
}
