import { siteConfig } from '@/content/site-config';

/** WhatsApp deep link with the prefilled enquiry message from site-config. */
export function whatsappHref(): string {
  return `https://wa.me/${siteConfig.whatsapp.e164.replace('+', '')}?text=${encodeURIComponent(
    siteConfig.whatsapp.defaultMessage,
  )}`;
}
