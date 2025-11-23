import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import AvisoLegal from './pages/AvisoLegal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            {/* Redirect root to default language (es) */}
            <Route path="/" element={<Home />} />
            <Route path="/es" element={<Home />} />
            <Route path="/es/servicios" element={<Services />} />
            <Route path="/es/sobre" element={<About />} />
            <Route path="/es/contacto" element={<Contact />} />
            <Route path="/es/aviso-legal" element={<AvisoLegal />} />
            <Route path="/es/politica-privacidad" element={<PrivacyPolicy />} />

            <Route path="/ca" element={<Home />} />
            <Route path="/ca/serveis" element={<Services />} />
            <Route path="/ca/sobre" element={<About />} />
            <Route path="/ca/contacte" element={<Contact />} />
            <Route path="/ca/avis-legal" element={<AvisoLegal />} />
            <Route path="/ca/politica-privacitat" element={<PrivacyPolicy />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
}
