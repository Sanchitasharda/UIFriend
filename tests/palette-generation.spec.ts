import { test, expect } from '@playwright/test';

test.describe('Palette Generation', () => {
  test('should display 5 color swatches on page load', async ({ page }) => {
    await page.goto('/');

    const swatches = await page.locator('[id="palette-container"] > div').count();
    expect(swatches).toBe(5);
  });

  test('each swatch should have hex code and color name', async ({ page }) => {
    await page.goto('/');

    const firstSwatch = page.locator('[id="palette-container"] > div').first();
    await expect(firstSwatch.locator('button')).toBeVisible();
    await expect(firstSwatch.locator('p')).toBeVisible();

    const hexText = await firstSwatch.locator('button').textContent();
    expect(hexText).toMatch(/^#[0-9A-F]{6}$/);
  });

  test('spacebar should regenerate palette', async ({ page }) => {
    await page.goto('/');

    const firstSwatchButton = page.locator('[id="palette-container"] > div').first().locator('button');
    const initialHex = await firstSwatchButton.textContent();

    await page.keyboard.press('Space');
    await page.waitForTimeout(500);

    const newHex = await firstSwatchButton.textContent();
    expect(newHex).not.toBe(initialHex);
  });

  test('generate button should regenerate palette', async ({ page }) => {
    await page.goto('/');

    const firstSwatchButton = page.locator('[id="palette-container"] > div').first().locator('button');
    const initialHex = await firstSwatchButton.textContent();

    await page.getByRole('button', { name: /generate/i }).click();
    await page.waitForTimeout(500);

    const newHex = await firstSwatchButton.textContent();
    expect(newHex).not.toBe(initialHex);
  });
});
