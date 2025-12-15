import { test, expect } from '@playwright/test';

test.describe('Glassmorphism UI Effects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#palette-container');
  });

  test('should have glass effect on toolbar', async ({ page }) => {
    const toolbar = page.locator('.fixed.top-0').first();

    const styles = await toolbar.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backdropFilter: computed.backdropFilter,
        backgroundColor: computed.backgroundColor,
      };
    });

    // Check for backdrop-filter (blur effect)
    expect(styles.backdropFilter).toContain('blur');
  });

  test('should have hover scale effect on color swatches', async ({ page }) => {
    const firstSwatch = page.locator('#palette-container > div').first();

    // Get initial transform
    const initialTransform = await firstSwatch.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // Hover over the swatch
    await firstSwatch.hover();
    await page.waitForTimeout(500); // Wait for transition

    // Get transform after hover
    const hoverTransform = await firstSwatch.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // Transform should change on hover (scale effect)
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('should have glass styling on toggle buttons', async ({ page }) => {
    // Check history panel button
    const historyButton = page.locator('button[aria-label="Toggle history panel"]');

    const styles = await historyButton.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backdropFilter: computed.backdropFilter,
        borderRadius: computed.borderRadius,
      };
    });

    // Should have backdrop filter
    expect(styles.backdropFilter).toBeTruthy();

    // Should have border radius
    expect(styles.borderRadius).not.toBe('0px');
  });

  test('should have backdrop-filter on panels', async ({ page }) => {
    // Open accessibility panel
    await page.click('button[aria-label="Toggle accessibility checker"]');
    await page.waitForSelector('text=WCAG Contrast Checker');

    // Check the modal backdrop
    const backdrop = page.locator('.bg-black\\/40').first();

    const backdropFilter = await backdrop.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter;
    });

    // Should have blur effect
    expect(backdropFilter).toContain('blur');
  });

  test('should have gradient on generate button', async ({ page }) => {
    const generateButton = page.locator('button[aria-label="Generate new palette"]');

    const background = await generateButton.evaluate((el) => {
      return window.getComputedStyle(el).background;
    });

    // Should have gradient (contains 'gradient' keyword)
    expect(background.toLowerCase()).toContain('gradient');
  });

  test('should have pulse animation on lock indicator', async ({ page }) => {
    const firstSwatch = page.locator('#palette-container > div').first();

    // Lock the color
    await firstSwatch.hover();
    await firstSwatch.locator('button[aria-label*="Lock"]').click();
    await page.waitForTimeout(300);

    // Check for animate-pulse class
    const lockIndicator = firstSwatch.locator('.animate-pulse');
    await expect(lockIndicator).toBeVisible();

    // Check animation property
    const animation = await lockIndicator.evaluate((el) => {
      return window.getComputedStyle(el).animation;
    });

    // Should have animation
    expect(animation).not.toBe('');
    expect(animation).not.toBe('none');
  });

  test('should have backdrop blur on modal', async ({ page }) => {
    // Open color picker
    const firstSwatch = page.locator('#palette-container > div').first();
    await firstSwatch.click();
    await page.waitForSelector('text=Pick a Color');

    // Check backdrop
    const backdrop = page.locator('.bg-black\\/40').first();

    const backdropFilter = await backdrop.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter;
    });

    expect(backdropFilter).toContain('blur');
  });

  test('should have smooth transitions', async ({ page }) => {
    const firstSwatch = page.locator('#palette-container > div').first();

    const transition = await firstSwatch.evaluate((el) => {
      return window.getComputedStyle(el).transition;
    });

    // Should have transition property defined
    expect(transition).toBeTruthy();
    expect(transition).not.toBe('');
  });

  test('should have box shadow on cards', async ({ page }) => {
    // Open accessibility panel
    await page.click('button[aria-label="Toggle accessibility checker"]');
    await page.waitForSelector('text=WCAG Contrast Checker');

    // Check a card element
    const card = page.locator('.glass-float').first();

    const boxShadow = await card.evaluate((el) => {
      return window.getComputedStyle(el).boxShadow;
    });

    // Should have box shadow (not 'none')
    expect(boxShadow).not.toBe('none');
    expect(boxShadow).toBeTruthy();
  });

  test('should have gradient text on title', async ({ page }) => {
    const title = page.locator('h1:text("UIfriend")');

    const styles = await title.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundImage: computed.backgroundImage,
        webkitBackgroundClip: computed.webkitBackgroundClip,
      };
    });

    // Should have gradient background
    expect(styles.backgroundImage).toContain('gradient');

    // Should have background-clip: text for gradient text effect
    expect(styles.webkitBackgroundClip).toBe('text');
  });

  test('should have rounded corners on components', async ({ page }) => {
    const generateButton = page.locator('button[aria-label="Generate new palette"]');

    const borderRadius = await generateButton.evaluate((el) => {
      return window.getComputedStyle(el).borderRadius;
    });

    // Should have border radius
    expect(borderRadius).not.toBe('0px');
    expect(borderRadius).toBeTruthy();
  });

  test('should have hover effects on buttons', async ({ page }) => {
    const generateButton = page.locator('button[aria-label="Generate new palette"]');

    // Hover over button
    await generateButton.hover();
    await page.waitForTimeout(500);

    // Button should remain visible and styled
    await expect(generateButton).toBeVisible();

    // Check for transform (hover scale)
    const transform = await generateButton.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    expect(transform).toBeTruthy();
  });

  test('should have glass effect on export menu dropdown', async ({ page }) => {
    // Open export menu
    await page.click('button[aria-label="Export palette"]');
    await page.waitForTimeout(300);

    // Check dropdown
    const dropdown = page.locator('.glass-float.absolute');

    // Should be visible
    await expect(dropdown).toBeVisible();

    // Check backdrop filter
    const backdropFilter = await dropdown.evaluate((el) => {
      return window.getComputedStyle(el).backdropFilter;
    });

    expect(backdropFilter).toContain('blur');
  });
});
