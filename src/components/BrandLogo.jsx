import './BrandLogo.css'

export default function BrandLogo() {
  return (
    <span className="brand-logo">
      <img src="/logo-mark.svg" alt="" className="brand-logo-mark" aria-hidden="true" />
      <span className="brand-logo-text">
        BEYOND <span className="brand-logo-bracket">[STAGE ZERO]</span>
      </span>
    </span>
  )
}
