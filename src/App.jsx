import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <span className="logo">Apex Agency</span>
          <nav>
            <a href="#features">Services</a>
            <a href="#contact" className="btn-primary">Get in Touch</a>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  )
}
