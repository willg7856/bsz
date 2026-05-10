import './News.css'

const posts = [
  { date: 'April 2025', tag: 'Milestone', title: 'Motor Selection Finalised for STRAVOX', body: 'After months of propulsion analysis and trade studies, the team has locked in the motor configuration for STRAVOX. The selected motor meets our target apogee of 30,000 ft while keeping the vehicle within competition mass limits.' },
  { date: 'March 2025', tag: 'Design', title: 'Full Airframe CAD Model Completed', body: 'The structural design team has finished the full CAD model of STRAVOX, covering the nosecone, payload bay, avionics section, fin can, and motor mount. The model is now entering internal review.' },
  { date: 'February 2025', tag: 'Team', title: 'Avionics Subteam Assembled', body: 'We have formed a dedicated avionics subteam responsible for flight computer selection, sensor integration, and recovery system electronics. The team will be running bench tests on dual-deploy altimeters throughout March.' },
  { date: 'January 2025', tag: 'Design', title: 'Preliminary Design Review Passed', body: 'BSZ completed its first internal Preliminary Design Review for STRAVOX. Key decisions on vehicle diameter, fin geometry, and staging were confirmed.' },
  { date: 'April 2025', tag: 'Founding', title: 'Beyond Stage Zero Founded', body: 'We officially launched Beyond Stage Zero with one goal: build Australia\'s largest student rocket. The team is assembled, the mission is set, and work on STRAVOX has begun.' },
]

const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
const [featured, ...rest] = sorted

export default function News() {
  return (
    <main className="news">
      <div className="container">
        <div className="page-header">
          <p className="eyebrow">Latest Updates</p>
          <h1>News</h1>
          <p className="page-sub">Follow our progress as we design, build, and launch STRAVOX.</p>
        </div>

        <article className="news-featured">
          <div className="news-featured-meta">
            <span className="news-tag">{featured.tag}</span>
            <span className="news-date mono">{featured.date}</span>
          </div>
          <h2>{featured.title}</h2>
          <p>{featured.body}</p>
        </article>

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
    </main>
  )
}
