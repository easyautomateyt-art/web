import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';

const langOptions = ['es', 'ca'] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const mobileLangRef = useRef<HTMLDivElement | null>(null);

  const itemRefs = useRef<Array<HTMLButtonElement | null>>( [] );
  const [focusIndex, setFocusIndex] = useState<number>(-1);

  const toggleLangMenu = () => setIsLangOpen((s) => !s);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const clickedInsideDesktop = langRef.current && langRef.current.contains(target);
      const clickedInsideMobile = mobileLangRef.current && mobileLangRef.current.contains(target);
      if (isLangOpen && !clickedInsideDesktop && !clickedInsideMobile) {
        setIsLangOpen(false);
      }
    }
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isLangOpen]);

  useEffect(() => {
    if (isLangOpen) {
      // trigger enter animation
      setAnimateIn(false);
      requestAnimationFrame(() => setAnimateIn(true));
      // focus initial option
      const idx = langOptions.indexOf(language);
      setFocusIndex(idx >= 0 ? idx : 0);
      setTimeout(() => itemRefs.current[idx >= 0 ? idx : 0]?.focus(), 0);
    } else {
      setAnimateIn(false);
      setFocusIndex(-1);
    }
  }, [isLangOpen, language]);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setIsServicesMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const base = language === 'es' ? '/es' : '/ca';
  const navItems = [
    { id: 'home', label: t.nav.home, to: `${base}` },
    { id: 'services', label: t.nav.services, to: `${base}/${language === 'es' ? 'servicios' : 'serveis'}` },
    { id: 'about', label: t.nav.about, to: `${base}/sobre` },
    { id: 'contact', label: t.nav.contact, to: `${base}/${language === 'es' ? 'contacto' : 'contacte'}` },
  ];

  const industryLinks = [
    { id: 'restaurants', labelEs: 'Restaurantes', labelCa: 'Restaurants', pathEs: 'restaurantes', pathCa: 'restaurants' },
    { id: 'hairSalons', labelEs: 'Peluquerías', labelCa: 'Perruqueries', pathEs: 'peluquerias', pathCa: 'perruqueries' },
    { id: 'beautyCenters', labelEs: 'Estética', labelCa: 'Estètica', pathEs: 'estetica', pathCa: 'estetica' },
    { id: 'butcherShops', labelEs: 'Carnicerías', labelCa: 'Carnisseries', pathEs: 'carnicerias', pathCa: 'carnisseries' },
    { id: 'bakeries', labelEs: 'Panaderías', labelCa: 'Forns de Pa', pathEs: 'panaderias', pathCa: 'forns' },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  // when switching language, navigate to equivalent localized path
  const selectLanguage = (lang: 'es' | 'ca') => {
    setLanguage(lang);
    setIsLangOpen(false);
    // compute target path mapping
    const current = location.pathname.replace(/^\/(es|ca)/, '') || '/';
    
    // Build dynamic mapping including generic pages and all industry pages
    const baseMapping: Record<string, Record<'es'|'ca', string>> = {
      '/': { es: '/es', ca: '/ca' },
      '/services': { es: '/es/servicios', ca: '/ca/serveis' }, // For english-like fallback
      '/servicios': { es: '/es/servicios', ca: '/ca/serveis' },
      '/serveis': { es: '/es/servicios', ca: '/ca/serveis' },
      
      '/about': { es: '/es/sobre', ca: '/ca/sobre' },
      '/sobre': { es: '/es/sobre', ca: '/ca/sobre' },

      '/contact': { es: '/es/contacto', ca: '/ca/contacte' },
      '/contacto': { es: '/es/contacto', ca: '/ca/contacte' },
      '/contacte': { es: '/es/contacto', ca: '/ca/contacte' },

      '/aviso-legal': { es: '/es/aviso-legal', ca: '/ca/avis-legal' },
      '/avis-legal': { es: '/es/aviso-legal', ca: '/ca/avis-legal' },

      '/politica-privacidad': { es: '/es/politica-privacidad', ca: '/ca/politica-privacitat' },
      '/politica-privacitat': { es: '/es/politica-privacidad', ca: '/ca/politica-privacitat' },
    };

    // Add industry paths to mapping
    industryLinks.forEach(ind => {
      // From ES path
      const esKey = `/servicios/${ind.pathEs}`;
      baseMapping[esKey] = { 
        es: `/es/servicios/${ind.pathEs}`, 
        ca: `/ca/serveis/${ind.pathCa}` 
      };
      
      // From CA path
      const caKey = `/serveis/${ind.pathCa}`;
      baseMapping[caKey] = { 
        es: `/es/servicios/${ind.pathEs}`, 
        ca: `/ca/serveis/${ind.pathCa}` 
      };
    });

    // try to find a direct match or fallback to root of language
    // normalized should just be the path without language prefix
    const normalized = current === '/' ? '/' : `/${current.replace(/^\//, '')}`;
    const target = baseMapping[normalized]?.[lang] ?? (lang === 'es' ? '/es' : '/ca');
    navigate(target);
  };

  return (
    <header className="fixed w-full top-0 z-[100] bg-[#001F20] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img
              src="/OneReserve_Logo_web-removebg-preview.png"
              alt="OneReserve"
              className="h-10 cursor-pointer"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.id === 'services') {
                return (
                  <div key={item.id} className="relative group">
                    <div className="flex items-center cursor-pointer">
                      <NavLink
                        to={item.to}
                        onClick={handleCloseMenu}
                        className={({ isActive }) => `text-base font-medium transition-colors flex items-center ${isActive || location.pathname.includes(language === 'es' ? '/servicios/' : '/serveis/') ? 'text-[#00E8E5]' : 'text-white hover:text-[#00E8E5]'}`}
                      >
                        {item.label}
                      </NavLink>
                      <ChevronDown className="ml-1 h-4 w-4 text-white group-hover:text-[#00E8E5] transition-colors" />
                    </div>
                    {/* Dropdown Content */}
                    <div className="absolute left-0 top-full pt-2 w-64 hidden group-hover:block z-[110]">
                      <div className="bg-[#002A2B] border border-gray-600 rounded-lg shadow-2xl py-2">
                        {industryLinks.map((sub, idx) => (
                          <NavLink
                            key={idx}
                            to={`${base}/${language === 'es' ? 'servicios' : 'serveis'}/${language === 'es' ? sub.pathEs : sub.pathCa}`}
                            onClick={handleCloseMenu}
                            className={({ isActive }) => `block px-4 py-2.5 text-sm transition-colors ${isActive ? 'text-[#00E8E5] bg-[#003A3B]' : 'text-white hover:bg-[#003A3B] hover:text-[#00E8E5]'}`}
                          >
                            {language === 'es' ? sub.labelEs : sub.labelCa}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  onClick={handleCloseMenu}
                  className={({ isActive }) => `text-base font-medium transition-colors ${isActive ? 'text-[#00E8E5]' : 'text-white hover:text-[#00E8E5]'}`}
                >
                  {item.label}
                </NavLink>
              );
            })}

            <div className="relative" ref={langRef} onKeyDown={(e) => {
              const ev = e as React.KeyboardEvent<HTMLDivElement>;
              if (!isLangOpen) {
                if (ev.key === 'ArrowDown' || ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault();
                  setIsLangOpen(true);
                }
                return;
              }
              if (ev.key === 'ArrowDown') {
                ev.preventDefault();
                const next = (focusIndex + 1) % langOptions.length;
                setFocusIndex(next);
                itemRefs.current[next]?.focus();
              } else if (ev.key === 'ArrowUp') {
                ev.preventDefault();
                const prev = (focusIndex - 1 + langOptions.length) % langOptions.length;
                setFocusIndex(prev);
                itemRefs.current[prev]?.focus();
              } else if (ev.key === 'Escape') {
                setIsLangOpen(false);
              } else if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                if (focusIndex >= 0) selectLanguage(langOptions[focusIndex]);
              }
            }} tabIndex={-1}>
              <button
                onClick={toggleLangMenu}
                className="flex items-center space-x-1 text-white hover:text-[#00E8E5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E8E5] rounded"
                aria-haspopup="true"
                aria-expanded={isLangOpen}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>

              {isLangOpen && (
                <div className={`absolute right-0 mt-2 min-w-[160px] bg-[#001F20] border border-gray-700 rounded-md shadow-lg z-50 py-1 overflow-hidden transform transition ease-out duration-150 origin-top-right ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} role="menu">
                  <button
                    ref={el => itemRefs.current[0] = el}
                    role="menuitem"
                    onClick={() => selectLanguage('es')}
                    className={`w-full text-left px-3 py-2 text-sm ${language === 'es' ? 'text-[#00E8E5]' : 'text-white'} hover:bg-[#002F30] hover:text-[#00E8E5] transition-colors`}
                  >
                    Castellano (ES)
                  </button>
                  <button
                    ref={el => itemRefs.current[1] = el}
                    role="menuitem"
                    onClick={() => selectLanguage('ca')}
                    className={`w-full text-left px-3 py-2 text-sm ${language === 'ca' ? 'text-[#00E8E5]' : 'text-white'} hover:bg-[#002F30] hover:text-[#00E8E5] transition-colors`}
                  >
                    Català (CA)
                  </button>
                </div>
              )}
            </div>

            <a
              href="https://onereserve.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00E8E5] text-[#001F20] px-6 py-2.5 rounded-lg font-semibold hover:bg-[#00d4d1] transition-all transform hover:scale-105 shadow-lg"
            >
              {t.nav.access}
            </a>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#001F20] border-t border-gray-700">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => {
              if (item.id === 'services') {
                return (
                  <div key={item.id} className="block">
                     <div className="flex items-center justify-between w-full py-2 px-4 text-white hover:text-[#00E8E5] hover:bg-[#002F30] rounded-lg cursor-pointer max-w-full"
                          onClick={() => setIsServicesMobileOpen(!isServicesMobileOpen)}>
                         <span className="font-medium text-base">{item.label}</span>
                         <ChevronDown className={`h-4 w-4 transition-transform ${isServicesMobileOpen ? 'rotate-180' : ''}`} />
                     </div>
                     {isServicesMobileOpen && (
                         <div className="ml-4 space-y-2 mt-2 border-l border-gray-700 pl-2">
                             <NavLink
                                to={item.to}
                                onClick={handleCloseMenu}
                                className={({ isActive }) => `block py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-[#00E8E5] bg-[#002F30]' : 'text-gray-300 hover:text-[#00E8E5] hover:bg-[#002F30]'}`}
                             >
                                 {language === 'es' ? 'Todos los servicios' : 'Tots els serveis'}
                             </NavLink>
                             {industryLinks.map((sub, idx) => (
                                <NavLink
                                  key={idx}
                                  to={`${base}/${language === 'es' ? 'servicios' : 'serveis'}/${language === 'es' ? sub.pathEs : sub.pathCa}`}
                                  onClick={handleCloseMenu}
                                  className={({ isActive }) => `block py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-[#00E8E5] bg-[#002F30]' : 'text-gray-300 hover:text-[#00E8E5] hover:bg-[#002F30]'}`}
                                >
                                  {language === 'es' ? sub.labelEs : sub.labelCa}
                                </NavLink>
                              ))}
                         </div>
                     )}
                  </div>
                );
              }
              return (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={handleCloseMenu}
                className={({ isActive }) => `block w-full text-left py-2 px-4 rounded-lg transition-colors ${isActive ? 'text-[#00E8E5] bg-[#002F30]' : 'text-white hover:text-[#00E8E5] hover:bg-[#002F30]'}`}
              >
                {item.label}
              </NavLink>
            )})}

            <div className="relative" ref={mobileLangRef} onKeyDown={(e) => {
              const ev = e as React.KeyboardEvent<HTMLDivElement>;
              if (!isLangOpen) {
                if (ev.key === 'ArrowDown' || ev.key === 'Enter' || ev.key === ' ') {
                  ev.preventDefault();
                  setIsLangOpen(true);
                }
                return;
              }
              if (ev.key === 'ArrowDown') {
                ev.preventDefault();
                const next = (focusIndex + 1) % langOptions.length;
                setFocusIndex(next);
                itemRefs.current[next]?.focus();
              } else if (ev.key === 'ArrowUp') {
                ev.preventDefault();
                const prev = (focusIndex - 1 + langOptions.length) % langOptions.length;
                setFocusIndex(prev);
                itemRefs.current[prev]?.focus();
              } else if (ev.key === 'Escape') {
                setIsLangOpen(false);
              } else if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                if (focusIndex >= 0) selectLanguage(langOptions[focusIndex]);
              }
            }} tabIndex={-1}>
              <button
                onClick={toggleLangMenu}
                className="flex items-center space-x-2 w-full py-2 px-4 text-white hover:text-[#00E8E5] hover:bg-[#002F30] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E8E5]"
                aria-haspopup="true"
                aria-expanded={isLangOpen}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language === 'es' ? 'ES' : 'CA'}</span>
              </button>

              {isLangOpen && (
                <div className={`mt-2 bg-[#001F20] rounded-md shadow-lg z-50 py-1 overflow-hidden border border-gray-700 transform transition ease-out duration-150 origin-top-right ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} role="menu">
                  <button
                    ref={el => itemRefs.current[0] = el}
                    role="menuitem"
                    onClick={() => selectLanguage('es')}
                    className={`block w-full text-left py-2 px-4 text-sm ${language === 'es' ? 'text-[#00E8E5]' : 'text-white'} hover:bg-[#002F30] hover:text-[#00E8E5]`}
                  >
                    Castellano
                  </button>
                  <button
                    ref={el => itemRefs.current[1] = el}
                    role="menuitem"
                    onClick={() => selectLanguage('ca')}
                    className={`block w-full text-left py-2 px-4 text-sm ${language === 'ca' ? 'text-[#00E8E5]' : 'text-white'} hover:bg-[#002F30] hover:text-[#00E8E5]`}
                  >
                    Català
                  </button>
                </div>
              )}
            </div>

            <a
              href="https://onereserve.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#00E8E5] text-[#001F20] px-6 py-2.5 rounded-lg font-semibold hover:bg-[#00d4d1] transition-all text-center"
            >
              {t.nav.access}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
