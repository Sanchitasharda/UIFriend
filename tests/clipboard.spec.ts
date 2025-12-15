import { test, expect } from '@playwright/test';

test.describe('Clipboard', () => {
  test('should show toast notification when copying hex code', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    const firstSwatchButton = page.locator('[id="palette-container"] > div').first().locator('button.font-mono');
    const hexCode = await firstSwatchButton.textContent();

    await firstSwatchButton.click({ force: true });

    await expect(page.getByText(`Copied ${hexCode}`)).toBeVisible();
  });

  test('should copy hex code to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    const firstSwatchButton = page.locator('[id="palette-container"] > div').first().locator('button.font-mono');
    const hexCode = await firstSwatchButton.textContent();

    await firstSwatchButton.click({ force: true });

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(hexCode);
  });

  test('toast should auto-dismiss after 3 seconds', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');

    const firstSwatchButton = page.locator('[id="palette-container"] > div').first().locator('button.font-mono');
    const hexCode = await firstSwatchButton.textContent();

    await firstSwatchButton.click({ force: true });

    await expect(page.getByText(`Copied ${hexCode}`)).toBeVisible();

    await page.waitForTimeout(3500);

    await expect(page.getByText(`Copied ${hexCode}`)).not.toBeVisible();
  });
});
