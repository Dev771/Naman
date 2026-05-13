import { about } from '@/lib/assets';
import { SmartImage } from '@/components/smart-image';

/**
 * Photo Dump — Figma 466:5615 (mobile) / 466:5435 (desktop).
 *
 * Layout: explicit two-column flex layout. Mobile tile width is 195px
 * per column (50% of a 390px frame). Desktop tile width is 600px per
 * column. Each tile uses an aspect ratio derived from a per-column
 * height array so the heights scale across breakpoints. Zero gap
 * between columns and between tiles in a column.
 */

// Mobile tile width: 195px. Desktop: 600px (scale heights × 600/195 ≈ 3.077).
const LEFT_HEIGHTS = [166.4, 115.8, 199.6, 88.3, 143.5, 109.7, 280.8, 208.9, 175.1, 260];
const RIGHT_HEIGHTS = [347.1, 259.6, 260, 256.8, 228.9, 260, 260];

// Image indices into about.carousel (zero-based):
const LEFT_IDX = [0, 2, 3, 5, 6, 8, 9, 11, 13, 14];
const RIGHT_IDX = [1, 4, 7, 10, 12, 15, 16];

export function PhotoGallery() {
  return (
    <section className="mx-auto w-full max-w-page pb-8 md:pb-16">
      {/* Header keeps mobile side padding so the text doesn't run to the
          screen edge; the photo masonry below stays edge-to-edge. */}
      <header className="mb-6 flex flex-col gap-4 px-4 md:px-0">
        <h2 className="font-sans text-[20px] font-medium leading-[24px] text-ink">
          {about.photoDumpTitle}
        </h2>
        <p className="font-sans text-[18px] leading-normal text-ink-subtle">
          {about.photoDumpDescription}
        </p>
      </header>

      <div className="flex w-full">
        <div className="flex w-1/2 flex-col">
          {LEFT_IDX.map((idx, i) => {
            const photo = about.carousel[idx];
            if (!photo) return null;
            const h = LEFT_HEIGHTS[i] ?? 220;
            return (
              <figure
                key={photo.id}
                className="group/tile relative w-full overflow-hidden"
                style={{ aspectRatio: `195 / ${h}` }}
              >
                <SmartImage
                  src={photo.src}
                  alt={`Memory ${photo.id}`}
                  fill
                  sizes="(min-width: 1200px) 600px, 50vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover/tile:scale-[1.06]"
                />
              </figure>
            );
          })}
        </div>
        <div className="flex w-1/2 flex-col">
          {RIGHT_IDX.map((idx, i) => {
            const photo = about.carousel[idx];
            if (!photo) return null;
            const h = RIGHT_HEIGHTS[i] ?? 260;
            return (
              <figure
                key={photo.id}
                className="group/tile relative w-full overflow-hidden"
                style={{ aspectRatio: `195 / ${h}` }}
              >
                <SmartImage
                  src={photo.src}
                  alt={`Memory ${photo.id}`}
                  fill
                  sizes="(min-width: 1200px) 600px, 50vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover/tile:scale-[1.06]"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
