'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { SmartImage } from '@/components/smart-image';
import type { CaseStudy } from '@/lib/case-studies';
import { Eye } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/**
 * Hero card for a case study — used on the homepage and Selected Work.
 *
 * The ENTIRE card (image + title/meta row) is one clickable area, and
 * the cursor-following pill tracks the mouse across the whole card —
 * so hovering anywhere (including over the title) shows the pill.
 *
 * Desktop hover:
 *   • Native cursor is hidden across the full card
 *   • Blue "View Case study" pill (Figma) follows the mouse
 *   • If `cs.comingSoon` is true, the pill is grey "Coming soon" and
 *     the card is rendered as a non-navigable `<div>`
 *
 * Mobile (`@media (hover: none)`):
 *   • No cursor tricks
 *   • A static compact pill sits in the image's bottom-right corner
 */
export function CaseStudyCard({
  cs,
  className = '',
  heightClass = 'h-[179px] md:h-[552px]',
  rounded = true,
}: {
  cs: CaseStudy;
  className?: string;
  heightClass?: string;
  rounded?: boolean;
}) {
  const wrapperRef = useRef<HTMLElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const interactive = !cs.comingSoon;
  const variant = cs.comingSoon ? 'soon' : 'view';

  // Same body either way — the wrapper element changes between
  // <Link> (interactive) and <div> (coming-soon).
  const body = (
    <article
      ref={wrapperRef as React.RefObject<HTMLElement>}
      onMouseEnter={onMove}
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
      className={`cs-card-link group relative flex flex-col gap-3 md:gap-6 ${className}`}
    >
      {/* Image area */}
      <div
        className={`relative w-full overflow-hidden ${heightClass} ${
          rounded ? 'md:rounded-card' : ''
        }`}
        style={
          cs.cardBg.startsWith('linear-gradient')
            ? { backgroundImage: cs.cardBg }
            : { backgroundColor: cs.cardBg }
        }
      >
        <SmartImage
          src={cs.cardImage}
          alt={cs.title}
          fill
          sizes="(min-width: 1200px) 1200px, 100vw"
          className={`object-cover transition-transform duration-500 ${
            interactive ? 'group-hover:scale-[1.02]' : ''
          }`}
        />

        {/* Static mobile-only corner chip — sits inside the image so it
            stays anchored to the visual even when the title row wraps. */}
        {cs.comingSoon && (
          <span
            aria-hidden="true"
            className="touch-pill pointer-events-none absolute bottom-3 right-3 z-10 hidden"
          >
            <Pill variant={variant} compact />
          </span>
        )}
      </div>

      {/* Title + meta — also inside the card so the cursor pill tracks
          here too. Clicking anywhere on this row navigates via the
          outer <Link>. */}
      <div className="flex flex-col items-start gap-1 px-4 md:flex-row md:justify-between md:gap-3 md:px-0">
        <p className="font-sans text-[20px] font-medium leading-tight text-ink md:leading-[24px]">
          {cs.cardTitle}
        </p>
        <p className="font-sans text-[16px] leading-tight text-ink-subtle md:text-right md:text-[20px] md:font-medium md:text-ink-muted md:leading-[24px]">
          {cs.cardMeta}
        </p>
      </div>

      {/* Cursor-following pill — absolute-positioned inside the card so
          it floats over image OR title depending on where the mouse is.
          Only renders on hover-capable devices (the browser doesn't
          fire mousemove on tap, so `pos` stays null on touch). */}
      {pos && (
        <span
          aria-hidden="true"
          className="hover-pill pointer-events-none absolute z-20 w-max -translate-x-1/2 -translate-y-1/2"
          style={{ left: pos.x, top: pos.y }}
        >
          <Pill variant={variant} />
        </span>
      )}
    </article>
  );

  if (!interactive) {
    return (
      <div aria-label={`${cs.title} case study — coming soon`} className="block">
        {body}
      </div>
    );
  }

  return (
    <Link 
      href={cs.href} 
      aria-label={`View ${cs.title} case study`} 
      onClick={() => trackEvent('cta_click_case_study', { name: cs.title, id: cs.id, location: 'Case Study Cards' })}
      className="block"
    >
      {body}
    </Link>
  );
}

/** Figma pill button — blue "View Case study" (eye icon) or greyed
 *  "Coming soon". `compact` shrinks it for the mobile corner chip. */
function Pill({ variant, compact = false }: { variant: 'view' | 'soon'; compact?: boolean }) {
  const isView = variant === 'view';
  const padding = compact ? 'px-3 py-1.5' : 'px-5 py-2.5';
  const text = compact ? 'text-[12px]' : 'text-[14px]';
  const gap = compact ? 'gap-1.5' : 'gap-2';
  const iconSize = compact ? 14 : 18;
  const bg = isView ? 'bg-blue-500' : 'bg-[#bdbdbd]';
  // Slight rounded-rect (Figma uses ~10–12px, not fully pill-shaped).
  const radius = compact ? 'rounded-[8px]' : 'rounded-[10px]';
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap ${gap} ${radius} ${bg} ${padding} font-sans ${text} font-medium leading-none text-white shadow-e3`}
    >
      <EyeIcon size={iconSize} />
      {isView ? 'View Case study' : 'Coming soon'}
    </span>
  );
}

function EyeIcon({ size = 18 }: { size?: number }) {
  return <Eye size={size} strokeWidth={1.8} />;
}
