'use client';

import React from 'react';

/**
 * WelcomeOverlay component displays the initial welcome message and guidance
 * for the user when they first load the application.
 */
export default function WelcomeOverlay(): JSX.Element {
  return (
    <div className="fixed inset-0 flex flex-col items-start justify-start pointer-events-none px-4 pt-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold cosmic-text mb-2 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
        🧠 Margadeshaka AI
      </h1>
      <p className="text-sm sm:text-base md:text-lg cosmic-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
        Built to listen.
      </p>
        <p className="text-sm sm:text-base md:text-lg cosmic-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
            Designed to reflect.
        </p>
        <p className="text-sm sm:text-base md:text-lg cosmic-text bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
            Made to walk with you.
        </p>
    </div>
  );
}
