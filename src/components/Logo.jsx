export default function Logo({ height = 38 }) {
  return (
    <svg
      viewBox="0 0 900 220"
      height={height}
      style={{ display: 'block', width: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main body — nose on left, angled tail on right, hex collar center-left */}
      <path
        fill="white"
        d="
          M 38,110
          L 130,65
          L 235,65
          L 248,35
          L 268,18
          L 345,18
          L 365,35
          L 378,65
          L 740,65
          L 768,38
          L 820,38
          L 848,110
          L 820,182
          L 768,182
          L 740,155
          L 378,155
          L 365,185
          L 345,202
          L 268,202
          L 248,185
          L 235,155
          L 130,155
          Z
        "
      />
      {/* Text sits right of the collar */}
      <text
        x="618"
        y="124"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
        fontSize="68"
        fill="black"
        letterSpacing="0"
      >
        Beyond Stage Zero
      </text>
    </svg>
  )
}
