import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { TrackedButton } from '@/components/ui/tracked-button';
import { ANALYTICS_EVENTS } from '@/lib/analytics';
import { getMediaSlot } from '@/lib/media';
import { CheckIcon } from './icons';
import { MemberAppCarousel } from './member-app-carousel';

const screenshots = [
  { slotId: 'member-app-home', label: 'Track Your Goals' },
  { slotId: 'member-app-workout-tracker', label: 'Workout Tracker' },
  { slotId: 'member-app-water-intake', label: 'Log Your Water Intake' },
] as const;

const appFeatures = [
  'Every workout logged, set by set',
  'Diet plans from our nutrition coaches',
  'Body-stat tracking that shows your progress',
];

/** Members-app differentiator block — no other gym in the area offers this. */
export function MemberAppHighlight() {
  const slides = screenshots.map(({ slotId, label }) => {
    const slot = getMediaSlot(slotId);
    return { src: slot.placeholderPath, alt: slot.alt, label };
  });

  return (
    <SectionWrapper variant="dark">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>Members App</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Your Coach, In Your Pocket
          </Heading>
          <p className="text-smoke-400 mt-4 max-w-md font-sans text-base leading-relaxed">
            Every Jaguar membership includes our members app — the only one of its kind at any gym
            in the area.
          </p>
          <ul className="mt-6 space-y-3">
            {appFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckIcon className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-smoke-300 font-sans text-sm leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TrackedButton
              href="/contact"
              variant="outline"
              event={ANALYTICS_EVENTS.TRIAL_CTA_CLICK}
              eventParams={{ cta_location: 'member_app_highlight' }}
            >
              See It on a Free Trial
            </TrackedButton>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="from-gold-300 via-gold-400 to-gold-500 mb-4 inline-flex items-center gap-2 rounded-full bg-linear-to-r px-4 py-1.5 shadow-[0_6px_20px_-6px_rgb(212_160_23/0.6)]">
            <span className="text-charcoal-950 font-sans text-xs font-bold tracking-[0.12em] whitespace-nowrap uppercase">
              Members Exclusive
            </span>
          </div>

          <div className="border-ivory-50/10 bg-charcoal-800 w-full max-w-[260px] rounded-[2rem] border p-3 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)]">
            <div className="relative aspect-1/2 overflow-hidden rounded-[1.4rem]">
              <MemberAppCarousel slides={slides} />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
