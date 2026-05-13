import { caseStudies } from '@/lib/case-studies';
import { CaseStudyCard } from '@/components/case-study-card';
import { SectionHoverWrapper } from './section-hover-wrapper';

/**
 * Hero work cards on the homepage — Figma 479:2477 (desktop) / 479:3120 (mobile).
 *
 * Pulled directly from `caseStudies` config. Adding a new entry there
 * makes it appear here automatically — no edit needed in this file.
 */
export function WorkCards() {
  return (
    <section className="mx-auto w-full max-w-page">
      <SectionHoverWrapper>
        <div className="flex flex-col gap-8 md:gap-16">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </SectionHoverWrapper>
    </section>
  );
}
