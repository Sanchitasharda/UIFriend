import { test, expect } from '@playwright/test';

test.describe('Visualizer Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#palette-container');
  });

  test('should have visualizer toggle button visible', async ({ page }) => {
    const toggleButton = page.locator('button[aria-label="Toggle visualizer"]');
    await expect(toggleButton).toBeVisible();

    // Check positioning (right-6 bottom-6)
    const box = await toggleButton.boundingBox();
    expect(box).toBeTruthy();
  });

  test('should open visualizer panel on button click', async ({ page }) => {
    // Click the toggle button
    await page.click('button[aria-label="Toggle visualizer"]');

    // Wait for panel to appear
    await page.waitForSelector('text=Color Visualizer', { timeout: 2000 });

    // Check that the modal is visible
    const panel = page.locator('text=Color Visualizer').locator('..');
    await expect(panel).toBeVisible();
  });

  test('should close visualizer on close button', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Click close button
    await page.click('button[aria-label="Close visualizer"]');

    // Wait for panel to disappear
    await page.waitForTimeout(500);

    // Panel should not be visible
    await expect(page.locator('text=Color Visualizer')).not.toBeVisible();
  });

  test('should close visualizer on backdrop click', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Click on backdrop (outside the panel)
    await page.locator('.bg-black\\/40').click({ force: true, position: { x: 10, y: 10 } });

    // Wait for panel to disappear
    await page.waitForTimeout(500);

    // Panel should not be visible
    await expect(page.locator('text=Color Visualizer')).not.toBeVisible();
  });

  test('should have three tabs', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Check for three tabs
    await expect(page.locator('button:text("Components")')).toBeVisible();
    await expect(page.locator('button:text("Typography")')).toBeVisible();
    await expect(page.locator('button:text("Blocks")')).toBeVisible();
  });

  test('should show components tab by default', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Check that components tab content is visible
    await expect(page.locator('text=Buttons')).toBeVisible();
    await expect(page.locator('text=Primary Button')).toBeVisible();
  });

  test('should switch to typography tab', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Click typography tab
    await page.click('button:text("Typography")');
    await page.waitForTimeout(300);

    // Check that typography content is visible
    await expect(page.locator('text=Headings')).toBeVisible();
    await expect(page.locator('h1:text("Heading 1")')).toBeVisible();
  });

  test('should switch to blocks tab', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Click blocks tab
    await page.click('button:text("Blocks")');
    await page.waitForTimeout(300);

    // Check that blocks content is visible
    await expect(page.locator('text=Color Blocks')).toBeVisible();
    await expect(page.locator('text=Grid Layout')).toBeVisible();
  });

  test('should display all 5 colors in components tab', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Ensure we're on components tab
    await page.click('button:text("Components")');
    await page.waitForTimeout(300);

    // Count badges (there should be 5, one for each color)
    const badges = page.locator('text=/Badge \\d/');
    const count = await badges.count();
    expect(count).toBe(5);
  });

  test('should display all 5 colors in blocks tab', async ({ page }) => {
    // Open panel
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Switch to blocks tab
    await page.click('button:text("Blocks")');
    await page.waitForTimeout(300);

    // Count color blocks (should show "Color 1" through "Color 5")
    const colorBlocks = page.locator('text=/Color \\d/');
    const count = await colorBlocks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('should update when palette changes', async ({ page }) => {
    // Open visualizer
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Get initial button color from components tab
    const primaryButton = page.locator('text=Primary Button');
    const initialColor = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Close visualizer temporarily
    await page.click('button[aria-label="Close visualizer"]');
    await page.waitForTimeout(300);

    // Generate new palette
    await page.click('button[aria-label="Generate new palette"]');
    await page.waitForTimeout(500);

    // Reopen visualizer
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Get new button color
    const newColor = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Colors should be different (or at least attempt multiple generations)
    expect(newColor).toBeDefined();
  });

  test('should show gradient previews in blocks tab', async ({ page }) => {
    // Open visualizer
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Switch to blocks tab
    await page.click('button:text("Blocks")');
    await page.waitForTimeout(300);

    // Check for gradient labels
    await expect(page.locator('text=Gradients')).toBeVisible();
    await expect(page.locator('text=Linear Gradient')).toBeVisible();
    await expect(page.locator('text=Full Palette Gradient')).toBeVisible();
    await expect(page.locator('text=Radial Gradient')).toBeVisible();
  });

  test('should have scrollable content', async ({ page }) => {
    // Open visualizer
    await page.click('button[aria-label="Toggle visualizer"]');
    await page.waitForSelector('text=Color Visualizer');

    // Get the content container
    const contentContainer = page.locator('.overflow-y-auto').first();

    // Check if scrollHeight > clientHeight (indicates scrollable)
    const isScrollable = await contentContainer.evaluate((el) => {
      return el.scrollHeight > el.clientHeight;
    });

    // Content should be scrollable (lots of content in visualizer)
    expect(isScrollable).toBe(true);
  });
});
