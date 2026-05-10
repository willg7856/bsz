export default function Nav({ active = 'mission' }) {
  const links = [
    ['mission', 'Mission'],
    ['stravox', 'STRAVOX'],
    ['team', 'Team'],
    ['sponsors', 'Sponsors'],
  ];
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#">
          <img src="/assets/logo-banner-white-on-transparent.png" alt="Beyond Stage Zero" />
        </a>
        <nav className="nav-links">
          {links.map(([k, label]) => (
            <a key={k} href={`#${k}`} className={active === k ? 'active' : ''}>{label}</a>
          ))}
        </nav>
        <a className="nav-cta" href="#sponsors">Sponsor &rarr;</a>
      </div>
    </header>
  );
}
