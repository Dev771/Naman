import localFont from 'next/font/local';
import { Inter, Square_Peg, Instrument_Serif, Playfair_Display } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * Display font — the actual Reckless face shipped by the user, served
 * locally from /public/fonts/. Single OTF file (the full Reckless face).
 * Exposed as `--font-display` so every `font-display` Tailwind class
 * picks it up automatically.
 */
export const display = localFont({
  src: '../../public/fonts/Reckless.otf',
  variable: '--font-display',
  display: 'swap',
  weight: '400',
  style: 'normal',
});

export const script = Square_Peg({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
});

// Used inside the Side Project "Dearly" tile (per Figma)
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-playfair',
  display: 'swap',
});
