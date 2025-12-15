import { test, expect } from '@playwright/test';

test.describe('Export Functionality', () => {
  test('should open export menu when clicking export button', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /export/i }).click();

    await expect(page.getByText('PNG Image')).toBeVisible();
    await expect(page.getByText('CSS Code')).toBeVisible();
    await expect(page.getByText('JSON Data')).toBeVisible();
  });

  test('should close export menu when clicking outside', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /export/i }).click();
    await expect(page.getByText('PNG Image')).toBeVisible();

    await page.locator('body').click({ position: { x: 10, y: 10 } });

    await expect(page.getByText('PNG Image')).not.toBeVisible();
  });

  test('should show success toast when exporting as PNG', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /export/i }).click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByText('PNG Image').click();

    await expect(page.getByText('Palette exported as PNG')).toBeVisible();
  });

  test('should show success toast when exporting as CSS', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /export/i }).click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByText('CSS Code').click();

    await expect(page.getByText('Palette exported as CSS')).toBeVisible();
  });

  test('should show success toast when exporting as JSON', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /export/i }).click();

    const downloadPromise = page.waitForEvent('download');
    await page.getByText('JSON Data').click();

    await expect(page.getByText('Palette exported as JSON')).toBeVisible();
  });
});
