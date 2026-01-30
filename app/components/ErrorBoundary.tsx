'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useLogging } from '../context/LoggingContext';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// This component needs to be a class component because error boundaries
// must use lifecycle methods that are not available in function components
class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error with more context
    console.error('Error caught by ErrorBoundary:', {
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown'
    });
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Report to analytics in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      try {
        // This could be connected to your analytics service
        (window as any).gtag?.('event', 'exception', {
          description: error.toString(),
          fatal: true
        });
      } catch {
        // Ignore analytics errors
      }
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render a production-ready error message
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-indigo-950 text-white p-8">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
              <p className="text-gray-300 mb-6">We apologize for the inconvenience. Please try refreshing the page.</p>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left mb-6 p-4 bg-gray-900/50 rounded-lg">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-300">Error details</summary>
                <pre className="text-xs text-red-400 mt-2 overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper function component to use the logging context
export default function ErrorBoundary({ 
  children, 
  fallback,
  onError 
}: ErrorBoundaryProps): React.JSX.Element {
  // We'll use a default onError handler that logs to our LoggingContext
  const logging = useLogging();
  
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Log the error using our logging system
    logging.error('Error caught by ErrorBoundary', { 
      error: error.toString(), 
      componentStack: errorInfo.componentStack 
    });
    
    // Call the provided onError handler if any
    if (onError) {
      onError(error, errorInfo);
    }
  };

  return (
    <ErrorBoundaryClass fallback={fallback} onError={handleError}>
      {children}
    </ErrorBoundaryClass>
  );
}