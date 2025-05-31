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
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold cosmic-text mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
        {t('app.title', 'ChakraVision')}
      </h1>
      <p className="text-base sm:text-lg md:text-xl cosmic-text mb-4 sm:mb-8 max-w-xs sm:max-w-sm md:max-w-md">
        {t('app.subtitle', 'Scroll to explore the Sudarshan Chakra')}
      </p>

      {/* Additional guidance text - visible on larger screens */}
      <p className="hidden sm:block text-sm text-blue-200/70 max-w-md">
        {t('app.guidance', 'Discover the divine wisdom of the Sudarshan Chakra as you journey through its sacred geometry')}
      </p>
    </div>
  );
}
