'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';

/**
 * Top Bar — Figma node 479:2453 (desktop) / 479:3094 (mobile).
 * Logo on the left, only "Selected Work" and "About me" on the right.
 * No "Home", no "Resume" button. Inactive: #979785, active: #35324f. Inter Medium 16/24.
 */
const links = [
  { href: '/work', label: 'Selected Work' },
  { href: '/about', label: 'About me' },
];

export function Nav() {
  const path = usePathname();
  return (
    <header className="w-full bg-cream">
      <div className="flex w-full items-center justify-between px-4 py-[10px] md:px-20">
        <Link href="/" aria-label="Naman home" className="block">
          <Logo size={48} />
        </Link>
        <nav>
          <ul className="flex h-[60px] items-center gap-[10px] font-sans text-[16px] font-medium leading-[24px] md:gap-10">
            {links.map((l) => {
              const isActive = path === l.href || path?.startsWith(`${l.href}/`);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-active={isActive ? 'true' : 'false'}
                    className={`nav-underline transition-colors hover:text-ink ${
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
      </div>
    </header>
  );
}
