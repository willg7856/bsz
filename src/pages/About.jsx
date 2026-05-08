import './About.css'

const values = [
  { title: 'Student Led', desc: 'Every part of the project — from design to launch — is driven by students.' },
  { title: 'Ambitious', desc: 'We set out to build the largest student rocket Australia has ever seen.' },
  { title: 'Collaborative', desc: 'We bring together engineers, scientists, and builders from across disciplines.' },
  { title: 'Open', desc: 'We share our progress, failures, and learnings with the broader community.' },
]

export default function About() {
  return (
    <div className="about">
      <div className="page-header">
        <p className="eyebrow">Who We Are</p>
        <h1>About Us</h1>
        <p className="page-sub">
          Beyond Stage Zero is an Australian student rocketry team on a mission to push the limits of what students can build and launch.
        </p>
      </div>

      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          We exist to prove that students can compete at the highest levels of rocketry. From our first designs to the launch pad, we are building the experience, knowledge, and hardware to send <span className="mono accent">STRAVOX</span> into the sky — and to inspire the next generation of Australian aerospace engineers along the way.
        </p>
      </div>

      <div className="about-values">
        {values.map((v) => (
          <div className="value-card" key={v.title}>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
