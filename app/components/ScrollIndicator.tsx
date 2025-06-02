'use client';

import React, { useEffect, useState } from 'react';
import { useChakra } from '../context/ChakraContext';
import styles from './ScrollIndicator.module.css';

export default function ScrollIndicator() {
  const { activePointId, chakraPoints } = useChakra();
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    // Function to check if we're at the last section
    const checkScrollPosition = () => {
      if (!activePointId) {
        // If no active point, show indicator if there are any points
        setShowIndicator(chakraPoints.length > 0);
        return;
      }

      const currentIndex = chakraPoints.findIndex(point => point.id === activePointId);
      // Hide indicator if we're at the last section
      setShowIndicator(currentIndex < chakraPoints.length - 1);
    };

    // Check initially
    checkScrollPosition();

    // Update when activePointId changes
    const handleScroll = () => {
      checkScrollPosition();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePointId, chakraPoints]);

  if (!showIndicator) return null;

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 text-center z-20">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-10 w-10 mx-auto text-indigo-500 hover:text-indigo-400 ${styles.webkitAnimation}`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7" />
      </svg>
    </div>
  );
}
