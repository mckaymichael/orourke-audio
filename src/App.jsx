import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav.jsx'
import BottomNav from './components/BottomNav/BottomNav.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Portfolio from './pages/Portfolio/Portfolio.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Sitemap from './pages/Sitemap/Sitemap.jsx'
import NotFound from './pages/NotFound.jsx'
import HomeConcepts from './pages/HomeConcepts/HomeConcepts.jsx'
import PortfolioConcepts from './pages/PortfolioConcepts/PortfolioConcepts.jsx'
import BrandGuide from './pages/BrandGuide/BrandGuide.jsx'

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main-content" className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
          {/* Hidden - not linked from Nav/Footer/BottomNav, noindex via the pages themselves */}
          <Route path="/lab/home-concepts" element={<HomeConcepts />} />
          <Route path="/lab/portfolio-concepts" element={<PortfolioConcepts />} />
          <Route path="/lab/brand-guide" element={<BrandGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
