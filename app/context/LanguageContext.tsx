'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'sa' | 'hi';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key, fallback) => fallback,
});

// Custom hook to use the context
export const useLanguage = () => useContext(LanguageContext);

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'MARGADESHAKA',
    'app.subtitle': 'AI for Guidance & Learning',
    'language.english': 'English',
    'language.sanskrit': 'Sanskrit',
    'language.hindi': 'Hindi',
    'audio.play': 'Play Mantra',
    'audio.pause': 'Pause Mantra',
    'login.button': 'Login',
    'logout.button': 'Logout',
  },
  sa: {
    'app.title': 'मार्गदेशक',
    'app.subtitle': 'मार्गदर्शन एवं शिक्षा हेतु कृत्रिम बुद्धि',
    'language.english': 'आंग्ल',
    'language.sanskrit': 'संस्कृत',
    'language.hindi': 'हिंदी',
    'audio.play': 'मंत्र चालू करें',
    'audio.pause': 'मंत्र बंद करें',
    'login.button': 'प्रवेश',
    'logout.button': 'निर्गमन',
  },
  hi: {
    'app.title': 'मार्गदेशक',
    'app.subtitle': 'मार्गदर्शन और सीखने के लिए AI',
    'language.english': 'अंग्रेज़ी',
    'language.sanskrit': 'संस्कृत',
    'language.hindi': 'हिंदी',
    'audio.play': 'मंत्र चलाएं',
    'audio.pause': 'मंत्र रोकें',
    'login.button': 'लॉगिन',
    'logout.button': 'लॉगआउट',
  }
};

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get initial language from localStorage if available, otherwise default to English
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'sa', 'hi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string, fallback: string): string => {
    return translations[language][key] || fallback;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}