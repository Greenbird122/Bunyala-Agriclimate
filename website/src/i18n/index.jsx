import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './en.json';
import luhya from './luhya.json';
import sw from './sw.json';

const translations = { en, luhya, sw };

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bunyala-lang') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('bunyala-lang', language);
    document.documentElement.lang = language === 'luhya' ? 'luy' : language === 'sw' ? 'sw' : 'en';
  }, [language]);

  const t = useCallback((key, fallback) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    if (value === undefined) {
      // Fallback to English
      let fallbackValue = translations.en;
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
      }
      return fallbackValue || fallback || key;
    }
    return value;
  }, [language]);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'luhya', name: 'Luhya', nativeName: 'Oluluyia' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  ];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

export default translations;
