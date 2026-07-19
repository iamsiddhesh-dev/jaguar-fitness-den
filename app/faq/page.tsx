import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { faqs } from '@/content/faq';
import type { FaqItem } from '@/content/types';
import { FaqAccordion } from '@/components/sections/faq-accordion';

export const metadata: Metadata = {
  title: 'FAQ | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Answers about hours, parking, steam rooms, membership cost, and directions from Meri & Mhasrul to Jaguar Fitness Den, Panchavati, Nashik.',
};

const categoryLabels: Record<FaqItem['category'], string> = {
  location: 'Location & Directions',
  facilities: 'Facilities',
  pricing: 'Pricing',
  general: 'General',
};

const categoryOrder: FaqItem['category'][] = ['general', 'location', 'facilities', 'pricing'];

export default function FaqPage() {
  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>FAQ</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            Frequently Asked Questions
          </Heading>
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {categoryOrder.map((category) => {
            const items = faqs.filter((item) => item.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <Heading level={2} size="md" className="mb-2">
                  {categoryLabels[category]}
                </Heading>
                <FaqAccordion items={items} />
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      <CTABand
        title="Still Have Questions?"
        subtitle="Call, WhatsApp, or send us an enquiry — we're happy to help before you book a trial."
      >
        <Button href="/contact" size="lg">
          Contact Us
        </Button>
      </CTABand>
    </main>
  );
}
