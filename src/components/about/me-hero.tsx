import { about } from '@/lib/assets';
import { SmartImage } from '@/components/smart-image';

/**
 * About Me hero — Figma node 466:5436 (mobile) / 466:4964 (desktop).
 *
 * On mobile the **hero image is full-bleed** (edge-to-edge, no side
 * padding) per Figma 466:5586. The heading and bio paragraphs keep
 * their 16px horizontal padding via inner wrappers, so the image is
 * the only thing that breaks out of the page gutter.
 */
export function MeHero() {
  return (
    <section className="mx-auto flex w-full max-w-page flex-col items-center gap-8 pt-6 md:pt-12">
      <h1 className="text-grain px-4 text-center font-display text-[48px] uppercase leading-[1.05] text-ink md:px-0 md:text-[96px]">
        WELL THIS IS <span className="text-blue-500">ME!</span>
      </h1>

      <div className="flex w-full max-w-page flex-col gap-8 px-4 md:px-0">
        {/* Full-width image on mobile, max-width on desktop, with rounded corners.
            object-position biases upward (~20% from top) so the face/head stays
            in frame rather than the torso. */}
        <div className="relative aspect-[390/433] w-full overflow-hidden rounded-[12px] md:aspect-[1200/700] md:rounded-[24px]">
          <SmartImage
            src={about.hero}
            alt="Naman Bhateja"
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            priority
            className="object-cover [object-position:center_20%]"
          />
        </div>

        <div className="flex w-full flex-col gap-4">
          <p className="font-sans text-[20px] font-medium leading-[29.25px] text-ink">
            {about.greeting}
          </p>
          {about.bio.map((p, i) => (
            <p
              key={i}
              className="font-sans text-[20px] leading-[29.25px] text-ink-subtle"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
