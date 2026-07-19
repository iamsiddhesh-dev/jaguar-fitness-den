import { SectionWrapper } from '@/components/ui/section-wrapper';
import { StatBlock } from '@/components/ui/stat-block';
import { facilities } from '@/content/facilities';
import { programs } from '@/content/programs';
import { siteConfig } from '@/content/site-config';

/** Trust bar — animated count-up stats derived from the content layer. */
export function StatsBar() {
  return (
    <SectionWrapper id="stats" variant="dark" compact className="border-ivory-50/8 border-b">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        <StatBlock value={5500} suffix="+" label="Sq ft training space" />
        <StatBlock value={programs.length} label="Signature programs" />
        <StatBlock value={facilities.length} label="Premium amenities" />
        <StatBlock value={17} suffix="+" label="Hours open, Mon–Sat" />
      </div>
      <p className="text-smoke-500 mt-10 text-center font-sans text-xs tracking-[0.18em] uppercase">
        {siteConfig.hours.label}
      </p>
    </SectionWrapper>
  );
}
