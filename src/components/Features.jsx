import './Features.css'

const features = [
  {
    icon: '🚀',
    title: 'Record-Breaking Scale',
    desc: 'The largest student-built rocket ever launched in Australia, engineered from the ground up by our team.',
  },
  {
    icon: '🌤️',
    title: 'Stratospheric Reach',
    desc: 'Designed to reach 30km altitude — deep into the stratosphere where weather balloons currently operate.',
  },
  {
    icon: '📡',
    title: 'Atmospheric Sensing',
    desc: 'Onboard sensors collect temperature, pressure, humidity, and wind data throughout ascent and descent.',
  },
  {
    icon: '💰',
    title: 'Cost-Effective Alternative',
    desc: 'A reusable rocket platform that can semi-replace single-use weather balloons at lower long-term cost.',
  },
  {
    icon: '🔬',
    title: 'Student-Led R&D',
    desc: 'Every system — propulsion, avionics, recovery, and payload — is designed and built by students.',
  },
  {
    icon: '🌏',
    title: 'Australian Innovation',
    desc: 'Proudly Australian, pushing the boundaries of what student aerospace teams can achieve.',
  },
]

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features-inner">
        <div className="section-header">
          <div className="section-tag">What We're Building</div>
          <h2 className="section-heading">Technology That Reaches New Heights</h2>
          <p className="section-sub">
            From propulsion to payload, every part of the rocket is designed with one goal — reaching 30km and returning data.
          </p>
        </div>
        <div className="cards">
          {features.map((f) => (
            <div className="card" key={f.title}>
              <div className="card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
