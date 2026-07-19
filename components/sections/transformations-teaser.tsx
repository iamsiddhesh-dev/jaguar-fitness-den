import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { getMediaSlot } from '@/lib/media';

const transformationSlots = ['transformation-1', 'transformation-2', 'transformation-3'];

/** Before/after teaser strip — dummy media until real member results arrive. */
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
        <Badge variant="outline">Sample media — real member results coming soon</Badge>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {transformationSlots.map((slotId) => {
          const slot = getMediaSlot(slotId);
          return (
            <div
              key={slotId}
              className="rounded-card border-ivory-50/8 relative aspect-3/4 overflow-hidden border"
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
