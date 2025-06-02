'use client';

import { useState, useEffect } from 'react';

interface WaitlistButtonProps {
  visible: boolean;
}

export default function WaitlistButton({ visible }: WaitlistButtonProps) {
  // const [isAnimating, setIsAnimating] = useState(false);

  // Toggle animation state every 2 seconds for illuminating effect
  // useEffect(() => {
  //   if (!visible) return;
  //
  //   // const interval = setInterval(() => {
  //   //   setIsAnimating(prev => !prev);
  //   // }, 2000);
  //
  //   return () => clearInterval(interval);
  // }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
      <button 
        className={`
          px-10 py-5 rounded-full text-xl font-bold
          bg-gradient-to-r from-indigo-600 to-purple-600
          text-white shadow-lg
          transition-all duration-1000 ease-in-out
          hover:scale-110 hover:shadow-indigo-500/70
          border-2 border-indigo-300/30
        `}
        onClick={() => window.open('https://forms.gle/example', '_blank')}
      >
        Coming Soon!
      </button>

      {/* Decorative elements for cosmic theme */}
      <div className={`
        mt-4 w-40 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent
        transition-opacity duration-1000 opacity-100
      `}></div>
    </div>
  );
}
