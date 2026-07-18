import { JaguarDivider } from '@/components/ui/jaguar-divider';
import { Wordmark } from '@/components/ui/wordmark';

// Placeholder until Phase 4 builds the real Home page.
export default function Home() {
  return (
    <main className="bg-charcoal-950 flex flex-1 flex-col items-center justify-center gap-8 px-5 py-24 text-center">
      <Wordmark size="lg" />
      <JaguarDivider />
      <p className="text-smoke-400 max-w-md font-sans text-sm leading-relaxed">
        Nashik&rsquo;s premium fitness destination — site under construction.
      </p>
    </main>
  );
}
