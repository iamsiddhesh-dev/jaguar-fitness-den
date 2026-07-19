import { test, expect } from '@playwright/test';
import { siteConfig } from '../content/site-config';
import { navLinks } from '../lib/nav';

test.describe('layout shell — desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('primary nav links to every sitemap route', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav).toBeVisible();

    for (const link of navLinks) {
      await expect(nav.getByRole('link', { name: link.label, exact: true })).toHaveAttribute(
        'href',
        link.href,
      );
    }
  });

  test('footer NAP matches site-config', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText(siteConfig.address.full);
    await expect(footer).toContainText(siteConfig.phones.primary.display);
    await expect(footer).toContainText(siteConfig.phones.secondary.display);
    await expect(footer).toContainText(siteConfig.hours.spec[0].label);
  });

  test('sticky mobile bar is not visible on desktop', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Book Trial', exact: true })).toBeHidden({
      timeout: 1000,
    });
  });
});

test.describe('layout shell — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('nav works via the mobile menu and chrome persists across routes', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: 'Open menu' });
    await toggle.click();

    const mobileNav = page.getByRole('navigation', { name: 'Mobile' });
    await expect(mobileNav).toBeVisible();

    await mobileNav.getByRole('link', { name: 'FAQ', exact: true }).click();
    await expect(page).toHaveURL('/faq');

    // Global chrome (header + footer) still renders on a route with no page yet (on-brand 404).
    await expect(page.getByRole('link', { name: 'Jaguar Fitness Den', exact: true })).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(mobileNav).toBeHidden();
  });

  test('sticky bottom bar (Call / WhatsApp / Book Trial) is visible', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Call', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'WhatsApp', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book Trial', exact: true })).toBeVisible();
  });
});
