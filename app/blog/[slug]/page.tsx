import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { JaguarDivider } from '@/components/ui/jaguar-divider';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { blogPosts } from '@/content/blog';
import { programs } from '@/content/programs';
import { formatPublishedDate, getPostBySlug, getReadingTime } from '@/lib/blog';
import { whatsappHref } from '@/lib/links';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/** Only the slugs above exist — anything else 404s instead of rendering on demand. */
export const dynamicParams = false;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { default: Article } = await import(`@/content/blog/${slug}.mdx`);
  const relatedPrograms = post.relatedPrograms
    .map((programSlug) => programs.find((program) => program.slug === programSlug))
    .filter((program) => program !== undefined);

  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <article className="mx-auto max-w-3xl">
          <header>
            <Eyebrow>{post.tags.join(' · ')}</Eyebrow>
            <Heading level={1} size="xl" className="mt-4">
              {post.title}
            </Heading>
            <p className="text-smoke-500 mt-5 font-sans text-xs tracking-[0.1em] uppercase">
              <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
              <span aria-hidden="true"> · </span>
              {getReadingTime(slug)}
              <span aria-hidden="true"> · </span>
              {post.author}
            </p>
          </header>

          <JaguarDivider className="my-10" />

          <div className="text-smoke-300">
            <Article />
          </div>
        </article>
      </SectionWrapper>

      {relatedPrograms.length > 0 ? (
        <SectionWrapper variant="dark">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Related Programs</Eyebrow>
            <Heading level={2} size="lg" className="mt-3">
              Train What You Just Read About
            </Heading>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {relatedPrograms.map((program) => (
                <Link key={program.slug} href={`/programs/${program.slug}`} className="group block">
                  <Card variant="dark" interactive className="h-full">
                    <Heading level={3} size="md" className="group-hover:text-gold-300">
                      {program.name}
                    </Heading>
                    <p className="text-smoke-400 mt-2 font-sans text-sm leading-relaxed">
                      {program.tagline}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/pricing" variant="outline">
                See Membership Pricing
              </Button>
              <Button href="/blog" variant="ghost">
                All Articles
              </Button>
            </div>
          </div>
        </SectionWrapper>
      ) : null}

      <CTABand
        title="Come Train With Us"
        subtitle="Book a free trial at Panchavati's premium fitness destination — come at your usual hour and see the floor for yourself."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
        <Button
          href={whatsappHref()}
          variant="outline"
          size="lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Us
        </Button>
      </CTABand>
    </main>
  );
}
