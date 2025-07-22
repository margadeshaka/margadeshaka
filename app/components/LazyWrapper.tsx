'use client';

import React, { Suspense, ComponentType } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyWrapperProps<T extends {}> {
  component: ComponentType<T>;
  fallback?: React.ReactNode;
  props?: T;
}

export function LazyWrapper<T extends {}>({ 
  component: Component, 
  fallback = <LoadingSpinner />, 
  props 
}: LazyWrapperProps<T>) {
  return (
    <Suspense fallback={fallback}>
      <Component {...(props || {} as T)} />
    </Suspense>
  );
}

export default LazyWrapper;