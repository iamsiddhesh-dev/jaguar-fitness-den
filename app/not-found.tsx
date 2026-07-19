import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { JaguarDivider } from '@/components/ui/jaguar-divider';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { Wordmark } from '@/components/ui/wordmark';

export const metadata: Metadata = {
  title: 'Page Not Found — Jaguar Fitness Den',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1">
      <SectionWrapper variant="darker" className="flex flex-1 items-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <Wordmark size="md" />
          <JaguarDivider />
          <Heading level={1} size="xl">
            404 — Lost the Track
          </Heading>
          <p className="text-smoke-400 max-w-md font-sans text-sm leading-relaxed">
            The page you&rsquo;re looking for doesn&rsquo;t exist. Head back and pick up where you
            left off.
          </p>
          <Button href="/" size="lg">
            Back to Home
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
