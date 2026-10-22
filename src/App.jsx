import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import B1m from './pages/B1m'
import B1mEngine from './pages/B1mEngine'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import Missions from './pages/Missions'
import News from './pages/News'
import NotFound from './pages/NotFound'
import Nozzles from './pages/Nozzles'
import Octopus from './pages/Octopus'
import Starship from './pages/Starship'
import Stravox from './pages/Stravox'
import Tests from './pages/Tests'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="stravox" element={<Stravox />} />
          <Route path="b1m" element={<B1m />} />
          <Route path="b1m-engine" element={<B1mEngine />} />
          <Route path="missions" element={<Missions />} />
          <Route path="tests" element={<Tests />} />
          <Route path="nozzles" element={<Nozzles />} />
          <Route path="octopus" element={<Octopus />} />
          <Route path="starship" element={<Starship />} />
          <Route path="news" element={<News />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
