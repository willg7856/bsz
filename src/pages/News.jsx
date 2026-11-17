import { news as builtInNews } from '../data'
import { liveNews, useOctopus } from '../octopus'
import { useTitle } from '../useTitle'

/** News posts are written in Octopus (BSZ site → News); data.js is the fallback. */
export default function News() {
  useTitle('News')
  const news = liveNews(useOctopus(), builtInNews)
  const [featured, ...rest] = news
  if (!featured) return null

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Updates</p>
            <h1>News.</h1>
            <p className="lede">
              Follow the programme — static fires, design milestones, and everything in between. We publish it all.
            </p>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Posts published</span><span className="num">{news.length}</span></div>
            <div className="side-row"><span>Programme started</span><span className="num">2025</span></div>
            <div className="side-row"><span>Latest update</span><span>{featured.display}</span></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <article className="post">
            <p className="kicker"><span className="tag">{featured.tag}</span> · {featured.display}</p>
            <h2>{featured.title}</h2>
            <Body text={featured.body} />
            {featured.link && <ReadMore href={featured.link} />}
          </article>
          <p className="kicker" style={{ marginTop: '1.5rem' }}>Previous updates</p>
          {rest.map((post) => (
            <article className="post" key={post.title}>
              <p className="kicker"><span className="tag">{post.tag}</span> · {post.display}</p>
              <h3>{post.title}</h3>
              <Body text={post.body} />
              {post.link && <ReadMore href={post.link} />}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

/** Blank lines in a post become paragraphs. */
function Body({ text }) {
  return String(text || '')
    .split(/\n\s*\n/)
    .map((para, i) => <p key={i}>{para}</p>)
}

function ReadMore({ href }) {
  const external = /^https?:/.test(href) && !href.includes('beyondstagezero.com')
  return (
    <p>
      <a className="post-link" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>Read more →</a>
    </p>
  )
}
