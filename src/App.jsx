import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <span className="logo">Beyond Stage Zero</span>
          <nav>
            <a href="#mission">Mission</a>
            <a href="#features">Technology</a>
            <a href="#contact" className="btn-primary">Get Involved</a>
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
