import Link from 'next/link';
import { SmartImage } from '@/components/smart-image';
import { CaseStudyToc } from './case-study-toc';
import { Blocks } from './case-study-blocks';
import type { CaseStudy } from '@/lib/case-studies';

// Re-export image building blocks for any caller that wants to compose
// custom JSX outside the data-driven `Blocks` renderer.
export {
  CaseStudyImage,
  CaseStudyImageRow,
  CaseStudyImageStack,
} from './case-study-image';

/**
 * Case study reading layout — fully driven by a `CaseStudy` entry
 * from `src/lib/case-studies.ts`.
 *
 *   1. Hero image — full-bleed
 *   2. Two-column body: sticky TOC on the left (md+), main content on the right
 *      - TL;DR (Overview) renders the `intro` string + the info grid
 *      - Each `sections[]` entry renders its title and `Blocks(blocks)`
 *      - `emphasis: true` wraps the section in the gray Problem-style box
 *   3. Mobile: single column, no TOC
 */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function CaseStudyTemplate({ cs }: { cs: CaseStudy }) {
  const tocItems = [
    { id: 'overview', label: 'TL;DR (Overview)' },
    ...cs.sections.map((s) => ({ id: slugify(s.title), label: s.title })),
  ];

  return (
    <main className="flex flex-col gap-12 pb-16 md:gap-16 md:pb-24">
      {/* 1. Full-bleed hero — natural 1200:552 card aspect, no cropping */}
      <div className="relative aspect-[1200/552] w-full overflow-hidden">
        <SmartImage src={cs.hero} alt={cs.title} fill sizes="100vw" priority className="object-cover" />
      </div>

      <div className="mx-auto w-full max-w-page px-4 md:px-0">
        {/* Mobile Header: Back button + Large Title (hidden on desktop) */}
        <div className="mb-10 flex flex-col items-start md:hidden">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-1.5 font-sans text-[16px] font-medium leading-[24px] text-ink-subtle transition-colors hover:text-ink"
          >
            <BackArrow /> Back
          </Link>
          <h1 className="font-sans text-[28px] font-semibold leading-[1.2] tracking-[-0.4px] text-ink">
            {cs.title}
          </h1>
        </div>

        <div className="flex gap-10 md:gap-16 lg:gap-24">
          <CaseStudyToc items={tocItems} title={cs.title} />

          <article className="flex min-w-0 flex-1 flex-col gap-10 md:gap-12">
            {/* TL;DR section */}
            <section id="overview" className="flex flex-col gap-3 scroll-mt-24">
              <h2 className="font-display text-[32px] leading-[1.05] tracking-[-1.28px] text-ink">
                TL;DR <span>(Overview)</span>
              </h2>
              <p
                className="font-sans text-[16px] leading-[24px] text-ink"
                dangerouslySetInnerHTML={{ __html: cs.intro }}
              />
              <InfoGrid
                role={cs.role}
                timeline={cs.timeline}
                team={cs.team}
                skills={cs.skills}
              />
            </section>

            {/* Body sections — all driven by `cs.sections` */}
            {cs.sections.map((s) => {
              const id = slugify(s.title);
              return (
                <section
                  key={id}
                  id={id}
                  className={
                    s.emphasis
                      ? 'flex flex-col gap-4 scroll-mt-24'
                      : 'flex flex-col gap-3 scroll-mt-24'
                  }
                >
                  {s.emphasis ? (
                    <div className="flex flex-col gap-3 rounded-[8px] bg-problem px-4 py-6 md:px-6">
                      <h2 className="font-display text-[32px] leading-[1.05] tracking-[-1.28px] text-ink">
                        {s.title}
                      </h2>
                      <div className="font-sans text-[16px] leading-[24px] text-ink">
                        <Blocks blocks={s.blocks} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-[32px] leading-[1.05] tracking-[-1.28px] text-ink">
                        {s.title}
                      </h2>
                      <div className="font-sans text-[16px] leading-[24px] text-ink">
                        <Blocks blocks={s.blocks} />
                      </div>
                    </>
                  )}
                </section>
              );
            })}
          </article>
        </div>
      </div>
    </main>
  );
}

function InfoGrid({
  role,
  timeline,
  team,
  skills,
}: {
  role: string;
  timeline: string;
  team: string;
  skills: string[];
}) {
  return (
    <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 text-ink">
      <Pair label="ROLE" value={role} />
      <Pair label="TIMELINE" value={timeline} />
      <Pair label="TEAM" value={team} />
      <div className="flex flex-col gap-1">
        <dt className="text-[12px] leading-[18px] uppercase text-ink">Skills</dt>
        <dd className="flex flex-col gap-1">
          {skills.map((s) => (
            <span key={s} className="text-[16px] leading-[24px]">
              {s}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-[12px] leading-[18px] uppercase text-ink">{label}</dt>
      <dd className="text-[16px] leading-[24px] text-ink">{value}</dd>
    </div>
  );
}

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="M12 5l-7 7 7 7" />





    </svg>
  );
}
