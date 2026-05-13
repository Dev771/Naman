import { selectedWork } from '@/lib/assets';
import { SmartImage } from '@/components/smart-image';

/**
 * Selected Work secondary grids — Figma node 467:12726 ("Career Section").
 *
 * Exact gaps from Figma:
 *   • outer vertical gap between sub-blocks: 16px
 *   • header (heading ↔ description): 16px
 *   • phone marquee item gap (467:12774): 24px
 *   • square grid: row gap 16px, column gap 12px, container px 16px (467:12787)
 *   • wide marquee item gap (467:12803): 24px
 *
 * Phone row and wide row are auto-scrolling marquees (CSS animation in
 * globals.css `.marquee-track`); the square grid sits full section width.
 */
const TILE_STYLES = [
  { rotate: 'rotate-1', lifted: true },   // row1 left  — 467:12790
  { rotate: '-rotate-1', lifted: false }, // row1 right — 467:12792
  { rotate: '-rotate-1', lifted: false }, // row2 left  — 467:12795
  { rotate: '-rotate-1', lifted: false }, // row2 right — 467:12797
  { rotate: 'rotate-1', lifted: true },   // row3 left  — 467:12800
  { rotate: '-rotate-1', lifted: false }, // row3 right — 467:12802
];

export function UiGrid() {
  return (
    <section className="mx-auto flex w-full max-w-page flex-col gap-6 px-0 pb-16 md:gap-12">
      <header className="flex flex-col gap-4">
        <h2 className="font-sans text-[18px] font-medium leading-[24px] text-ink">
          Some other work
        </h2>
        <p className="font-sans text-[18px] leading-normal text-ink-subtle">
          Showcasing my work that reflects my journey as a self-taught designer.
        </p>
      </header>

      {/* Phone Grid — static 2 columns on mobile, 4 on desktop */}
      <div className="grid w-full grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-6 md:px-0">
        {selectedWork.phones.slice(0, 4).map((src, i) => (
          <div
            key={`phone-${i}`}
            className="relative aspect-[102/220] w-full overflow-hidden rounded-[16px] bg-cream shadow-sm"
          >
            <SmartImage src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Square Grid — static 2 columns, perfectly straight with subtle border */}
      <div className="grid w-full grid-cols-2 gap-4 px-4 md:grid-cols-3 md:gap-6 md:px-0">
        {selectedWork.squares.slice(0, 6).map((src, i) => (
          <div
            key={`square-${i}`}
            className="relative aspect-square w-full overflow-hidden rounded-[12px] border border-neutral-100 bg-cream shadow-sm"
          >
            <SmartImage src={src} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Wide Grid — stacked vertically */}
      <div className="flex w-full flex-col gap-4 px-4 md:gap-6 md:px-0">
        {selectedWork.wide.slice(0, 1).map((src, i) => (
          <div
            key={`wide-${i}`}
            className="relative aspect-[380/260] w-full overflow-hidden rounded-[12px] bg-cream shadow-sm"
          >
            <SmartImage src={src} alt="" fill sizes="(min-width: 768px) 100vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
