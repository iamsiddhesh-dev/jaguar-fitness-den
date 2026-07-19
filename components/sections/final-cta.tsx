import { CTABand } from '@/components/ui/cta-band';
import { TrackedButton } from '@/components/ui/tracked-button';
import { siteConfig } from '@/content/site-config';
import { ANALYTICS_EVENTS } from '@/lib/analytics';
import { whatsappHref } from '@/lib/links';

/** Final conversion band before the footer. */
export function FinalCta() {
  return (
    <CTABand
      title="Ready to Train With the Best?"
      subtitle="Book a free trial and see the facility for yourself — no commitment, just a serious workout."
    >
      <TrackedButton
        href="/contact"
        size="lg"
        event={ANALYTICS_EVENTS.TRIAL_CTA_CLICK}
        eventParams={{ cta_location: 'final_cta' }}
      >
        Book Free Trial
      </TrackedButton>
      <TrackedButton
        href={whatsappHref()}
        variant="outline"
        size="lg"
        target="_blank"
        rel="noopener noreferrer"
        event={ANALYTICS_EVENTS.WHATSAPP_CLICK}
        eventParams={{ cta_location: 'final_cta' }}
      >
        WhatsApp Us
      </TrackedButton>
      <TrackedButton
        href={`tel:${siteConfig.phones.primary.e164}`}
        variant="ghost"
        size="lg"
        event={ANALYTICS_EVENTS.CALL_CLICK}
        eventParams={{ phone_number: 'primary' }}
      >
        Call {siteConfig.phones.primary.display}
      </TrackedButton>
    </CTABand>
  );
}
