import { test, expect } from '@playwright/test';

test.describe('Color Picker', () => {
  test('should open color picker when clicking on a swatch', async ({ page }) => {
    await page.goto('/');

    await page.locator('[id="palette-container"] > div').first().click();

    await expect(page.getByText('Edit Color')).toBeVisible();
  });

  test('should close color picker on ESC key', async ({ page }) => {
    await page.goto('/');

    await page.locator('[id="palette-container"] > div').first().click();
    await expect(page.getByText('Edit Color')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByText('Edit Color')).not.toBeVisible();
  });

  test('should close color picker when clicking backdrop', async ({ page }) => {
    await page.goto('/');

    await page.locator('[id="palette-container"] > div').first().click();
    await expect(page.getByText('Edit Color')).toBeVisible();

    await page.locator('.fixed.inset-0.bg-black\\/50').click();
    await expect(page.getByText('Edit Color')).not.toBeVisible();
  });

  test('should update color when changed via hex input', async ({ page }) => {
    await page.goto('/');

    const firstSwatchButton = page.locator('[id="palette-container"] > div').first().locator('button.font-mono');
    await firstSwatchButton.click();

    const hexInput = page.locator('#hex-input');
    await hexInput.fill('#FF5733');

    await page.keyboard.press('Escape');

    const updatedHex = await firstSwatchButton.textContent();
    expect(updatedHex).toBe('#FF5733');
  });
});
