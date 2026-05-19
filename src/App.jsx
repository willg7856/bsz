import './styles/site.css';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Stages from './components/Stages';
import Team from './components/Team';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav active="mission" />
      <main>
        <Hero />
        <Mission />
        <Stages />
        <Team />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
