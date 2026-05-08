export default function Logo({ height = 38 }) {
  const w = 800
  const h = 200
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      height={height}
      width="auto"
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="white"
        d="
          M 40,100
          L 115,62
          L 218,62
          L 228,30
          L 248,14
          L 318,14
          L 338,30
          L 348,62
          L 692,62
          L 726,34
          L 768,34
          L 788,100
          L 768,166
          L 726,166
          L 692,138
          L 348,138
          L 338,170
          L 318,186
          L 248,186
          L 228,170
          L 218,138
          L 115,138
          Z
        "
      />
      <text
        x="480"
        y="118"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
        fontSize="64"
        fill="black"
        letterSpacing="-1"
      >
        Beyond Stage Zero
      </text>
    </svg>
  )
}
