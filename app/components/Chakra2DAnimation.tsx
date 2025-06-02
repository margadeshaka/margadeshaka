'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useChakra } from '../context/ChakraContext';
import gsap from 'gsap';

interface Chakra2DAnimationProps {
  className?: string;
}

/**
 * Chakra2DAnimation component displays a 2D chakra image that rotates based on scroll position
 * It uses the chakra.png image and animates it using GSAP
 */
export default function Chakra2DAnimation({ className = '' }: Chakra2DAnimationProps) {
  const { activePointId, chakraPoints } = useChakra();
  const chakraRef = useRef<HTMLImageElement>(null);
  const [rotation, setRotation] = useState(0);

  // Handle scroll events to update rotation
  useEffect(() => {
    let lastScrollTop = 0;
    let rotationVelocity = 0;
    let animationFrameId: number;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Get current scroll position
      const scrollTop = window.scrollY;

      // Calculate scroll direction and speed
      const scrollDelta = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;

      // Set scrolling flag
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);

      // Update rotation velocity based on scroll speed
      // The faster the scroll, the faster the rotation
      // Reduced multiplier for smoother rotation
      rotationVelocity += scrollDelta * 0.1;

      // Apply stronger damping to slow down rotation when not scrolling
      rotationVelocity *= 0.9;

      // Only update rotation if we're actively scrolling or have significant velocity
      if (isScrolling || Math.abs(rotationVelocity) > 0.1) {
        setRotation(prev => (prev + rotationVelocity) % 360);
      }
    };

    // Animation loop for smooth rotation
    const animate = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation loop
    animate();

    // Add scroll event listener for velocity updates
    window.addEventListener('scroll', () => {
      // This empty listener ensures the browser calculates scroll position
      // The actual work is done in the animation loop
    });

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', () => {});
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Animate rotation when it changes
  useEffect(() => {
    if (chakraRef.current) {
      // Use a shorter duration for scroll-based rotation to make it more responsive
      gsap.to(chakraRef.current, {
        rotation: rotation,
        duration: 0.3, // Faster for scroll-based rotation
        ease: 'power1.out',
        overwrite: 'auto', // Prevent animation conflicts
      });
    }
  }, [rotation]);

  // Animate rotation when active point changes
  useEffect(() => {
    if (!activePointId || !chakraRef.current) return;

    // Find the index of the active point
    const activeIndex = chakraPoints.findIndex(point => point.id === activePointId);
    if (activeIndex === -1) return;

    // Calculate rotation based on active point index
    // Each point corresponds to a segment of the full 360 degrees
    const segmentAngle = 360 / chakraPoints.length;
    const targetRotation = activeIndex * segmentAngle;

    // Update the rotation state to match the target rotation
    setRotation(targetRotation);

    // Animate to the target rotation with a synchronized duration
    gsap.to(chakraRef.current, {
      rotation: targetRotation,
      duration: 1.0, // Slightly faster for better responsiveness
      ease: 'power2.inOut',
      onComplete: () => {
        // Ensure rotation state is exactly at target after animation
        setRotation(targetRotation);
      }
    });
  }, [activePointId, chakraPoints]);

  // Add a pulsing animation effect
  useEffect(() => {
    if (chakraRef.current) {
      // Create a timeline for the pulsing effect
      const timeline = gsap.timeline({
        repeat: -1, // Infinite repeat
        yoyo: true, // Back and forth
      });

      // Add the pulsing animation - only scale the image slightly
      timeline.to(chakraRef.current, {
        scale: 1.05,
        duration: 2,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <div className={`fixed pointer-events-none z-0 flex items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Glow effect - positioned behind the chakra image */}
        {/*<div */}
        {/*  className="absolute top-0 left-0 w-full h-full rounded-full animate-pulse" */}
        {/*  style={{*/}
        {/*    background: 'radial-gradient(circle, rgba(100, 149, 237, 0.4) 0%, rgba(100, 149, 237, 0.1) 40%, rgba(0, 0, 0, 0) 70%)',*/}
        {/*    transform: 'scale(1)', // Adjusted scale to better match the actual chakra circle*/}
        {/*    transformOrigin: 'center center',*/}
        {/*    maskImage: 'url(/images/chakra.png)', // Use the chakra image as a mask*/}
        {/*    maskSize: 'contain',*/}
        {/*    maskPosition: 'center',*/}
        {/*    maskRepeat: 'no-repeat',*/}
        {/*    WebkitMaskImage: 'url(/images/chakra.png)', // For Safari support*/}
        {/*    WebkitMaskSize: 'contain',*/}
        {/*    WebkitMaskPosition: 'center',*/}
        {/*    WebkitMaskRepeat: 'no-repeat',*/}
        {/*    pointerEvents: 'none',*/}
        {/*    zIndex: 5, // Lower z-index to place behind the image*/}
        {/*    inset: '0',*/}
        {/*    margin: 'auto',*/}
        {/*  }}*/}
        {/*/>*/}

        {/* Chakra image */}
        <img
          ref={chakraRef}
          src="/images/chakra.png"
          alt="Sudarshan Chakra"
          className="object-contain relative z-10 w-[100%] h-full"
          style={{
            transformOrigin: 'center center',
          }}
        />
      </div>
    </div>
  );
}
