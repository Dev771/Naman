import Image from 'next/image';
import { home } from '@/lib/assets';
import { CareerSection } from './career-section';

/**
 * Side Project — Figma node 479:2644 (desktop) / 479:3216 (mobile).
 * 249×140 (mobile 358×202) cream tile (#efe7dc) with a Landscape image
 * background and a centered "Dearly" wordmark — Logo asset + Playfair
 * Display SemiBold "Dearly" 24/40 px. Title + body description on the
 * right (or below on mobile).
 */
export function SideProject() {
  return (
    <CareerSection title="Side Project" blurb={home.sideProject.blurb}>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-6">
        <div className="relative h-[202px] w-full shrink-0 overflow-hidden rounded-[12px] border border-[rgba(186,169,148,0.1)] bg-dearly md:h-[140px] md:w-[249px] md:rounded-[6px]">
          <Image
            src={home.sideProject.image}
            alt=""
            fill
            sizes="(min-width: 768px) 249px, 100vw"
            className="object-cover opacity-95"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 md:gap-2">
          <p className="font-sans text-[15px] font-medium leading-tight tracking-[-0.32px] text-ink md:text-[20px] md:leading-[19.2px]">
            {home.sideProject.title}
          </p>
          <p className="font-sans text-[13px] leading-snug tracking-[-0.14px] text-ink-subtle md:text-[16px] md:leading-normal">
            {home.sideProject.description}
          </p>
        </div>
      </div>
    </CareerSection>
  );
}

function DearlyLogo() {
  // Inline replica of the Dearly mark — heart-style outline.
  // Mobile: 58×43, Desktop: 38×28 (per Figma 479:2685).
  return (
    <svg
      viewBox="0 0 38 28"
      fill="none"
      aria-hidden="true"
      className="h-[43px] w-[58px] md:h-7 md:w-[38px]"
    >
      <path
        d="M19 27 L4 13 a8 8 0 1 1 11-11 l4 4 4-4 a8 8 0 1 1 11 11 z"
        stroke="#1a1a1a"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
