import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { programs } from '@/content/programs';
import { siteConfig } from '@/content/site-config';
import { whatsappHref } from '@/lib/links';

export const metadata: Metadata = {
  title: 'Contact Us | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Book a free trial at Jaguar Fitness Den, Panchavati, Nashik — call, WhatsApp, or send an enquiry. Floor No. 5, Laxmi Sky Park, Dindori Road.',
};

const inputClasses =
  'h-12 w-full rounded-btn border border-ivory-50/15 bg-charcoal-800 px-4 font-sans text-sm text-ivory-50 placeholder:text-smoke-500 focus-visible:border-gold-400';

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
            Call, WhatsApp, or send an enquiry below — we&rsquo;ll get back to you to schedule
            your trial session.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Card variant="dark">
            <Heading level={2} size="md">
              Send an Enquiry
            </Heading>
            <form className="mt-6 flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="text-smoke-300 mb-2 block font-sans text-sm">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={inputClasses}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-smoke-300 mb-2 block font-sans text-sm">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  className={inputClasses}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="interest" className="text-smoke-300 mb-2 block font-sans text-sm">
                  I&rsquo;m interested in
                </label>
                <select id="interest" name="interest" required className={inputClasses}>
                  <option value="">Select a program</option>
                  <option value="general">General enquiry / free trial</option>
                  {programs.map((program) => (
                    <option key={program.slug} value={program.slug}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-smoke-300 mb-2 block font-sans text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="border-ivory-50/15 bg-charcoal-800 placeholder:text-smoke-500 focus-visible:border-gold-400 w-full rounded-btn border px-4 py-3 font-sans text-sm text-ivory-50"
                  placeholder="Tell us a bit about your goals"
                />
              </div>

              <Button type="submit" size="lg" className="mt-2">
                Send Enquiry
              </Button>
              <p className="text-smoke-500 font-sans text-xs">
                Prefer talking now? Call or WhatsApp us directly below — enquiry submissions are
                coming soon.
              </p>
            </form>
          </Card>

          <div className="flex flex-col gap-6">
            <Card variant="dark">
              <Heading level={2} size="md">
                Call or WhatsApp
              </Heading>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={`tel:${siteConfig.phones.primary.e164}`} size="lg">
                  Call {siteConfig.phones.primary.display}
                </Button>
                <Button href={`tel:${siteConfig.phones.secondary.e164}`} variant="outline" size="lg">
                  Call {siteConfig.phones.secondary.display}
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
