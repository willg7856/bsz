const cells = [
  { lbl: 'Apogee', val: '30.0', unit: 'km', note: 'Within 5% of design at sea-level launch.' },
  { lbl: 'Burn time', val: '4.2', unit: 's', note: 'Single-stage hybrid, throttle-locked.' },
  { lbl: 'Peak thrust', val: '9.8', unit: 'kN', note: 'Static-fired April 2026 at MILD-01.' },
  { lbl: 'Team', val: '48', unit: 'eng', note: 'Across propulsion, structures, avionics, recovery.' },
  { lbl: 'Build hours', val: '12.4k', unit: 'h', note: 'Logged since project kickoff, 2024.' },
  { lbl: 'Test fires', val: '7', unit: 'runs', note: 'Six on-spec, one anomaly resolved.' },
  { lbl: 'Recovery', val: '3', unit: 'stage', note: 'Drogue, main, pad-recovery beacon.' },
  { lbl: 'Window', val: 'Aug', unit: '26', note: 'Mildura, Victoria. CASA cleared.' },
];

export default function Mission() {
  return (
    <section className="section" id="mission">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow accent">[ Mission ]</span>
            <h2>Numbers, not vibes.</h2>
          </div>
          <p className="lead">
            Every figure on this page comes from a tested subsystem or a flight-readiness review. We will update them after every static fire and every rev of the design.
          </p>
        </div>
        <div className="spec-grid">
          {cells.map(c => (
            <div className="spec-cell" key={c.lbl}>
              <div className="lbl">{c.lbl}</div>
              <div className="val">{c.val}<small>{c.unit}</small></div>
              <div className="note">{c.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
