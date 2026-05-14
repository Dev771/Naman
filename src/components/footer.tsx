'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useHomeContext } from '@/components/home/home-context';
import { ArrowUpRight } from 'lucide-react';

/**
 * Footer — Figma node 479:2746 (desktop) / 479:3318 (mobile).
 * Blue (#2f5bff) background. Devanagari wordmark at top, then three
 * columns: NAVIGATION / LET'S CHAT / SOCIALS.
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
      className="fixed inset-x-0 bottom-0 z-0 bg-[#2f5bff] text-ink-footer">
      <div className="mx-auto max-w-nav px-4 pb-10 pt-8 md:px-36 md:pb-20 md:pt-8">
        {/* Hover target: only the actual content block, not the surrounding padding */}
        <div
          className="mx-auto max-w-page"
          onMouseEnter={onSectionEnter}
          onMouseLeave={onSectionLeave}
        >
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-start md:justify-between md:gap-0">
            {/* Devanagari wordmark */}
            <div className="font-display tracking-tight">
              <p className="text-3xl leading-tight md:text-[44px] md:leading-[1.1]">
                त्याग शान्ति अन्तराम
              </p>
            </div>

            <div className="flex flex-col gap-10 md:flex-row md:gap-20">
              {sections.map((section) => (
                <div key={section.title} className="flex min-w-[120px] flex-col gap-5">
                  <p className="text-[12px] leading-[14.4px] tracking-[0.04em]">{section.title}</p>
                  <ul className="flex flex-col gap-3 text-[16px] leading-normal">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target={'external' in item && item.external ? '_blank' : undefined}
                          rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                          className="group inline-flex items-center gap-1 transition-opacity hover:opacity-80"
                        >
                          {item.label}
                          {'external' in item && item.external && (
                            <ArrowUpRight size={14} strokeWidth={2} className="opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

