import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { facilities } from '@/content/facilities';
import { pricingPlans } from '@/content/pricing';
import { CheckIcon } from './icons';
import { InrPrice } from './inr-price';
import { PromoBanner } from './promo-banner';

/** Annual membership framed as a monthly equivalent, with the promo banner. */
export function PricingTeaser() {
  const annual = pricingPlans.find((plan) => plan.id === 'annual-standard');
  if (!annual) throw new Error('Missing annual-standard plan in content/pricing.ts');
  const monthlyEquivalent = Math.round(annual.priceInr / 12);

  return (
    <SectionWrapper id="pricing" variant="dark">
      <PromoBanner />

      <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>Membership</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            One Membership. Everything Included.
          </Heading>
          <p className="font-display text-gold-400 mt-6 text-5xl font-semibold uppercase">
            <InrPrice amount={monthlyEquivalent} />
            <span className="text-smoke-400 font-sans text-base font-normal normal-case">
              {' '}
              / month equivalent
            </span>
          </p>
          <p className="text-smoke-400 mt-2 font-sans text-sm leading-relaxed">
            Billed annually at <InrPrice amount={annual.priceInr} /> — {annual.description}
          </p>
          <div className="mt-8">
            <Button href="/pricing">See Membership Options</Button>
          </div>
        </div>

        <Card variant="dark">
          <Heading level={3} size="md">
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
    </SectionWrapper>
  );
}
