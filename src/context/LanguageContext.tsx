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

function detectLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ca')) return 'ca';
  return 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    return detectLanguageFromPath(window.location.pathname);
  });

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

/** Hook that also syncs language with the current URL path */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  const location = useLocation();

  useEffect(() => {
    const pathLang = detectLanguageFromPath(location.pathname);
    if (pathLang !== context.language) {
      context.setLanguage(pathLang);
    }
  }, [location.pathname]);

  return context;
}
