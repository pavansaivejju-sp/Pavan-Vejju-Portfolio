'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { translations, type Locale } from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  text: (typeof translations)[Locale];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [locale, setLocaleState] = useState(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.cookie = `portfolio-locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, text: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within LanguageProvider');
  return value;
}