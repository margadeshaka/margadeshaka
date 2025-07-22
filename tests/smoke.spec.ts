import { test, expect } from '@playwright/test';
import { TestHelpers, TEST_DATA } from './utils/test-helpers';

test.describe('Smoke Tests - Critical Functionality', () => {
  test('should load homepage successfully', async ({ page }) => {
    const helper = new TestHelpers(page);
    
    // Capture any console errors
    const errors = await helper.captureConsoleErrors();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for React hydration and content to load
    await page.waitForTimeout(3000);
    
    // Basic page load assertions
    await expect(page).toHaveTitle(/ChakraVision|Margadeshaka/i);
    
    // Wait for critical elements to appear after client-side rendering
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toBeVisible({ timeout: 10000 });
    
    const cosmicBackground = page.locator('canvas');
    await expect(cosmicBackground).toBeVisible({ timeout: 10000 });
    
    // No critical JavaScript errors
    const criticalErrors = errors.filter(error => 
      error.includes('Uncaught') || error.includes('TypeError')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('should be responsive across all device sizes', async ({ page }) => {
    const helper = new TestHelpers(page);
    
    for (const [deviceName, viewport] of Object.entries(TEST_DATA.VIEWPORTS)) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      await helper.waitForPageReady();
      
      // Critical elements should remain visible
      const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
      await expect(chakraImage).toBeVisible();
      
      // No horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewport.width);
      
      console.log(`✓ ${deviceName} (${viewport.width}x${viewport.height}) - OK`);
    }
  });

  test('should handle navigation through all chakra points', async ({ page }) => {
    const helper = new TestHelpers(page);
    
    await page.goto('/');
    await helper.waitForPageReady();
    
    // Navigate through each chakra point
    for (let i = 0; i < TEST_DATA.CHAKRA_POINTS.length; i++) {
      await helper.scrollToChakraPoint(i);
      
      // Verify we can reach each section
      const section = page.locator(`#section-${i + 1}`);
      await expect(section).toBeVisible();
      
      console.log(`✓ Chakra point ${i + 1} - Accessible`);
    }
  });

  test('should meet basic performance requirements', async ({ page }) => {
    const helper = new TestHelpers(page);
    const startTime = Date.now();
    
    await page.goto('/');
    await helper.waitForPageReady();
    
    const loadTime = Date.now() - startTime;
    const metrics = await helper.getPerformanceMetrics();
    
    // Basic performance assertions
    expect(loadTime).toBeLessThan(TEST_DATA.PERFORMANCE_THRESHOLDS.LOAD_TIME);
    expect(metrics.firstContentfulPaint).toBeLessThan(TEST_DATA.PERFORMANCE_THRESHOLDS.FCP);
    
    console.log(`✓ Load Time: ${loadTime}ms`);
    console.log(`✓ FCP: ${metrics.firstContentfulPaint}ms`);
  });

  test('should not have critical accessibility violations', async ({ page }) => {
    const helper = new TestHelpers(page);
    
    await page.goto('/');
    await helper.waitForPageReady();
    
    // Basic accessibility checks
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toHaveAttribute('alt');
    
    // Page should have a title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    // Should support keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    expect(await focusedElement.count()).toBeGreaterThan(0);
    
    console.log('✓ Basic accessibility checks passed');
  });
});