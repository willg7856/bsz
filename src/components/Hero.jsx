const STARS = [
  [72,  80,  0.8, 0.45], [195, 35,  1.2, 0.40], [328, 95,  0.7, 0.55],
  [445, 50,  1.0, 0.35], [520, 18,  1.5, 0.30], [610, 140, 0.8, 0.50],
  [720, 65,  1.0, 0.40], [830, 30,  0.8, 0.45], [945, 110, 1.2, 0.35],
  [1060,55,  0.7, 0.50], [1180,20,  1.0, 0.40], [1290,85,  0.8, 0.35],
  [1380,45,  0.6, 0.50], [150, 180, 0.8, 0.30], [280, 210, 1.0, 0.25],
  [420, 165, 0.7, 0.30], [560, 190, 1.2, 0.25], [680, 220, 0.8, 0.30],
  [800, 175, 0.6, 0.25], [920, 200, 0.9, 0.25], [1050,185, 0.7, 0.20],
  [1150,215, 1.0, 0.20], [1320,190, 0.8, 0.20], [100, 280, 0.7, 0.15],
  [250, 310, 0.6, 0.15], [400, 290, 0.9, 0.15], [580, 320, 0.7, 0.15],
  [740, 285, 0.8, 0.15], [900, 315, 0.6, 0.15], [1100,295, 0.8, 0.15],
  [1250,305, 0.7, 0.15], [1400,275, 0.6, 0.15],
];

export default function Hero() {
  return (
    <section className="hero">
      <svg className="hero-stars" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {STARS.map(([cx, cy, r, opacity], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={opacity} />
        ))}
      </svg>

      <div className="container">
        <div className="hero-eyebrow-row">
          <span>[ STAGE 02 / STATIC FIRE ]</span>
          <span>&middot;</span>
          <span className="live">T-87 DAYS</span>
        </div>
        <div className="hero-body">
          <div className="hero-rocket-tag">STRAVOX 200</div>
          <h1 className="hero-h1">
            Australia&apos;s<br />
            largest student<br />
            <span className="accent">rocket.</span>
          </h1>
          <p className="hero-sub">
            Beyond Stage Zero is forty-eight engineering students designing, building, and flying a KNSB solid-propellant rocket to 30 km apogee. First flight August 2026.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#stages">Our rocket <span>&rarr;</span></a>
            <a className="btn btn--ghost-dark" href="#sponsors">Sponsor a stage</a>
          </div>
        </div>
      </div>

      <div className="hero-statbar">
        <div className="container">
          <div className="hero-statbar-inner">
            <div className="hero-stat">
              <div className="hero-stat-top">
                <span className="hero-stat-val">2,633</span>
                <span className="hero-stat-unit">mm</span>
              </div>
              <div className="hero-stat-lbl">Height</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-top">
                <span className="hero-stat-val">30</span>
                <span className="hero-stat-unit">km</span>
              </div>
              <div className="hero-stat-lbl">Apogee</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-top">
                <span className="hero-stat-val">Mach 2.5</span>
              </div>
              <div className="hero-stat-lbl">Peak velocity</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-top">
                <span className="hero-stat-val">200</span>
                <span className="hero-stat-unit">mm</span>
              </div>
              <div className="hero-stat-lbl">Diameter</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
