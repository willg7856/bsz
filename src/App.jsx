import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Stravox from './pages/Stravox'
import Contact from './pages/Contact'
import News from './pages/News'
import Missions from './pages/Missions'
import Tests from './pages/Tests'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stravox" element={<Stravox />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
