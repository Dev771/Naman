'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * Sticky sidebar for case study pages.
 *
 * Contains three vertically-stacked zones:
 *   1. Back button  — always visible, navigates to /work
 *   2. Project title — quick context anchor while deep in the article
 *   3. "On this page" TOC — highlights the current section as you scroll
 *
 * The whole aside sticks to `top-8` so it sits comfortably below the
 * in-flow navbar on scroll. Hidden on mobile (no sidebar in mobile Figma).
 */
export function CaseStudyToc({
  items,
  title,
}: {
  items: { id: string; label: string }[];
  title: string;
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose top is closest to the viewport's reading line.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-8 hidden h-fit shrink-0 md:block md:w-[200px] lg:w-[240px]">

      {/* ── Back button ── */}
      <Link
        href="/work"
        className="mb-5 inline-flex items-center gap-1.5 font-sans text-[14px] leading-[20px] text-ink-subtle transition-colors hover:text-ink"
      >
        <BackArrow />
        Back
      </Link>

      {/* ── Project title ── */}
      <h2 className="mb-6 font-sans text-[24px] font-semibold leading-[1.35] tracking-[-0.2px] text-ink">
        {title}
      </h2>

      {/* ── Divider ── */}
      <div className="mb-4 h-px w-full bg-ink/[0.08]" aria-hidden="true" />

      {/* ── On this page ── */}
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.06em] text-ink-subtle">
        On this page
      </p>
      <nav>
        <ul className="flex flex-col gap-2 border-l border-blue-500/15">
          {items.map((it) => {
            const isActive = it.id === activeId;
            return (
              <li key={it.id} className="relative">
                <a
                  href={`#${it.id}`}
                  className={`block py-1 pl-4 font-sans text-[13px] leading-[20px] transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-subtle hover:text-ink'
                  }`}
                >
                  {it.label}
                </a>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[-1px] top-1 h-[20px] w-[2px] rounded-full bg-blue-500"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function BackArrow() {
  return <ArrowLeft size={16} strokeWidth={2} />;
}

