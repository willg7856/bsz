import "./page.css";

function BrandMark() {
  return (
    <svg
      className="space-mark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 40"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="20" r="5.75" />
      <rect x="24" y="8.5" width="10" height="2.25" />
      <rect x="31.75" y="8.5" width="2.25" height="23" />
      <rect x="24" y="29.25" width="10" height="2.25" />
      <path d="M42 31.5 L51 8.5 h2.5 L44.5 31.5 H42z" />
      <path d="M52 31.5 L61 8.5 h2.5 L54.5 31.5 H52z" />
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
      </div>
    </main>
  );
}
