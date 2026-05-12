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
      <h1 className="text-grain px-4 text-center font-display text-[48px] leading-[1.05] text-ink md:px-0 md:text-[96px]">
        Well this is <span className="text-blue-500">Me!</span>
      </h1>

      {/* Full-width image — no horizontal padding on mobile */}
      <div className="relative aspect-[390/433] w-full overflow-hidden md:aspect-[864/536] md:max-w-[864px]">
        <SmartImage
          src={about.hero}
          alt="Naman Bhateja"
          fill
          sizes="(min-width: 1200px) 864px, 100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="flex w-full flex-col gap-4 px-4 md:px-0">
        <p className="font-sans text-[20px] leading-[29.25px] text-ink">
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
    </section>
  );
}
