import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { getMediaSlot } from '@/lib/media';
import { CheckIcon } from './icons';

const appFeatures = [
  'Every workout logged, set by set',
  'Diet plans from our nutrition coaches',
  'Body-stat tracking that shows your progress',
];

/** Members-app differentiator block — no other gym in the area offers this. */
export function MemberAppHighlight() {
  const screenshot = getMediaSlot('member-app-screenshot');

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
            <Button href="/contact" variant="outline">
              See It on a Free Trial
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="border-ivory-50/10 bg-charcoal-800 relative w-full max-w-[260px] rounded-[2rem] border p-3 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)]">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Members Exclusive</Badge>
            <div className="relative aspect-1/2 overflow-hidden rounded-[1.4rem]">
              <Image
                src={screenshot.placeholderPath}
                alt={screenshot.alt}
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
