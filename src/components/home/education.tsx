'use client';

import { useState } from 'react';
import { home } from '@/lib/assets';
import { CareerSection, RowIcon } from './career-section';

/**
 * Education — Figma node 479:2601.
 *
 * Same row pattern as Experience: icon + name + period.
 * Hovering a row reveals the full institution name as a subtitle
 * under the abbreviated name with a smooth expand transition.
 * On mobile, tapping toggles the expansion.
 */
export function Education() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <CareerSection title="Education">
      <ul className="flex flex-col">
        {home.education.map((school, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <li
              key={school.name}
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              className="group -mx-2 flex items-center gap-3 border-b border-blue-500/20 px-2 py-3 transition-colors hover:bg-blue-500/[0.03] cursor-pointer md:cursor-default md:gap-4 md:py-4"
            >
              <RowIcon src={school.logo} alt={school.fullName} />
              <div className="flex flex-1 items-center justify-between gap-x-2 md:gap-x-8">
                <div className="flex flex-1 flex-col">
                  <p className="font-sans text-[15px] font-medium leading-tight text-ink md:text-[20px] md:leading-[30px]">
                    {school.name}
                  </p>
                  <p className={`overflow-hidden font-sans text-[16px] text-ink-subtle transition-all duration-300 md:leading-[20px] ${
                    isExpanded 
                      ? 'max-h-[96px] opacity-100 pt-1' 
                      : 'max-h-0 opacity-0 md:group-hover:max-h-[96px] md:group-hover:opacity-100 md:group-hover:pt-1'
                  }`}>
                    {school.fullName}
                  </p>
                </div>
                <p className="shrink-0 font-sans text-[13px] leading-tight text-ink-subtle md:text-[18px] md:leading-[30px]">
                  {school.period}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </CareerSection>
  );
}
