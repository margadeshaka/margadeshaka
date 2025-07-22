import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for page to be fully loaded with all animations settled
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    
    // Wait for React hydration to complete
    await this.page.waitForTimeout(2000);
    
    // Wait for key elements that indicate the page is ready
    try {
      await this.page.waitForSelector('img[alt="Sudarshan Chakra"], canvas', { timeout: 10000 });
    } catch (error) {
      console.log('Key elements not found within timeout, continuing...');
    }
    
    // Wait for any running animations to complete
    await this.page.waitForFunction(() => {
      const animatingElements = document.querySelectorAll('[style*="animation"], [class*="animate"]');
      return Array.from(animatingElements).every(el => {
        const computedStyle = getComputedStyle(el);
        return computedStyle.animationPlayState === 'paused' || 
               computedStyle.animationPlayState === 'finished' ||
               !computedStyle.animationName ||
               computedStyle.animationName === 'none';
      });
    }, { timeout: 5000 }).catch(() => {
      // If animation detection fails, just wait a bit more
      console.log('Animation detection failed, proceeding with fixed delay');
    });
    
    await this.page.waitForTimeout(500); // Final buffer
  }

  /**
   * Scroll to a specific chakra point by index
   */
  async scrollToChakraPoint(index: number): Promise<void> {
    const viewportHeight = this.page.viewportSize()!.height;
    const targetScrollY = index * viewportHeight;
    
    await this.page.evaluate((scrollY) => {
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
    }, targetScrollY);
    
    await this.page.waitForTimeout(1000); // Wait for scroll to complete
  }

  /**
   * Check if an element is visible in viewport
   */
  async isElementInViewport(selector: string): Promise<boolean> {
    return await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    }, selector);
  }

  /**
   * Simulate slow network conditions
   */
  async simulateSlowNetwork(): Promise<void> {
    await this.page.route('**/*', async route => {
      // Add delay to simulate slow network
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(): Promise<any> {
    return await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
        domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        resources: performance.getEntriesByType('resource').length
      };
    });
  }

  /**
   * Check for JavaScript errors
   */
  async captureConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    this.page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    return errors;
  }

  /**
   * Wait for specific text to appear on page
   */
  async waitForTextToAppear(text: string, timeout = 5000): Promise<void> {
    await this.page.waitForSelector(`text=${text}`, { timeout });
  }

  /**
   * Check if audio is working
   */
  async isAudioWorking(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const audioElements = document.querySelectorAll('audio');
      if (audioElements.length === 0) return false;
      
      // Check if any audio element can play
      return Array.from(audioElements).some(audio => {
        return audio.readyState >= 2; // HAVE_CURRENT_DATA or higher
      });
    });
  }

  /**
   * Disable animations for consistent testing
   */
  async disableAnimations(): Promise<void> {
    await this.page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
  }

  /**
   * Take a screenshot with consistent settings
   */
  async takeConsistentScreenshot(name: string, options: any = {}): Promise<void> {
    await this.disableAnimations();
    await this.page.waitForTimeout(500); // Let styles apply
    
    await expect(this.page).toHaveScreenshot(name, {
      fullPage: true,
      animations: 'disabled',
      ...options
    });
  }

  /**
   * Get memory usage if available
   */
  async getMemoryUsage(): Promise<any> {
    return await this.page.evaluate(() => {
      if ((performance as any).memory) {
        return {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
        };
      }
      return null;
    });
  }

  /**
   * Simulate user interactions with realistic delays
   */
  async simulateHumanScroll(distance: number, steps = 10): Promise<void> {
    const stepSize = distance / steps;
    
    for (let i = 0; i < steps; i++) {
      await this.page.mouse.wheel(0, stepSize);
      await this.page.waitForTimeout(50 + Math.random() * 50); // Random delay
    }
  }

  /**
   * Check if element has proper ARIA attributes
   */
  async checkAriaAttributes(selector: string): Promise<boolean> {
    return await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      // Check for basic accessibility attributes
      const hasAria = element.hasAttribute('aria-label') ||
                     element.hasAttribute('aria-labelledby') ||
                     element.hasAttribute('aria-describedby') ||
                     element.hasAttribute('role');
      
      const hasAlt = element.tagName.toLowerCase() === 'img' ? 
                    element.hasAttribute('alt') : true;
      
      return hasAria || hasAlt;
    }, selector);
  }
}

/**
 * Common test data and constants
 */
export const TEST_DATA = {
  CHAKRA_POINTS: [
    { id: '1', title: '✨ What is Margadeshaka AI?' },
    { id: '2', title: '💡 Our Mission' },
    { id: '3', title: '🌿 What Makes It Different' },
    { id: '4', title: '🔮 Built for Clarity, Not Control' },
    { id: '5', title: '👤 Who It\'s For' },
    { id: '6', title: '❤️ What You Can Expect' },
    { id: '7', title: '🌱 Why It Matters' },
    { id: '8', title: '🚀 Begin the Journey' }
  ],
  
  VIEWPORTS: {
    MOBILE: { width: 375, height: 812 },
    TABLET: { width: 768, height: 1024 },
    DESKTOP: { width: 1920, height: 1080 },
    DESKTOP_SMALL: { width: 1366, height: 768 }
  },
  
  PERFORMANCE_THRESHOLDS: {
    LOAD_TIME: 3000,
    FCP: 1800,
    LCP: 2500,
    CLS: 0.1,
    TTFB: 800
  }
};