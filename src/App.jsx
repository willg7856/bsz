import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Stars from './components/Stars'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import News from './pages/News'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Stars />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
