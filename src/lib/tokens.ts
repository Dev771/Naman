/**
 * Design tokens — extracted directly from the Figma file
 * `Identity-2026` (key TbowcQZs4ebLaW6Kblnb44, canvas 450:1914).
 *
 * Source of truth: the Figma published variables (`get_variable_defs`)
 * plus typography and spacing observed across `get_design_context` calls.
 *
 * Tailwind config consumes these in tailwind.config.ts.
 */

export const color = {
  // From Figma published variables
  blue500: '#2f5bff',          // Blue/500-Base — primary CTA
  blueOpacity20: '#2f5bff33',  // Blue/Opacity-20

  brand500: '#1A93DD',         // Brand/500 (alt brand light)
  brand800: '#0E507E',         // Brand/800
  brand950: '#0C2A45',         // Brand/950

  bgTint1: '#fdfbf8',          // Background/Tint-1 — page background, light text on dark

  yellow: '#F2C94C',
  orange: '#F2994A',

  white: '#FFFFFF',
  pureWhite: '#ffffff',

  neutral100: '#d5d2cd',       // Colors/Neutral/100

  // Observed in design_context (not yet promoted to Figma variables)
  ink: '#35324f',              // body / heading text
  inkMuted: '#535353',         // metadata / secondary text
  inkSubtle: '#a3a3a3',        // career meta / dates / mute body
  navInactive: '#979785',      // top-bar inactive nav text (olive grey)
  footerInk: '#fffefc',        // off-white footer text

  // Per-card backgrounds
  nomad: '#0072bc',            // Nomadcredit hero card
  goodspaceFrom: '#2a78c2',    // Goodspace hero gradient start
  goodspaceTo: '#14395c',      // Goodspace hero gradient end
  veda: '#fff7e8',             // Vedasmriti hero card cream
  vedaGlow: '#FFEACF',         // Vedasmriti yellow drop-shadow color
  dearlyBg: '#efe7dc',         // Side project tile background
  problemBg: '#f2f2f2',        // Case study Problem box background
} as const;

export const radius = {
  md: 12,    // Radius/MD — buttons, footer chips
  card: 16,  // standard card radius (observed in design)
} as const;

export const shadow = {
  // Global Tokens/E1 — subtle elevation
  e1: '0 2px 4px 0 rgba(27,28,29,0.04)',
  // Global Tokens/E3 — strong elevation, used on Selected Work tiles
  e3: '0 16px 40px -8px rgba(88,92,95,0.16)',
  // `ll` — Vedasmriti card warm glow
  glow: '0 4px 58.5px 15px rgba(255,234,207,0.12)',
  // Card shadow seen on chip/pill rows
  chip: '-6px 9px 34px 0 rgba(213,213,213,0.25)',
} as const;

export const breakpoint = {
  mobile: 390,    // Figma mobile frames width
  desktop: 1440,  // Figma Breakpoint/Desktop
  content: 1200,  // inner content max-width on desktop
} as const;

/**
 * Typography — observed in `get_design_context` across hero, cards, footer.
 * font keys map to CSS `--font-*` variables defined in src/app/fonts.ts
 */
export const text = {
  // Display serif — Reckless (placeholder Fraunces until license provided)
  hero: {
    font: 'display',
    sizeDesktop: 96,
    sizeMobile: 48,
    weight: 400,
    lineHeight: 'normal',
    color: color.ink,
  },
  // Handwritten accent — Square Peg
  script: {
    font: 'script',
    sizeDesktop: 32,
    sizeMobile: 24,
    weight: 400,
    color: color.blue500,
  },
  // Lead paragraph — Inter Regular
  lead: {
    font: 'sans',
    sizeDesktop: 20,
    sizeMobile: 16,
    weight: 400,
    lineHeight: 29.25,
    color: color.ink,
  },
  // Card-footer title — Inter Medium
  cardTitle: {
    font: 'sans',
    sizeDesktop: 20,
    sizeMobile: 16,
    weight: 500,
    lineHeight: 24,
    color: color.ink,
  },
  // Card-footer meta — Inter Medium muted
  cardMeta: {
    font: 'sans',
    sizeDesktop: 20,
    sizeMobile: 14,
    weight: 500,
    lineHeight: 24,
    color: color.inkMuted,
  },
  // Button label — Inter Medium 16
  button: {
    font: 'sans',
    size: 16,
    weight: 500,
    lineHeight: 24,
  },
  // Footer category label
  footerLabel: {
    font: 'sans',
    size: 12,
    weight: 400,
    lineHeight: 14.4,
    color: color.footerInk,
  },
  // Footer link
  footerLink: {
    font: 'sans',
    size: 16,
    weight: 400,
    color: color.footerInk,
  },
} as const;

export const space = {
  // From Figma frame measurements
  navHeight: 80,
  pageMaxWidth: 1200,
  pageGap: 64,
  cardStackGap: 24,
  cardHeight: 552,
  cardPadX: 80,
  desktopPadX: 144,   // homepage outer padding
  mobilePadX: 16,
} as const;

export type Token = {
  color: typeof color;
  radius: typeof radius;
  shadow: typeof shadow;
  breakpoint: typeof breakpoint;
  text: typeof text;
  space: typeof space;
};
