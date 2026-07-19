import { test, expect } from '@playwright/test';
import { additionalRoutes, navLinks } from '../lib/nav';
import { programs } from '../content/programs';

const allRoutes = [...navLinks, ...additionalRoutes];

test.describe('inner pages — every route renders', () => {
  for (const route of allRoutes) {
    test(`${route.href} renders with an h1 and no 404`, async ({ page }) => {
      const response = await page.goto(route.href);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText('404')).toHaveCount(0);
    });
  }
});

test.describe('program detail pages — generated from data', () => {
  for (const program of programs) {
    test(`/programs/${program.slug} renders the program name and CTA`, async ({ page }) => {
      await page.goto(`/programs/${program.slug}`);
      await expect(page.getByRole('heading', { level: 1, name: program.name })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Book Free Trial' }).first()).toBeVisible();
    });
  }

  test('programs index links to all 6 detail pages', async ({ page }) => {
    await page.goto('/programs');
    await expect(page.locator('a[href^="/programs/"]')).toHaveCount(programs.length);
  });
});

test.describe('FAQ accordion', () => {
  test('toggles an answer open on click', async ({ page }) => {
    await page.goto('/faq');
    const firstItem = page.locator('details').first();
    const summary = firstItem.locator('summary');
    await expect(firstItem).not.toHaveAttribute('open', '');
    await summary.click();
    await expect(firstItem).toHaveAttribute('open', '');
  });
});

test.describe('contact form', () => {
  test('renders name, phone, interest, and message fields', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByLabel('Full name')).toBeVisible();
    const phoneInput = page.getByLabel('Phone number');
    await expect(phoneInput).toBeVisible();
    await expect(phoneInput).toHaveAttribute('type', 'tel');
    await expect(page.getByLabel(/interested in/i)).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
  });
});

test.describe('locality landing page', () => {
  test('publishes no address other than the official Panchavati NAP', async ({ page }) => {
    await page.goto('/gym-near-meri-mhasrul');
    const bodyText = await page.locator('main').innerText();
    expect(bodyText.toLowerCase()).not.toContain('reliance petrol pump');
    expect(bodyText).toContain('Laxmi Sky Park');
  });
});

test.describe('location page', () => {
  test('renders a map embed and hours table', async ({ page }) => {
    await page.goto('/location');
    await expect(page.locator('iframe[title="Jaguar Fitness Den location map"]')).toBeVisible();
    await expect(page.locator('dl').getByText('Sunday')).toBeVisible();
  });
});
