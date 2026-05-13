import Image from 'next/image';
import type { ReactNode } from 'react';
import { SectionHoverWrapper } from './section-hover-wrapper';

/**
 * Generic Career Section wrapper — matches Figma's repeating
 * `Career Section` pattern (479:2558, 479:2601, 479:2644, 479:2691).
 * Inter Medium 20px desktop / 18px mobile title in #35324f.
 *
 * `titleColor` lets a section override the heading color (e.g. Tools
 * uses `text-ink-muted` per Figma 479:2694).
 */
export function CareerSection({
  title,
  blurb,
  children,
  titleColor = 'text-ink',
}: {
  title: string;
  blurb?: string;
  children: ReactNode;
  titleColor?: string;
}) {
  return (
    <section className="mx-auto flex w-full max-w-page flex-col gap-6">
      <header className="flex flex-col gap-4 px-4 md:px-0">
        <h2 className={`font-sans text-[18px] font-medium leading-[24px] md:text-[20px] ${titleColor}`}>
          {title}
        </h2>
        {blurb && (
          <p className="font-sans text-[16px] leading-normal text-ink-subtle">
            {blurb}
          </p>
        )}
      </header>
      <SectionHoverWrapper>
        <div className="px-4 md:px-0">{children}</div>
      </SectionHoverWrapper>
    </section>
  );
}

/**
 * Row icon — small contained logo (e.g. company / college mark) sitting
 * directly on the page background. Hovering shows the brand name as a
 * native browser tooltip via the `title` attribute. Pass a meaningful
 * full name in `alt` (e.g. "Bharati Vidyapeeth Institute of …", not
 * "BVICAM logo") so the tooltip and screen-reader label are useful.
 */
export function RowIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative h-[24px] w-[24px] shrink-0 rounded-none"
      title={alt}
      aria-label={alt}
    >
      <Image src={src} alt={alt} fill sizes="24px" className="rounded-none object-contain" />
    </div>
  );
}
