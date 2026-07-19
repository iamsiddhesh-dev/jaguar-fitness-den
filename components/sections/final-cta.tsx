import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/ui/cta-band';
import { siteConfig } from '@/content/site-config';
import { whatsappHref } from '@/lib/links';

/** Final conversion band before the footer. */
export function FinalCta() {
  return (
    <CTABand
      title="Ready to Train With the Best?"
      subtitle="Book a free trial and see the facility for yourself — no commitment, just a serious workout."
    >
      <Button href="/contact" size="lg">
        Book Free Trial
      </Button>
      <Button
        href={whatsappHref()}
        variant="outline"
        size="lg"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp Us
      </Button>
      <Button href={`tel:${siteConfig.phones.primary.e164}`} variant="ghost" size="lg">
        Call {siteConfig.phones.primary.display}
      </Button>
    </CTABand>
  );
}
