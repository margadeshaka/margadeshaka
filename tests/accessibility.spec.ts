import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check for important ARIA attributes
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toHaveAttribute('alt');

    // Check for navigation landmarks
    const main = page.locator('main').or(page.locator('[role="main"]'));
    const hasMainLandmark = await main.count() > 0;
    
    // Either should have semantic main element or role
    expect(hasMainLandmark).toBeTruthy();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Test additional tab presses
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to navigate through interactive elements
    const newFocusedElement = page.locator(':focus');
    const hasFocus = await newFocusedElement.count() > 0;
    expect(hasFocus).toBeTruthy();
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // This test uses axe-core to check color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toEqual([]);
  });

  test('should work with screen reader simulation', async ({ page }) => {
    // Test with simulated screen reader navigation
    await page.keyboard.press('Tab');
    
    // Check if focused element has accessible name
    const focusedElement = page.locator(':focus');
    if (await focusedElement.count() > 0) {
      const accessibleName = await focusedElement.getAttribute('aria-label') ||
                           await focusedElement.getAttribute('title') ||
                           await focusedElement.textContent();
      
      expect(accessibleName).toBeTruthy();
    }
  });

  test('should handle reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Page should still be functional
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toBeVisible();
    
    // Scroll should still work
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(500);
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    if (headings.length > 0) {
      // Check if there's at least one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
      
      // Verify heading levels don't skip (e.g., h1 -> h3 without h2)
      const headingLevels = [];
      for (const heading of headings) {
        const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
        headingLevels.push(parseInt(tagName[1]));
      }
      
      // Check heading hierarchy
      for (let i = 1; i < headingLevels.length; i++) {
        const diff = headingLevels[i] - headingLevels[i - 1];
        expect(diff).toBeLessThanOrEqual(1); // Should not skip heading levels
      }
    }
  });

  test('should have descriptive page title', async ({ page }) => {
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).not.toBe('');
    expect(title).not.toBe('Document');
  });

  test('should support high contrast mode', async ({ page }) => {
    // Simulate high contrast mode
    await page.addStyleTag({
      content: `
        @media (prefers-contrast: high) {
          * {
            filter: contrast(2) !important;
          }
        }
      `
    });
    
    await page.emulateMedia({ colorScheme: 'dark' });
    
    // Page should remain functional and visible
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toBeVisible();
  });
});