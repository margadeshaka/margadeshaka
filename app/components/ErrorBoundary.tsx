'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useLogging, LogLevel } from '../context/LoggingContext';

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
    // Log the error
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render a default error message
      return this.props.fallback || (
        <div className="error-boundary-fallback">
          <h2>Something went wrong.</h2>
          <details>
            <summary>Error details</summary>
            <p>{this.state.error?.toString()}</p>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="error-reset-button"
          >
            Try again
          </button>
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
}: ErrorBoundaryProps): JSX.Element {
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