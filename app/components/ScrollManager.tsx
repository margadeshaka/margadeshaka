'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';
import DialogBox from './DialogBox';
import { useChakra } from '../context/ChakraContext';

export default function ScrollManager() {
  const { activePointId, setActivePointId, chakraPoints } = useChakra();
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Create refs for each section with a lower threshold for smoother transitions
  const sections = chakraPoints.map(point => {
    const { ref, inView } = useInView({
      threshold: 0.5, // Lower threshold for earlier detection
      triggerOnce: false,
      rootMargin: '-10% 0px', // Add some margin to improve timing
    });

    return { id: point.id, ref, inView };
  });

  // Update active point based on which section is in view
  useEffect(() => {
    const visibleSection = sections.find(section => section.inView);
    if (visibleSection) {
      // Use a small timeout to allow the scroll animation to start
      // This helps synchronize the card appearance with the chakra rotation
      setTimeout(() => {
        setActivePointId(visibleSection.id);
      }, 50);
    }
  }, [sections.map(s => s.inView), setActivePointId]);

  // Function to navigate to the next or previous point
  const navigatePoint = (direction: 'next' | 'prev') => {
    if (!activePointId) return;

    const currentIndex = chakraPoints.findIndex(point => point.id === activePointId);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % chakraPoints.length;
    } else {
      newIndex = (currentIndex - 1 + chakraPoints.length) % chakraPoints.length;
    }

    const newPointId = chakraPoints[newIndex].id;
    setActivePointId(newPointId);

    // Scroll to the new section with improved behavior
    const newSection = document.getElementById(`section-${newPointId}`);
    if (newSection) {
      newSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center', // Center the section in the viewport for better visibility
      });
    }
  };

  // Set up swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => navigatePoint('next'),
    onSwipedDown: () => navigatePoint('prev'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div 
      className="relative w-full" 
      style={{ height: `${chakraPoints.length * 100}vh` }}
      {...swipeHandlers}
    >
      {/* Scroll sections */}
      {chakraPoints.map((point, index) => {
        const section = sections.find(s => s.id === point.id);
        return (
          <div 
            id={`section-${point.id}`}
            key={point.id}
            ref={section?.ref}
            className="h-screen w-full flex items-center"
          >
            {/* Dialog box will be rendered by DialogBox component */}
            {activePointId === point.id && (
              <DialogBox 
                pointId={point.id}
                position={point.position}
              />
            )}
          </div>
        );
      })}

      {/*/!* Mobile navigation indicators *!/*/}
      {/*<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:hidden">*/}
      {/*  {chakraPoints.map(point => (*/}
      {/*    <button*/}
      {/*      key={point.id}*/}
      {/*      className={`w-3 h-3 rounded-full ${activePointId === point.id ? 'bg-indigo-500' : 'bg-gray-400'}`}*/}
      {/*      onClick={() => {*/}
      {/*        setActivePointId(point.id);*/}
      {/*        const section = document.getElementById(`section-${point.id}`);*/}
      {/*        if (section) {*/}
      {/*          section.scrollIntoView({ behavior: 'smooth' });*/}
      {/*        }*/}
      {/*      }}*/}
      {/*      aria-label={`Navigate to point ${point.id}`}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
}
