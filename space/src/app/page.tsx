function BrandMark() {
  return (
    <svg
      className="space-mark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <circle cx="25.6" cy="60" r="18" fill="currentColor" />
      <path
        d="M45.1 23 L55.1 23 L55.1 97 L45.1 97"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
      />
      <line x1="70.7" y1="82" x2="90.7" y2="38" stroke="currentColor" strokeWidth="9" />
      <line x1="88.3" y1="82" x2="108.3" y2="38" stroke="currentColor" strokeWidth="9" />
    </svg>
  );
}

function MissionControlBackdrop() {
  const logLines = [
    "T-∞ · MC ONLINE · GOODS SHED",
    "SYS · OCTOPUS PATH CHECK",
    "ENG · B1M CASING READY",
    "NAV · RANGE WINDOW Q4'26–Q1'27",
    "REC · RECOVERY BAY PENDING",
    "NET · PAD BUS STANDBY",
    "OPS · TRACKING FEED LOCKED",
  ];

  const ticker = [
    "MISSION CONTROL · GOODS SHED",
    "OCTOPUS DATA LINK · STANDBY",
    <>
      B1M-01 · <em>Q4 2026 – Q1 2027</em>
    </>,
    "TRACKING FEED · COMING ONLINE",
    "CRESWICK VIC · AUSTRALIA",
  ];

  return (
    <div className="mc" aria-hidden="true">
      <div className="mc-grid" />
      <div className="mc-glow" />

      <div className="mc-panels">
        <div className="mc-col mc-col--left">
          <div className="mc-panel">
            <div className="mc-panel-head">
              <span>Pad telemetry</span>
              <strong>LINK STANDBY</strong>
            </div>
            <div className="mc-rows">
              <div className="mc-row">
                <span>Range</span>
                <span>VIC · CASA</span>
              </div>
              <div className="mc-row">
                <span>Pad bus</span>
                <span className="live">IDLE</span>
              </div>
              <div className="mc-row">
                <span>Octopus</span>
                <span>GOODS SHED</span>
              </div>
              <div className="mc-row">
                <span>Uplink</span>
                <span className="warn">ARMED SOON</span>
              </div>
            </div>
          </div>
          <div className="mc-panel">
            <div className="mc-panel-head">
              <span>Propulsion</span>
              <strong>B1M</strong>
            </div>
            <div className="mc-rows">
              <div className="mc-row">
                <span>Thrust tgt</span>
                <span>~150 KGF</span>
              </div>
              <div className="mc-row">
                <span>Burn</span>
                <span>3.5 S</span>
              </div>
              <div className="mc-row">
                <span>Propellant</span>
                <span>KNSB 65:35</span>
              </div>
              <div className="mc-row">
                <span>Static fires</span>
                <span className="ok">04 LOGGED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mc-col mc-col--center">
          <div className="mc-panel">
            <div className="mc-panel-head">
              <span>Altitude profile</span>
              <strong>SIM · HOLD</strong>
            </div>
            <div className="mc-chart">
              <svg viewBox="0 0 320 72" preserveAspectRatio="none">
                <g className="mc-chart-grid">
                  <line x1="0" y1="18" x2="320" y2="18" />
                  <line x1="0" y1="36" x2="320" y2="36" />
                  <line x1="0" y1="54" x2="320" y2="54" />
                </g>
                <path
                  className="mc-chart-line"
                  d="M4 64 C 48 62, 72 58, 96 40 S 140 8, 168 10 S 220 28, 248 44 S 292 58, 316 52"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mc-col mc-col--right">
          <div className="mc-panel">
            <div className="mc-panel-head">
              <span>Event log</span>
              <strong>BUFFER</strong>
            </div>
            <div className="mc-stream">
              <div className="mc-stream-track">
                {[...logLines, ...logLines].map((line, i) => (
                  <span key={`${line}-${i}`}>{line}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mc-panel">
            <div className="mc-panel-head">
              <span>Vehicle</span>
              <strong>STRAVOX</strong>
            </div>
            <div className="mc-rows">
              <div className="mc-row">
                <span>Apogee tgt</span>
                <span>30.0 KM</span>
              </div>
              <div className="mc-row">
                <span>Length</span>
                <span>2,633 MM</span>
              </div>
              <div className="mc-row">
                <span>Peak vel</span>
                <span>MACH 2.5</span>
              </div>
              <div className="mc-row">
                <span>Mode</span>
                <span className="live">PRE-FLIGHT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mc-ticker">
        <div className="mc-ticker-track">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <div className="mc-scan" />
      <div className="mc-vignette" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="space-landing">
      <MissionControlBackdrop />
      <div className="space-landing-inner">
        <BrandMark />
        <p className="space-wordmark">
          BEYOND <span>[STAGE ZERO]</span>
        </p>
        <h1 className="space-domain">.space</h1>
        <p className="space-teaser">Live mission tracking coming soon</p>
      </div>
    </main>
  );
}
