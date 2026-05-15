'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { MuteButton } from './mute-button';

/**
 * Top Bar — Figma node 479:2453 (desktop) / 479:3094 (mobile).
 *
 * Scrolls naturally with the page — no fixed positioning.
 * Transparent gradient background blends seamlessly with the hero image
 * directly beneath it. Logo anchors left; nav links are absolutely centred
 * in the bar for a balanced, studio-site feel. Mute button anchors right.
 */
const links = [
  { href: '/work', label: 'Selected Work' },
  { href: '/about', label: 'About me' },
];

export function Nav() {
  const path = usePathname();

  return (
    <header className="relative z-20 w-full bg-transparent">
      <div className="relative mx-auto flex h-[72px] w-full max-w-page items-center px-4 md:px-0">

        {/* Logo — left anchor */}
        <Link href="/" aria-label="Naman home" className="block shrink-0">
          <Logo size={44} />
        </Link>

        {/* Nav links — absolutely centred in the bar */}
        <nav className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <ul className="pointer-events-auto flex items-center gap-8 font-sans text-[15px] font-medium leading-[24px] md:gap-10 md:text-[16px]">
            {links.map((l) => {
              const isActive = path === l.href || path?.startsWith(`${l.href}/`);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-active={isActive ? 'true' : 'false'}
                    className={`nav-underline transition-colors duration-200 hover:text-ink ${
                      isActive ? 'text-ink' : 'text-nav-inactive'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mute button — right anchor */}
        <div className="ml-auto shrink-0">
          <MuteButton />
        </div>

      </div>
    </header>
  );
}
