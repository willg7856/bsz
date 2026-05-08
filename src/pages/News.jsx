import './News.css'

const posts = [
  {
    date: 'May 2025',
    title: 'Beyond Stage Zero Founded',
    body: 'We officially launched Beyond Stage Zero with one goal: build Australia\'s largest student rocket. The team is assembled, the mission is set, and work on STRAVOX has begun.',
  },
]

export default function News() {
  return (
    <div className="news">
      <div className="page-header">
        <p className="eyebrow">Latest Updates</p>
        <h1>News</h1>
        <p className="page-sub">
          Follow our progress as we design, build, and launch STRAVOX.
        </p>
      </div>

      <div className="news-list">
        {posts.map((post) => (
          <article className="news-post" key={post.title}>
            <span className="news-date">{post.date}</span>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
