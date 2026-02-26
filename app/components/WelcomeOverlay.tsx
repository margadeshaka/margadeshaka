'use client';

import React from 'react';

export default function WelcomeOverlay(): React.JSX.Element {
  return (
    <div className="fixed inset-0 flex flex-col items-start justify-start pointer-events-none px-4 pt-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
        Margadeshaka
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-amber-200/80">
        AI for Guidance & Learning
      </p>
      <p className="text-sm sm:text-base md:text-lg text-amber-200/60">
        Home of Sakha & Dronacharya
      </p>
      <p className="text-xs sm:text-sm md:text-base mt-2 text-amber-300/50">
        Scroll to explore →
      </p>
    </div>
  );
}
