import './News.css'

const posts = [
  {
    date: '2025-05-01',
    display: 'May 2025',
    tag: 'Programme',
    title: 'B1M engines in production',
    body: 'We have begun building three B1M engines — 550 mm tall, 80 mm wide, loaded with 1.2 kg of KNO₃/Sorbitol at a 70:30 ratio. We are targeting approximately 50 kgf of thrust for 7 seconds per firing, and aiming to reuse each casing for at least two static fires. These are the motors that will fly on STRAVOX B1M-01.',
  },
  {
    date: '2025-05-01',
    display: 'May 2025',
    tag: 'Programme',
    title: 'STRAVOX B1M-01 announced',
    body: 'Our first planned mission is STRAVOX B1M-01 — a sub-scale flight to 4 km apogee on a BSZ-built KNSB engine. B1M is our systems validation vehicle: it lets us test avionics, recovery, and propulsion in real flight conditions before committing to the full 30 km STRAVOX programme. We are targeting launch in 2026 from a CASA-cleared site in Victoria.',
  },
  {
    date: '2026-04-26',
    display: '26 April 2026',
    tag: 'Testing',
    title: 'Campaign 2: Mk II engine static fires — SF-03 and SF-04',
    body: 'We ran two more static fires on April 26th with our redesigned Mk II engine — 300 mm tall and 30 mm wide, loaded with 400 g of KNO₃/Sorbitol. SF-03 returned our first meaningful thrust data at 6.8 kgf peak, but showed an uneven burn rate and minor burn-throughs on the nozzle and forward closure. SF-04 suffered a case rupture, destroying our ground infrastructure. Both fires were comparative KNO₃ grade tests — SF-03 used fertiliser grade, SF-04 technical grade. Design work on the forward closure and casing continues.',
  },
  {
    date: '2025-04-01',
    display: 'April 2025',
    tag: 'Founding',
    title: 'Beyond Stage Zero founded',
    body: 'Beyond Stage Zero was founded in April 2025 in Creswick, Victoria, with one goal: design, build, and fly Australia\'s largest student rocket to 30 km apogee with a propulsive vertical landing. Our first rocket is STRAVOX — a 2,633 mm vehicle with a split nosecone airbrake and four folding drone arms for touchdown. The programme starts here.',
  },
  {
    date: '2026-02-18',
    display: '18 February 2026',
    tag: 'Testing',
    title: 'Campaign 1: first static fires — SF-01 and SF-02',
    body: 'We conducted our first two static fires on February 18th, testing Mk I engines — 250 mm long, 32 mm wide, loaded with approximately 300 g of KNO₃/Sucrose. SF-01 used technical grade KNO₃ and burned for 28 seconds, but we lost all thrust data and the nozzle ejected, destroying ground equipment. SF-02 used fertiliser grade — it burned twice as fast (14 s), produced a 4.6 kgf peak thrust before nozzle ejection, and accidentally generated a sonic boom. Both fires confirmed nozzle retention as the critical fix for the next design iteration.',
  },
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
          <p className="page-sub">Follow our progress as we design, build, and launch.</p>
        </div>

        <article className="news-featured">
          <div className="news-featured-meta">
            <span className="news-tag">{featured.tag}</span>
            <span className="news-date mono">{featured.display}</span>
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
                  <span className="news-date mono">{post.display}</span>
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
