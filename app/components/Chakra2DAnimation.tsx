'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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

  // Remove scroll handling since we're using fixed viewport now
  // Rotation will be controlled purely by active point changes

  // Optimized rotation animation with performance improvements
  const animateRotation = useCallback((targetRotation: number) => {
    if (chakraRef.current) {
      gsap.to(chakraRef.current, {
        rotation: targetRotation,
        duration: 0.2, // Faster for better responsiveness
        ease: 'power1.out',
        overwrite: 'auto',
        force3D: true, // Enable hardware acceleration
        willChange: 'transform'
      });
    }
  }, []);

  // Animate rotation when it changes
  useEffect(() => {
    animateRotation(rotation);
  }, [rotation, animateRotation]);

  // Memoize segment angle calculation for performance
  const segmentAngle = useMemo(() => 360 / chakraPoints.length, [chakraPoints.length]);

  // Animate rotation when active point changes
  useEffect(() => {
    if (!activePointId || !chakraRef.current) return;

    const activeIndex = chakraPoints.findIndex(point => point.id === activePointId);
    if (activeIndex === -1) return;

    const targetRotation = activeIndex * segmentAngle;
    setRotation(targetRotation);

    // Optimized animation with hardware acceleration
    gsap.to(chakraRef.current, {
      rotation: targetRotation,
      duration: 0.8,
      ease: 'power2.inOut',
      force3D: true,
      willChange: 'transform',
      onComplete: () => setRotation(targetRotation)
    });
  }, [activePointId, chakraPoints, segmentAngle]);

  // Optimized pulsing animation with performance improvements
  useEffect(() => {
    if (!chakraRef.current) return;

    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true,
      paused: false
    });

    timeline.to(chakraRef.current, {
      scale: 1.03, // Reduced for subtlety and performance
      duration: 3, // Slower for better performance
      ease: 'sine.inOut',
      force3D: true,
      willChange: 'transform'
    });

    return () => {
      timeline.kill();
    };
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

        {/* Chakra image with WebP support */}
        <picture>
          <source srcSet="/images/chakra.webp" type="image/webp" />
          <img
            ref={chakraRef}
            src="/images/chakra.png"
            alt="Sudarshan Chakra - Divine spinning disc symbolizing cosmic energy"
            className="object-contain relative z-10 w-[100%] h-full"
            style={{
              transformOrigin: 'center center',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  );
}
