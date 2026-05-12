import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyTemplate } from '@/components/case-study/page-template';
import { caseStudies, getCaseStudy } from '@/lib/case-studies';

/**
 * Single dynamic route that renders every case study by slug.
 *
 *   /work/nomad      → caseStudies[0]
 *   /work/goodspace  → caseStudies[1]
 *   /work/veda       → caseStudies[2]
 *   …add a new entry to `src/lib/case-studies.ts` and it lights up here.
 *
 * Case studies flagged `comingSoon: true` are excluded from
 * `generateStaticParams` and 404 if someone navigates to them
 * directly — the home/work cards already render them as
 * non-clickable.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.filter((cs) => !cs.comingSoon).map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: 'Case study' };
  return {
    title: `${cs.title} — Case study`,
    description: cs.intro.replace(/<[^>]+>/g, '').slice(0, 160),
  };
}

export default async function WorkSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs || cs.comingSoon) notFound();
  return <CaseStudyTemplate cs={cs} />;
}
