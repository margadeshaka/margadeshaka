import { test, expect } from '@playwright/test';

test.describe('Chakra Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should load the main page with chakra animation', async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/ChakraVision/);
    
    // Verify the chakra image is visible
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toBeVisible();
    
    // Check if the cosmic background canvas is present
    const cosmicBackground = page.locator('canvas');
    await expect(cosmicBackground).toBeVisible();
  });

  test('should navigate through chakra points on scroll', async ({ page }) => {
    // Get the initial viewport height for scroll calculations
    const viewportSize = page.viewportSize();
    const scrollAmount = viewportSize!.height;

    // Start at the first section
    let currentSection = page.locator('#section-1');
    await expect(currentSection).toBeVisible();

    // Scroll through each chakra point and verify content
    const chakraPoints = [
      { id: '1', title: '✨ What is Margadeshaka AI?' },
      { id: '2', title: '💡 Our Mission' },
      { id: '3', title: '🌿 What Makes It Different' },
      { id: '4', title: '🔮 Built for Clarity, Not Control' },
      { id: '5', title: '👤 Who It\'s For' },
      { id: '6', title: '❤️ What You Can Expect' },
      { id: '7', title: '🌱 Why It Matters' },
      { id: '8', title: '🚀 Begin the Journey' }
    ];

    for (let i = 0; i < chakraPoints.length; i++) {
      const point = chakraPoints[i];
      
      // Scroll to the section
      await page.evaluate((scrollY) => {
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      }, i * scrollAmount);
      
      // Wait for scroll to complete
      await page.waitForTimeout(1000);
      
      // Check if the dialog box appears with correct content
      const dialogBox = page.locator(`[data-testid="dialog-${point.id}"]`).or(
        page.locator('text=' + point.title)
      );
      
      // Wait for the dialog to be visible
      await expect(dialogBox.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display waitlist button on last chakra point', async ({ page }) => {
    // Scroll to the last section
    const viewportSize = page.viewportSize();
    const totalHeight = viewportSize!.height * 8; // 8 chakra points
    
    await page.evaluate((scrollY) => {
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
    }, totalHeight);
    
    // Wait for scroll to complete
    await page.waitForTimeout(2000);
    
    // Check if waitlist button is visible
    const waitlistButton = page.locator('text=Join the Early Access Waitlist').or(
      page.locator('button').filter({ hasText: 'Waitlist' })
    );
    await expect(waitlistButton.first()).toBeVisible({ timeout: 5000 });
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Test keyboard navigation with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(500);
    
    // Verify page scrolled
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Reload to ensure responsive design is applied
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check if chakra image is still visible and properly sized
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toBeVisible();
    
    // Verify the image doesn't overflow
    const imageBox = await chakraImage.boundingBox();
    expect(imageBox!.width).toBeLessThanOrEqual(375);
  });

  test('should handle scroll performance without janking', async ({ page }) => {
    // Monitor performance during scroll
    await page.addScriptTag({
      content: `
        window.scrollPerformance = [];
        let lastTime = performance.now();
        window.addEventListener('scroll', () => {
          const now = performance.now();
          window.scrollPerformance.push(now - lastTime);
          lastTime = now;
        });
      `
    });

    // Perform rapid scrolling
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 500);
      await page.waitForTimeout(50);
    }

    // Check scroll performance
    const avgScrollTime = await page.evaluate(() => {
      const times = (window as any).scrollPerformance as number[];
      return times.reduce((a: number, b: number) => a + b, 0) / times.length;
    });

    // Scroll events should complete within reasonable time (less than 16ms for 60fps)
    expect(avgScrollTime).toBeLessThan(100); // Allow some buffer for test environment
  });
});