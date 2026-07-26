import './BrandLogo.css'

export default function BrandLogo() {
  return (
    <span className="brand-logo">
      <svg
        className="brand-logo-mark"
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
        <line
          x1="70.7"
          y1="82"
          x2="90.7"
          y2="38"
          stroke="currentColor"
          strokeWidth="9"
        />
        <line
          x1="88.3"
          y1="82"
          x2="108.3"
          y2="38"
          stroke="currentColor"
          strokeWidth="9"
        />
      </svg>
      <span className="brand-logo-text">
        BEYOND <span className="brand-logo-bracket">[STAGE ZERO]</span>
      </span>
    </span>
  )
}
