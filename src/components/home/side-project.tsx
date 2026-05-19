'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { home } from '@/lib/assets';
import { CareerSection } from './career-section';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/**
 * Side Project — Figma node 479:2644 (desktop) / 479:3216 (mobile).
 * 249×140 (mobile 358×202) cream tile (#efe7dc) with a Landscape image
 * background. Title + body description on the right (or below on mobile).
 * Hover pill on desktop, static CTA below description on mobile.
 */
export function SideProject() {
  return (
    <CareerSection title="Side Projects" blurb="I'm learning how to code and exploring new AI tools.">
      <div className="flex flex-col gap-8 md:gap-12">
        {home.sideProjects.map((project) => (
          <SideProjectCard key={project.title} project={project} />
        ))}
      </div>
    </CareerSection>
  );
}

function SideProjectCard({ project }: { project: typeof home.sideProjects[0] }) {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      ref={wrapperRef}
      onMouseEnter={onMove}
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
      onClick={() => trackEvent('cta_click_live_link', { name: project.title, location: 'Side Projects' })}
      className="cs-card-link group relative flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-6 block"
    >
      <div className="relative h-[202px] w-full shrink-0 overflow-hidden rounded-[12px] border border-[rgba(186,169,148,0.1)] bg-[#efe7dc] md:h-[140px] md:w-[249px] md:rounded-[6px]">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 768px) 249px, 100vw"
          className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 md:gap-2">
        <p className="font-sans text-[15px] font-medium leading-tight tracking-[-0.32px] text-ink md:text-[20px] md:leading-[19.2px]">
          {project.title}
        </p>
        <p className="font-sans text-[13px] leading-snug tracking-[-0.14px] text-ink-subtle md:text-[16px] md:leading-normal">
          {project.description}
        </p>

        {/* Static Mobile CTA Button */}
        <div className="mt-2 block md:hidden">
          <span className="inline-flex items-center justify-center whitespace-nowrap gap-1.5 rounded-[8px] bg-blue-500 px-4 py-2.5 font-sans text-[14px] font-medium leading-none text-white shadow-e3 w-max">
            View Live Link
            <ArrowUpRight size={16} strokeWidth={2} />
          </span>
        </div>
      </div>

      {/* Hover Pill Desktop */}
      {pos && (
        <span
          aria-hidden="true"
          className="hover-pill pointer-events-none absolute z-20 w-max -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{ left: pos.x, top: pos.y }}
        >
          <span className="inline-flex items-center whitespace-nowrap gap-2 rounded-[10px] bg-blue-500 px-5 py-2.5 font-sans text-[14px] font-medium leading-none text-white shadow-e3">
            <ArrowUpRight size={18} strokeWidth={1.8} />
            View Live Link
          </span>
        </span>
      )}
    </a>
  );
}
