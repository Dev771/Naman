'use client';

import { useEffect, useState } from 'react';

/**
 * Sticky table of contents — left rail of the case study layout.
 * Lists every section in order; the section currently in view is
 * highlighted. Clicking jumps to that section's `id`.
 *
 * Hidden on mobile (Figma `462:6223` doesn't include a TOC) — appears
 * from `md:` upwards as the left column of the case-study reading view.
 */
export function CaseStudyToc({ items }: { items: { id: string; label: string }[] }) {
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
      // Activate when a section's top crosses ~25% from the top of the viewport.
      { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-24 hidden h-fit shrink-0 md:block md:w-[200px] lg:w-[240px]">
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
                  className={`block py-1 pl-4 font-sans text-[14px] leading-[20px] transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-subtle hover:text-ink'
                  }`}
                >
                  {it.label}
                </a>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[-1px] top-1 h-[20px] w-[2px] bg-blue-500"
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
