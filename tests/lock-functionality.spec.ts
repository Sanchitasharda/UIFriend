import { test, expect } from '@playwright/test';

test.describe('Lock Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#palette-container');
  });

  test('should toggle lock state on click', async ({ page }) => {
    // Find the first color swatch
    const firstSwatch = page.locator('#palette-container > div').first();

    // Hover to reveal lock button
    await firstSwatch.hover();

    // Click the lock button
    const lockButton = firstSwatch.locator('button[aria-label*="Lock"]');
    await lockButton.click();

    // Check that the aria-label changed
    const label = await lockButton.getAttribute('aria-label');
    expect(label).toContain('Unlock');

    // Verify persistent lock indicator is visible
    const lockIndicator = firstSwatch.locator('.animate-pulse');
    await expect(lockIndicator).toBeVisible();
  });

  test('should persist lock state to localStorage', async ({ page }) => {
    const firstSwatch = page.locator('#palette-container > div').first();

    // Get the initial color
    const initialColor = await firstSwatch.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Lock the first color
    await firstSwatch.hover();
    const lockButton = firstSwatch.locator('button[aria-label*="Lock"]');
    await lockButton.click();

    // Wait a bit for localStorage to update
    await page.waitForTimeout(500);

    // Check localStorage
    const historyData = await page.evaluate(() => {
      return localStorage.getItem('paletteHistory');
    });

    expect(historyData).toBeTruthy();
    const history = JSON.parse(historyData!);
    expect(history[0].colors[0].locked).toBe(true);
  });

  test('should not change locked colors on palette generation', async ({ page }) => {
    const firstSwatch = page.locator('#palette-container > div').first();

    // Get initial color
    const initialHex = await firstSwatch.locator('button[aria-label*="Copy"]').textContent();

    // Lock the first color
    await firstSwatch.hover();
    await firstSwatch.locator('button[aria-label*="Lock"]').click();
    await page.waitForTimeout(300);

    // Generate new palette
    await page.click('button[aria-label="Generate new palette"]');
    await page.waitForTimeout(500);

    // Check that locked color didn't change
    const newHex = await firstSwatch.locator('button[aria-label*="Copy"]').textContent();
    expect(newHex).toBe(initialHex);
  });

  test('should change unlocked colors on palette generation', async ({ page }) => {
    const secondSwatch = page.locator('#palette-container > div').nth(1);

    // Get initial color (make sure it's NOT locked)
    const initialHex = await secondSwatch.locator('button[aria-label*="Copy"]').textContent();

    // Generate new palette multiple times to ensure change
    let changed = false;
    for (let i = 0; i < 5; i++) {
      await page.click('button[aria-label="Generate new palette"]');
      await page.waitForTimeout(500);

      const newHex = await secondSwatch.locator('button[aria-label*="Copy"]').textContent();
      if (newHex !== initialHex) {
        changed = true;
        break;
      }
    }

    expect(changed).toBe(true);
  });

  test('should unlock color when toggled back', async ({ page }) => {
    const firstSwatch = page.locator('#palette-container > div').first();

    // Lock it
    await firstSwatch.hover();
    const lockButton = firstSwatch.locator('button[aria-label*="Lock"]');
    await lockButton.click();
    await page.waitForTimeout(300);

    // Unlock it
    await firstSwatch.hover();
    await lockButton.click();
    await page.waitForTimeout(300);

    // Check aria-label
    const label = await lockButton.getAttribute('aria-label');
    expect(label).toContain('Lock color');

    // Persistent indicator should be gone
    const lockIndicator = firstSwatch.locator('.animate-pulse');
    await expect(lockIndicator).not.toBeVisible();
  });

  test('should persist multiple locked colors', async ({ page }) => {
    // Lock first, third, and fifth colors
    for (const index of [0, 2, 4]) {
      const swatch = page.locator('#palette-container > div').nth(index);
      await swatch.hover();
      await swatch.locator('button[aria-label*="Lock"]').click();
      await page.waitForTimeout(200);
    }

    // Check localStorage
    const historyData = await page.evaluate(() => {
      return localStorage.getItem('paletteHistory');
    });

    const history = JSON.parse(historyData!);
    expect(history[0].colors[0].locked).toBe(true);
    expect(history[0].colors[1].locked).toBe(false);
    expect(history[0].colors[2].locked).toBe(true);
    expect(history[0].colors[3].locked).toBe(false);
    expect(history[0].colors[4].locked).toBe(true);
  });

  test('should survive page refresh', async ({ page }) => {
    const firstSwatch = page.locator('#palette-container > div').first();

    // Get color and lock it
    const initialHex = await firstSwatch.locator('button[aria-label*="Copy"]').textContent();
    await firstSwatch.hover();
    await firstSwatch.locator('button[aria-label*="Lock"]').click();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForSelector('#palette-container');

    // Check localStorage still has the locked state
    const historyData = await page.evaluate(() => {
      return localStorage.getItem('paletteHistory');
    });

    const history = JSON.parse(historyData!);
    expect(history[0].colors[0].locked).toBe(true);
  });
});
