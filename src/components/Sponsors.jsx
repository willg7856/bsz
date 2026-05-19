const tiers = [
  { num: 'TIER 01', name: 'Fuselage', price: '2.5k', unit: 'AUD',
    perks: ['Logo on the airframe', 'Recognition at launch', 'Quarterly progress report', 'Studio visit'] },
  { num: 'TIER 02', name: 'Recovery', price: '7.5k', unit: 'AUD', featured: true,
    perks: ['Fuselage tier, plus', 'Logo on launch livery', 'Named on press releases', 'VIP launch attendance', 'Co-branded post-flight report'] },
  { num: 'TIER 03', name: 'Propulsion', price: '20k', unit: 'AUD',
    perks: ['Recovery tier, plus', 'Naming rights on motor', 'Static-fire attendance', 'First-look on flight data', 'Long-term partnership track'] },
];

export default function Sponsors() {
  return (
    <section className="section dark" id="sponsors">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow accent">[ Sponsors ]</span>
            <h2>Buy a stage.</h2>
          </div>
          <p className="lead">
            We are funded by sponsors. Each tier is named after the build stage it covers and comes with the access and credit you&apos;d expect for that level of support.
          </p>
        </div>
        <div className="sponsor-ladder">
          {tiers.map(t => (
            <div className={`sponsor-tier${t.featured ? ' featured' : ''}`} key={t.name}>
              <div className="tier-num">{t.num}</div>
              <h3>{t.name}</h3>
              <div className="price">${t.price}<small> {t.unit}</small></div>
              <ul>{t.perks.map(p => <li key={p}>{p}</li>)}</ul>
              <a className={`btn ${t.featured ? 'btn--primary' : 'btn--ghost-dark'}`} href="mailto:ops@bsz.au">
                {t.featured ? 'Most chosen →' : 'Get in touch'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
