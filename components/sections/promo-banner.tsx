'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { promoBanner } from '@/content/pricing';
import type { PromoBanner as PromoBannerData } from '@/content/types';
import { InrPrice } from './inr-price';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type PromoBannerProps = {
  /** Overridable for tests — defaults to the content-layer promo data. */
  banner?: PromoBannerData;
};

// Notifies useSyncExternalStore subscribers when the banner is dismissed in
// this tab; the native "storage" event only covers other tabs.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

/**
 * Dismissible promo band. Dismissal persists in localStorage, keyed by the
 * promo price so a future different offer shows again. The server snapshot
 * reports "dismissed", so the banner appears only after hydration — no
 * hydration mismatch.
 */
export function PromoBanner({ banner = promoBanner }: PromoBannerProps) {
  const storageKey = `jfd-promo-dismissed-${banner.priceInr}`;

  const dismissed = useSyncExternalStore(
    subscribe,
    useCallback(() => window.localStorage.getItem(storageKey) !== null, [storageKey]),
    () => true,
  );

  if (!banner.active || dismissed) return null;

  const dismiss = () => {
    window.localStorage.setItem(storageKey, '1');
    listeners.forEach((listener) => listener());
  };

  return (
    <div
      data-testid="promo-banner"
      className="bg-gold-400 text-charcoal-950 rounded-card flex items-start justify-between gap-4 p-5"
    >
      <div>
        <p className="font-sans text-xs font-bold tracking-[0.18em] uppercase">{banner.label}</p>
        <p className="font-display mt-1 text-2xl font-semibold uppercase">
          <InrPrice amount={banner.priceInr} />{' '}
          <span className="text-charcoal-950 text-base font-medium line-through">
            <InrPrice amount={banner.originalPriceInr} />
          </span>
        </p>
        <p className="mt-1 font-sans text-sm">{banner.description}</p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss offer"
        className="hover:bg-charcoal-950/10 -mt-1 -mr-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
