export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-banner">
          <img src="/assets/logo-banner-white-on-transparent.png" alt="Beyond Stage Zero" />
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Beyond Stage Zero</h4>
            <p>Australia&apos;s largest student rocket. Apogee target 30 km, first flight August 2026. Based in Melbourne, launching from Mildura.</p>
          </div>
          <div className="footer-col">
            <h4>Programme</h4>
            <a href="#mission">Mission</a>
            <a href="#stages">Stages</a>
            <a href="#team">Team</a>
            <a href="#sponsors">Sponsors</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">Design report</a>
            <a href="#">Static-fire data</a>
            <a href="#">Press kit</a>
            <a href="#">Recruit</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:ops@bsz.au">ops@bsz.au</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Beyond Stage Zero &middot; Melbourne, AU</span>
          <span>[ T-87 DAYS &middot; GO ]</span>
        </div>
      </div>
    </footer>
  );
}
