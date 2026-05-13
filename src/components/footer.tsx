'use client';

import Link from 'next/link';
import { useHomeContext } from '@/components/home/home-context';

/**
 * Footer — Figma node 479:2746 (desktop) / 479:3318 (mobile).
 * Blue (#2f5bff) background. Devanagari wordmark at top, then three
 * columns: NAVIGATION / LET'S CHAT / SOCIALS.
 *
 * Hovering the inner content area triggers the HomeContext so the
 * StickyPhotoFrame fades out — consistent with all other tracked sections.
 */
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
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
      { label: 'Email', href: 'mailto:hi@example.com' },
      { label: 'Whatsapp', href: '#' },
    ],
  },
  {
    title: 'SOCIALS',
    items: [
      { label: 'Figma', href: 'https://figma.com', external: true },
      { label: 'Instagram', href: 'https://instagram.com', external: true },
    ],
  },
];

export function Footer() {
  const { onSectionEnter, onSectionLeave } = useHomeContext();

  return (
    <footer className="bg-[#2f5bff] text-ink-footer">
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
                          className="transition-opacity hover:opacity-80"
                        >
                          {item.label}
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

