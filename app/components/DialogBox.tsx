'use client';

import { useEffect, useState } from 'react';
import { useChakra } from '../context/ChakraContext';

interface DialogBoxProps {
  pointId: string;
  position: 'left' | 'right';
}

export default function DialogBox({ pointId, position }: DialogBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { chakraPoints, unlockPoint, unlockedPoints } = useChakra();

  // Find the chakra point data
  const point = chakraPoints.find(p => p.id === pointId);

  // Animation effect when dialog appears
  useEffect(() => {
    if (!point) return;

    // Slightly longer delay to better synchronize with chakra rotation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Unlock this point when it's viewed
    if (!unlockedPoints.includes(pointId)) {
      unlockPoint(pointId);
    }

    return () => clearTimeout(timer);
  }, [pointId, unlockPoint, unlockedPoints, point]);

  if (!point) return null;

  // Get the content (description is already parsed with clickable links from ChakraContext)
  const { title, description } = point;

  // Determine animation based on position and screen size
  const animationClass = position === 'left'
    ? 'sm:animate-fadeInLeft animate-fadeInUp'
    : 'sm:animate-fadeInRight animate-fadeInUp';

  return (
    <div
      className={`
        absolute ${position === 'left' ? 'sm:left-0' : 'sm:right-0'}
        max-w-full sm:max-w-sm md:max-w-md w-auto sm:w-full dialog-box
        ${isVisible ? animationClass : 'opacity-0'}
        border-2 border-indigo-300/30 hover:border-indigo-300/50
        animate-glow z-50 px-4 mx-2
      `}
      style={{ animationDelay: '0.25s' }}
    >
      {/* Decorative elements for cosmic theme - hidden on smallest screens */}
      <div className="hidden sm:block absolute -top-3 -left-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-indigo-400/60"></div>
      <div className="hidden sm:block absolute -bottom-3 -right-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-indigo-400/60"></div>

      <h2
        className={`
          text-xl sm:text-2xl font-bold mb-2 sm:mb-3 cosmic-text bg-clip-text text-transparent
          bg-gradient-to-r from-blue-400 to-purple-500
          ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}
        `}
        style={{ animationDelay: '0.4s' }}
      >
        {title}
      </h2>

      <div
        className={`
          text-base sm:text-lg text-blue-50 leading-relaxed
          ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}
        `}
        style={{ animationDelay: '0.55s' }}
      >
        {description}
      </div>

      {/* Enhanced visual indicator - hidden on smallest screens */}
      <div
        className={`
          hidden sm:block absolute top-1/2 h-[2px] w-12 sm:w-16
          ${position === 'left'
            ? 'right-0 translate-x-full bg-gradient-to-r from-indigo-500 to-transparent'
            : 'left-0 -translate-x-full bg-gradient-to-l from-indigo-500 to-transparent'}
          animate-pulse
        `}
      />
    </div>
  );
}
