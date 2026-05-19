'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Logo } from './logo';
import { MuteButton } from './mute-button';
import { useAmbientAudio } from '@/lib/ambient-audio';
import { trackEvent } from '@/lib/analytics';

/**
 * Top Bar — Figma node 479:2453 (desktop) / 567:4502 (mobile).
 *
 * Scrolls naturally with the page — no fixed positioning.
 * Transparent gradient background blends seamlessly with the hero image.
 * Mobile view features a floating icecream icon that toggles a dropdown
 * menu overlay containing the links and the Ambient audio control.
 */
const links = [
  { href: '/work', label: 'Selected Work' },
  { href: '/about', label: 'About me' },
];

export function Nav() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { muted, toggleMute } = useAmbientAudio();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <>
      <header className="relative z-50 w-full bg-transparent">
        <div className="relative mx-auto flex h-[80px] w-full max-w-page items-center justify-between px-4 md:h-[72px] md:px-0">

          {/* Logo — left anchor */}
          <Link 
            href="/" 
            aria-label="Naman home" 
            className="block shrink-0" 
            onClick={() => {
              setMenuOpen(false);
              trackEvent('cta_click_logo', { name: 'Logo', location: 'Navbar' });
            }}
          >
            <Logo size={44} />
          </Link>

          {/* Mobile Menu Toggle (Nest Eco Leaf Icon) */}
          <button 
            className="block text-[#2f5bff] outline-none focus:outline-none transition-transform hover:scale-105 active:scale-95 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
          >
            <NestEcoLeafIcon 
              filled={menuOpen}
              className={`h-8 w-8 transition-all duration-300 ${menuOpen ? 'scale-95' : 'scale-100'}`} 
            />
          </button>

          {/* Desktop Nav links — absolutely centred in the bar */}
          <nav className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center">
            <ul className="pointer-events-auto flex items-center gap-8 font-sans text-[15px] font-medium leading-[24px] md:gap-10 md:text-[16px]">
              {links.map((l) => {
                const isActive = path === l.href || path?.startsWith(`${l.href}/`);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-active={isActive ? 'true' : 'false'}
                      onClick={() => trackEvent('cta_click_navbar', { name: l.label, href: l.href, location: 'Navbar Desktop' })}
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

          {/* Desktop Mute button — right anchor */}
          {path !== '/work' && !path?.startsWith('/work/') && (
            <div className="ml-auto hidden shrink-0 md:block">
              <MuteButton />
            </div>
          )}

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 ease-out md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark Blue Overlay Backdrop */}
        <div 
          className="absolute inset-0 top-[80px] bg-[rgba(28,60,168,0.4)] backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu Dropdown Panel */}
        <div 
          className={`absolute left-0 right-0 top-[80px] flex flex-col items-end bg-[#fffefc] px-4 py-4 transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-4 shadow-none'
          }`}
        >
          <ul className="flex flex-col items-end gap-3 font-sans text-[16px] font-medium leading-[24px] text-[#979785]">
            {links.map((l) => {
              const isActive = path === l.href || path?.startsWith(`${l.href}/`);
              return (
                <li key={l.href} className="flex h-[40px] items-center justify-end">
                  <Link
                    href={l.href}
                    onClick={() => {
                      setMenuOpen(false);
                      trackEvent('cta_click_navbar', { name: l.label, href: l.href, location: 'Navbar Mobile' });
                    }}
                    className={`transition-colors ${isActive ? 'text-[#2f5bff]' : 'hover:text-[#2f5bff]'}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            {path !== '/work' && !path?.startsWith('/work/') && (
              <li className="flex h-[40px] items-center justify-end mt-2">
                <MuteButton />
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

function NestEcoLeafIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg 
      viewBox="0 -960 960 960" 
      fill="currentColor"
      className={className}
    >
      <path d="M480-160q-56 0-105.5-17.5T284-227l-56 55q-11 11-28 11t-28-11q-11-11-11-28t11-28l55-55q-32-41-49.5-91T160-480q0-134 93-227t227-93h320v320q0 134-93 227t-227 93Zm0-80q100 0 170-70t70-170v-240H480q-100 0-170 70t-70 170q0 39 12 74.5t33 64.5l207-207q11-11 28-11t28 11q12 12 12 28.5T548-491L341-284q29 21 64.5 32.5T480-240Zm0-240Z"/>
      {filled && (
        <path d="M480-240q100 0 170-70t70-170v-240H480q-100 0-170 70t-70 170q0 39 12 74.5t33 64.5l207-207q11-11 28-11t28 11q12 12 12 28.5T548-491L341-284q29 21 64.5 32.5Z" />
      )}
    </svg>
  );
}
