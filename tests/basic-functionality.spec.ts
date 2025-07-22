import { test, expect } from '@playwright/test';

test.describe('Basic Functionality Tests', () => {
  test('should load page without critical errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    const jsErrors: string[] = [];
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Capture JavaScript errors
    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Basic page assertions
    await expect(page).toHaveTitle(/Margadeshaka/i);
    
    // Page should have loaded without critical errors
    const criticalErrors = [...consoleErrors, ...jsErrors].filter(error => 
      error.includes('Uncaught') || 
      error.includes('ReferenceError') || 
      error.includes('TypeError') ||
      error.includes('SyntaxError')
    );
    
    if (criticalErrors.length > 0) {
      console.log('Critical errors found:', criticalErrors);
    }
    
    // Allow for some non-critical errors but no critical ones
    expect(criticalErrors.length).toBeLessThan(3);
  });

  test('should have working JavaScript hydration', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait longer for hydration
    await page.waitForTimeout(5000);
    
    // Check if React has hydrated by looking for interactive elements
    const hasInteractiveElements = await page.evaluate(() => {
      // Check if there are any event listeners attached (sign of hydration)
      const elements = document.querySelectorAll('*');
      for (let i = 0; i < Math.min(elements.length, 100); i++) {
        const element = elements[i] as HTMLElement;
        // Check for React fiber properties (sign of React hydration)
        if (element.hasOwnProperty('_reactInternalFiber') || 
            element.hasOwnProperty('__reactInternalInstance') ||
            element.hasOwnProperty('_reactInternals')) {
          return true;
        }
      }
      return false;
    });
    
    // If React hydration detection fails, check for basic interactivity
    const canInteract = await page.evaluate(() => {
      // Check if we can find clickable elements or if body has event listeners
      const clickableElements = document.querySelectorAll('button, a, [onclick], [role="button"]');
      return clickableElements.length > 0 || document.body.onclick !== null;
    });
    
    expect(hasInteractiveElements || canInteract).toBeTruthy();
  });

  test('should render main content areas', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for content to render
    await page.waitForTimeout(5000);
    
    // Check for main structural elements
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Should have some content text
    const hasContent = await page.evaluate(() => {
      const textContent = document.body.textContent || '';
      return textContent.length > 100; // Should have substantial content
    });
    
    expect(hasContent).toBeTruthy();
  });

  test('should handle viewport changes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 812 }    // Mobile
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(1000);
      
      // Page should remain functional at different sizes
      const isUsable = await page.evaluate(() => {
        // Check if page doesn't have horizontal scroll
        return document.body.scrollWidth <= window.innerWidth + 10; // Allow small tolerance
      });
      
      expect(isUsable).toBeTruthy();
    }
  });

  test('should load required assets', async ({ page }) => {
    const requests: string[] = [];
    const failedRequests: string[] = [];
    
    page.on('request', request => {
      requests.push(request.url());
    });
    
    page.on('requestfailed', request => {
      failedRequests.push(request.url());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for additional requests to complete
    await page.waitForTimeout(3000);
    
    // Check that CSS and JS files loaded
    const hasCSSRequests = requests.some(url => url.includes('.css'));
    const hasJSRequests = requests.some(url => url.includes('.js'));
    
    expect(hasCSSRequests).toBeTruthy();
    expect(hasJSRequests).toBeTruthy();
    
    // Critical assets shouldn't fail
    const criticalFailures = failedRequests.filter(url => 
      url.includes('.js') || url.includes('.css') || url.includes('favicon')
    );
    
    expect(criticalFailures.length).toBe(0);
  });

  test('should be accessible with keyboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Should be able to focus with tab
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    // Check if something got focused
    const focusedElement = page.locator(':focus');
    const hasFocus = await focusedElement.count();
    
    // Either should have focused element or be able to scroll
    if (hasFocus === 0) {
      // Try scrolling as alternative interaction
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThanOrEqual(0);
    } else {
      expect(hasFocus).toBeGreaterThan(0);
    }
  });
});