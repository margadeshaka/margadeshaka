'use client';

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
}

interface PerformanceMonitorProps {
  onMetrics?: (metrics: PerformanceMetrics) => void;
  enabled?: boolean;
  interval?: number;
}

export default function PerformanceMonitor({ 
  onMetrics, 
  enabled = process.env.NODE_ENV === 'development',
  interval = 1000
}: PerformanceMonitorProps) {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled) return;

    const measureFrame = () => {
      const now = performance.now();
      frameCount.current++;
      
      const deltaTime = now - lastTime.current;
      
      if (deltaTime >= interval) {
        const fps = Math.round((frameCount.current * 1000) / deltaTime);
        const frameTime = deltaTime / frameCount.current;
        
        const metrics: PerformanceMetrics = {
          fps,
          frameTime
        };

        // Add memory usage if available
        if ('memory' in performance) {
          const memInfo = (performance as any).memory;
          metrics.memoryUsage = memInfo.usedJSHeapSize / 1024 / 1024; // MB
        }

        onMetrics?.(metrics);
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance:', metrics);
        }

        frameCount.current = 0;
        lastTime.current = now;
      }
      
      animationId.current = requestAnimationFrame(measureFrame);
    };

    animationId.current = requestAnimationFrame(measureFrame);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [enabled, interval, onMetrics]);

  // Monitor long tasks
  useEffect(() => {
    if (!enabled || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', {
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    } catch (e) {
      console.warn('PerformanceObserver not supported or failed:', e);
    }
  }, [enabled]);

  // Monitor paint metrics
  useEffect(() => {
    if (!enabled || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log(`${entry.name}: ${entry.startTime}ms`);
        });
      });

      observer.observe({ entryTypes: ['paint'] });

      return () => observer.disconnect();
    } catch (e) {
      console.warn('Paint observer not supported or failed:', e);
    }
  }, [enabled]);

  return null; // This component doesn't render anything
}