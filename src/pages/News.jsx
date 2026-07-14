import './News.css'

const TICK = Array.from({ length: 40 })

const posts = [
  {
    date: '2026-05-01',
    display: 'May 2026',
    tag: 'Community',
    title: 'Project Spittership',
    body: 'Spittership is a working name for a fully community-driven vehicle aimed at Spitter — space Twitter on X, where people join. Beyond Stage Zero manages the project and provides the B1M engine; the community can change everything else, including the name. Kickoff and community formation are planned after the first B1M static fire.',
  },
  {
    date: '2026-05-01',
    display: 'May 2026',
    tag: 'Data link',
    title: 'Octopus data link',
    body: 'We are building Octopus — the connection that gets data from the pad during static fires and launches into Goods Shed mission control. It will also support a vehicle-to-mission-control link. Octopus is not planned to be the flight computer; it moves data to the shed so the team can run range operations live.',
  },
  {
    date: '2026-05-01',
    display: 'May 2026',
    tag: 'Programme',
    title: 'B1M engines in production',
    body: 'We have begun building three B1M engines — 550 mm tall, 80 mm wide, loaded with around 2 kg of KNO₃/Sorbitol at a 65:35 ratio. Design is complete; propellant characterisation and engine build are in progress. We are targeting approximately 150 kgf of thrust for 3.5 seconds per firing, and aiming to reuse each casing for at least two static fires. These are the motors that will fly on STRAVOX B1M-01.',
  },
  {
    date: '2026-05-01',
    display: 'May 2026',
    tag: 'Programme',
    title: 'STRAVOX B1M-01 announced',
    body: 'Our first planned mission is STRAVOX B1M-01 — a sub-scale flight to 3 km apogee on a BSZ-built KNSB engine. B1M is our systems validation vehicle: it lets us test avionics, recovery, and propulsion in real flight conditions before committing to the full 30 km STRAVOX programme. We are targeting launch in Q4 2026 to Q1 2027 from a CASA-cleared site in Victoria.',
  },
  {
    date: '2026-04-26',
    display: '26 April 2026',
    tag: 'Testing',
    title: 'Campaign 2: Mk II engine static fires — SF-03 and SF-04',
    body: 'We ran two more static fires on April 26th with our redesigned Mk II engine — 300 mm tall and 30 mm wide, loaded with 400 g of KNO₃/Sorbitol. SF-03 returned our first meaningful thrust data at 6.8 kgf peak, but showed an uneven burn rate and minor burn-throughs on the nozzle and forward closure. SF-04 suffered a case rupture, destroying our ground infrastructure. Both fires were comparative KNO₃ grade tests — SF-03 used fertiliser grade, SF-04 technical grade. Design work on the forward closure and casing continues.',
  },
  {
    date: '2026-02-18',
    display: '18 February 2026',
    tag: 'Testing',
    title: 'Campaign 1: first static fires — SF-01 and SF-02',
    body: 'We conducted our first two static fires on February 18th, testing Mk I engines — 250 mm long, 32 mm wide, loaded with approximately 300 g of KNO₃/Sucrose. SF-01 used technical grade KNO₃ and burned for 28 seconds, but we lost all thrust data and the nozzle ejected, destroying ground equipment. SF-02 used fertiliser grade — it burned twice as fast (14 s), produced a 4.6 kgf peak thrust before nozzle ejection, and accidentally generated a sonic boom. Both fires confirmed nozzle retention as the critical fix for the next design iteration.',
  },
  {
    date: '2025-04-01',
    display: 'April 2025',
    tag: 'Founding',
    title: 'Beyond Stage Zero founded',
    body: 'Beyond Stage Zero was founded in April 2025 in Creswick, Victoria, with one goal: design, build, and fly Australia\'s first fully and rapidly reusable launch vehicle to 30 km apogee with a propulsive vertical landing. Our first rocket is STRAVOX — a 2,633 mm vehicle with a split nosecone airbrake and four folding drone arms for touchdown. The programme starts here.',
  },
]

const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
const [featured, ...rest] = sorted

export default function News() {
  return (
    <main className="news">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="news-hero">
        <div className="news-hero-grid-bg" aria-hidden="true" />
        <div className="container news-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>[ Updates ]</p>
            <h1 className="news-hero-h1">News.</h1>
            <p className="news-hero-sub">
              Follow the programme — static fires, design milestones, and everything
              in between. We publish it all.
            </p>
          </div>
          <div className="news-hero-stats">
            <div className="news-hero-stat">
              <span className="news-hero-stat-val">{posts.length}</span>
              <span className="news-hero-stat-lbl">Posts published</span>
            </div>
            <div className="news-hero-stat">
              <span className="news-hero-stat-val">2025</span>
              <span className="news-hero-stat-lbl">Programme started</span>
            </div>
            <div className="news-hero-stat">
              <span className="news-hero-stat-val">{featured.display}</span>
              <span className="news-hero-stat-lbl">Latest update</span>
            </div>
          </div>
        </div>
        <div className="tick-rule news-tick">
          {TICK.map((_, i) => <span key={i} />)}
        </div>
      </section>

      {/* ── Content ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
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
      </section>

    </main>
  )
}
