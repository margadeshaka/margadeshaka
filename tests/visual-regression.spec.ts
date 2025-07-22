import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('should match desktop homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match mobile homepage screenshot', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match tablet homepage screenshot', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match chakra animation at different scroll positions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test different scroll positions
    const scrollPositions = [0, 1000, 2000, 3000];
    
    for (let i = 0; i < scrollPositions.length; i++) {
      const scrollY = scrollPositions[i];
      
      await page.evaluate((y) => {
        window.scrollTo({ top: y, behavior: 'instant' });
      }, scrollY);
      
      // Wait for scroll to complete and animations to settle
      await page.waitForTimeout(1000);
      
      // Take screenshot of just the chakra area
      const chakraContainer = page.locator('img[alt="Sudarshan Chakra"]').locator('..');
      await expect(chakraContainer).toHaveScreenshot(`chakra-scroll-${i}.png`, {
        animations: 'disabled'
      });
    }
  });

  test('should match dialog boxes for each chakra point', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const viewportHeight = page.viewportSize()!.height;
    
    // Scroll through each chakra point and capture dialog boxes
    for (let i = 0; i < 8; i++) {
      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      }, i * viewportHeight);
      
      // Wait for scroll and dialog to appear
      await page.waitForTimeout(1500);
      
      // Try to find and capture dialog box
      const dialogSelectors = [
        `[data-testid="dialog-${i + 1}"]`,
        '.dialog-box',
        '[class*="dialog"]',
        'div:has-text("✨"):visible',
        'div:has-text("💡"):visible',
        'div:has-text("🌿"):visible',
        'div:has-text("🔮"):visible',
        'div:has-text("👤"):visible',
        'div:has-text("❤️"):visible',
        'div:has-text("🌱"):visible',
        'div:has-text("🚀"):visible'
      ];
      
      for (const selector of dialogSelectors) {
        const dialog = page.locator(selector);
        if (await dialog.count() > 0 && await dialog.isVisible()) {
          await expect(dialog.first()).toHaveScreenshot(`dialog-point-${i + 1}.png`);
          break;
        }
      }
    }
  });

  test('should match cosmic background rendering', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for background animations to initialize
    await page.waitForTimeout(3000);
    
    // Disable animations for consistent screenshot
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `
    });
    
    // Take screenshot of just the background
    const background = page.locator('canvas').first();
    await expect(background).toHaveScreenshot('cosmic-background.png');
  });

  test('should match waitlist button appearance', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to the last section to trigger waitlist button
    const viewportHeight = page.viewportSize()!.height;
    await page.evaluate((scrollY) => {
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
    }, 7 * viewportHeight);
    
    // Wait for button to appear
    await page.waitForTimeout(2000);
    
    // Find and screenshot the waitlist button
    const buttonSelectors = [
      'text=Join the Early Access Waitlist',
      'button:has-text("Waitlist")',
      '.waitlist-button',
      '[class*="waitlist"]'
    ];
    
    for (const selector of buttonSelectors) {
      const button = page.locator(selector);
      if (await button.count() > 0 && await button.isVisible()) {
        await expect(button.first()).toHaveScreenshot('waitlist-button.png');
        break;
      }
    }
  });

  test('should match dark mode appearance if available', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to enable dark mode
    await page.emulateMedia({ colorScheme: 'dark' });
    
    // Look for dark mode toggle or apply dark mode styles
    const darkModeToggle = page.locator('button:has-text("dark")').or(
      page.locator('[aria-label*="dark"]')
    );
    
    if (await darkModeToggle.count() > 0) {
      await darkModeToggle.click();
      await page.waitForTimeout(1000);
    }
    
    // Wait for potential theme change
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should handle different browser zoom levels', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test different zoom levels
    const zoomLevels = [0.75, 1.0, 1.25, 1.5];
    
    for (const zoom of zoomLevels) {
      // Set zoom level
      await page.evaluate((zoomLevel) => {
        document.body.style.zoom = zoomLevel.toString();
      }, zoom);
      
      await page.waitForTimeout(1000);
      
      // Take screenshot at this zoom level
      await expect(page).toHaveScreenshot(`homepage-zoom-${zoom}.png`, {
        animations: 'disabled'
      });
    }
  });

  test('should match error state appearance', async ({ page }) => {
    // Intercept requests to simulate errors
    await page.route('**/*.{png,jpg,jpeg,svg}', route => {
      route.abort('failed');
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait for error states to appear
    await page.waitForTimeout(3000);
    
    // Screenshot the page with missing images
    await expect(page).toHaveScreenshot('error-state.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});