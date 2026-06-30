import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import AvisoLegal from './pages/AvisoLegal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import IndustryPage from './pages/IndustryPage';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }, [pathname]);
  return null;
}

/**
 * The full application tree WITHOUT a router. The router (BrowserRouter on the
 * client, StaticRouter during prerender) is provided by the entry point so the
 * same tree can be rendered both in the browser and on the server.
 */
export default function AppShell() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            {/* Spanish (default) */}
            <Route path="/" element={<Home />} />
            <Route path="/es" element={<Home />} />
            <Route path="/es/servicios" element={<Services />} />
            <Route path="/es/servicios/restaurantes" element={<IndustryPage type="restaurants" />} />
            <Route path="/es/servicios/peluquerias" element={<IndustryPage type="hairSalons" />} />
            <Route path="/es/servicios/estetica" element={<IndustryPage type="beautyCenters" />} />
            <Route path="/es/servicios/carnicerias" element={<IndustryPage type="butcherShops" />} />
            <Route path="/es/servicios/panaderias" element={<IndustryPage type="bakeries" />} />
            <Route path="/es/sobre" element={<About />} />
            <Route path="/es/contacto" element={<Contact />} />
            <Route path="/es/aviso-legal" element={<AvisoLegal />} />
            <Route path="/es/politica-privacidad" element={<PrivacyPolicy />} />

            {/* Catalan */}
            <Route path="/ca" element={<Home />} />
            <Route path="/ca/serveis" element={<Services />} />
            <Route path="/ca/serveis/restaurants" element={<IndustryPage type="restaurants" />} />
            <Route path="/ca/serveis/perruqueries" element={<IndustryPage type="hairSalons" />} />
            <Route path="/ca/serveis/estetica" element={<IndustryPage type="beautyCenters" />} />
            <Route path="/ca/serveis/carnisseries" element={<IndustryPage type="butcherShops" />} />
            <Route path="/ca/serveis/forns" element={<IndustryPage type="bakeries" />} />
            <Route path="/ca/sobre" element={<About />} />
            <Route path="/ca/contacte" element={<Contact />} />
            <Route path="/ca/avis-legal" element={<AvisoLegal />} />
            <Route path="/ca/politica-privacitat" element={<PrivacyPolicy />} />

            {/* English */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/services" element={<Services />} />
            <Route path="/en/services/restaurants" element={<IndustryPage type="restaurants" />} />
            <Route path="/en/services/hair-salons" element={<IndustryPage type="hairSalons" />} />
            <Route path="/en/services/beauty-centres" element={<IndustryPage type="beautyCenters" />} />
            <Route path="/en/services/butcher-shops" element={<IndustryPage type="butcherShops" />} />
            <Route path="/en/services/bakeries" element={<IndustryPage type="bakeries" />} />
            <Route path="/en/about" element={<About />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/legal-notice" element={<AvisoLegal />} />
            <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
