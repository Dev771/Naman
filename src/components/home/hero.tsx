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
 *
 * Ambient audio: birds / nature soundscape plays while this section is
 * visible in the viewport (via useHeroAudio + AmbientAudioContext).
 */
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { home } from '@/lib/assets';
import { FileText } from 'lucide-react';
import { useHeroAudio } from '@/hooks/use-hero-audio';
import { PhotoFrame } from './photo-frame';
import { useHomeContext } from './home-context';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', svg: <InstagramSvg /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/namanbhateja0808', svg: <LinkedInSvg /> },
  { label: 'WhatsApp', href: 'https://wa.me/919811535385', svg: <WhatsAppSvg /> },
  { label: 'Figma', href: 'https://www.figma.com/@namanbhateja1', svg: <FigmaSvg /> },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useHeroAudio(sectionRef, 'home-hero');
  const { onSectionEnter, onSectionLeave } = useHomeContext();

  return (
    <section ref={sectionRef} className="relative -mt-[72px] w-full overflow-hidden pb-8">
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

      {/* Layer 1 — softer top readability scrim to make mountain illustration more integrated */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[rgba(253,251,248,0.50)] via-[rgba(253,251,248,0.10)] to-transparent"
      />

      {/* Layer 2 — cinematic bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-[#fdfbf8] via-[rgba(253,251,248,0.75)] to-transparent"
      />

      {/* Content — increased top spacing and vertical rhythm */}
      <div className="relative z-10 mx-auto flex max-w-page flex-col items-center gap-[40px] px-4 pb-[64px] pt-[88px] text-center md:gap-8 md:px-0 md:pb-16 md:pt-[152px]">
        <div className="flex flex-col items-center gap-[20px] md:gap-4">
          <span className="font-script text-[32px] leading-none text-blue-500">
            Namaste ji
          </span>

          <h1 className="font-display text-[56px] uppercase leading-[0.95] tracking-tight text-ink md:text-[112px] md:leading-[1]">
            Welcome to <span className="text-blue-500">Naman&rsquo;s</span><br />Internet corners
          </h1>
        </div>

        <p className="max-w-[732px] font-sans text-[16px] leading-[1.6] text-ink md:text-[20px] md:leading-[29.25px]">
          I&rsquo;m a product designer who enjoys turning messy ideas into simple, thoughtful
          experiences, especially where AI meets real user problems
        </p>

        {/* CTA cluster with larger mobile touch targets and softer shadow styling */}
        <div 
          className="flex w-full flex-col items-stretch justify-center gap-[16px] md:w-auto md:flex-row md:items-center md:gap-3"
          onMouseEnter={onSectionEnter}
          onMouseLeave={onSectionLeave}
        >
          <a
            href="#"
            className="flex h-[56px] w-full items-center justify-center gap-3 rounded-[16px] bg-blue-500 px-6 text-[18px] font-medium leading-[24px] text-bg-tint1 shadow-[0_8px_24px_-8px_rgba(47,91,255,0.4)] transition-transform hover:-translate-y-0.5 md:h-[50px] md:w-auto md:rounded-md md:text-[16px] md:shadow-none"
          >
            <ResumeIcon />
            Resume
          </a>
          <div className="flex items-center justify-center gap-[16px] md:gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-white/70 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-white/60 text-ink transition-colors hover:bg-blue-500 hover:text-white md:h-[50px] md:w-[50px] md:rounded-md md:bg-ink/[0.04] md:border-none md:shadow-none md:hover:text-bg-tint1"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Inline Photo Frame (Mobile Only) with larger top spacing */}
        <div className="mt-8 flex w-full justify-center md:hidden">
          <PhotoFrame className="!rotate-0 scale-105 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] hover:scale-110" />
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
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
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
