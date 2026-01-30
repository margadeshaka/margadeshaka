'use client';

import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * LoadingSpinner component displays an animated loading spinner with an optional message.
 * It can be used anywhere in the application where loading states need to be shown.
 */
export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingSpinnerProps): React.JSX.Element {
  // Size classes for the spinner and text
  const sizeClasses = {
    sm: {
      spinner: 'w-8 h-8 border-2',
      text: 'text-base'
    },
    md: {
      spinner: 'w-12 h-12 border-3',
      text: 'text-lg'
    },
    lg: {
      spinner: 'w-16 h-16 border-4',
      text: 'text-2xl'
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-pulse text-center">
        <div className={`${sizeClasses[size].text} cosmic-text mb-2`}>{message}</div>
        <div 
          className={`${sizeClasses[size].spinner} border-t-indigo-500 border-r-indigo-300 border-b-indigo-500 border-l-indigo-300 rounded-full animate-spin mx-auto`}
        ></div>
      </div>
    </div>
  );
}