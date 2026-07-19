import { test, expect } from '@playwright/test';
import { blogPosts } from '../content/blog';

test.describe('blog index', () => {
  test('lists every article with a reading time', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    for (const post of blogPosts) {
      await expect(page.getByRole('link', { name: new RegExp(post.title, 'i') })).toBeVisible();
    }

    await expect(page.getByText(/\d+ min read/).first()).toBeVisible();
  });

  test('links through to an article', async ({ page }) => {
    await page.goto('/blog');
    await page.locator(`a[href="/blog/${blogPosts[0].slug}"]`).click();
    await expect(page).toHaveURL(`/blog/${blogPosts[0].slug}`);
  });
});

test.describe('blog articles — generated from MDX', () => {
  for (const post of blogPosts) {
    test(`/blog/${post.slug} renders its body and internal links`, async ({ page }) => {
      const response = await page.goto(`/blog/${post.slug}`);
      expect(response?.status()).toBeLessThan(400);

      await expect(page.getByRole('heading', { level: 1, name: post.title })).toBeVisible();
      await expect(page.getByText(/\d+ min read/)).toBeVisible();

      // MDX body rendered through the global component map.
      await expect(page.locator('article h2').first()).toBeVisible();

      // Internal links inside the article body itself, not the shared footer.
      for (const programSlug of post.relatedPrograms) {
        await expect(
          page.locator(`article a[href="/programs/${programSlug}"]`).first(),
        ).toBeVisible();
      }

      await expect(page.locator('article a[href="/pricing"]').first()).toBeVisible();
      await expect(page.locator('article a[href="/contact"]').first()).toBeVisible();
    });
  }

  test('an unknown slug 404s', async ({ page }) => {
    const response = await page.goto('/blog/not-a-real-article');
    expect(response?.status()).toBe(404);
  });

  test('publishes no address other than the official Panchavati NAP', async ({ page }) => {
    await page.goto(`/blog/${blogPosts[0].slug}`);
    const bodyText = await page.locator('main').innerText();
    expect(bodyText.toLowerCase()).not.toContain('reliance petrol pump');
  });
});
