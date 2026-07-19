import Link from 'next/link';
import { siteConfig } from '@/content/site-config';

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
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 8.8c.2-1 1-1 1.4-1 .3 0 .6 0 .8.5.2.5.7 1.6.7 1.8s0 .3-.2.5c-.2.3-.4.4-.5.6-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.2 1.3 1.1 2.3 1.4 2.6 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.8.8 2.1 1 .3.1.5.2.6.3.1.2.1 1-.3 1.9-.4.9-2 1.7-2.8 1.8-.7.1-1.6.2-5-1.2-4.2-1.7-6.9-6-7.1-6.3-.2-.3-1.7-2.3-1.7-4.3 0-2 1-3 1.4-3.4.4-.4.8-.5 1-.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
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
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.e164.replace('+', '')}?text=${encodeURIComponent(
    siteConfig.whatsapp.defaultMessage,
  )}`;

  return (
    <div className="bg-charcoal-950 border-ivory-50/10 fixed inset-x-0 bottom-0 z-40 flex border-t md:hidden">
      <a
        href={`tel:${siteConfig.phones.primary.e164}`}
        className="text-ivory-50 hover:text-gold-400 border-ivory-50/10 flex flex-1 flex-col items-center justify-center gap-1 border-r py-2.5 font-sans text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors"
      >
        <PhoneIcon />
        Call
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ivory-50 hover:text-gold-400 border-ivory-50/10 flex flex-1 flex-col items-center justify-center gap-1 border-r py-2.5 font-sans text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
      <Link
        href="/contact"
        className="bg-gold-400 text-charcoal-950 hover:bg-gold-300 flex flex-1 flex-col items-center justify-center gap-1 py-2.5 font-sans text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors"
      >
        <DumbbellIcon />
        Book Trial
      </Link>
    </div>
  );
}
