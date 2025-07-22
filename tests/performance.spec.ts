import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Enable performance metrics collection
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('should load page within acceptable time limits', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'load' });
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check if critical elements are visible within 2 seconds
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toBeVisible({ timeout: 2000 });
  });

  test('should have good Core Web Vitals metrics', async ({ page }) => {
    // Navigate to the page
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Measure Core Web Vitals
    const vitals = await page.evaluate(() => {
      return new Promise<{
        LCP: number;
        FID: number;
        CLS: number;
        FCP: number;
        TTFB: number;
      }>((resolve) => {
        const vitals = {
          LCP: 0,
          FID: 0,
          CLS: 0,
          FCP: 0,
          TTFB: 0
        };

        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            vitals.LCP = entries[entries.length - 1].startTime;
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Contentful Paint (FCP)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            vitals.FCP = entries[0].startTime;
          }
        }).observe({ entryTypes: ['paint'] });

        // Cumulative Layout Shift (CLS)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const layoutShiftEntry = entry as any;
            if (layoutShiftEntry.hadRecentInput) return;
            vitals.CLS += layoutShiftEntry.value;
          });
        }).observe({ entryTypes: ['layout-shift'] });

        // Time to First Byte (TTFB)
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          vitals.TTFB = navigation.responseStart - navigation.fetchStart;
        }

        // Resolve after 3 seconds to capture metrics
        setTimeout(() => resolve(vitals), 3000);
      });
    });

    // Assert Core Web Vitals thresholds
    expect(vitals.LCP).toBeLessThan(2500); // Good LCP is < 2.5s
    expect(vitals.FCP).toBeLessThan(1800); // Good FCP is < 1.8s
    expect(vitals.CLS).toBeLessThan(0.1);  // Good CLS is < 0.1
    expect(vitals.TTFB).toBeLessThan(800); // Good TTFB is < 800ms
  });

  test('should handle rapid scrolling without performance degradation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Measure performance during rapid scrolling
    const scrollPerformance = await page.evaluate(() => {
      return new Promise<{
        frameDrops: number;
        averageFrameTime: number;
        maxFrameTime: number;
        frameTimes: number[];
      }>((resolve) => {
        const metrics = {
          frameDrops: 0,
          averageFrameTime: 0,
          maxFrameTime: 0,
          frameTimes: [] as number[]
        };

        let lastTime = performance.now();
        const frameTimes: number[] = [];

        const measureFrame = () => {
          const now = performance.now();
          const frameTime = now - lastTime;
          frameTimes.push(frameTime);
          
          if (frameTime > 16.67) { // 60fps = 16.67ms per frame
            metrics.frameDrops++;
          }
          
          lastTime = now;
          
          if (frameTimes.length < 60) { // Measure for ~1 second
            requestAnimationFrame(measureFrame);
          } else {
            metrics.frameTimes = frameTimes;
            metrics.averageFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
            metrics.maxFrameTime = Math.max(...frameTimes);
            resolve(metrics);
          }
        };

        // Start rapid scrolling
        const scrollInterval = setInterval(() => {
          window.scrollBy(0, 100);
        }, 16);

        // Stop scrolling after measurements
        setTimeout(() => {
          clearInterval(scrollInterval);
        }, 1000);

        requestAnimationFrame(measureFrame);
      });
    });

    // Performance assertions
    expect(scrollPerformance.frameDrops).toBeLessThan(10); // Allow some frame drops
    expect(scrollPerformance.averageFrameTime).toBeLessThan(20); // Average should be close to 16.67ms
    expect(scrollPerformance.maxFrameTime).toBeLessThan(50); // No single frame should take too long
  });

  test('should efficiently handle memory usage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Measure memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null;
    });

    if (initialMemory) {
      // Perform actions that might cause memory leaks
      for (let i = 0; i < 10; i++) {
        await page.mouse.wheel(0, 500);
        await page.waitForTimeout(100);
        await page.mouse.wheel(0, -500);
        await page.waitForTimeout(100);
      }

      const finalMemory = await page.evaluate(() => {
        return {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        };
      });

      // Memory shouldn't grow excessively (allow 50% increase)
      const memoryIncrease = (finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize) / initialMemory.usedJSHeapSize;
      expect(memoryIncrease).toBeLessThan(0.5);
    }
  });

  test('should have optimized bundle size', async ({ page }) => {
    // Capture network requests
    const requests: Array<{ url: string; resourceType: string }> = [];
    page.on('request', request => {
      if (request.resourceType() === 'script' || request.resourceType() === 'stylesheet') {
        requests.push({
          url: request.url(),
          resourceType: request.resourceType()
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Calculate total bundle size
    const responses = await Promise.all(
      requests.map(async (req) => {
        try {
          const response = await page.request.get(req.url);
          const buffer = await response.body();
          return {
            ...req,
            size: buffer.length
          };
        } catch (error) {
          return { ...req, size: 0 };
        }
      })
    );

    const totalJSSize = responses
      .filter(res => res.resourceType === 'script')
      .reduce((total, res) => total + res.size, 0);

    const totalCSSSize = responses
      .filter(res => res.resourceType === 'stylesheet')
      .reduce((total, res) => total + res.size, 0);

    // Assert bundle sizes are reasonable
    expect(totalJSSize).toBeLessThan(500 * 1024); // JS bundle should be < 500KB
    expect(totalCSSSize).toBeLessThan(100 * 1024); // CSS should be < 100KB
  });

  test('should render images efficiently', async ({ page }) => {
    await page.goto('/');

    // Monitor image loading performance
    const imageMetrics = await page.evaluate(() => {
      return new Promise<{
        totalImages: number;
        loadedImages: number;
        failedImages: number;
        totalLoadTime: number;
      }>((resolve) => {
        const images = Array.from(document.images);
        const metrics = {
          totalImages: images.length,
          loadedImages: 0,
          failedImages: 0,
          totalLoadTime: 0
        };

        if (images.length === 0) {
          resolve(metrics);
          return;
        }

        let completedImages = 0;
        const startTime = performance.now();

        images.forEach((img) => {
          const imageStartTime = performance.now();
          
          const onComplete = () => {
            metrics.totalLoadTime += performance.now() - imageStartTime;
            completedImages++;
            
            if (completedImages === images.length) {
              resolve(metrics);
            }
          };

          if (img.complete) {
            if (img.naturalHeight !== 0) {
              metrics.loadedImages++;
            } else {
              metrics.failedImages++;
            }
            onComplete();
          } else {
            img.addEventListener('load', () => {
              metrics.loadedImages++;
              onComplete();
            });
            
            img.addEventListener('error', () => {
              metrics.failedImages++;
              onComplete();
            });
          }
        });
      });
    });

    // Assert image loading performance
    expect(imageMetrics.failedImages).toBe(0); // No images should fail to load
    if (imageMetrics.totalImages > 0) {
      const averageLoadTime = imageMetrics.totalLoadTime / imageMetrics.totalImages;
      expect(averageLoadTime).toBeLessThan(1000); // Average image load time should be < 1s
    }
  });

  test('should handle concurrent user interactions efficiently', async ({ browser }) => {
    // Create multiple pages to simulate concurrent users
    const pages = await Promise.all([
      browser.newPage(),
      browser.newPage(),
      browser.newPage()
    ]);

    const startTime = Date.now();

    // Navigate all pages simultaneously
    await Promise.all(
      pages.map(async (page) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      })
    );

    const loadTime = Date.now() - startTime;

    // All pages should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);

    // Perform concurrent interactions
    await Promise.all(
      pages.map(async (page, index) => {
        for (let i = 0; i < 5; i++) {
          await page.mouse.wheel(0, 200 * (index + 1));
          await page.waitForTimeout(100);
        }
      })
    );

    // Verify all pages are still responsive
    for (const page of pages) {
      const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
      await expect(chakraImage).toBeVisible();
    }

    // Clean up
    await Promise.all(pages.map(page => page.close()));
  });
});