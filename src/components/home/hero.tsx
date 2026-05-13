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
import { FileText, MessageCircle } from 'lucide-react';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', svg: <InstagramSvg /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/namanbhateja0808', svg: <LinkedInSvg /> },
  { label: 'WhatsApp', href: 'https://wa.me/919811535385', svg: <WhatsAppSvg /> },
  { label: 'Figma', href: 'https://www.figma.com/@namanbhateja1', svg: <FigmaSvg /> },
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
  return <FileText size={20} strokeWidth={2} />;
}

function InstagramSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function LinkedInSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function WhatsAppSvg() {
  return <MessageCircle size={20} strokeWidth={1.8} />;
}

function FigmaSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
      <path d="M12 2h3.5A3.5 3.5 0 0 1 19 5.5v0A3.5 3.5 0 0 1 15.5 9H12V2z"></path>
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
    </svg>
  );
}
