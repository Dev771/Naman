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
    <section className="mx-auto flex w-full max-w-page flex-col gap-6 px-0 pb-16 md:gap-12 overflow-hidden">
      <header className="flex flex-col gap-4 px-4 md:px-0">
        <h2 className="font-sans text-[18px] font-medium leading-[24px] text-ink">
          Some other work
        </h2>
        <p className="font-sans text-[18px] leading-normal text-ink-subtle">
          Showcasing my work that reflects my journey as a self-taught designer.
        </p>
      </header>

      {/* Phone Grid — auto-scrolling marquee */}
      <div className="relative w-full overflow-hidden flex flex-col">
        <div className="flex w-max gap-6 marquee-track" style={{ '--marquee-duration': '40s' } as React.CSSProperties}>
          {[...selectedWork.phones, ...selectedWork.phones].map((src, i) => (
            <div
              key={`phone-${i}`}
              className="relative aspect-[102/220] h-[220px] sm:h-[280px] shrink-0 overflow-hidden rounded-[16px] bg-cream shadow-sm"
            >
              <SmartImage src={src} alt="" fill sizes="(min-width: 640px) 130px, 102px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Square Grid — static 2 columns */}
      <div className="grid w-full grid-cols-2 gap-x-3 gap-y-4 px-4 md:grid-cols-2 md:gap-6 md:px-0">
        {selectedWork.squares.slice(0, 6).map((src, i) => (
          <div
            key={`square-${i}`}
            className="relative aspect-square w-full overflow-hidden rounded-[12px] border border-neutral-100 bg-cream shadow-sm"
          >
            <SmartImage src={src} alt="" fill sizes="(min-width: 768px) 50vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Wide Grid — auto-scrolling marquee */}
      <div className="relative w-full overflow-hidden flex flex-col">
        <div className="flex w-max gap-6 marquee-track" style={{ '--marquee-duration': '50s' } as React.CSSProperties}>
          {[...selectedWork.wide, ...selectedWork.wide].map((src, i) => (
            <div
              key={`wide-${i}`}
              className="relative aspect-[380/260] h-[200px] sm:h-[260px] shrink-0 overflow-hidden rounded-[12px] bg-cream shadow-sm"
            >
              <SmartImage src={src} alt="" fill sizes="(min-width: 640px) 380px, 290px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
