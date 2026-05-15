'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useHomeContext } from '@/components/home/home-context';
import { ArrowUpRight } from 'lucide-react';

/**
 * Footer — Refined UI based on Figma design.
 * Blue (#2f5bff) background with deep blue decorative waves at the bottom.
 * Devanagari wordmark at top left, Pokemon image, and credits.
 * Three columns on the right: NAVIGATION / LET'S CHAT / SOCIALS.
 *
 * Hovering the inner content area triggers the HomeContext so the
 * StickyPhotoFrame fades out — consistent with all other tracked sections.
 */
const EMAIL = 'namanbhateja.work@gmail.com';
const GMAIL_SUBJECT = "Hey Naman! Let's connect";
const GMAIL_BODY = "Hi Naman,\n\nI came across your portfolio and would love to chat about...\n\nBest,\n";
const GMAIL_COMPOSE =
  `https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto` +
  `&to=${encodeURIComponent(EMAIL)}` +
  `&su=${encodeURIComponent(GMAIL_SUBJECT)}` +
  `&body=${encodeURIComponent(GMAIL_BODY)}`;

const sections = [
  {
    title: 'NAVIGATION',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Selected Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Resume', href: '#' },
    ],
  },
  {
    title: "LET'S CHAT",
    items: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/namanbhateja0808', external: true },
      { label: 'Email', href: GMAIL_COMPOSE, external: true },
      { label: 'WhatsApp', href: 'https://wa.me/919811535385', external: true },
    ],
  },
  {
    title: 'SOCIALS',
    items: [
      { label: 'Figma', href: 'https://www.figma.com/@namanbhateja1', external: true },
      { label: 'Instagram', href: 'https://instagram.com', external: true },
    ],
  },
];

export function Footer() {
  const { onSectionEnter, onSectionLeave } = useHomeContext();
  const footerRef = useRef<HTMLElement>(null);

  // Measure the footer's rendered height and sync it to a CSS variable on
  // <body>. The layout reads --footer-h to size the transparent spacer
  // above the footer so the cream wrapper's bottom edge lines up exactly
  // with the footer's top — no awkward cream gap, no overlap.
  useEffect(() => {
    if (!footerRef.current) return;
    const apply = () => {
      const h = footerRef.current?.offsetHeight ?? 0;
      document.body.style.setProperty('--footer-h', `${h}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(footerRef.current);
    window.addEventListener('resize', apply);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', apply);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="fixed inset-x-0 bottom-0 z-0 bg-[#2f5bff] text-ink-footer overflow-hidden"
    >
      {/* Decorative Waves */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-[200px] md:h-[280px] pointer-events-none opacity-90">
        <svg 
          className="absolute bottom-0 w-[200%] md:w-full h-full object-cover md:object-fill" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#1c3dc4" 
            fillOpacity="0.6" 
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg 
          className="absolute bottom-0 w-[200%] md:w-full h-[140px] md:h-[220px] object-cover md:object-fill" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#0f2275" 
            d="M0,128L60,149.3C120,171,240,213,360,208C480,203,600,149,720,144C840,139,960,181,1080,192C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-nav px-4 pb-10 pt-8 md:px-36 md:pb-20 md:pt-8">
        {/* Hover target */}
        <div
          className="mx-auto max-w-page"
          onMouseEnter={onSectionEnter}
          onMouseLeave={onSectionLeave}
        >
          {/* ── DESKTOP layout: wordmark+image left, links right ── */}
          <div className="hidden md:flex md:flex-row md:items-start md:justify-between">
            {/* Left: Wordmark + Pokemon image + credits */}
            <div className="flex flex-col items-start gap-[32px]">
              <div className="font-display tracking-tight">
                <p className="text-[44px] leading-[1.1] text-[#fffefc]">
                  त्याग शान्ति अन्तराम
                </p>
              </div>
              <div className="flex flex-col items-start justify-center">
                <div className="relative w-[286px] h-[160px] hover:scale-105 transition-transform duration-500 ease-out">
                  <Image
                    src="https://res.cloudinary.com/duqqte7b4/image/upload/v1778843685/Gemini_Generated_Image_rxacw7rxacw7rxac-Photoroom_1_oxm0tt.png"
                    alt="Playful Pokemon Characters"
                    fill
                    className="object-contain pointer-events-none"
                    unoptimized
                  />
                </div>
                <div className="text-[#fffefc] text-[16px] flex flex-wrap items-center gap-[20px] font-normal leading-[14.4px] mt-1">
                  <span className="font-['Inter']">Made by official DIET Coke paguls 💅</span>
                  <div className="flex gap-[4px] items-center">
                    <span className="italic underline decoration-solid hover:opacity-80 transition-opacity cursor-default">Dev G.</span>
                    <span className="font-['Inter']">&</span>
                    <span className="italic underline decoration-solid hover:opacity-80 transition-opacity cursor-default">Naman B.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Links */}
            <div className="flex flex-row gap-[80px]">
              {sections.map((section) => (
                <div key={section.title} className="flex min-w-[min-content] flex-col gap-[20px]">
                  <p className="text-[12px] font-normal leading-[14.4px] text-[#fffefc]">
                    {section.title}
                  </p>
                  <ul className="flex flex-col gap-[12px] text-[16px] leading-normal text-[#fffefc]">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target={'external' in item && item.external ? '_blank' : undefined}
                          rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                          className="group relative inline-flex items-center gap-1.5 transition-all hover:opacity-80"
                        >
                          <span className="relative">
                            {item.label}
                            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#fffefc]/50 transition-all duration-300 group-hover:w-full"></span>
                          </span>
                          {'external' in item && item.external && (
                            <ArrowUpRight
                              size={14}
                              strokeWidth={2.5}
                              className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── MOBILE layout (Figma 567:58): wordmark → links wrap → image/credits ── */}
          <div className="flex flex-col gap-6 md:hidden">
            {/* Wordmark full-width */}
            <div className="font-display tracking-tight w-full">
              <p className="text-[36px] leading-[1.1] text-[#fffefc]">
                त्याग शान्ति अन्तराम
              </p>
            </div>

            {/* Links: flex-wrap so NAVIGATION + LET'S CHAT sit side by side,
                SOCIALS wraps onto its own row — mirrors Figma gap-[80px] wrap */}
            <div className="flex flex-wrap gap-x-[80px] gap-y-10">
              {sections.map((section) => (
                <div key={section.title} className="flex flex-col gap-[20px]">
                  <p className="text-[12px] font-normal leading-[14.4px] text-[#fffefc] tracking-wide">
                    {section.title}
                  </p>
                  <ul className="flex flex-col gap-[12px] text-[16px] leading-normal text-[#fffefc]">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target={'external' in item && item.external ? '_blank' : undefined}
                          rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                          className="group relative inline-flex items-center gap-1.5 transition-all hover:opacity-80"
                        >
                          <span className="relative">
                            {item.label}
                            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#fffefc]/50 transition-all duration-300 group-hover:w-full"></span>
                          </span>
                          {'external' in item && item.external && (
                            <ArrowUpRight
                              size={14}
                              strokeWidth={2.5}
                              className="opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Pokemon image + credits — centered, matches Figma bottom section */}
            <div className="flex flex-col items-center w-full mt-2">
              <div className="relative w-[286px] h-[160px] hover:scale-105 transition-transform duration-500 ease-out">
                <Image
                  src="https://res.cloudinary.com/duqqte7b4/image/upload/v1778843685/Gemini_Generated_Image_rxacw7rxacw7rxac-Photoroom_1_oxm0tt.png"
                  alt="Playful Pokemon Characters"
                  fill
                  className="object-contain pointer-events-none"
                  unoptimized
                />
              </div>
              <div className="text-[#fffefc] text-[16px] flex flex-col items-center gap-[20px] font-normal leading-[14.4px] mt-1 text-center">
                <span className="font-['Inter']">Made by official DIET Coke paguls 💅</span>
                <div className="flex gap-[4px] items-center">
                  <span className="italic underline decoration-solid">Dev G.</span>
                  <span className="font-['Inter']">&</span>
                  <span className="italic underline decoration-solid">Naman B.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


