import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-name">Beyond Stage Zero</span>
        <nav className="footer-links">
          <a href="#mission">Mission</a>
          <a href="#rocket">Rocket</a>
          <a href="#stages">Stages</a>
          <a href="#team">Team</a>
          <a href="#sponsors">Sponsors</a>
          <a href="#press">Press</a>
        </nav>
        <span className="footer-copy">© {new Date().getFullYear()} Beyond Stage Zero</span>
      </div>
    </footer>
  )
}
