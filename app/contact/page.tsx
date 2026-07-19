import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { TrackedButton } from '@/components/ui/tracked-button';
import { ContactForm } from '@/components/sections/contact-form';
import { siteConfig } from '@/content/site-config';
import { ANALYTICS_EVENTS } from '@/lib/analytics';
import { whatsappHref } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Contact Us | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Book a free trial at Jaguar Fitness Den, Panchavati, Nashik — call, WhatsApp, or send an enquiry. Floor No. 5, Laxmi Sky Park, Dindori Road.',
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>Contact</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            Book Your Free Trial
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            Call, WhatsApp, or send an enquiry below — we&rsquo;ll get back to you to schedule your
            trial session.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Card variant="dark">
            <Heading level={2} size="md">
              Send an Enquiry
            </Heading>
            <ContactForm />
          </Card>

          <div className="flex flex-col gap-6">
            <Card variant="dark">
              <Heading level={2} size="md">
                Call or WhatsApp
              </Heading>
              <div className="mt-5 flex flex-col gap-3">
                <TrackedButton
                  href={`tel:${siteConfig.phones.primary.e164}`}
                  size="lg"
                  event={ANALYTICS_EVENTS.CALL_CLICK}
                  eventParams={{ phone_number: 'primary' }}
                >
                  Call {siteConfig.phones.primary.display}
                </TrackedButton>
                <TrackedButton
                  href={`tel:${siteConfig.phones.secondary.e164}`}
                  variant="outline"
                  size="lg"
                  event={ANALYTICS_EVENTS.CALL_CLICK}
                  eventParams={{ phone_number: 'secondary' }}
                >
                  Call {siteConfig.phones.secondary.display}
                </TrackedButton>
                <TrackedButton
                  href={whatsappHref()}
                  variant="outline"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  event={ANALYTICS_EVENTS.WHATSAPP_CLICK}
                  eventParams={{ cta_location: 'contact_page' }}
                >
                  WhatsApp Us
                </TrackedButton>
              </div>
            </Card>

            <Card variant="dark">
              <Heading level={2} size="md">
                Visit Us
              </Heading>
              <address className="text-smoke-300 mt-3 font-sans text-sm leading-relaxed not-italic">
                {siteConfig.address.full}
              </address>
              <dl className="border-ivory-50/8 mt-5 space-y-1 border-t pt-4">
                {siteConfig.hours.spec.map((hours) => (
                  <dd key={hours.label} className="text-smoke-300 font-sans text-sm">
                    {hours.label}
                  </dd>
                ))}
              </dl>
            </Card>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
