'use client';

import { useState } from 'react';
import { home } from '@/lib/assets';
import { CareerSection, RowIcon } from './career-section';

/**
 * Experience — Figma node 479:2558.
 * Each entry: company logo + name + role (left), date right-aligned.
 * 16px description below, indented under the icon.
 * Bottom border: blue 20% rgba(47,91,255,0.2).
 * On mobile, tapping toggles the expansion of role and description.
 */
export function Experience() {
  return (
    <CareerSection title="Experience">
      <ul className="flex flex-col">
        {home.experience.map((job) => {
          return (
            <li
              key={job.name}
              className="group -mx-2 flex flex-col gap-2 border-b border-blue-500/20 px-2 py-3 transition-colors hover:bg-blue-500/[0.03] md:py-4"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <RowIcon src={job.logo} alt={`${job.name} — ${job.role}`} />
                <div className="flex flex-1 items-center justify-between gap-x-2 md:gap-x-8">
                  <div className="flex flex-1 flex-col md:flex-row md:items-center md:gap-x-4">
                    <p className="font-sans text-[15px] font-medium leading-tight text-ink md:text-[20px] md:leading-[30px]">
                      {job.name}
                    </p>
                    <p className="font-sans text-[16px] text-ink-subtle md:leading-[20px]">
                      {job.role}
                    </p>
                  </div>
                  <p className="shrink-0 font-sans text-[13px] leading-tight text-ink-subtle md:text-[18px] md:leading-[30px]">
                    {job.period}
                  </p>
                </div>
              </div>
              {/* Indent aligns description with company name: icon (24px) + gap (16px desktop / 12px mobile) = 40px / 36px */}
              <p className="pl-[36px] md:pl-[40px] overflow-hidden font-sans text-[16px] text-ink-subtle transition-all duration-300 md:leading-[20px] max-h-0 opacity-0 group-hover:max-h-[240px] group-hover:opacity-100 group-hover:pt-1">
                {job.description}
              </p>
            </li>
          );
        })}
      </ul>
    </CareerSection>
  );
}
