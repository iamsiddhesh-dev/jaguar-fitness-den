import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import type { PromoBanner as PromoBannerData } from '@/content/types';
import { PromoBanner } from './promo-banner';

const banner: PromoBannerData = {
  active: true,
  priceInr: 11999,
  originalPriceInr: 18000,
  label: 'Limited-time annual offer',
  description: 'Join now and lock in a full year at the promo rate.',
};

const storageKey = `jfd-promo-dismissed-${banner.priceInr}`;

describe('PromoBanner', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows the offer with promo and original price when active', async () => {
    render(<PromoBanner banner={banner} />);
    const bannerEl = await screen.findByTestId('promo-banner');
    // Prices render via InrPrice (₹ sign in its own span), so match on textContent.
    expect(bannerEl.textContent).toContain('₹11,999');
    expect(bannerEl.textContent).toContain('₹18,000');
  });

  it('renders nothing when the promo is inactive', () => {
    render(<PromoBanner banner={{ ...banner, active: false }} />);
    expect(screen.queryByTestId('promo-banner')).not.toBeInTheDocument();
  });

  it('dismisses on click and persists the dismissal to localStorage', async () => {
    const user = userEvent.setup();
    render(<PromoBanner banner={banner} />);
    await user.click(await screen.findByRole('button', { name: 'Dismiss offer' }));
    expect(screen.queryByTestId('promo-banner')).not.toBeInTheDocument();
    expect(window.localStorage.getItem(storageKey)).toBe('1');
  });

  it('stays hidden when previously dismissed', () => {
    window.localStorage.setItem(storageKey, '1');
    render(<PromoBanner banner={banner} />);
    expect(screen.queryByTestId('promo-banner')).not.toBeInTheDocument();
  });

  it('shows again for a different promo price', async () => {
    window.localStorage.setItem(storageKey, '1');
    render(<PromoBanner banner={{ ...banner, priceInr: 9999 }} />);
    expect(await screen.findByTestId('promo-banner')).toBeInTheDocument();
  });
});
