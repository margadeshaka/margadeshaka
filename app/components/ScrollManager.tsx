'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';
import DialogBox from './DialogBox';
import WaitlistButton from './WaitlistButton';
import { useChakra } from '../context/ChakraContext';

export default function ScrollManager() {
  const { activePointId, setActivePointId, chakraPoints } = useChakra();
  // const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [showWaitlistButton, setShowWaitlistButton] = useState(false);

  // Debug log on mount and when activePointId changes
  useEffect(() => {
    console.log('ScrollManager mounted/updated:', { 
      activePointId, 
      chakraPointsLength: chakraPoints.length,
      chakraPointIds: chakraPoints.map(p => p.id)
    });
  }, [activePointId, chakraPoints]);

  // Create individual useInView hooks for all 8 chakra points - following Rules of Hooks
  const point1InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });
  const point2InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });
  const point3InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });
  const point4InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });
  const point5InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });
  const point6InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });
  const point7InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });
  const point8InView = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: '-20% 0px', skip: false });

  // Map the hooks to sections based on the number of chakra points
  const inViewHooks = [point1InView, point2InView, point3InView, point4InView, point5InView, point6InView, point7InView, point8InView];
  
  const sections = useMemo(() => 
    chakraPoints.map((point, index) => {
      const inViewHook = inViewHooks[index];
      return { 
        id: point.id, 
        ref: inViewHook?.ref, 
        inView: inViewHook?.inView || false 
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chakraPoints, ...inViewHooks.map(hook => hook.inView)]
  );

  // Optimized navigation with memoization
  const navigatePoint = useCallback((direction: 'next' | 'prev') => {
    console.log('NavigatePoint called:', direction, 'activePointId:', activePointId); // Debug log
    
    if (!activePointId) {
      console.log('No active point ID'); // Debug log
      return;
    }

    const currentIndex = chakraPoints.findIndex(point => point.id === activePointId);
    if (currentIndex === -1) {
      console.log('Current point not found in chakraPoints'); // Debug log
      return;
    }

    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, chakraPoints.length - 1) // Don't wrap around
      : Math.max(currentIndex - 1, 0); // Don't wrap around

    const newPointId = chakraPoints[newIndex].id;
    console.log('Navigating from index', currentIndex, 'to', newIndex, 'pointId:', newPointId); // Debug log
    setActivePointId(newPointId);
  }, [activePointId, chakraPoints, setActivePointId]);

  // Keyboard and wheel navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key); // Debug log
      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          console.log('Navigating next via keyboard'); // Debug log
          navigatePoint('next');
          break;
        case 'ArrowUp':
          e.preventDefault();
          console.log('Navigating prev via keyboard'); // Debug log
          navigatePoint('prev');
          break;
      }
    };

    let lastWheelTime = 0;
    let wheelAccumulator = 0;
    let wheelResetTimeout: NodeJS.Timeout;
    const wheelThreshold = 100; // Accumulate wheel delta before triggering navigation
    const wheelResetDelay = 200; // Reset accumulator if no wheel events for 200ms
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // More restrictive debouncing to prevent rapid navigation
      const now = Date.now();
      if (now - lastWheelTime < 500) return; // Increased to 500ms for slower navigation
      
      // Clear existing reset timeout
      if (wheelResetTimeout) {
        clearTimeout(wheelResetTimeout);
      }
      
      // Accumulate wheel delta to require more intentional scrolling
      wheelAccumulator += e.deltaY;
      console.log('Wheel delta:', e.deltaY, 'accumulated:', wheelAccumulator);

      // Only navigate when we cross the threshold
      if (Math.abs(wheelAccumulator) >= wheelThreshold) {
        lastWheelTime = now; // Reset the debounce timer only when we actually navigate
        
        if (wheelAccumulator > 0) {
          console.log('Navigating next via wheel (accumulated enough)');
          navigatePoint('next');
        } else {
          console.log('Navigating prev via wheel (accumulated enough)');
          navigatePoint('prev');
        }
        
        wheelAccumulator = 0; // Reset accumulator after navigation
      } else {
        // Set timeout to reset accumulator if user stops scrolling
        wheelResetTimeout = setTimeout(() => {
          console.log('Resetting wheel accumulator due to inactivity');
          wheelAccumulator = 0;
        }, wheelResetDelay);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      if (wheelResetTimeout) {
        clearTimeout(wheelResetTimeout);
      }
    };
  }, [navigatePoint]);

  // Update waitlist button visibility
  useEffect(() => {
    setShowWaitlistButton(activePointId === chakraPoints[chakraPoints.length - 1]?.id);
  }, [activePointId, chakraPoints]);

  // Optimized swipe handlers with better configuration
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      console.log('Swiped up'); // Debug log
      navigatePoint('next');
    },
    onSwipedDown: () => {
      console.log('Swiped down'); // Debug log
      navigatePoint('prev');
    },
    trackMouse: true,
    preventScrollOnSwipe: false,
    delta: 50 // Minimum swipe distance
  });

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden" {...swipeHandlers}>
      {/* Fixed viewport sections - no scrolling, just content transitions */}
      {chakraPoints.map((point, index) => {
        const section = sections.find(s => s.id === point.id);
        const isActive = activePointId === point.id;
        
        return (
          <div 
            id={`section-${point.id}`}
            key={point.id}
            ref={section?.ref}
            className={`absolute inset-0 w-full h-full flex items-center transition-all duration-700 ease-in-out ${
              isActive 
                ? 'opacity-100 pointer-events-auto z-10' 
                : 'opacity-0 pointer-events-none z-0'
            }`}
            style={{ 
              willChange: 'opacity, transform',
              contain: 'layout style paint',
              transform: isActive ? 'translateY(0)' : `translateY(${index < chakraPoints.findIndex(p => p.id === activePointId) ? '-20px' : '20px'})`
            }}
          >
            {(isActive || Math.abs(index - chakraPoints.findIndex(p => p.id === activePointId)) <= 1) && (
              <DialogBox 
                pointId={point.id}
                position={point.position}
              />
            )}
          </div>
        );
      })}

      {/* Navigation dots for better UX */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {chakraPoints.map((point, index) => (
          <button
            key={point.id}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activePointId === point.id 
                ? 'bg-indigo-400 scale-125' 
                : 'bg-gray-500/50 hover:bg-gray-400/70'
            }`}
            onClick={() => {
              console.log('Navigation button clicked for point:', point.id); // Debug log
              setActivePointId(point.id);
            }}
            aria-label={`Navigate to ${point.title || `point ${point.id}`}`}
          />
        ))}
      </div>

      {/* Keyboard navigation hint */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 text-center z-30">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-gray-300">
          <span className="hidden sm:inline">Use ↑↓ keys or scroll to navigate</span>
          <span className="sm:hidden">Swipe to navigate</span>
        </div>
      </div>

      {/* Waitlist Button - shown when the last chakra point is active */}
      <WaitlistButton visible={showWaitlistButton} />

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
