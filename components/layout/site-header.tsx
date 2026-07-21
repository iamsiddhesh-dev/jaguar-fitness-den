'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { navLinks } from '@/lib/nav';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Wordmark } from '@/components/ui/wordmark';

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M4 7h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M4 12h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <path d="M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Client-side transitions don't remount the header, so close the mobile
  // panel whenever the route changes rather than relying on each link's
  // onClick (Button doesn't forward onClick when rendered as a Link).
  // Adjusted during render (not an effect) per the "adjust state during
  // render" pattern — https://react.dev/learn/you-might-not-need-an-effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header data-scrolled={scrolled} className="fixed inset-x-0 top-0 z-50">
      {/*
        The blur/background lives on this inner wrapper, not <header> itself:
        backdrop-filter establishes a new containing block for fixed-position
        descendants, which would collapse the mobile nav panel below (its
        top/bottom offsets would resolve against this ~64px bar instead of
        the viewport).
      */}
      <div
        className={cn(
          'transition-colors duration-300',
          scrolled || menuOpen
            ? 'bg-charcoal-950/95 border-ivory-50/10 border-b shadow-lg backdrop-blur'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8 md:h-20">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Wordmark size="sm" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ivory-50 hover:text-gold-400 font-sans text-xs font-semibold tracking-[0.14em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:block">
            <Button
              href="/contact"
              size="sm"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.TRIAL_CTA_CLICK, { cta_location: 'header' })
              }
            >
              Book Free Trial
            </Button>
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-ivory-50 hover:text-gold-400 -mr-2 flex h-10 w-10 items-center justify-center xl:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-panel"
        className={cn(
          'bg-charcoal-950 fixed inset-x-0 top-16 bottom-0 overflow-y-auto md:top-20 xl:hidden',
          menuOpen ? 'block' : 'hidden',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 py-8 sm:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-ivory-50 hover:text-gold-400 border-ivory-50/8 font-display border-b py-4 text-lg font-medium tracking-wide uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href="/contact"
            size="lg"
            className="mt-8"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.TRIAL_CTA_CLICK, { cta_location: 'mobile_menu' })
            }
          >
            Book Free Trial
          </Button>
        </nav>
      </div>
    </header>
  );
}
