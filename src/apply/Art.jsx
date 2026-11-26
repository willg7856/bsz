// Hand-drawn SVG artwork for the apply page. No external images needed.

const STARS = Array.from({ length: 70 }, (_, i) => {
  // deterministic pseudo-random so renders are stable
  const r = (n) => {
    const x = Math.sin(i * 9301 + n * 49297) * 233280
    return x - Math.floor(x)
  }
  return { x: r(1) * 800, y: r(2) * 520, s: r(3) * 1.6 + 0.3, o: r(4) * 0.7 + 0.2 }
})

export function LaunchArt() {
  return (
    <svg className="art art-launch" viewBox="0 0 800 640" role="img" aria-label="A rocket lifting off on an orange plume above a test range at dusk">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c0d10" />
          <stop offset="0.55" stopColor="#17191e" />
          <stop offset="1" stopColor="#3a1d14" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb08a" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#f2542d" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f2542d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="plume" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4e8" />
          <stop offset="0.18" stopColor="#ffc27a" />
          <stop offset="0.5" stopColor="#f2542d" />
          <stop offset="1" stopColor="#f2542d" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="smoke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d3cf" stopOpacity="0.1" />
          <stop offset="1" stopColor="#8d8580" stopOpacity="0.75" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="800" height="640" fill="url(#sky)" />
      <rect width="800" height="640" fill="url(#grid)" />
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#fff" opacity={s.o} />
      ))}

      {/* trajectory arc */}
      <path d="M400 470 C 410 300, 470 160, 640 40" fill="none" stroke="#f2542d" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.8" />
      <g fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#f2542d">
        <circle cx="452" cy="230" r="4" fill="#f2542d" />
        <text x="464" y="234">MAX-Q</text>
        <circle cx="560" cy="96" r="4" fill="#f2542d" />
        <text x="572" y="100">MECO</text>
      </g>

      {/* glow */}
      <ellipse cx="400" cy="520" rx="300" ry="130" fill="url(#glow)" className="art-flicker" />

      {/* smoke clouds */}
      <g fill="url(#smoke)">
        <circle cx="300" cy="560" r="70" />
        <circle cx="360" cy="580" r="80" />
        <circle cx="450" cy="575" r="85" />
        <circle cx="520" cy="560" r="65" />
        <circle cx="240" cy="590" r="55" />
        <circle cx="580" cy="590" r="60" />
      </g>

      {/* rocket + plume */}
      <g className="art-rise">
        <path d="M388 360 Q 400 520 412 360 Z" fill="url(#plume)" className="art-flicker" />
        <path d="M393 360 Q 400 440 407 360 Z" fill="#fff8ef" />
        <g>
          <path d="M400 200 C 412 216, 414 236, 414 250 L 414 352 L 386 352 L 386 250 C 386 236, 388 216, 400 200 Z" fill="#eceae6" />
          <rect x="386" y="290" width="28" height="6" fill="#f2542d" />
          <path d="M386 322 L 370 360 L 386 352 Z" fill="#f2542d" />
          <path d="M414 322 L 430 360 L 414 352 Z" fill="#f2542d" />
          <rect x="392" y="352" width="16" height="8" fill="#5b5f66" />
          <text x="400" y="278" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600" fill="#16181b">0]//</text>
        </g>
      </g>

      {/* ground + launch rail */}
      <rect x="0" y="600" width="800" height="40" fill="#0b0c0e" />
      <path d="M0 600 H800" stroke="#f2542d" strokeOpacity="0.5" />
      <g stroke="#2b2e34" strokeWidth="4">
        <line x1="430" y1="600" x2="430" y2="420" />
        <line x1="446" y1="600" x2="430" y2="460" />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#9ba0a8">
        <text x="24" y="626">T+00:00:04.2</text>
        <text x="776" y="626" textAnchor="end">ALT 412 M · 1.1 KN</text>
      </g>
    </svg>
  )
}

export function TestStandArt() {
  return (
    <svg className="art" viewBox="0 0 400 260" role="img" aria-label="Horizontal static fire on a test stand behind a blast plate">
      <rect width="400" height="260" fill="#16181b" />
      <defs>
        <linearGradient id="sf-plume" x1="0" x2="1">
          <stop offset="0" stopColor="#fff3e4" />
          <stop offset="0.2" stopColor="#ffb36b" />
          <stop offset="0.6" stopColor="#f2542d" />
          <stop offset="1" stopColor="#f2542d" stopOpacity="0" />
        </linearGradient>
        <pattern id="sf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#fff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill="url(#sf-grid)" />
      {/* blast plate */}
      <rect x="40" y="70" width="12" height="130" fill="#5b5f66" />
      {/* tanks */}
      <rect x="62" y="96" width="34" height="90" rx="17" fill="#2b2e34" stroke="#9ba0a8" />
      <rect x="104" y="106" width="28" height="80" rx="14" fill="#2b2e34" stroke="#9ba0a8" />
      <text x="79" y="146" textAnchor="middle" fill="#9ba0a8" fontFamily="JetBrains Mono, monospace" fontSize="8">AIR</text>
      <text x="118" y="150" textAnchor="middle" fill="#9ba0a8" fontFamily="JetBrains Mono, monospace" fontSize="8">ETH</text>
      {/* plumbing */}
      <path d="M79 96 V80 H170 V150" fill="none" stroke="#f2542d" strokeWidth="2" />
      <path d="M118 106 V88 H160 V150" fill="none" stroke="#9ba0a8" strokeWidth="2" />
      <circle cx="140" cy="80" r="6" fill="#16181b" stroke="#f2542d" strokeWidth="2" />
      <circle cx="140" cy="88" r="0" />
      {/* engine on thrust frame */}
      <rect x="150" y="140" width="60" height="26" rx="4" fill="#d9d6d1" />
      <path d="M210 142 L 232 132 L 232 174 L 210 164 Z" fill="#9ba0a8" />
      <line x1="150" y1="200" x2="240" y2="200" stroke="#5b5f66" strokeWidth="4" />
      <line x1="160" y1="166" x2="160" y2="200" stroke="#5b5f66" strokeWidth="3" />
      <line x1="205" y1="166" x2="205" y2="200" stroke="#5b5f66" strokeWidth="3" />
      {/* plume */}
      <path d="M232 136 Q 330 140 400 153 Q 330 166 232 170 Z" fill="url(#sf-plume)" className="art-flicker" />
      {[248, 266, 284].map((x) => (
        <ellipse key={x} cx={x} cy="153" rx="3" ry="11" fill="#fff8ef" opacity="0.8" />
      ))}
      <line x1="0" y1="200" x2="400" y2="200" stroke="#2b2e34" />
      <text x="16" y="236" fill="#9ba0a8" fontFamily="JetBrains Mono, monospace" fontSize="10">PC 18.4 BAR</text>
      <text x="384" y="236" textAnchor="end" fill="#f2542d" fontFamily="JetBrains Mono, monospace" fontSize="10">● HOTFIRE</text>
    </svg>
  )
}

export function OrbitArt() {
  return (
    <svg className="art" viewBox="0 0 400 260" role="img" aria-label="Trajectory plot from the pad through apogee to recovery">
      <rect width="400" height="260" fill="#f2542d" />
      <pattern id="ob-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0V20" fill="none" stroke="#16181b" strokeOpacity="0.12" />
      </pattern>
      <rect width="400" height="260" fill="url(#ob-grid)" />
      <path d="M30 220 C 90 40, 250 20, 360 220" fill="none" stroke="#16181b" strokeWidth="3" />
      <path d="M30 220 C 90 40, 250 20, 360 220" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="0 600" className="art-draw" />
      <line x1="20" y1="220" x2="380" y2="220" stroke="#16181b" strokeWidth="2" />
      <g fill="#16181b" fontFamily="JetBrains Mono, monospace" fontSize="10">
        <circle cx="30" cy="220" r="5" />
        <text x="30" y="242" textAnchor="middle">PAD</text>
        <circle cx="62" cy="140" r="4" />
        <text x="72" y="144">BURNOUT</text>
        <circle cx="185" cy="73" r="5" fill="#fff" stroke="#16181b" strokeWidth="2" />
        <text x="185" y="58" textAnchor="middle">APOGEE</text>
        <circle cx="300" cy="140" r="4" />
        <text x="310" y="144">MAIN</text>
        <circle cx="360" cy="220" r="5" />
        <text x="360" y="242" textAnchor="middle">RECOVER</text>
      </g>
    </svg>
  )
}

export function Mark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="25.6" cy="60" r="18" fill="currentColor" />
      <path d="M45.1 23 L55.1 23 L55.1 97 L45.1 97" fill="none" stroke="currentColor" strokeWidth="9" />
      <line x1="70.7" y1="82" x2="90.7" y2="38" stroke="currentColor" strokeWidth="9" />
      <line x1="88.3" y1="82" x2="108.3" y2="38" stroke="currentColor" strokeWidth="9" />
    </svg>
  )
}
