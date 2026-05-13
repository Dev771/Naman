/**
 * Hero — Figma node 479:2459 (desktop) / 479:3101 (mobile).
 *
 * Centered column. "Namaste ji" tag in Square Peg 32px (24px mobile),
 * blue (#2f5bff). Headline in display marker font: 96px desktop / 48px
 * mobile, "Naman's" in blue. Description in Inter Regular 20/16. CTA
 * row: blue Resume button + 4 social icon buttons in light grey chips.
 *
 * Polaroid video frame is rendered separately as a sticky element on
 * the Homepage (see app/page.tsx + components/home/photo-frame.tsx).
 */
import Image from 'next/image';
import { home } from '@/lib/assets';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', svg: <InstagramSvg /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', svg: <LinkedInSvg /> },
  { label: 'WhatsApp', href: '#', svg: <WhatsAppSvg /> },
  { label: 'Figma', href: 'https://figma.com', svg: <FigmaSvg /> },
];

export function Hero() {
  return (
    <section className="relative -mt-[72px] w-full overflow-hidden pb-8">
      {/* Full-bleed background image — Next.js Image handles responsive srcset */}
      <Image
        src={home.heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* Layer 1 — top readability scrim: keeps headline/body text legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[rgba(253,251,248,0.68)] via-[rgba(253,251,248,0.30)] to-transparent"
      />

      {/* Layer 2 — cinematic bottom fade: starts at ~55% height, dissolves
          fully into the page background (#fdfbf8) by the section edge so
          there is zero hard cut into the WorkCards section below. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#fdfbf8] via-[rgba(253,251,248,0.85)] to-transparent"
      />

      {/* Content — sits above the image layers */}
      <div className="relative z-10 mx-auto flex max-w-page flex-col items-center gap-8 px-4 pb-10 pt-[120px] text-center md:px-0 md:pb-16 md:pt-[152px]">
        <div className="flex flex-col items-center gap-4">
          <span className="font-script text-[24px] leading-none text-blue-500 md:text-[32px]">
            Namaste ji
          </span>

          <h1 className="font-display text-[56px] uppercase leading-[1] tracking-[0] text-ink md:text-[112px] md:leading-[1]">
            Welcome to <span className="text-blue-500">Naman&rsquo;s</span> <br /> Internet corners
          </h1>
        </div>

        <p className="max-w-[732px] font-sans text-[16px] leading-[1.5] text-ink md:text-[20px] md:leading-[29.25px]">
          I&rsquo;m a product designer who enjoys turning messy ideas into simple, thoughtful
          experiences, especially where AI meets real user problems
        </p>

        {/* CTA cluster.
            Mobile: Resume button is full-width on top, the 4 social
            chips sit in a centered row below.
            Desktop (md+): everything collapses into a single inline row. */}
        <div className="flex w-full flex-col items-stretch justify-center gap-3 md:w-auto md:flex-row md:items-center">
          <a
            href="#"
            className="flex h-[50px] w-full items-center justify-center gap-3 rounded-md bg-blue-500 px-5 text-[16px] font-medium leading-[24px] text-bg-tint1 transition-transform hover:-translate-y-0.5 md:w-auto"
          >
            <ResumeIcon />
            Resume
          </a>
          <div className="flex items-center justify-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-md bg-ink/[0.04] text-ink transition-colors hover:bg-blue-500 hover:text-bg-tint1"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ResumeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

function InstagramSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedInSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18.34H5.67v-8.67h2.67v8.67zm-1.34-9.84a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.84h-2.67v-4.21c0-1 0-2.29-1.4-2.29-1.4 0-1.62 1.1-1.62 2.22v4.28H9.99V9.67h2.56v1.18h.04c.36-.68 1.23-1.4 2.53-1.4 2.71 0 3.21 1.78 3.21 4.1v4.79z" />
    </svg>
  );
}

function WhatsAppSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04 0C5.5 0 .19 5.31.18 11.84c0 2.08.55 4.12 1.6 5.91L0 24l6.4-1.68a11.83 11.83 0 0 0 5.64 1.43h.01c6.54 0 11.85-5.31 11.86-11.84A11.78 11.78 0 0 0 20.52 3.48zm-8.48 18.27h-.01a9.84 9.84 0 0 1-5.01-1.37l-.36-.21-3.8 1 1.02-3.7-.23-.38a9.83 9.83 0 0 1-1.5-5.21c0-5.43 4.43-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.97c-.01 5.43-4.43 9.86-9.81 9.86zm5.4-7.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.39-1.47a8.96 8.96 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.5.07-.77.37-.27.3-1.02 1-1.02 2.44s1.04 2.83 1.19 3.03c.15.2 2.05 3.13 4.97 4.39.7.3 1.24.48 1.66.61.7.22 1.33.19 1.83.12.56-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

function FigmaSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 24a4 4 0 0 1-4-4v-4h4a4 4 0 0 1 0 8z" />
      <path d="M5 12a4 4 0 0 1 4-4h4v8H9a4 4 0 0 1-4-4z" />
      <path d="M5 4a4 4 0 0 1 4-4h4v8H9a4 4 0 0 1-4-4z" />
      <path d="M13 0h4a4 4 0 0 1 0 8h-4V0z" />
      <path d="M19 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
    </svg>
  );
}
