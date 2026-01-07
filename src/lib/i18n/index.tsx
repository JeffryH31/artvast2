'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { id, en, TranslationKeys } from './translations';

export type Language = 'id' | 'en';

const translations: Record<Language, TranslationKeys> = {
  id,
  en,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

// Default context value with Indonesian translations
const defaultContextValue: LanguageContextType = {
  language: 'id',
  setLanguage: () => {},
  t: id,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'id' || savedLanguage === 'en') {
      setLanguageState(savedLanguage);
    } else {
      // Default to Indonesian
      setLanguageState('id');
      localStorage.setItem('language', 'id');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

// Helper hook to get translations directly
export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
}
