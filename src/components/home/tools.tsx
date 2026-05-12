import Image from 'next/image';
import { CareerSection } from './career-section';

/**
 * Tools — Figma node 479:2691.
 *
 * Per the user's screenshot, the Figma shows exactly four tools sitting
 * directly on the page background (no white card chips):
 *   Figma · Notion · Framer · Microsoft Teams
 *
 * Logos are pulled from Iconify's `logos:*` set (full-color brand
 * marks, free, no API key). Hovering each tile shows its brand name
 * via the native `title` tooltip.
 */
const TOOLS = [
  { label: 'Figma', icon: 'https://api.iconify.design/logos/figma.svg' },
  { label: 'Notion', icon: 'https://api.iconify.design/logos/notion-icon.svg' },
  { label: 'Framer', icon: 'https://api.iconify.design/logos/framer.svg' },
  { label: 'Microsoft Teams', icon: 'https://api.iconify.design/logos/microsoft-teams.svg' },
];

export function Tools() {
  return (
    <CareerSection title="Tools" titleColor="text-ink-muted">
      <ul className="flex flex-wrap items-center gap-4">
        {TOOLS.map((t) => (
          <li
            key={t.label}
            title={t.label}
            aria-label={t.label}
            className="flex h-[52px] w-[52px] items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Image
              src={t.icon}
              alt={t.label}
              width={44}
              height={44}
              unoptimized
              className="object-contain"
            />
          </li>
        ))}
      </ul>
    </CareerSection>
  );
}
