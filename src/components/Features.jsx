import './Features.css'

const services = [
  {
    icon: '🎨',
    title: 'Brand & Design',
    desc: 'Visual identities, UI/UX design, and brand systems that make lasting first impressions.',
  },
  {
    icon: '💻',
    title: 'Web Development',
    desc: 'Fast, accessible, and scalable web apps built with modern frameworks and best practices.',
  },
  {
    icon: '📈',
    title: 'Growth Marketing',
    desc: 'SEO, paid media, and conversion optimization strategies that turn traffic into revenue.',
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    desc: 'Native and cross-platform mobile experiences that users love to come back to.',
  },
  {
    icon: '⚙️',
    title: 'Strategy & Consulting',
    desc: 'Roadmaps, audits, and competitive analysis to make confident product decisions.',
  },
  {
    icon: '🔒',
    title: 'Security & Performance',
    desc: 'End-to-end hardening, load testing, and monitoring so your platform never lets you down.',
  },
]

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features-inner">
        <div className="section-header">
          <div className="section-tag">What We Do</div>
          <h2 className="section-heading">Services Built Around Your Goals</h2>
          <p className="section-sub">
            From first pixel to post-launch growth, we cover every stage of the digital journey.
          </p>
        </div>
        <div className="cards">
          {services.map((s) => (
            <div className="card" key={s.title}>
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
