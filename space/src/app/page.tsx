import "./page.css";

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

export default function HomePage() {
  return (
    <main className="space-landing">
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
