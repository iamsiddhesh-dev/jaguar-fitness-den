'use client';

import Link from 'next/link';
import { siteConfig } from '@/content/site-config';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { whatsappHref } from '@/lib/links';

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2C10.5 19.5 4.5 13.5 4.5 5.5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884Zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M4 10v4M2 11v2M20 10v4M22 11v2M6 8v8M18 8v8M6 12h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Always-visible mobile conversion bar per docs/02-ux-design.md §4. */
export function StickyMobileBar() {
  return (
    <div className="bg-charcoal-950 border-ivory-50/10 fixed inset-x-0 bottom-0 z-40 flex border-t md:hidden">
      <a
        href={`tel:${siteConfig.phones.primary.e164}`}
        onClick={() => trackEvent(ANALYTICS_EVENTS.CALL_CLICK, { phone_number: 'primary' })}
        className="text-ivory-50 hover:text-gold-400 border-ivory-50/10 flex flex-1 flex-col items-center justify-center gap-1 border-r py-2.5 font-sans text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors"
      >
        <PhoneIcon />
        Call
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK, { cta_location: 'sticky_bar' })}
        className="text-ivory-50 hover:text-gold-400 border-ivory-50/10 flex flex-1 flex-col items-center justify-center gap-1 border-r py-2.5 font-sans text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <Link
        href="/contact"
        onClick={() => trackEvent(ANALYTICS_EVENTS.TRIAL_CTA_CLICK, { cta_location: 'sticky_bar' })}
        className="bg-gold-400 text-charcoal-950 hover:bg-gold-300 flex flex-1 flex-col items-center justify-center gap-1 py-2.5 font-sans text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors"
      >
        <DumbbellIcon />
        Book Trial
      </Link>
    </div>
  );
}
