'use client';

import React from 'react';

/**
 * WelcomeOverlay component displays the initial welcome message and guidance
 * for the user when they first load the application.
 */
export default function WelcomeOverlay(): React.JSX.Element {
  return (
    <div className="fixed inset-0 flex flex-col items-start justify-start pointer-events-none px-4 pt-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold cosmic-text mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
        Margadeshaka
      </h1>
      <p className="text-sm sm:text-base md:text-lg cosmic-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
        AI for Guidance & Learning
      </p>
        <p className="text-sm sm:text-base md:text-lg cosmic-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
            Home of Sakha & Dronacharya
        </p>
        <p className="text-xs sm:text-sm md:text-base mt-2 cosmic-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 opacity-80">
            Scroll to explore →
        </p>
    </div>
  );
}
