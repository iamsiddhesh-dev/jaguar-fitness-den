import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { facilities } from '@/content/facilities';
import { addOns, pricingPlans } from '@/content/pricing';
import { CheckIcon } from '@/components/sections/icons';
import { InrPrice } from '@/components/sections/inr-price';
import { PromoBanner } from '@/components/sections/promo-banner';

export const metadata: Metadata = {
  title: 'Membership Pricing | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Jaguar Fitness Den annual membership: ₹18,000 with steam rooms, AC, group studios, and a members app all included. Panchavati, Nashik.',
};

export default function PricingPage() {
  const annual = pricingPlans.find((plan) => plan.id === 'annual-standard');
  if (!annual) throw new Error('Missing annual-standard plan in content/pricing.ts');
  const otherPlans = pricingPlans.filter((plan) => plan.id !== 'annual-standard');
  const monthlyEquivalent = Math.round(annual.priceInr / 12);

  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>Membership</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            One Membership. Everything Included.
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            No tiers to decode, no add-on fees for the basics — the annual membership includes the
            whole facility.
          </p>
        </div>

        <div className="mt-10">
          <PromoBanner />
        </div>

        <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
          <Card variant="dark" className="border-gold-400/40">
            <Badge>Flagship Membership</Badge>
            <Heading level={2} size="lg" className="mt-4">
              {annual.name}
            </Heading>
            <p className="font-display text-gold-400 mt-4 text-5xl font-semibold uppercase">
              <InrPrice amount={monthlyEquivalent} />
              <span className="text-smoke-400 font-sans text-base font-normal normal-case">
                {' '}
                / month equivalent
              </span>
            </p>
            <p className="text-smoke-400 mt-2 font-sans text-sm leading-relaxed">
              Billed annually at <InrPrice amount={annual.priceInr} /> — {annual.description}
            </p>
            <div className="mt-6">
              <Button href="/contact" size="lg">
                Book Free Trial
              </Button>
            </div>
          </Card>

          <Card variant="dark">
            <Heading level={2} size="lg">
              What&rsquo;s Included
            </Heading>
            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {facilities.map((facility) => (
                <li key={facility.id} className="flex items-center gap-2.5">
                  <CheckIcon className="text-gold-400 shrink-0" />
                  <span className="text-smoke-300 font-sans text-sm">{facility.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {otherPlans.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {otherPlans.map((plan) => (
              <Card key={plan.id} variant="dark" className="border-dashed">
                <Badge variant="neutral">Coming soon</Badge>
                <Heading level={3} size="md" className="mt-3">
                  {plan.name}
                </Heading>
                <p className="text-smoke-400 mt-2 font-sans text-sm leading-relaxed">
                  {plan.description}
                </p>
              </Card>
            ))}
          </div>
        ) : null}
      </SectionWrapper>

      <SectionWrapper variant="light">
        <div className="max-w-2xl">
          <Eyebrow tone="light">Add-Ons</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Go Further With Personal Coaching
          </Heading>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {addOns.map((addOn) => (
            <Card key={addOn.id} variant="light" className="h-full">
              <Heading level={3} size="md">
                {addOn.name}
              </Heading>
              <p className="text-ink-600 mt-2 font-sans text-sm leading-relaxed">
                {addOn.description}
              </p>
              <p className="text-gold-700 mt-4 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
                {addOn.priceInr === '[PLACEHOLDER]' ? 'Ask us for pricing' : (
                  <InrPrice amount={addOn.priceInr} />
                )}
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <CTABand
        title="Ready to Join?"
        subtitle="Book a free trial before you commit — see the facility, meet a trainer, feel the difference."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
      </CTABand>
    </main>
  );
}
