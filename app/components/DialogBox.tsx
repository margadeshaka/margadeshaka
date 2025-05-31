'use client';

import { useEffect, useState } from 'react';
import { useChakra } from '../context/ChakraContext';
import { useLanguage } from '../context/LanguageContext';

interface DialogBoxProps {
  pointId: string;
  position: 'left' | 'right';
}

export default function DialogBox({ pointId, position }: DialogBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { chakraPoints, unlockPoint, unlockedPoints } = useChakra();
  const { language } = useLanguage();

  // Find the chakra point data
  const point = chakraPoints.find(p => p.id === pointId);

  if (!point) return null;

  // Get the translated content
  const title = point.translations[language]?.title || '';
  const description = point.translations[language]?.description || '';

  // Animation effect when dialog appears
  useEffect(() => {
    // Small delay before showing for better animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Unlock this point when it's viewed
    if (!unlockedPoints.includes(pointId)) {
      unlockPoint(pointId);
    }

    return () => clearTimeout(timer);
  }, [pointId, unlockPoint, unlockedPoints]);

  // Enhanced responsive positioning
  const positionClasses = position === 'left'
    ? 'left-4 sm:left-8 lg:left-16' // More responsive left positioning
    : 'right-4 sm:right-8 lg:right-16'; // More responsive right positioning

  // For small screens, position at bottom instead of sides
  const smallScreenPosition = 'bottom-4 sm:bottom-auto left-4 right-4 sm:left-auto sm:right-auto';

  // Determine animation based on position and screen size
  const animationClass = position === 'left'
    ? 'sm:animate-fadeInLeft animate-fadeInUp' // Fade up on mobile, from left on larger screens
    : 'sm:animate-fadeInRight animate-fadeInUp'; // Fade up on mobile, from right on larger screens

  return (
    <div 
      className={`
        absolute ${smallScreenPosition} ${positionClasses} 
        max-w-full sm:max-w-sm md:max-w-md w-auto sm:w-full dialog-box
        ${isVisible ? animationClass : 'opacity-0'}
        border-2 border-indigo-300/30 hover:border-indigo-300/50
        animate-glow z-10
      `}
      style={{ animationDelay: '0.3s' }}
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
        style={{ animationDelay: '0.5s' }}
      >
        {title}
      </h2>

      <p 
        className={`
          text-base sm:text-lg text-blue-50
          ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}
        `}
        style={{ animationDelay: '0.7s' }}
      >
        {description}
      </p>

      {/* Enhanced visual indicator - hidden on smallest screens */}
      <div 
        className={`
          hidden sm:block absolute top-1/2 h-[2px] w-12 sm:w-20 
          ${position === 'left' 
            ? 'right-0 translate-x-full bg-gradient-to-r from-indigo-500 to-transparent' 
            : 'left-0 -translate-x-full bg-gradient-to-l from-indigo-500 to-transparent'}
          animate-pulse
        `}
      />
    </div>
  );
}
