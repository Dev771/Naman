import type { Metadata } from 'next';
import { inter, display, script, instrumentSerif, playfair } from './fonts';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://namanbhateja.com'),
  title: {
    default: 'Naman Bhateja — Product Designer',
    template: '%s · Naman Bhateja',
  },
  description:
    "I'm a product designer who enjoys turning messy ideas into simple, thoughtful experiences, especially where AI meets real user problems.",
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'Naman Bhateja — Product Designer',
    description:
      "I'm a product designer who enjoys turning messy ideas into simple, thoughtful experiences.",
    type: 'website',
    siteName: "Naman's Internet Corners",
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${inter.variable} ${display.variable} ${script.variable} ${instrumentSerif.variable} ${playfair.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <body className="bg-cream font-sans text-ink">
        {/* SVG filter that gives the hero heading a textured, marker-stippled
            edge — referenced via `filter: url(#grain)` in CSS. Lives at the
            page root so any text element on any route can apply it. */}
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <filter id="grain" x="-2%" y="-2%" width="104%" height="104%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" stitchTiles="stitch" />
              <feDisplacementMap in="SourceGraphic" scale="2.5" />
            </filter>
          </defs>
        </svg>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
