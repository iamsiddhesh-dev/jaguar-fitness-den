import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { StarIcon } from './icons';

/**
 * Clearly-labeled sample review layout. Swap for real Google reviews once
 * GBP access is arranged — do not present these as genuine testimonials.
 */
const sampleReviews = [
  {
    id: 'sample-1',
    quote:
      'Sample review text — a member describing the equipment quality and how the trainers structure their program.',
    attribution: 'Sample layout · real Google review will appear here',
  },
  {
    id: 'sample-2',
    quote:
      'Sample review text — a member describing the steam room, the lounge, and the overall premium feel of the facility.',
    attribution: 'Sample layout · real Google review will appear here',
  },
  {
    id: 'sample-3',
    quote:
      'Sample review text — a member from the Meri side describing how easy the ride to Dindori Road is.',
    attribution: 'Sample layout · real Google review will appear here',
  },
];

export function ReviewsStrip() {
  return (
    <SectionWrapper variant="light">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow tone="light">Reviews</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            What Members Say
          </Heading>
        </div>
        <Badge variant="outline" className="border-gold-700/50 text-gold-700">
          Sample layout — live Google reviews coming soon
        </Badge>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {sampleReviews.map((review) => (
          <Card key={review.id} variant="light" className="flex h-full flex-col">
            <div aria-hidden="true" className="text-gold-600 flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <blockquote className="text-ink-700 mt-4 flex-1 font-sans text-sm leading-relaxed italic">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <p className="text-ink-600 mt-4 font-sans text-xs font-semibold tracking-[0.12em] uppercase">
              {review.attribution}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
