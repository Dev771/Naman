import type { Metadata } from 'next';
import { inter, display, script, instrumentSerif, playfair } from './fonts';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { HomeProvider } from '@/components/home/home-context';
import { AmbientAudioProvider } from '@/lib/ambient-audio';
import Script from 'next/script';
import { AnalyticsTracker } from '@/components/analytics-tracker';

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
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={fontVars}>
      <body className="bg-cream font-sans text-ink">
        {/* Google Analytics 4 Script Integration */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <AnalyticsTracker />

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
        <AmbientAudioProvider>
          <HomeProvider>
            {/* Parallax: main content sits on an elevated cream layer (z-10)
                that scrolls over the fixed footer (z-0) sitting behind it.
                The spacer's height is synced to the footer's actual height
                via --footer-h (set by the Footer component) so the cream
                layer's bottom edge lines up exactly with the footer's top
                when fully scrolled — no gap, no overlap. */}
            <div className="relative z-10 bg-cream">
              <Nav />
              {children}
            </div>
            <div
              aria-hidden="true"
              style={{ height: 'var(--footer-h, 400px)' }}
            />
            <Footer />
          </HomeProvider>
        </AmbientAudioProvider>
      </body>
    </html>
  );
}
