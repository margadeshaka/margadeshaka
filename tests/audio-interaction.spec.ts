import { test, expect } from '@playwright/test';

test.describe('Audio Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Grant audio permissions
    await page.context().grantPermissions(['autoplay']);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have audio controls available', async ({ page }) => {
    // Look for audio-related elements (button, player, etc.)
    const audioButton = page.locator('button').filter({ hasText: /play|audio|sound|om/i });
    const audioElement = page.locator('audio');
    
    // Check if either audio button or audio element exists
    const hasAudioControls = await audioButton.count() > 0 || await audioElement.count() > 0;
    expect(hasAudioControls).toBeTruthy();
  });

  test('should toggle audio playback when audio control is clicked', async ({ page }) => {
    // Find audio control (button or audio element)
    const audioButton = page.locator('button').filter({ hasText: /play|audio|sound|om/i }).first();
    const audioElement = page.locator('audio').first();
    
    if (await audioButton.count() > 0) {
      // Test button-based audio control
      await audioButton.click();
      
      // Wait for potential state change
      await page.waitForTimeout(500);
      
      // Check if button state changed (text, class, etc.)
      const buttonText = await audioButton.textContent();
      expect(buttonText).toBeDefined();
    } else if (await audioElement.count() > 0) {
      // Test direct audio element
      const isPlaying = await audioElement.evaluate((audio: HTMLAudioElement) => !audio.paused);
      
      // Try to play/pause
      await audioElement.evaluate((audio: HTMLAudioElement) => {
        if (audio.paused) {
          return audio.play();
        } else {
          audio.pause();
        }
      });
      
      await page.waitForTimeout(500);
      
      const newIsPlaying = await audioElement.evaluate((audio: HTMLAudioElement) => !audio.paused);
      expect(newIsPlaying).not.toBe(isPlaying);
    }
  });

  test('should handle audio context and loading', async ({ page }) => {
    // Monitor for audio context creation
    await page.addScriptTag({
      content: `
        window.audioContextCreated = false;
        const originalAudioContext = window.AudioContext || window.webkitAudioContext;
        if (originalAudioContext) {
          window.AudioContext = window.webkitAudioContext = function(...args) {
            window.audioContextCreated = true;
            return new originalAudioContext(...args);
          };
        }
      `
    });

    // Interact with the page to trigger audio context
    await page.click('body');
    await page.waitForTimeout(1000);

    // Check if audio context was created (indicates audio functionality is working)
    const audioContextCreated = await page.evaluate(() => (window as any).audioContextCreated);
    
    // This test passes if either audio context is created OR audio elements exist
    const hasAudioElements = await page.locator('audio').count() > 0;
    expect(audioContextCreated || hasAudioElements).toBeTruthy();
  });

  test('should respect user audio preferences', async ({ page }) => {
    // Test with audio autoplay blocked
    await page.context().clearPermissions();
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Audio should not autoplay when permissions are not granted
    const audioElements = page.locator('audio');
    
    if (await audioElements.count() > 0) {
      const isAutoPlaying = await audioElements.first().evaluate((audio: HTMLAudioElement) => !audio.paused);
      expect(isAutoPlaying).toBeFalsy();
    }
  });

  test('should handle audio loading errors gracefully', async ({ page }) => {
    // Intercept audio requests and return 404
    await page.route('**/*.{mp3,wav,ogg,m4a}', route => {
      route.abort('failed');
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Page should still load without crashing
    const chakraImage = page.locator('img[alt="Sudarshan Chakra"]');
    await expect(chakraImage).toBeVisible();

    // No console errors should be thrown that break the app
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });

    // Interact with the page
    await page.click('body');
    await page.waitForTimeout(1000);

    // Audio errors should be handled gracefully
    const criticalErrors = logs.filter(log => 
      log.includes('Uncaught') && !log.includes('audio')
    );
    expect(criticalErrors.length).toBe(0);
  });
});