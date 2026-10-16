import { news } from '../data'
import { useTitle } from '../useTitle'

export default function News() {
  useTitle('News')
  const [featured, ...rest] = news

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
            <div className="side-row"><span>Posts published</span><span>{news.length}</span></div>
            <div className="side-row"><span>Programme started</span><span>2025</span></div>
            <div className="side-row"><span>Latest update</span><span>{featured.display}</span></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <article className="post">
            <p className="kicker"><span className="tag">{featured.tag}</span> · {featured.display}</p>
            <h2>{featured.title}</h2>
            <p>{featured.body}</p>
          </article>
          <p className="kicker" style={{ marginTop: '1.5rem' }}>Previous updates</p>
          {rest.map((post) => (
            <article className="post" key={post.title}>
              <p className="kicker"><span className="tag">{post.tag}</span> · {post.display}</p>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
