import './MissionProfile.css'

const key = [
  { color: '#1e3448', border: 'rgba(0,200,160,0.6)',  label: 'Split nosecone' },
  { color: '#1e2e40', border: 'rgba(0,212,255,0.35)', label: 'Avionics + battery bay' },
  { color: '#141e2a', border: 'rgba(0,212,255,0.5)',  label: 'Upper fins (340 mm span)' },
  { color: '#1a4050', border: '#00d4ff',               label: 'T-Motor U13 II × 4' },
  { color: '#1a2838', border: 'rgba(0,212,255,0.5)',  label: 'Bolted coupler ring' },
  { color: '#1a2838', border: 'rgba(0,0,0,0.5)',      label: 'KNSB engine (1 m grain)' },
  { color: '#141e2a', border: 'rgba(168,85,247,0.6)', label: 'Base fins (ejectable)' },
  { color: '#162a20', border: '#00e87a',               label: 'Landing legs × 4' },
  { color: 'rgba(0,232,122,0.3)', border: '#00e87a',  label: 'Motor thrust (landing)' },
]

export default function MissionProfile() {
  return (
    <div className="mission-profile">
      <div className="mission-header">
        <p className="eyebrow">Flight Sequence</p>
        <h2>Mission Profile</h2>
        <p className="mission-sub">Three phases of a STRAVOX flight — powered ascent, drag-braked descent, and propulsive landing.</p>
      </div>

      <div className="mission-views">

        {/* ── ASCENT ── */}
        <div className="mission-view">
          <div className="mission-view-label" style={{color:'#ff6200'}}>▲ ASCENT</div>
          <svg width="160" height="600" viewBox="0 0 160 600">
            <defs>
              <linearGradient id="bodyM" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#141e2a"/>
                <stop offset="15%"  stopColor="#1e2e40"/>
                <stop offset="35%"  stopColor="#2a3e54"/>
                <stop offset="50%"  stopColor="#324860"/>
                <stop offset="65%"  stopColor="#2a3e54"/>
                <stop offset="85%"  stopColor="#1e2e40"/>
                <stop offset="100%" stopColor="#141e2a"/>
              </linearGradient>
              <linearGradient id="engM" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0a1218"/>
                <stop offset="20%"  stopColor="#141e28"/>
                <stop offset="50%"  stopColor="#1a2838"/>
                <stop offset="80%"  stopColor="#141e28"/>
                <stop offset="100%" stopColor="#0a1218"/>
              </linearGradient>
              <linearGradient id="finM" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0a1018"/>
                <stop offset="50%"  stopColor="#141e2a"/>
                <stop offset="100%" stopColor="#0a1018"/>
              </linearGradient>
              <linearGradient id="noseM" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#141e2a"/>
                <stop offset="30%"  stopColor="#243444"/>
                <stop offset="50%"  stopColor="#2e4256"/>
                <stop offset="70%"  stopColor="#243444"/>
                <stop offset="100%" stopColor="#141e2a"/>
              </linearGradient>
              <linearGradient id="flamG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#ff8800" stopOpacity="1"/>
                <stop offset="25%"  stopColor="#ffcc00" stopOpacity="0.85"/>
                <stop offset="55%"  stopColor="#ff5500" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#ff2200" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="strA" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="transparent"/>
                <stop offset="20%"  stopColor="#00d4ff"/>
                <stop offset="80%"  stopColor="#00d4ff"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="strG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="transparent"/>
                <stop offset="20%"  stopColor="#00e87a"/>
                <stop offset="80%"  stopColor="#00e87a"/>
                <stop offset="100%" stopColor="transparent"/>
              </linearGradient>
            </defs>
            <path d="M 58 565 Q 52 572 46 580 L 114 580 Q 108 572 102 565 Z" fill="url(#engM)" stroke="#1a2530" strokeWidth="0.8"/>
            <ellipse cx="80" cy="580" rx="34" ry="3" fill="#0a1218" stroke="rgba(255,107,0,0.5)" strokeWidth="0.7"/>
            <path d="M 58 540 L 62 565 L 98 565 L 102 540 Z" fill="url(#engM)" stroke="#1a2030" strokeWidth="0.7"/>
            <path d="M 58 558 L 14 580 L 14 536 L 58 536 Z" fill="url(#finM)" stroke="rgba(168,85,247,0.6)" strokeWidth="0.9"/>
            <path d="M 58 558 L 20 576 L 20 540 Z" fill="rgba(255,255,255,0.015)"/>
            <path d="M 102 558 L 146 580 L 146 536 L 102 536 Z" fill="url(#finM)" stroke="rgba(168,85,247,0.6)" strokeWidth="0.9"/>
            <rect x="58" y="480" width="44" height="56" fill="url(#engM)" stroke="#1a2030" strokeWidth="0.8"/>
            <rect x="56" y="490" width="48" height="8" rx="1" fill="#141e28" stroke="rgba(0,212,255,0.25)" strokeWidth="0.6"/>
            <circle cx="62" cy="494" r="1.2" fill="rgba(0,212,255,0.35)"/>
            <circle cx="70" cy="494" r="1.2" fill="rgba(0,212,255,0.35)"/>
            <circle cx="80" cy="494" r="1.2" fill="rgba(0,212,255,0.35)"/>
            <circle cx="90" cy="494" r="1.2" fill="rgba(0,212,255,0.35)"/>
            <circle cx="98" cy="494" r="1.2" fill="rgba(0,212,255,0.35)"/>
            <rect x="58" y="273" width="44" height="207" fill="url(#engM)" stroke="#1a2030" strokeWidth="0.8"/>
            <line x1="58" y1="320" x2="102" y2="320" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="58" y1="370" x2="102" y2="370" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="58" y1="420" x2="102" y2="420" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="58" y1="460" x2="102" y2="460" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <rect x="58" y="273" width="7" height="207" fill="rgba(255,255,255,0.018)"/>
            <text x="80" y="395" textAnchor="middle" fontSize="6" fill="rgba(255,98,0,0.18)" fontFamily="monospace" letterSpacing="2">KNSB</text>
            <text x="80" y="407" textAnchor="middle" fontSize="5.5" fill="rgba(255,98,0,0.12)" fontFamily="monospace">1m GRAIN</text>
            <rect x="56" y="262" width="48" height="11" rx="1" fill="#1a2838" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <circle cx="63"  cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="71"  cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="80"  cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="89"  cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="97"  cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <rect x="56" y="271" width="48" height="1.5" fill="url(#strA)" opacity="0.8"/>
            <rect x="58" y="217" width="44" height="45" fill="url(#bodyM)" stroke="#1a2840" strokeWidth="0.8"/>
            <rect x="64" y="224" width="32" height="18" rx="1" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.28)" strokeWidth="0.5"/>
            <rect x="66" y="227" width="9"  height="6" rx="0.5" fill="rgba(0,212,255,0.18)"/>
            <rect x="77" y="227" width="6"  height="6" rx="0.5" fill="rgba(0,232,122,0.18)"/>
            <rect x="85" y="227" width="6"  height="6" rx="0.5" fill="rgba(255,196,0,0.18)"/>
            <line x1="66" y1="237" x2="90" y2="237" stroke="rgba(0,212,255,0.15)" strokeWidth="0.5"/>
            <line x1="66" y1="239" x2="84" y2="239" stroke="rgba(0,212,255,0.1)"  strokeWidth="0.5"/>
            <path d="M 58 213 L 23 206 L 23 192 L 42 184 L 58 181 Z" fill="url(#finM)" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <path d="M 58 213 L 26 207 L 26 194 Z" fill="rgba(255,255,255,0.02)"/>
            <path d="M 102 213 L 137 206 L 137 192 L 118 184 L 102 181 Z" fill="url(#finM)" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <rect x="58" y="180" width="44" height="1.8" fill="url(#strG)" opacity="0.9"/>
            <rect x="58" y="166" width="44" height="15" fill="url(#bodyM)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.8"/>
            <rect x="51" y="168" width="7"  height="22" rx="1" fill="#141e2e" stroke="rgba(0,212,255,0.55)" strokeWidth="0.7"/>
            <circle cx="54.5" cy="166" r="5.5" fill="#1a4050" stroke="rgba(0,212,255,0.75)" strokeWidth="0.9"/>
            <circle cx="54.5" cy="166" r="2.5" fill="#0a2030" stroke="rgba(0,212,255,0.4)"  strokeWidth="0.5"/>
            <rect x="102" y="168" width="7" height="22" rx="1" fill="#141e2e" stroke="rgba(0,212,255,0.55)" strokeWidth="0.7"/>
            <circle cx="105.5" cy="166" r="5.5" fill="#1a4050" stroke="rgba(0,212,255,0.75)" strokeWidth="0.9"/>
            <circle cx="105.5" cy="166" r="2.5" fill="#0a2030" stroke="rgba(0,212,255,0.4)"  strokeWidth="0.5"/>
            <rect x="58" y="56" width="44" height="110" fill="url(#bodyM)" stroke="#1a2840" strokeWidth="0.8"/>
            <rect x="56" y="110" width="48" height="4" rx="0.5" fill="#1a2838" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5"/>
            <rect x="58" y="56" width="7" height="110" fill="rgba(255,255,255,0.015)"/>
            <path d="M 80 20 Q 65 28 62 40 Q 60 48 58 56 L 80 56 Z" fill="url(#noseM)" stroke="rgba(0,200,160,0.55)" strokeWidth="0.9"/>
            <path d="M 80 20 Q 95 28 98 40 Q 100 48 102 56 L 80 56 Z" fill="url(#noseM)" stroke="rgba(0,200,160,0.55)" strokeWidth="0.9"/>
            <line x1="80" y1="20" x2="80" y2="56" stroke="rgba(0,200,160,0.45)" strokeWidth="0.7" strokeDasharray="2,2"/>
            <path d="M 80 20 Q 70 30 68 46 L 72 46 Q 73 30 80 22 Z" fill="rgba(255,255,255,0.04)"/>
            <rect x="58" y="54" width="44" height="4" rx="1" fill="#1a2838" stroke="rgba(0,200,160,0.65)" strokeWidth="0.8"/>
            <rect x="72" y="16" width="16" height="5" rx="2" fill="#1e3040" stroke="rgba(0,212,255,0.45)" strokeWidth="0.6"/>
            <ellipse cx="80" cy="598" rx="20" ry="30" fill="rgba(255,107,0,0.1)"/>
            <path d="M 60 580 Q 64 594 67 606 Q 73 622 80 630 Q 87 622 93 606 Q 96 594 100 580 Z" fill="url(#flamG)"/>
            <path d="M 72 580 Q 75 592 77 602 Q 78.5 612 80 618 Q 81.5 612 83 602 Q 85 592 88 580 Z" fill="rgba(255,250,180,0.65)"/>
            <ellipse cx="80" cy="587" rx="5.5" ry="2.5" fill="rgba(255,220,100,0.55)"/>
            <ellipse cx="80" cy="597" rx="4.5" ry="2"   fill="rgba(255,190,60,0.4)"/>
            <ellipse cx="80" cy="607" rx="3.5" ry="1.5" fill="rgba(255,160,40,0.3)"/>
            <line x1="10" y1="20"  x2="10" y2="565" stroke="#162030" strokeWidth="0.6"/>
            <line x1="7"  y1="20"  x2="13" y2="20"  stroke="#162030" strokeWidth="0.6"/>
            <line x1="7"  y1="565" x2="13" y2="565" stroke="#162030" strokeWidth="0.6"/>
            <text x="5" y="300" fontSize="5.5" fill="#2a4050" fontFamily="monospace" transform="rotate(-90,5,300)">2,633mm</text>
          </svg>
          <div className="mission-view-stats">
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Motor</span>
              <span className="mission-view-stat-value">KNSB</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Grain length</span>
              <span className="mission-view-stat-value">1,000 mm</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Peak velocity</span>
              <span className="mission-view-stat-value">Mach 2.5</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Target apogee</span>
              <span className="mission-view-stat-value">30 km</span>
            </div>
          </div>
          <p className="mission-view-desc">
            All systems stowed for minimum drag. Base fins provide boost-phase
            stability; upper fins maintain control through transonic and
            supersonic regimes until burnout.
          </p>
        </div>

        {/* ── AIRBRAKE ── */}
        <div className="mission-view">
          <div className="mission-view-label" style={{color:'#00c8a0'}}>◉ AIRBRAKE</div>
          <svg width="240" height="600" viewBox="0 0 240 600">
            <defs>
              <linearGradient id="bodyM2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#141e2a"/><stop offset="50%" stopColor="#324860"/><stop offset="100%" stopColor="#141e2a"/>
              </linearGradient>
              <linearGradient id="engM2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0a1218"/><stop offset="50%" stopColor="#1a2838"/><stop offset="100%" stopColor="#0a1218"/>
              </linearGradient>
              <linearGradient id="finM2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0a1018"/><stop offset="50%" stopColor="#141e2a"/><stop offset="100%" stopColor="#0a1018"/>
              </linearGradient>
              <linearGradient id="noseOpen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0f1e2e"/><stop offset="50%" stopColor="#1e3448"/><stop offset="100%" stopColor="#0f1e2e"/>
              </linearGradient>
              <linearGradient id="strA2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="transparent"/><stop offset="20%" stopColor="#00d4ff"/><stop offset="80%" stopColor="#00d4ff"/><stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="strG2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="transparent"/><stop offset="20%" stopColor="#00e87a"/><stop offset="80%" stopColor="#00e87a"/><stop offset="100%" stopColor="transparent"/>
              </linearGradient>
            </defs>
            <path d="M 120 20 L 120 56 L 80 56 Q 55 50 38 36 Q 22 24 28 12 Q 42 2 80 10 Z" fill="url(#noseOpen)" stroke="rgba(0,200,160,0.7)" strokeWidth="1.1"/>
            <path d="M 120 20 L 120 56 L 82 56 Q 60 50 44 38 Z" fill="rgba(0,200,160,0.04)"/>
            <path d="M 120 20 L 120 56 L 160 56 Q 185 50 202 36 Q 218 24 212 12 Q 198 2 160 10 Z" fill="url(#noseOpen)" stroke="rgba(0,200,160,0.7)" strokeWidth="1.1"/>
            <circle cx="120" cy="56" r="4" fill="#1e3040" stroke="rgba(0,200,160,0.9)" strokeWidth="1"/>
            <rect x="80" y="54" width="80" height="4" rx="1" fill="#1a2838" stroke="rgba(0,200,160,0.6)" strokeWidth="0.7"/>
            <line x1="102" y1="90"  x2="72"  y2="36" stroke="rgba(0,200,160,0.55)" strokeWidth="1.2"/>
            <circle cx="72" cy="36" r="2.5" fill="rgba(0,200,160,0.5)" stroke="rgba(0,200,160,0.8)" strokeWidth="0.7"/>
            <line x1="102" y1="118" x2="65"  y2="48" stroke="rgba(0,200,160,0.55)" strokeWidth="1.2"/>
            <circle cx="65" cy="48" r="2.5" fill="rgba(0,200,160,0.5)" stroke="rgba(0,200,160,0.8)" strokeWidth="0.7"/>
            <line x1="138" y1="90"  x2="168" y2="36" stroke="rgba(0,200,160,0.55)" strokeWidth="1.2"/>
            <circle cx="168" cy="36" r="2.5" fill="rgba(0,200,160,0.5)" stroke="rgba(0,200,160,0.8)" strokeWidth="0.7"/>
            <line x1="138" y1="118" x2="175" y2="48" stroke="rgba(0,200,160,0.55)" strokeWidth="1.2"/>
            <circle cx="175" cy="48" r="2.5" fill="rgba(0,200,160,0.5)" stroke="rgba(0,200,160,0.8)" strokeWidth="0.7"/>
            <line x1="50" y1="28" x2="50" y2="52" stroke="rgba(0,200,160,0.4)" strokeWidth="1" strokeDasharray="2,2"/>
            <polygon points="50,57 46,48 54,48" fill="rgba(0,200,160,0.4)"/>
            <line x1="190" y1="28" x2="190" y2="52" stroke="rgba(0,200,160,0.4)" strokeWidth="1" strokeDasharray="2,2"/>
            <polygon points="190,57 186,48 194,48" fill="rgba(0,200,160,0.4)"/>
            <rect x="98" y="58" width="44" height="108" fill="url(#bodyM2)" stroke="#1a2840" strokeWidth="0.8"/>
            <rect x="96" y="110" width="48" height="4" rx="0.5" fill="#1a2838" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5"/>
            <rect x="104" y="66" width="32" height="18" rx="1" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.25)" strokeWidth="0.5"/>
            <rect x="106" y="69" width="9" height="6" rx="0.5" fill="rgba(0,212,255,0.18)"/>
            <rect x="117" y="69" width="6" height="6" rx="0.5" fill="rgba(0,232,122,0.18)"/>
            <rect x="125" y="69" width="6" height="6" rx="0.5" fill="rgba(255,196,0,0.18)"/>
            <path d="M 98 213 L 63 206 L 63 192 L 82 184 L 98 181 Z" fill="url(#finM2)" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <path d="M 142 213 L 177 206 L 177 192 L 158 184 L 142 181 Z" fill="url(#finM2)" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <rect x="98" y="180" width="44" height="1.8" fill="url(#strG2)" opacity="0.9"/>
            <rect x="98" y="166" width="44" height="15" fill="url(#bodyM2)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.8"/>
            <rect x="18" y="170" width="80" height="9" rx="2" fill="#141e2e" stroke="rgba(0,212,255,0.55)" strokeWidth="0.8"/>
            <circle cx="21" cy="174" r="13" fill="#1a4050" stroke="#00d4ff" strokeWidth="1.3"/>
            <circle cx="21" cy="174" r="7"  fill="#0a2030" stroke="rgba(0,212,255,0.45)" strokeWidth="0.7"/>
            <circle cx="21" cy="174" r="24" fill="none" stroke="rgba(0,212,255,0.13)" strokeWidth="0.8" strokeDasharray="3,3"/>
            <ellipse cx="21" cy="174" rx="22" ry="3.5" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.22)" strokeWidth="0.5" transform="rotate(18,21,174)"/>
            <ellipse cx="21" cy="174" rx="22" ry="3.5" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.14)" strokeWidth="0.5" transform="rotate(63,21,174)"/>
            <rect x="142" y="170" width="80" height="9" rx="2" fill="#141e2e" stroke="rgba(0,212,255,0.55)" strokeWidth="0.8"/>
            <circle cx="219" cy="174" r="13" fill="#1a4050" stroke="#00d4ff" strokeWidth="1.3"/>
            <circle cx="219" cy="174" r="7"  fill="#0a2030" stroke="rgba(0,212,255,0.45)" strokeWidth="0.7"/>
            <circle cx="219" cy="174" r="24" fill="none" stroke="rgba(0,212,255,0.13)" strokeWidth="0.8" strokeDasharray="3,3"/>
            <ellipse cx="219" cy="174" rx="22" ry="3.5" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.22)" strokeWidth="0.5" transform="rotate(-18,219,174)"/>
            <ellipse cx="219" cy="174" rx="22" ry="3.5" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.14)" strokeWidth="0.5" transform="rotate(-63,219,174)"/>
            <line x1="21"  y1="190" x2="21"  y2="218" stroke="rgba(255,196,0,0.35)" strokeWidth="0.8" strokeDasharray="2,2"/>
            <polygon points="21,222 17,213 25,213" fill="rgba(255,196,0,0.35)"/>
            <line x1="219" y1="190" x2="219" y2="218" stroke="rgba(255,196,0,0.35)" strokeWidth="0.8" strokeDasharray="2,2"/>
            <polygon points="219,222 215,213 223,213" fill="rgba(255,196,0,0.35)"/>
            <rect x="98" y="217" width="44" height="45" fill="url(#bodyM2)" stroke="#1a2840" strokeWidth="0.8"/>
            <rect x="96" y="262" width="48" height="11" rx="1" fill="#1a2838" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <circle cx="103" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="111" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="120" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="129" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="137" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <rect x="96" y="271" width="48" height="1.5" fill="url(#strA2)" opacity="0.8"/>
            <rect x="98" y="273" width="44" height="207" fill="url(#engM2)" stroke="#1a2030" strokeWidth="0.8"/>
            <line x1="98"  y1="320" x2="142" y2="320" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="98"  y1="370" x2="142" y2="370" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="98"  y1="420" x2="142" y2="420" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="98"  y1="460" x2="142" y2="460" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <rect x="98" y="480" width="44" height="56" fill="url(#engM2)" stroke="#1a2030" strokeWidth="0.8"/>
            <rect x="96" y="490" width="48" height="8" rx="1" fill="#141e28" stroke="rgba(0,212,255,0.25)" strokeWidth="0.6"/>
            <path d="M 98 540 L 102 565 L 138 565 L 142 540 Z" fill="url(#engM2)" stroke="#1a2030" strokeWidth="0.7"/>
            <rect x="100" y="563" width="40" height="5" rx="1" fill="#0a1218" stroke="rgba(255,107,0,0.4)" strokeWidth="0.7"/>
            <path d="M 102 568 Q 100 576 98 582 L 142 582 Q 140 576 138 568 Z" fill="url(#engM2)" stroke="#1a2030" strokeWidth="0.7"/>
            <ellipse cx="120" cy="582" rx="22" ry="2.5" fill="#0a1218" stroke="rgba(100,100,100,0.4)" strokeWidth="0.6"/>
            <path d="M 98 536 L 54 558 L 54 536 Z" fill="none" stroke="rgba(168,85,247,0.25)" strokeWidth="0.6" strokeDasharray="3,3"/>
            <path d="M 142 536 L 186 558 L 186 536 Z" fill="none" stroke="rgba(168,85,247,0.25)" strokeWidth="0.6" strokeDasharray="3,3"/>
            <text x="120" y="596" textAnchor="middle" fontSize="5" fill="rgba(168,85,247,0.35)" fontFamily="monospace">fins ejected ↙↘</text>
            <text x="120" y="8"  textAnchor="middle" fontSize="6" fill="rgba(0,200,160,0.6)" fontFamily="monospace">← 3.5× DRAG AREA →</text>
          </svg>
          <div className="mission-view-stats">
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Drag increase</span>
              <span className="mission-view-stat-value">3.5×</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Braked speed</span>
              <span className="mission-view-stat-value">~64 m/s</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Base fins</span>
              <span className="mission-view-stat-value">Ejected</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Arms</span>
              <span className="mission-view-stat-value">Grid-finning</span>
            </div>
          </div>
          <p className="mission-view-desc">
            Clamshell nosecone splits open to expose a 3.5× greater drag area.
            Folding drone arms extend and act as grid fins, passively stabilising
            the vehicle during descent — no parachute required.
          </p>
        </div>

        {/* ── LANDING ── */}
        <div className="mission-view">
          <div className="mission-view-label" style={{color:'#00e87a'}}>▼ LANDING</div>
          <svg width="220" height="600" viewBox="0 0 220 600">
            <defs>
              <linearGradient id="bodyM3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#141e2a"/><stop offset="50%" stopColor="#324860"/><stop offset="100%" stopColor="#141e2a"/>
              </linearGradient>
              <linearGradient id="engM3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0a1218"/><stop offset="50%" stopColor="#1a2838"/><stop offset="100%" stopColor="#0a1218"/>
              </linearGradient>
              <linearGradient id="finM3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0a1018"/><stop offset="50%" stopColor="#141e2a"/><stop offset="100%" stopColor="#0a1018"/>
              </linearGradient>
              <linearGradient id="noseOpen3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0f1e2e"/><stop offset="50%" stopColor="#1e3448"/><stop offset="100%" stopColor="#0f1e2e"/>
              </linearGradient>
              <linearGradient id="groundG3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="transparent"/><stop offset="25%" stopColor="#ff6200"/><stop offset="75%" stopColor="#ff6200"/><stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="strA3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="transparent"/><stop offset="20%" stopColor="#00d4ff"/><stop offset="80%" stopColor="#00d4ff"/><stop offset="100%" stopColor="transparent"/>
              </linearGradient>
              <linearGradient id="strG3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="transparent"/><stop offset="20%" stopColor="#00e87a"/><stop offset="80%" stopColor="#00e87a"/><stop offset="100%" stopColor="transparent"/>
              </linearGradient>
            </defs>
            <rect x="0" y="560" width="220" height="2" fill="url(#groundG3)"/>
            <text x="110" y="574" textAnchor="middle" fontSize="5.5" fill="rgba(255,98,0,0.3)" fontFamily="monospace" letterSpacing="2">GROUND</text>
            <line x1="88"  y1="468" x2="30"  y2="558" stroke="#2a3e50" strokeWidth="4.5" strokeLinecap="round"/>
            <line x1="88"  y1="468" x2="30"  y2="558" stroke="rgba(0,232,122,0.45)" strokeWidth="0.9"/>
            <line x1="88"  y1="496" x2="30"  y2="558" stroke="#162a20" strokeWidth="2.2" strokeDasharray="4,3" strokeLinecap="round"/>
            <rect x="17"  y="554" width="26" height="7" rx="2" fill="#162a20" stroke="#00e87a" strokeWidth="1.1"/>
            <rect x="18"  y="558" width="24" height="3" rx="1" fill="rgba(0,232,122,0.15)"/>
            <circle cx="88" cy="468" r="3.5" fill="#2a3e50" stroke="#00e87a" strokeWidth="1.1"/>
            <line x1="96"  y1="468" x2="58"  y2="558" stroke="#2a3e50" strokeWidth="4.5" strokeLinecap="round"/>
            <line x1="96"  y1="468" x2="58"  y2="558" stroke="rgba(0,232,122,0.45)" strokeWidth="0.9"/>
            <line x1="96"  y1="500" x2="58"  y2="558" stroke="#162a20" strokeWidth="2.2" strokeDasharray="4,3" strokeLinecap="round"/>
            <rect x="45"  y="554" width="26" height="7" rx="2" fill="#162a20" stroke="#00e87a" strokeWidth="1.1"/>
            <rect x="46"  y="558" width="24" height="3" rx="1" fill="rgba(0,232,122,0.15)"/>
            <circle cx="96" cy="468" r="3.5" fill="#2a3e50" stroke="#00e87a" strokeWidth="1.1"/>
            <line x1="124" y1="468" x2="162" y2="558" stroke="#2a3e50" strokeWidth="4.5" strokeLinecap="round"/>
            <line x1="124" y1="468" x2="162" y2="558" stroke="rgba(0,232,122,0.45)" strokeWidth="0.9"/>
            <line x1="124" y1="500" x2="162" y2="558" stroke="#162a20" strokeWidth="2.2" strokeDasharray="4,3" strokeLinecap="round"/>
            <rect x="149" y="554" width="26" height="7" rx="2" fill="#162a20" stroke="#00e87a" strokeWidth="1.1"/>
            <rect x="150" y="558" width="24" height="3" rx="1" fill="rgba(0,232,122,0.15)"/>
            <circle cx="124" cy="468" r="3.5" fill="#2a3e50" stroke="#00e87a" strokeWidth="1.1"/>
            <line x1="132" y1="468" x2="190" y2="558" stroke="#2a3e50" strokeWidth="4.5" strokeLinecap="round"/>
            <line x1="132" y1="468" x2="190" y2="558" stroke="rgba(0,232,122,0.45)" strokeWidth="0.9"/>
            <line x1="132" y1="496" x2="190" y2="558" stroke="#162a20" strokeWidth="2.2" strokeDasharray="4,3" strokeLinecap="round"/>
            <rect x="177" y="554" width="26" height="7" rx="2" fill="#162a20" stroke="#00e87a" strokeWidth="1.1"/>
            <rect x="178" y="558" width="24" height="3" rx="1" fill="rgba(0,232,122,0.15)"/>
            <circle cx="132" cy="468" r="3.5" fill="#2a3e50" stroke="#00e87a" strokeWidth="1.1"/>
            <path d="M 110 20 L 110 56 L 70 56 Q 45 50 28 36 Q 12 24 18 12 Q 32 2 70 10 Z" fill="url(#noseOpen3)" stroke="rgba(0,200,160,0.65)" strokeWidth="1"/>
            <path d="M 110 20 L 110 56 L 150 56 Q 175 50 192 36 Q 208 24 202 12 Q 188 2 150 10 Z" fill="url(#noseOpen3)" stroke="rgba(0,200,160,0.65)" strokeWidth="1"/>
            <circle cx="110" cy="56" r="3.5" fill="#1e3040" stroke="rgba(0,200,160,0.9)" strokeWidth="0.9"/>
            <rect x="70" y="54" width="80" height="4" rx="1" fill="#1a2838" stroke="rgba(0,200,160,0.55)" strokeWidth="0.7"/>
            <rect x="88" y="58"  width="44" height="108" fill="url(#bodyM3)" stroke="#1a2840" strokeWidth="0.8"/>
            <rect x="86" y="110" width="48" height="4" rx="0.5" fill="#1a2838" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5"/>
            <rect x="94" y="66"  width="32" height="18" rx="1" fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.25)" strokeWidth="0.5"/>
            <rect x="96" y="69"  width="9" height="6" rx="0.5" fill="rgba(0,212,255,0.18)"/>
            <rect x="107" y="69" width="6" height="6" rx="0.5" fill="rgba(0,232,122,0.18)"/>
            <rect x="115" y="69" width="6" height="6" rx="0.5" fill="rgba(255,196,0,0.18)"/>
            <path d="M 88 213 L 53 206 L 53 192 L 72 184 L 88 181 Z" fill="url(#finM3)" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <path d="M 132 213 L 167 206 L 167 192 L 148 184 L 132 181 Z" fill="url(#finM3)" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <rect x="88" y="180" width="44" height="1.8" fill="url(#strG3)" opacity="0.9"/>
            <rect x="88" y="166" width="44" height="15" fill="url(#bodyM3)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.8"/>
            <rect x="10" y="170" width="78" height="9" rx="2" fill="#141e2e" stroke="rgba(0,212,255,0.6)" strokeWidth="0.8"/>
            <circle cx="14" cy="174" r="14" fill="#1a4050" stroke="#00d4ff" strokeWidth="1.5" style={{filter:'drop-shadow(0 0 5px rgba(0,212,255,0.45))'}}/>
            <circle cx="14" cy="174" r="8"  fill="#0a2030" stroke="rgba(0,212,255,0.45)" strokeWidth="0.7"/>
            <circle cx="14" cy="174" r="26" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="0.8" strokeDasharray="3,3"/>
            <ellipse cx="14" cy="174" rx="24" ry="4" fill="rgba(0,212,255,0.13)" stroke="rgba(0,212,255,0.24)" strokeWidth="0.5" transform="rotate(18,14,174)"/>
            <ellipse cx="14" cy="174" rx="24" ry="4" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.14)" strokeWidth="0.5" transform="rotate(63,14,174)"/>
            <line x1="14" y1="190" x2="14" y2="225" stroke="rgba(0,232,122,0.75)" strokeWidth="1.8"/>
            <polygon points="14,230 10,221 18,221" fill="rgba(0,232,122,0.75)"/>
            <ellipse cx="14" cy="210" rx="7" ry="18" fill="rgba(0,232,122,0.06)"/>
            <rect x="132" y="170" width="78" height="9" rx="2" fill="#141e2e" stroke="rgba(0,212,255,0.6)" strokeWidth="0.8"/>
            <circle cx="206" cy="174" r="14" fill="#1a4050" stroke="#00d4ff" strokeWidth="1.5" style={{filter:'drop-shadow(0 0 5px rgba(0,212,255,0.45))'}}/>
            <circle cx="206" cy="174" r="8"  fill="#0a2030" stroke="rgba(0,212,255,0.45)" strokeWidth="0.7"/>
            <circle cx="206" cy="174" r="26" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="0.8" strokeDasharray="3,3"/>
            <ellipse cx="206" cy="174" rx="24" ry="4" fill="rgba(0,212,255,0.13)" stroke="rgba(0,212,255,0.24)" strokeWidth="0.5" transform="rotate(-18,206,174)"/>
            <ellipse cx="206" cy="174" rx="24" ry="4" fill="rgba(0,212,255,0.08)" stroke="rgba(0,212,255,0.14)" strokeWidth="0.5" transform="rotate(-63,206,174)"/>
            <line x1="206" y1="190" x2="206" y2="225" stroke="rgba(0,232,122,0.75)" strokeWidth="1.8"/>
            <polygon points="206,230 202,221 210,221" fill="rgba(0,232,122,0.75)"/>
            <ellipse cx="206" cy="210" rx="7" ry="18" fill="rgba(0,232,122,0.06)"/>
            <rect x="88" y="217" width="44" height="45" fill="url(#bodyM3)" stroke="#1a2840" strokeWidth="0.8"/>
            <rect x="86" y="262" width="48" height="11" rx="1" fill="#1a2838" stroke="rgba(0,212,255,0.5)" strokeWidth="0.9"/>
            <circle cx="93"  cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="101" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="110" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="119" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <circle cx="127" cy="267" r="1.5" fill="rgba(0,212,255,0.4)"/>
            <rect x="86" y="271" width="48" height="1.5" fill="url(#strA3)" opacity="0.8"/>
            <rect x="88" y="273" width="44" height="195" fill="url(#engM3)" stroke="#1a2030" strokeWidth="0.8"/>
            <line x1="88" y1="320" x2="132" y2="320" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="88" y1="370" x2="132" y2="370" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="88" y1="420" x2="132" y2="420" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <line x1="88" y1="460" x2="132" y2="460" stroke="rgba(0,0,0,0.5)" strokeWidth="1.2"/>
            <rect x="88" y="468" width="44" height="56" fill="url(#engM3)" stroke="#1a2030" strokeWidth="0.8"/>
            <rect x="86" y="478" width="48" height="8" rx="1" fill="#141e28" stroke="rgba(0,212,255,0.25)" strokeWidth="0.6"/>
            <path d="M 88 524 L 93 542 L 127 542 L 132 524 Z" fill="url(#engM3)" stroke="#1a2030" strokeWidth="0.7"/>
            <rect x="91" y="540" width="38" height="5" rx="1" fill="#0a1218" stroke="rgba(255,107,0,0.35)" strokeWidth="0.7"/>
            <path d="M 93 545 Q 91 552 88 558 L 132 558 Q 129 552 127 545 Z" fill="url(#engM3)" stroke="#1a2030" strokeWidth="0.7"/>
            <text x="110" y="248" textAnchor="middle" fontSize="5.5" fill="rgba(0,232,122,0.4)" fontFamily="monospace">112 kgf · T/W 2.05×</text>
          </svg>
          <div className="mission-view-stats">
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Motors</span>
              <span className="mission-view-stat-value">U13 II × 4</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Thrust</span>
              <span className="mission-view-stat-value">112 kgf</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">T/W ratio</span>
              <span className="mission-view-stat-value">2.05×</span>
            </div>
            <div className="mission-view-stat">
              <span className="mission-view-stat-label">Leg footprint</span>
              <span className="mission-view-stat-value">~180 cm</span>
            </div>
          </div>
          <p className="mission-view-desc">
            Four T-Motor U13 II motors fire on extending arms for a propulsive
            vertical landing. Four legs deploy to a 180 cm footprint.
            Nosecone remains open throughout descent and touchdown.
          </p>
        </div>

      </div>

      {/* Key */}
      <div className="mission-key">
        {key.map((k) => (
          <div className="mission-key-item" key={k.label}>
            <div className="mission-key-dot" style={{background: k.color, border: `1px solid ${k.border}`}} />
            <span>{k.label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
