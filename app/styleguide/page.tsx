import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { JaguarDivider } from '@/components/ui/jaguar-divider';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { StatBlock } from '@/components/ui/stat-block';
import { Wordmark } from '@/components/ui/wordmark';

export const metadata: Metadata = {
  title: 'Styleguide — Jaguar Fitness Den',
  robots: { index: false, follow: false },
};

const charcoals = [
  ['charcoal-950', '#0B0B0D', 'bg-charcoal-950'],
  ['charcoal-900', '#101012', 'bg-charcoal-900'],
  ['charcoal-850', '#151517', 'bg-charcoal-850'],
  ['charcoal-800', '#1B1B1F', 'bg-charcoal-800'],
  ['charcoal-750', '#202025', 'bg-charcoal-750'],
  ['charcoal-700', '#26262C', 'bg-charcoal-700'],
] as const;

const golds = [
  ['gold-50', '#FBF3E2', 'bg-gold-50'],
  ['gold-100', '#F6E7C4', 'bg-gold-100'],
  ['gold-200', '#EED49B', 'bg-gold-200'],
  ['gold-300', '#E6C377', 'bg-gold-300'],
  ['gold-400', '#D9A441', 'bg-gold-400'],
  ['gold-500', '#C89232', 'bg-gold-500'],
  ['gold-600', '#A87A26', 'bg-gold-600'],
  ['gold-700', '#8A6420', 'bg-gold-700'],
  ['gold-800', '#6F4F1A', 'bg-gold-800'],
  ['gold-900', '#52390F', 'bg-gold-900'],
] as const;

const lights = [
  ['ivory-50', '#FAF8F3', 'bg-ivory-50'],
  ['ivory-100', '#F4F1E9', 'bg-ivory-100'],
  ['ivory-200', '#EAE5D8', 'bg-ivory-200'],
  ['ivory-300', '#DDD6C3', 'bg-ivory-300'],
] as const;

function Swatch({ name, hex, bg }: { name: string; hex: string; bg: string }) {
  return (
    <div className="min-w-0">
      <div className={`rounded-card border-ivory-50/10 h-16 border ${bg}`} />
      <p className="text-smoke-300 mt-2 truncate font-sans text-xs font-medium">{name}</p>
      <p className="text-smoke-500 font-sans text-xs">{hex}</p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-smoke-500 mb-4 font-sans text-xs font-semibold tracking-[0.2em] uppercase">
      {children}
    </p>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main className="flex-1">
      {/* ——— Masthead ——— */}
      <SectionWrapper variant="darker" compact>
        <div className="flex flex-col items-center gap-6 text-center">
          <Wordmark size="lg" />
          <p className="text-smoke-400 max-w-md font-sans text-sm">
            Phase 1 design system — dark + gold visual language. Dev-only page.
          </p>
          <JaguarDivider />
        </div>
      </SectionWrapper>

      {/* ——— Palette ——— */}
      <SectionWrapper variant="dark" compact aria-label="Palette">
        <Eyebrow className="mb-2">Tokens</Eyebrow>
        <Heading size="lg" className="mb-10">
          Palette
        </Heading>

        <Label>Charcoal — dark surfaces</Label>
        <div className="mb-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {charcoals.map(([name, hex, bg]) => (
            <Swatch key={name} name={name} hex={hex} bg={bg} />
          ))}
        </div>

        <Label>Gold — brand accent</Label>
        <div className="mb-8 grid grid-cols-5 gap-4 sm:grid-cols-10">
          {golds.map(([name, hex, bg]) => (
            <Swatch key={name} name={name} hex={hex} bg={bg} />
          ))}
        </div>

        <Label>Ivory — light sections</Label>
        <div className="mb-8 grid grid-cols-4 gap-4 sm:grid-cols-8">
          {lights.map(([name, hex, bg]) => (
            <Swatch key={name} name={name} hex={hex} bg={bg} />
          ))}
        </div>

        <Card className="mt-4">
          <p className="text-smoke-300 font-sans text-sm leading-relaxed">
            <span className="text-gold-400 font-semibold">Contrast rules (WCAG AA, tested):</span>{' '}
            gold-400 passes on every charcoal surface (≥ 7.2:1). On light sections, text gold is{' '}
            <span className="text-gold-300 font-semibold">gold-700</span> (5.0:1 on ivory-50);
            gold-400 is decorative-only there. Muted text: smoke-400 on dark, ink-600 on light.
          </p>
        </Card>
      </SectionWrapper>

      {/* ——— Typography ——— */}
      <SectionWrapper variant="darker" compact aria-label="Typography">
        <Eyebrow className="mb-2">Oswald + Inter</Eyebrow>
        <Heading size="lg" className="mb-10">
          Typography
        </Heading>
        <div className="flex flex-col gap-8">
          <div>
            <Label>Display / h1 — with gold foil accent</Label>
            <Heading level={1} size="display">
              Nashik&rsquo;s <span className="text-gold-gradient">Premium</span> Fitness Destination
            </Heading>
          </div>
          <div>
            <Label>XL / h2</Label>
            <Heading level={2} size="xl">
              Train on Jaguar Strength
            </Heading>
          </div>
          <div>
            <Label>LG / h2 (default)</Label>
            <Heading level={2} size="lg">
              World-class facilities
            </Heading>
          </div>
          <div>
            <Label>MD / h3 + eyebrow</Label>
            <Eyebrow className="mb-2">Why Jaguar</Eyebrow>
            <Heading level={3} size="md">
              5,500 sq ft of serious training space
            </Heading>
          </div>
          <div>
            <Label>Body — Inter</Label>
            <p className="text-smoke-300 max-w-2xl font-sans text-base leading-relaxed">
              Steam rooms, fully air-conditioned interiors, a members&rsquo; lounge and
              international-grade Jaguar Strength machinery — built for people who train seriously.
              Muted body text uses smoke-300/400 on dark surfaces.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ——— Buttons & badges ——— */}
      <SectionWrapper variant="dark" compact aria-label="Buttons and badges">
        <Heading size="lg" className="mb-10">
          Buttons &amp; Badges
        </Heading>
        <Label>Variants</Label>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Button>Book Free Trial</Button>
          <Button variant="outline">View Programs</Button>
          <Button variant="ghost">Call Now</Button>
        </div>
        <Label>Sizes</Label>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <Label>Badges</Label>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>₹11,999 Offer</Badge>
          <Badge variant="outline">Steam Rooms</Badge>
          <Badge variant="neutral">Fully AC</Badge>
        </div>
      </SectionWrapper>

      {/* ——— Cards ——— */}
      <SectionWrapper variant="darker" compact aria-label="Cards">
        <Heading size="lg" className="mb-10">
          Cards
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <Eyebrow className="mb-2">Program</Eyebrow>
            <Heading level={3} size="md" className="mb-2">
              Strength Training
            </Heading>
            <p className="text-smoke-400 font-sans text-sm leading-relaxed">
              International-grade Jaguar Strength machinery across a dedicated free-weights and
              machine floor.
            </p>
          </Card>
          <Card interactive>
            <Eyebrow className="mb-2">Program</Eyebrow>
            <Heading level={3} size="md" className="mb-2">
              Functional Training
            </Heading>
            <p className="text-smoke-400 font-sans text-sm leading-relaxed">
              Interactive card — hover for lift and gold edge. Used when the whole card links
              somewhere.
            </p>
          </Card>
          <Card className="border-gold-400/30 bg-[linear-gradient(160deg,#1b1b1f,#151517)]">
            <Eyebrow className="mb-2">Featured</Eyebrow>
            <Heading level={3} size="md" className="mb-2">
              Personal Training
            </Heading>
            <p className="text-smoke-400 font-sans text-sm leading-relaxed">
              Featured treatment: gold edge + subtle surface gradient for flagship items.
            </p>
          </Card>
        </div>
      </SectionWrapper>

      {/* ——— Stats ——— */}
      <SectionWrapper variant="dark" compact aria-label="Stat blocks">
        <Heading size="lg" className="mb-10">
          Stat Blocks
        </Heading>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <StatBlock value={5500} suffix="+" label="Sq ft training space" />
          <StatBlock value={6} label="Programs" />
          <StatBlock value={17} suffix=" hrs" label="Open daily Mon–Sat" />
          <StatBlock value={18000} prefix="₹" label="Flagship annual" />
        </div>
        <p className="text-smoke-500 mt-8 text-center font-sans text-xs">
          Numbers count up once when scrolled into view; reduced-motion users see them instantly.
        </p>
      </SectionWrapper>

      {/* ——— Light section ——— */}
      <SectionWrapper variant="light" compact aria-label="Light section">
        <Eyebrow tone="light" className="mb-2">
          Light Variant
        </Eyebrow>
        <Heading size="lg" className="mb-4">
          Light sections for rhythm
        </Heading>
        <p className="text-ink-600 mb-8 max-w-2xl font-sans text-base leading-relaxed">
          Occasional off-white sections break up the dark flow (reviews, FAQ). Text is
          ink-950/ink-600; gold text here uses the AA-safe deep gold. Bright gold appears only as
          decoration — like the divider below.
        </p>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <Button>Book Free Trial</Button>
          <Badge variant="gold">₹11,999 Offer</Badge>
          <span className="text-gold-700 font-sans text-sm font-semibold">
            Text-safe gold link →
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card variant="light">
            <Heading level={3} size="md" className="mb-2">
              Light card
            </Heading>
            <p className="text-ink-600 font-sans text-sm leading-relaxed">
              White surface, warm ivory border, soft shadow.
            </p>
          </Card>
          <div className="flex flex-col items-center justify-center gap-4">
            <Wordmark tone="light" />
            <JaguarDivider className="text-gold-700" />
          </div>
        </div>
      </SectionWrapper>

      {/* ——— CTA band ——— */}
      <CTABand
        title="Start Training Today"
        subtitle="Your first session is on us — experience the Jaguar difference."
      >
        <Button size="lg" href="#">
          Book Free Trial
        </Button>
        <Button size="lg" variant="outline" href="#">
          Call Now
        </Button>
      </CTABand>
    </main>
  );
}
