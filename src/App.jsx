import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Stravox from './pages/Stravox'
import B1m from './pages/B1m'
import Contact from './pages/Contact'
import Missions from './pages/Missions'
import Tests from './pages/Tests'
import Nozzles from './pages/Nozzles'
import Octopus from './pages/Octopus'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stravox" element={<Stravox />} />
        <Route path="/b1m" element={<B1m />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/nozzles" element={<Nozzles />} />
        <Route path="/octopus" element={<Octopus />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
