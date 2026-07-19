import { test, expect } from '@playwright/test';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

async function fillRequiredFields(page: import('@playwright/test').Page) {
  await page.getByLabel('Full name').fill('Test User');
  await page.getByLabel('Phone number').fill('9876543210');
  await page.getByLabel(/interested in/i).selectOption('general');
}

test.describe('contact form — validation', () => {
  test('blocks submission when required fields are empty', async ({ page }) => {
    await page.goto('/contact');
    const nameInput = page.getByLabel('Full name');
    await page.getByRole('button', { name: 'Send Enquiry' }).click();
    const isInvalid = await nameInput.evaluate((el) => !(el as HTMLInputElement).validity.valid);
    expect(isInvalid).toBe(true);
    await expect(page.getByText('Enquiry sent')).toHaveCount(0);
  });

  test('honeypot field is present but positioned off-screen', async ({ page }) => {
    await page.goto('/contact');
    const honeypot = page.locator('input[name="company_website"]');
    await expect(honeypot).toBeAttached();
    const box = await honeypot.boundingBox();
    expect(box?.x).toBeLessThan(0);
  });
});

test.describe('contact form — mocked submit', () => {
  test('shows a success state on a successful submit', async ({ page }) => {
    await page.route(WEB3FORMS_URL, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      });
    });

    await page.goto('/contact');
    await fillRequiredFields(page);
    await page.getByRole('button', { name: 'Send Enquiry' }).click();

    await expect(page.getByText('Enquiry sent')).toBeVisible();
  });

  test('shows an error message when the endpoint reports failure', async ({ page }) => {
    await page.route(WEB3FORMS_URL, async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'invalid access key' }),
      });
    });

    await page.goto('/contact');
    await fillRequiredFields(page);
    await page.getByRole('button', { name: 'Send Enquiry' }).click();

    await expect(page.getByText('Something went wrong sending your enquiry')).toBeVisible();
  });

  test('shows an error message when the request itself fails', async ({ page }) => {
    await page.route(WEB3FORMS_URL, async (route) => {
      await route.abort('failed');
    });

    await page.goto('/contact');
    await fillRequiredFields(page);
    await page.getByRole('button', { name: 'Send Enquiry' }).click();

    await expect(page.getByText('Something went wrong sending your enquiry')).toBeVisible();
  });

  test('silently drops submission when the honeypot is filled (bot simulation)', async ({
    page,
  }) => {
    let submitCalled = false;
    await page.route(WEB3FORMS_URL, async (route) => {
      submitCalled = true;
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.goto('/contact');
    await fillRequiredFields(page);
    await page.locator('input[name="company_website"]').fill('http://spam.example', {
      force: true,
    });
    await page.getByRole('button', { name: 'Send Enquiry' }).click();

    await expect(page.getByText('Enquiry sent')).toBeVisible();
    expect(submitCalled).toBe(false);
  });
});
