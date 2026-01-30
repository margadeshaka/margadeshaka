'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Skeleton component for loading states
 * Provides visual feedback while content is loading
 */
export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse'
}: SkeletonProps): React.JSX.Element {
  const baseClasses = 'bg-indigo-900/30';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
      role="presentation"
    />
  );
}

/**
 * DialogSkeleton - Loading state for DialogBox
 */
export function DialogSkeleton({ position = 'left' }: { position?: 'left' | 'right' }) {
  return (
    <div
      className={`
        absolute ${position === 'left' ? 'sm:left-0' : 'sm:right-0'}
        max-w-full sm:max-w-sm md:max-w-md w-auto sm:w-full
        backdrop-blur-sm bg-indigo-950/30 rounded-lg p-5 mx-2
        border border-indigo-500/20
      `}
    >
      {/* Title skeleton */}
      <Skeleton
        variant="text"
        className="mb-4"
        width="70%"
        height={28}
      />
      {/* Description skeletons */}
      <Skeleton variant="text" className="mb-2" width="100%" height={16} />
      <Skeleton variant="text" className="mb-2" width="95%" height={16} />
      <Skeleton variant="text" className="mb-2" width="88%" height={16} />
      <Skeleton variant="text" width="60%" height={16} />
    </div>
  );
}

/**
 * ChakraSkeleton - Loading state for Chakra animation
 */
export function ChakraSkeleton() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <Skeleton
        variant="circular"
        className="opacity-30"
        width={300}
        height={300}
        animation="pulse"
      />
    </div>
  );
}
