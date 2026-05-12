/**
 * Image building blocks for use INSIDE a case-study section body.
 * Server components — no client-side state. The image fade-in is
 * handled by a CSS animation in globals.css (`.cs-image-fade`).
 *
 * Usage:
 *   <CaseStudyImage src={cs.images[0]} />
 *   <CaseStudyImageRow>
 *     <CaseStudyImage src={...} />
 *     <CaseStudyImage src={...} />
 *   </CaseStudyImageRow>
 *   <CaseStudyImageStack>
 *     <CaseStudyImage src={...} />
 *     <CaseStudyImage src={...} />
 *   </CaseStudyImageStack>
 */
export function CaseStudyImage({
  src,
  alt = '',
  caption,
  className = '',
}: {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`my-3 flex flex-col gap-2 ${className}`}>
      <div className="w-full overflow-hidden rounded-[10px]">
        {/* Plain <img> so the asset's intrinsic height is preserved.
            No forced aspect ratio — case-study mockups vary in shape. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="cs-image-fade block h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="font-sans text-[14px] leading-[20px] text-ink-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Lay multiple <CaseStudyImage>s side by side (1 col on mobile, 2 on desktop). */
export function CaseStudyImageRow({ children }: { children: React.ReactNode }) {
  return <div className="my-3 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">{children}</div>;
}

/** Stack multiple <CaseStudyImage>s vertically with consistent spacing. */
export function CaseStudyImageStack({ children }: { children: React.ReactNode }) {
  return <div className="my-3 flex flex-col gap-3">{children}</div>;
}
