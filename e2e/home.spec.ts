import { test, expect } from '@playwright/test';
import { promoBanner } from '../content/pricing';

test.describe('home page — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('renders all sections pitch-ready on a phone', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 1, name: /premium fitness destination/i }),
    ).toBeVisible();
    for (const heading of [
      'Built Like No Other Gym in Nashik',
      'Six Ways to Train',
      'Your Coach, In Your Pocket',
      'Transformations Happen Here',
      'What Members Say',
      'One Membership. Everything Included.',
      'Floor 5, Laxmi Sky Park',
      'Ready to Train With the Best?',
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toBeAttached();
    }
    // All 6 programs from the content layer render as cards.
    await expect(page.locator('a[href^="/programs/"]')).toHaveCount(6);
  });

  test('hero CTA navigates to the trial booking page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#hero').getByRole('link', { name: 'Book Free Trial', exact: true }).click();
    await expect(page).toHaveURL('/contact');
  });

  test('promo banner dismisses and stays dismissed across reloads', async ({ page }) => {
    await page.goto('/');
    const banner = page.getByTestId('promo-banner');
    await banner.scrollIntoViewIfNeeded();
    await expect(banner).toBeVisible();

    await banner.getByRole('button', { name: 'Dismiss offer' }).click();
    await expect(banner).toBeHidden();

    await page.reload();
    // Dismissal must have persisted to localStorage…
    const stored = await page.evaluate(
      (key) => window.localStorage.getItem(key),
      `jfd-promo-dismissed-${promoBanner.priceInr}`,
    );
    expect(stored).toBe('1');
    // …and the banner must not reappear once hydration has run.
    await page.waitForTimeout(1500);
    await expect(page.getByTestId('promo-banner')).toHaveCount(0);
  });
});

test.describe('home page — desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('hero scroll cue scrolls to the stats bar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Scroll to gym highlights' }).click();
    await expect(page.locator('#stats')).toBeInViewport();
  });
});
