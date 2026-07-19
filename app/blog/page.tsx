import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CTABand } from '@/components/ui/cta-band';
import { Eyebrow, Heading } from '@/components/ui/heading';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { formatPublishedDate, getReadingTime, sortedPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Jaguar Fitness Den, Panchavati, Nashik',
  description:
    'Training guides and honest local gym advice from Jaguar Fitness Den — membership value in Panchavati, gym options near Meri & Mhasrul, and beginner strength plans.',
};

export default function BlogIndexPage() {
  const posts = sortedPosts();

  return (
    <main className="flex-1">
      <SectionWrapper variant="darker">
        <div className="max-w-2xl">
          <Eyebrow>Blog</Eyebrow>
          <Heading level={1} size="display" className="mt-4">
            Training Notes
          </Heading>
          <p className="text-smoke-300 mt-6 font-sans text-base leading-relaxed md:text-lg">
            Straight answers on training, membership value, and picking a gym in Nashik — written by
            the people on our floor, not by a content agency.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card variant="dark" interactive className="h-full">
                <p className="text-smoke-500 font-sans text-xs tracking-[0.1em] uppercase">
                  <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
                  <span aria-hidden="true"> · </span>
                  {getReadingTime(post.slug)}
                </p>
                <Heading level={2} size="md" className="group-hover:text-gold-300 mt-3">
                  {post.title}
                </Heading>
                <p className="text-smoke-400 mt-3 max-w-3xl font-sans text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <p className="text-gold-400 mt-5 font-sans text-xs font-semibold tracking-[0.18em] uppercase">
                  Read Article →
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CTABand
        title="Reading Is Not Training"
        subtitle="Book a free trial and put any of it into practice on our floor — no commitment required."
      >
        <Button href="/contact" size="lg">
          Book Free Trial
        </Button>
        <Button href="/programs" variant="outline" size="lg">
          Explore Programs
        </Button>
      </CTABand>
    </main>
  );
}
