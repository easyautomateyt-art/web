import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { translations } from '../i18n/translations';
import { useLocation } from 'react-router-dom';

type Language = 'es' | 'ca' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function detectLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ca')) return 'ca';
  return 'es';
}

/**
 * Provider must live INSIDE the router so it can derive the language from the
 * current location. This keeps it SSR/prerender-safe (no direct `window` access)
 * and ensures the initial render already has the correct language.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>(() => detectLanguageFromPath(location.pathname));

  // Keep language in sync with URL changes (e.g. client-side navigation).
  useEffect(() => {
    const pathLang = detectLanguageFromPath(location.pathname);
    setLanguage((prev) => (prev !== pathLang ? pathLang : prev));
  }, [location.pathname]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: translations[language],
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
