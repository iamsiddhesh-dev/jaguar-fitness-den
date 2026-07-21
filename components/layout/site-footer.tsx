'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import { footerQuickLinks } from '@/lib/nav';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { Wordmark } from '@/components/ui/wordmark';
import { JaguarDivider } from '@/components/ui/jaguar-divider';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 border-ivory-50/10 border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/images/logo/jaguar-badge.jpg"
            alt="Jaguar Fitness Den crest"
            width={56}
            height={56}
            className="rounded-full"
          />
          <Wordmark size="sm" />
          <p className="text-smoke-400 max-w-xs font-sans text-sm leading-relaxed">
            {siteConfig.tagline}.
          </p>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jaguar Fitness Den on Instagram"
            className="text-smoke-400 hover:text-gold-400 transition-colors"
          >
            <InstagramIcon />
          </a>
        </div>

        <div>
          <h2 className="text-smoke-500 mb-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase">
            Visit Us
          </h2>
          <address className="text-smoke-300 not-italic">
            <p className="font-sans text-sm leading-relaxed">{siteConfig.address.full}</p>
            <p className="mt-4 flex flex-col gap-1 font-sans text-sm">
              <a
                href={`tel:${siteConfig.phones.primary.e164}`}
                className="hover:text-gold-400"
                onClick={() => trackEvent(ANALYTICS_EVENTS.CALL_CLICK, { phone_number: 'primary' })}
              >
                {siteConfig.phones.primary.display}
              </a>
              <a
                href={`tel:${siteConfig.phones.secondary.e164}`}
                className="hover:text-gold-400"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.CALL_CLICK, { phone_number: 'secondary' })
                }
              >
                {siteConfig.phones.secondary.display}
              </a>
            </p>
            <p className="text-smoke-500 mt-4 font-sans text-xs">
              Justdial: {siteConfig.social.justdial}
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-smoke-500 mb-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase">
            Hours
          </h2>
          <ul className="text-smoke-300 flex flex-col gap-2 font-sans text-sm">
            {siteConfig.hours.spec.map((spec) => (
              <li key={spec.label}>{spec.label}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-smoke-500 mb-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-2">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-smoke-300 hover:text-gold-400 font-sans text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <JaguarDivider className="opacity-40" />

      <div className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8">
        <p className="text-smoke-500 text-center font-sans text-xs">
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
