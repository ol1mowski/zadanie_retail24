import { test, expect } from '@playwright/test';

test.describe('Stopwatch CRUD Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
  });

  test('should add a new stopwatch', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj stoper' }).first().click();

    await expect(page.getByText('Dodaj nowy stoper')).toBeVisible();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().slice(0, 16);

    await page.locator('#name').fill('Test Stoper E2E');
    await page.locator('#targetDate').fill(futureDateString);

    await page
      .locator('form')
      .getByRole('button', { name: 'Dodaj stoper' })
      .click();

    await expect(page.getByText('Dodaj nowy stoper')).not.toBeVisible();

    await expect(page.getByText('Test Stoper E2E')).toBeVisible();
  });

  test('should remove stopwatch with confirmation', async ({ page }) => {
    await page.waitForSelector('button:has-text("Usuń")', { timeout: 10000 });

    const removeButton = page.getByRole('button', { name: 'Usuń' }).first();
    await removeButton.click();

    await expect(page.getByText('Potwierdź usunięcie')).toBeVisible();

    await page.getByRole('button', { name: 'Usuń' }).last().click();

    await expect(page.getByText('Potwierdź usunięcie')).not.toBeVisible();
  });

  test('should cancel stopwatch removal', async ({ page }) => {
    await page.waitForSelector('button:has-text("Usuń")', { timeout: 10000 });

    const removeButton = page.getByRole('button', { name: 'Usuń' }).first();
    await removeButton.click();

    await expect(page.getByText('Potwierdź usunięcie')).toBeVisible();

    await page.getByRole('button', { name: 'Anuluj' }).click();

    await expect(page.getByText('Potwierdź usunięcie')).not.toBeVisible();
  });

  test('should validate stopwatch form', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj stoper' }).first().click();

    await expect(page.getByText('Dodaj nowy stoper')).toBeVisible();

    await page
      .locator('form')
      .getByRole('button', { name: 'Dodaj stoper' })
      .click();

    await expect(page.getByText('Dodaj nowy stoper')).toBeVisible();

    await expect(page.getByText('Błędy walidacji')).toBeVisible();
  });

  test('should reject past date', async ({ page }) => {
    await page.getByRole('button', { name: 'Dodaj stoper' }).first().click();

    await expect(page.getByText('Dodaj nowy stoper')).toBeVisible();

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateString = pastDate.toISOString().slice(0, 16);

    await page.locator('#name').fill('Test Stoper Przeszłość');
    await page.locator('#targetDate').fill(pastDateString);

    await page
      .locator('form')
      .getByRole('button', { name: 'Dodaj stoper' })
      .click();

    await expect(page.getByText('Dodaj nowy stoper')).toBeVisible();

    await expect(page.getByText('Błędy walidacji')).toBeVisible();

    await expect(
      page.getByText('Data docelowa musi być w przyszłości')
    ).toBeVisible();
  });
});
