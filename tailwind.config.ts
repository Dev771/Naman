import type { Config } from 'tailwindcss';
import { color, radius, shadow, breakpoint, space } from './src/lib/tokens';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    screens: {
      // Mobile-first stack. Anything below `md` uses the mobile layout;
      // `md` (1000px) is the crossover into the desktop layout — matches
      // the user's "1000px crossover" requirement.
      sm: '480px',
      md: '1000px',
      lg: '1280px',
      xl: `${breakpoint.desktop}px`, // 1440
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-instrument)', 'serif'],
        instrument: ['var(--font-instrument)', 'serif'],
        script: ['var(--font-script)', 'cursive'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        // Figma published variables
        blue: { 500: color.blue500, '500/20': color.blueOpacity20 },
        brand: {
          DEFAULT: color.blue500,
          500: color.brand500,
          800: color.brand800,
          950: color.brand950,
        },
        bg: { tint1: color.bgTint1 },
        cream: color.bgTint1,
        ink: {
          DEFAULT: color.ink,
          muted: color.inkMuted,
          subtle: color.inkSubtle,
          footer: color.footerInk,
        },
        nav: { inactive: color.navInactive },
        dearly: color.dearlyBg,
        problem: color.problemBg,
        neutral: { 100: color.neutral100 },
        accent: { yellow: color.yellow, orange: color.orange },
        // Per-card brand colors
        nomad: color.nomad,
        goodspace: { from: color.goodspaceFrom, to: color.goodspaceTo },
        veda: { DEFAULT: color.veda, glow: color.vedaGlow },
      },
      borderRadius: {
        md: `${radius.md}px`,   // Radius/MD = 12
        card: `${radius.card}px`, // 16
      },
      boxShadow: {
        e1: shadow.e1,
        e3: shadow.e3,
        glow: shadow.glow,
        chip: shadow.chip,
      },
      maxWidth: {
        page: `${space.pageMaxWidth}px`,    // 1200
        nav: `${breakpoint.desktop}px`,      // 1440
        mobile: `${breakpoint.mobile}px`,    // 390
      },
      spacing: {
        nav: `${space.navHeight}px`,
        'pad-d': `${space.desktopPadX}px`,
        'pad-m': `${space.mobilePadX}px`,
      },
      fontSize: {
        // Display
        'hero-d': ['96px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'hero-m': ['48px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        // Script
        'script-d': ['32px', { lineHeight: 'normal' }],
        'script-m': ['24px', { lineHeight: 'normal' }],
        // Lead
        'lead-d': ['20px', { lineHeight: '29.25px' }],
        'lead-m': ['16px', { lineHeight: '24px' }],
        // Card
        'card-title': ['20px', { lineHeight: '24px' }],
        'card-meta': ['16px', { lineHeight: '24px' }],
        // Button
        button: ['16px', { lineHeight: '24px' }],
        // Footer
        'footer-label': ['12px', { lineHeight: '14.4px' }],
        'footer-link': ['16px', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
};

export default config;
