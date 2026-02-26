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

  const point = chakraPoints.find(p => p.id === pointId);

  useEffect(() => {
    if (!point) return;
    const timer = setTimeout(() => setIsVisible(true), 200);
    if (!unlockedPoints.includes(pointId)) unlockPoint(pointId);
    return () => clearTimeout(timer);
  }, [pointId, unlockPoint, unlockedPoints, point]);

  if (!point) return null;

  const { title, description } = point;

  const animationClass = position === 'left'
    ? 'sm:animate-fadeInLeft animate-fadeInUp'
    : 'sm:animate-fadeInRight animate-fadeInUp';

  return (
    <div
      className={`
        absolute ${position === 'left' ? 'sm:left-0' : 'sm:right-0'}
        max-w-full sm:max-w-sm md:max-w-md w-auto sm:w-full
        ${isVisible ? animationClass : 'opacity-0'}
        z-50 mx-2
      `}
      style={{ animationDelay: '0.25s' }}
    >
      {/* === TOP SCROLL ROLL === */}
      <div className="scroll-roll scroll-roll-top">
        <div className="scroll-roll-highlight" />
        {/* End caps */}
        <div className="scroll-endcap scroll-endcap-left" />
        <div className="scroll-endcap scroll-endcap-right" />
      </div>

      {/* === SCROLL BODY === */}
      <div className="scroll-body">
        {/* Ornamental top border */}
        <div className="scroll-ornament" />

        <h2
          className={`
            scroll-title
            ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}
          `}
          style={{ animationDelay: '0.4s' }}
        >
          {title}
        </h2>

        <div
          className={`
            scroll-content
            ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}
          `}
          style={{ animationDelay: '0.55s' }}
        >
          {description}
        </div>

        {/* Ornamental bottom border */}
        <div className="scroll-ornament" />
      </div>

      {/* === BOTTOM SCROLL ROLL === */}
      <div className="scroll-roll scroll-roll-bottom">
        <div className="scroll-roll-highlight" />
        <div className="scroll-endcap scroll-endcap-left" />
        <div className="scroll-endcap scroll-endcap-right" />
      </div>

      {/* Connecting line to chakra */}
      <div
        className={`
          hidden sm:block absolute top-1/2 h-[1px] w-16
          ${position === 'left'
            ? 'right-0 translate-x-full bg-gradient-to-r from-amber-500/40 to-transparent'
            : 'left-0 -translate-x-full bg-gradient-to-l from-amber-500/40 to-transparent'}
        `}
      />
    </div>
  );
}
