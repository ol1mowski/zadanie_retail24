import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');
});

test('should share stopwatch and access via shared URL', async ({ page }) => {
  await page.getByRole('button', { name: 'Dodaj stoper' }).first().click();

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
  const futureDateString = futureDate.toISOString().slice(0, 16);

  await page.locator('#name').fill('Stoper do Udostępnienia');
  await page.locator('#targetDate').fill(futureDateString);
  await page
    .locator('form')
    .getByRole('button', { name: 'Dodaj stoper' })
    .click();

  await expect(page.getByText('Dodaj nowy stoper')).not.toBeVisible();
  await expect(page.getByText('Stoper do Udostępnienia')).toBeVisible();

  const stopwatchCard = page
    .locator('.bg-blue-100, .bg-yellow-100, .bg-red-100')
    .filter({ hasText: 'Stoper do Udostępnienia' });
  await stopwatchCard.getByRole('button', { name: 'Udostępnij' }).click();

  await expect(page.getByText('Udostępnij stoper')).toBeVisible();

  const shareInput = page.locator('#share-link');
  const shareUrl = await shareInput.inputValue();

  expect(shareUrl).toContain('/stopwatch/');
  expect(shareUrl).toContain('?data=');

  await page.getByRole('button', { name: 'Zamknij' }).click();
  await expect(page.getByText('Udostępnij stoper')).not.toBeVisible();

  await page.goto(shareUrl);

  await expect(page.getByText('Stoper do Udostępnienia')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Usuń' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Udostępnij' })).toBeVisible();

  await expect(page.getByText('Główna aplikacja')).toBeVisible();
});
