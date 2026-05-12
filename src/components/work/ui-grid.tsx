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
  // Duplicate the source arrays so each marquee can loop seamlessly via
  // the -50% translate.
  const phoneTrack = [...selectedWork.phones, ...selectedWork.phones];
  const wideTrack = [...selectedWork.wide, ...selectedWork.wide];

  return (
    <section className="mx-auto flex w-full max-w-page flex-col gap-4 px-4 md:px-0">
      <header className="flex flex-col gap-4">
        <h2 className="font-sans text-[18px] font-medium leading-[24px] text-ink">
          Some other work
        </h2>
        <p className="font-sans text-[18px] leading-normal text-ink-subtle">
          Showcasing my work that reflects my journey as a self-taught designer.
        </p>
      </header>

      {/* Phone marquee — auto-scrolls left, pauses on hover (gap 24px per Figma) */}
      <div className="overflow-hidden">
        <div
          className="marquee-track flex w-max gap-6"
          style={{ ['--marquee-duration' as string]: '45s' }}
        >
          {phoneTrack.map((src, i) => (
            <div
              key={`phone-${i}`}
              className="relative h-[220px] w-[102px] shrink-0 overflow-hidden rounded-[16px] bg-cream"
            >
              <SmartImage src={src} alt="" fill sizes="102px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Square grid — full section width, 2 cols. row gap 16, col gap 12, px 16 (Figma 467:12787) */}
      <div className="grid w-full grid-cols-2 gap-x-3 gap-y-4 px-4">
        {selectedWork.squares.map((src, i) => {
          const { rotate, lifted } = TILE_STYLES[i] ?? TILE_STYLES[0];
          return (
            <div key={src} className="flex aspect-square items-center justify-center">
              <div
                className={`relative aspect-square w-[80%] overflow-hidden rounded-[8px] border-[3px] border-neutral-100 ${rotate} ${
                  lifted ? 'shadow-e3' : ''
                }`}
              >
                <SmartImage src={src} alt="" fill sizes="(min-width: 1000px) 460px, 50vw" className="object-cover" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Wide marquee — auto-scrolls left, pauses on hover (gap 24px per Figma) */}
      <div className="overflow-hidden">
        <div
          className="marquee-track flex w-max gap-6"
          style={{ ['--marquee-duration' as string]: '50s' }}
        >
          {wideTrack.map((src, i) => (
            <div
              key={`wide-${i}`}
              className="relative h-[220px] w-[309px] shrink-0 overflow-hidden bg-cream md:h-[260px] md:w-[380px]"
            >
              <SmartImage src={src} alt="" fill sizes="(min-width: 1000px) 380px, 309px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
