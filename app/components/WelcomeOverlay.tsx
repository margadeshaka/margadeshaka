'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * WelcomeOverlay component displays the initial welcome message and guidance
 * for the user when they first load the application.
 */
export default function WelcomeOverlay(): JSX.Element {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold cosmic-text mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
        {t('app.title', 'Margadeshaka AI')}
      </h1>
    </div>
  );
}
