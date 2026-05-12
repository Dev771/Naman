import { caseStudies } from '@/lib/case-studies';
import { CaseStudyCard } from '@/components/case-study-card';

/**
 * Featured cards on Selected Work — same data and proportions as the
 * homepage cards (see `home/work-cards.tsx`). Both views read from the
 * single `caseStudies` config in `src/lib/case-studies.ts`.
 */
export function FeaturedCards() {
  return (
    <section className="mx-auto w-full max-w-page">
      <div className="flex flex-col gap-8 md:gap-16">
        {caseStudies.map((cs) => (
          <CaseStudyCard key={cs.id} cs={cs} />
        ))}
      </div>
    </section>
  );
}
