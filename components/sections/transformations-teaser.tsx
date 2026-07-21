import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { getMediaSlot } from '@/lib/media';

const transformationSlots = ['transformation-1', 'transformation-2', 'transformation-3'];

/** Before/after teaser strip — slides 1-2 are real member results; slide 3 is still a placeholder. */
export function TransformationsTeaser() {
  return (
    <SectionWrapper variant="darker">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow>Results</Eyebrow>
          <Heading level={2} size="xl" className="mt-3">
            Transformations Happen Here
          </Heading>
        </div>
        <Badge variant="outline">Real member transformations — more added soon</Badge>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {transformationSlots.map((slotId) => {
          const slot = getMediaSlot(slotId);
          return (
            <div
              key={slotId}
              className="rounded-card border-gold-400/30 relative aspect-3/4 overflow-hidden border shadow-[0_20px_50px_-20px_rgb(217_164_65/0.35)]"
            >
              <Image
                src={slot.placeholderPath}
                alt={slot.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <Button href="/gallery" variant="outline">
          View the Gallery
        </Button>
      </div>
    </SectionWrapper>
  );
}
