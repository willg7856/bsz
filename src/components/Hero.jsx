export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <div className="hero-eyebrow-row">
            <span>[ STAGE 02 / STATIC FIRE ]</span>
            <span>&middot;</span>
            <span className="live">T-87 DAYS</span>
          </div>
          <h1 className="hero-h1">
            Australia&apos;s<br />
            largest student<br />
            <span className="accent">rocket.</span>
          </h1>
          <p className="hero-sub">
            Beyond Stage Zero is forty-eight engineering students designing, building, and flying a KNSB solid-propellant rocket to 30 km apogee. First flight August 2026.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#sponsors">Sponsor a stage <span>&rarr;</span></a>
            <a className="btn btn--ghost-dark" href="#stages">Read design report</a>
          </div>
        </div>
        <div className="hero-spec">
          <div className="row"><span className="lbl">Apogee target</span><span className="val accent">30.0 km</span></div>
          <div className="row"><span className="lbl">Length</span><span className="val">2,633 mm</span></div>
          <div className="row"><span className="lbl">Diameter</span><span className="val">200 mm</span></div>
          <div className="row"><span className="lbl">Propulsion</span><span className="val">KNSB &middot; Solid</span></div>
        </div>
      </div>
    </section>
  );
}
