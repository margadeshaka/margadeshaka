'use client';

import { useLanguage } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="fixed top-8 right-8 z-10 flex space-x-4 text-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`transition-all duration-300 ${
          language === 'en' 
            ? 'text-blue-300 font-bold' 
            : 'text-blue-200/70 hover:text-blue-300'
        }`}
        aria-label="Switch to English"
      >
        {t('language.english', 'English')}
      </button>
      <button
        onClick={() => setLanguage('sa')}
        className={`transition-all duration-300 ${
          language === 'sa' 
            ? 'text-blue-300 font-bold' 
            : 'text-blue-200/70 hover:text-blue-300'
        }`}
        aria-label="Switch to Sanskrit"
      >
        {t('language.sanskrit', 'Sanskrit')}
      </button>
      <button
        onClick={() => setLanguage('hi')}
        className={`transition-all duration-300 ${
          language === 'hi' 
            ? 'text-blue-300 font-bold' 
            : 'text-blue-200/70 hover:text-blue-300'
        }`}
        aria-label="Switch to Hindi"
      >
        {t('language.hindi', 'Hindi')}
      </button>
    </div>
  );
}