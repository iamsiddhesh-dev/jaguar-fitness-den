import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProgramDetail } from '@/components/sections/program-detail';
import { programs } from '@/content/programs';
import { getMediaSlot } from '@/lib/media';
import { buildPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/schema/json-ld';
import { buildBreadcrumbListSchema } from '@/components/schema/breadcrumb-list';

type ProgramPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  return buildPageMetadata({
    path: `/programs/${program.slug}`,
    title: program.seo.title,
    description: program.seo.description,
  });
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const media = getMediaSlot(`program-${program.slug}`);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Programs', path: '/programs' },
          { name: program.name, path: `/programs/${program.slug}` },
        ])}
      />
      <ProgramDetail program={program} media={media} />
    </>
  );
}
