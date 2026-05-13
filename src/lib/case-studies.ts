/**
 * Single source of truth for every case study on the site.
 *
 * Adding a new case study here (or flipping one to `comingSoon: true`)
 * makes it appear automatically in:
 *   • the homepage hero cards (`src/components/home/work-cards.tsx`)
 *   • the Selected Work featured cards (`src/components/work/featured-cards.tsx`)
 *   • the `/work/[slug]` dynamic detail page (`src/app/work/[slug]/page.tsx`)
 *
 * Each entry packs both the **card preview** (cardTitle / cardMeta /
 * cardImage / cardBg) and the **detail-page content** (intro + sections
 * built from typed blocks). No per-page files; all content is data.
 */

const C = (path: string) => `https://res.cloudinary.com/duqqte7b4/${path}`;

/* ── Content block types ────────────────────────────────────────────
 * Sections are composed of typed blocks. Paragraphs and list items
 * accept HTML strings so you can use <strong>, <em>, <br>, emoji, etc.
 * inline. Images can be a single figure with a caption or a stack/row
 * of figures. */

export type ParaBlock = {
  type: 'para';
  html: string;
  /** When true, the paragraph is rendered bold (typically a lead line) */
  bold?: boolean;
};
export type ListBlock = {
  type: 'list';
  /** Each item is an HTML string */
  items: string[];
  /** Optional bold lead-in paragraph rendered above the list */
  lead?: string;
};
export type ImageBlock = {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
};
export type ImagesBlock = {
  type: 'images';
  layout?: 'stack' | 'row';
  items: { src: string; alt?: string; caption?: string }[];
};

export type Block = ParaBlock | ListBlock | ImageBlock | ImagesBlock;

export type Section = {
  /** Heading text and slug source for the section's TOC entry */
  title: string;
  /** When true, renders inside the gray Problem-style block */
  emphasis?: boolean;
  blocks: Block[];
};

export type CaseStudy = {
  /** Stable id used for keys and `getCaseStudy()` lookup */
  id: string;
  /** URL slug — the detail page lives at `/work/${slug}` */
  slug: string;
  href: string;
  /** When true, card is non-clickable; hover shows a grey "Coming soon" pill */
  comingSoon?: boolean;

  // ── Hero card preview (used by home + work pages) ──
  cardTitle: string;
  cardMeta: string;
  cardImage: string;
  /** CSS color or linear-gradient — applied as the card background */
  cardBg: string;

  // ── Detail-page meta (read by the dynamic /work/[slug] page) ──
  title: string;
  role: string;
  timeline: string;
  team: string;
  skills: string[];
  hero: string;
  /** Plain-text or HTML string rendered as the TL;DR overview paragraph */
  intro: string;
  /** Ordered list of body sections */
  sections: Section[];
};

/* ── All case studies, in display order ──────────────────────────── */

export const caseStudies: CaseStudy[] = [
  /* ─────────────── NOMAD CREDIT ─────────────── */
  {
    id: 'nomad',
    slug: 'nomad',
    href: '/work/nomad',
    cardTitle: 'The Fintech Powerhouse',
    cardMeta: 'Nomadcredit | 2025–2026',
    cardImage: C('image/upload/v1777222158/Nomadcredit_yufy2w.png'),
    cardBg: '#0072bc',
    title: 'Nomad Credit',
    role: 'Product Designer',
    timeline: '2025 — Present',
    team: 'Naman Bhateja',
    skills: ['Product Design', 'Systems', 'Prototyping'],
    hero: '/nomad/image-1.png',
    comingSoon: true,
    intro:
      'Nomad Credit helps Indian students fund their study-abroad journeys with cross-border loans. The product had earned trust with users but the core flows — application, optimization, dashboard — were stitched together over years of growth and were starting to fray. My job was to redesign these flows as a system, not a stack of screens.',
    sections: [
      {
        title: 'Problem',
        emphasis: true,
        blocks: [
          {
            type: 'para',
            html: 'Cross-border student lending sits between two competing expectations: the paperwork-heavy reality of cross-currency banking, and the consumer-grade speed students expect after months of research and a tight intake deadline.',
          },
          {
            type: 'list',
            lead: 'Where the existing flow leaked:',
            items: [
              'Application steps felt arbitrary — users couldn&rsquo;t see the path ahead',
              'The dashboard surfaced state but not next-action',
              'Optimization recommendations were buried, so few students acted on them',
              'Recovery from errors (missing docs, mismatch) put work back on the user',
            ],
          },
        ],
      },
      {
        title: 'Approach',
        blocks: [
          {
            type: 'para',
            html: 'Before redesigning anything, I mapped every screen the user saw across the application, optimization, and post-funding journeys, then layered the system actions (KYC checks, partner-bank handoffs, broker calls) underneath.',
          },
          {
            type: 'para',
            html: 'The map made it obvious that the friction was structural — the user was carrying state that the system could and should hold.',
          },
          {
            type: 'image',
            src: '/nomad/image-2.png',
            caption: 'Mapping the existing journey before touching pixels.',
          },
        ],
      },
      {
        title: 'Dashboard redesign',
        blocks: [
          {
            type: 'para',
            html: 'The dashboard was the home base — a student would return to it dozens of times across a 3-month application window. We rebuilt it around three layers:',
          },
          {
            type: 'list',
            items: [
              '<strong>Next action</strong> — one card, with the smallest viable next step',
              '<strong>Evidence</strong> — a compact view of what the partner bank has and what is outstanding',
              '<strong>History</strong> — every status change with timestamp, collapsed by default',
            ],
          },
          {
            type: 'image',
            src: '/nomad/image-3.png',
            caption: 'The new dashboard puts next-action at the top, evidence in the middle, history at the bottom.',
          },
          {
            type: 'image',
            src: '/nomad/image-4.png',
            caption: 'Status timeline: collapsed by default, expandable for full history.',
          },
        ],
      },
      {
        title: 'Optimization flow',
        blocks: [
          {
            type: 'para',
            html: 'Optimization — re-rating, co-applicant changes, course substitution — used to live in a settings tab almost no student opened. We moved it onto the dashboard as a contextual card, only when the system had a real recommendation, and made the change preview the most prominent piece of UI on the screen.',
          },
          {
            type: 'image',
            src: '/nomad/image-5.png',
            caption: 'Optimization moved from a buried tab to a card on the dashboard.',
          },
          {
            type: 'image',
            src: '/nomad/image-6.png',
            caption: 'Change preview shows old vs. new in a single comparison view.',
          },
          {
            type: 'para',
            html: 'Acting on a recommendation went from a 7-screen flow to two clicks plus a confirmation.',
          },
        ],
      },
      {
        title: 'Onboarding',
        blocks: [
          {
            type: 'para',
            html: 'First-time visitors used to land directly inside the application. We added a short pre-application step that captured intent and surfaced two outputs: a clear eligibility signal, and an application screen that pre-filled everything we already knew. Time-to-first-completed-step dropped meaningfully in early usability tests.',
          },
          {
            type: 'image',
            src: '/nomad/image-10.png',
            caption: 'The new on-ramp: one short questionnaire, then the application opens with everything pre-filled it can pre-fill.',
          },
        ],
      },
      {
        title: 'Reflection',
        blocks: [
          {
            type: 'para',
            html: 'The hardest part of this project was resisting the urge to redesign every screen at once. The wins came from picking three flows — dashboard, optimization, onboarding — and making sure the underlying system worked the way the screens implied it did.',
          },
          {
            type: 'para',
            html: 'If I take this further, the next push is on the post-funding journey: visa, disbursal tracking, repayment ramp. Same approach — name the next action, show the evidence, hide the rest until the user wants to see it.',
          },
        ],
      },
    ],
  },

  /* ─────────────── GOODSPACE ─────────────── */
  {
    id: 'goodspace',
    slug: 'goodspace',
    href: '/work/goodspace',
    cardTitle: 'The AI & Systems Foundation',
    cardMeta: 'GoodSpace | 2023–2024',
    cardImage: C('image/upload/v1777222161/Goodspace_awosfr.png'),
    cardBg: 'linear-gradient(180deg,#2a78c2 0%,#14395c 100%)',
    title: 'GoodSpace is an AI-powered recruitment platform',
    role: 'Product Designer',
    timeline: '2023-2024',
    team: 'Naman Bhateja',
    skills: ['User research', 'UIUX Design', 'Prototyping'],
    hero: C('image/upload/v1777222161/Goodspace_awosfr.png'),
    intro:
      'GoodSpace reimagines hiring by replacing manual filtering with AI-driven shortlisting and interviews. By improving match quality and reducing uncertainty in the hiring journey, the platform reduced overall hiring time by 47%, decreased drop-offs by 12%, and increased application engagement by 8%.',
    sections: [
      {
        title: 'Problem',
        emphasis: true,
        blocks: [
          { type: 'para', html: 'Hiring today is not broken because of lack of opportunities, it&rsquo;s broken because of poor signal quality.' },
          { type: 'para', html: 'Job seekers are overwhelmed with irrelevant listings, often applying to roles that don&rsquo;t match their skills. At the same time, recruiters are flooded with applications, spending hours filtering candidates who aren&rsquo;t a good fit.' },
          {
            type: 'list',
            lead: 'For Job Seekers',
            items: [
              '45% struggle to find relevant jobs',
              '54% are frustrated by long application processes',
              '40% waste time applying to mismatched roles',
            ],
          },
          {
            type: 'list',
            lead: 'For Recruiters',
            items: [
              '63% spend significant time filtering unqualified applicants',
              '52% believe platforms fail to filter effectively',
              '60% candidate drop-off during interviews',
            ],
          },
          {
            type: 'list',
            lead: 'This leads to:',
            items: ['Low-quality matches', 'Delayed hiring cycles', 'Poor user trust'],
          },
        ],
      },
      {
        title: 'Context',
        blocks: [
          { type: 'para', html: 'GoodSpace operates in a highly competitive ecosystem:' },
          { type: 'list', items: ['Naukri', 'Indeed', 'Glassdoor'] },
          {
            type: 'list',
            lead: 'These platforms:',
            items: [
              'Rely on manual filtering or keyword matching',
              'Lack AI-driven evaluation systems',
              'Provide minimal feedback loops',
            ],
          },
          {
            type: 'list',
            lead: 'Constraints',
            items: [
              'Low trust in AI decisions',
              'High drop-offs in long hiring flows',
              'Need to balance automation vs control',
            ],
          },
          { type: 'para', html: '<strong>Opportunity</strong>: Replace resume-heavy workflows with AI-driven decision systems' },
        ],
      },
      {
        title: 'Research & Insights',
        blocks: [
          { type: 'para', html: 'Through secondary research and product understanding, a few patterns became clear.' },
          { type: 'para', html: 'Job seekers were not struggling to find jobs, they were struggling to find the right jobs. Nearly half of users reported difficulty identifying relevant roles, and a large portion admitted applying to mismatched positions.' },
          { type: 'para', html: 'At the same time, recruiters were overwhelmed. A majority reported spending significant time filtering applications, many of which were underqualified.' },
          { type: 'para', html: 'Another major gap was lack of feedback. Most users never received updates after applying, which reduced trust and increased drop-offs.' },
          {
            type: 'list',
            lead: 'From this, a key pattern emerged:',
            items: [
              'Volume of applications was high',
              'Quality of matches was low',
              'Feedback loops were almost non-existent',
            ],
          },
        ],
      },
      {
        title: 'Key Insights',
        blocks: [
          { type: 'para', html: 'Instead of treating hiring as a pipeline, it became clear that it behaves more like a decision system.' },
          {
            type: 'list',
            items: [
              'Users need relevance, not more options',
              'Recruiters need signal filtering, not more data',
              'Feedback builds trust in automated systems',
              'Reducing uncertainty improves completion rates',
            ],
          },
        ],
      },
      {
        title: 'Key Decisions & Tradeoffs',
        blocks: [
          { type: 'para', html: 'To address these issues, we focused on improving signal quality across the journey — even if it meant introducing complexity in certain areas.' },
          { type: 'para', html: 'One of the biggest decisions was introducing AI-based shortlisting. While this significantly reduced recruiter effort, it also introduced a trust problem. To balance this, we exposed signals like skill match scores and application status, helping users understand how decisions were made.' },
          { type: 'para', html: 'Another key decision was enabling instant AI interviews. This reduced hiring time drastically, but we noticed users felt pressured. To address this, we added flexibility by allowing users to reschedule interviews, balancing speed with comfort.' },
          { type: 'para', html: 'We also moved away from traditional keyword matching and introduced skill-based matching. Instead of simply matching resumes to job descriptions, we focused on how well a candidate&rsquo;s skills aligned with the role.' },
          { type: 'para', html: 'Across all decisions, one principle remained consistent:' },
          { type: 'para', html: 'Automation should reduce effort, not reduce clarity', bold: true },
        ],
      },
      {
        title: 'Solution',
        blocks: [
          { type: 'para', html: 'The hiring experience was redesigned into a structured, three-stage system — each stage improving signal quality and reducing friction.' },
          { type: 'para', html: '1. Discovery → Finding Relevant Jobs', bold: true },
          { type: 'para', html: 'Instead of overwhelming users with options, we introduced personalized job recommendations with visible skill match indicators. This helped users quickly understand their fit for a role and reduced irrelevant applications.' },
          { type: 'para', html: '2. Evaluation → AI Shortlisting', bold: true },
          { type: 'para', html: 'Applications were evaluated instantly using AI, removing the need for manual filtering. Users could now clearly see their application status — whether they were shortlisted, under review, or rejected — reducing uncertainty significantly.' },
          { type: 'para', html: '3. Decision → AI Interviews', bold: true },
          { type: 'para', html: 'Shortlisted candidates could proceed directly to AI-powered interviews that took around 10–15 minutes. The experience was designed to feel conversational, with clear instructions and the ability to reschedule if needed.' },
        ],
      },
      {
        title: 'System Thinking',
        blocks: [
          { type: 'para', html: 'Rather than treating each feature independently, the platform was designed as a connected system:' },
          {
            type: 'list',
            items: [
              'Better matching → fewer irrelevant applications',
              'Faster shortlisting → reduced recruiter workload',
              'Structured interviews → quicker hiring decisions',
            ],
          },
          { type: 'para', html: 'This created a reinforcing loop where improving one stage strengthened the entire system.' },
          {
            type: 'images',
            layout: 'stack',
            items: [
              { src: C('image/upload/v1777224819/GS1_p9p2qr.png'), alt: 'GoodSpace screen 1' },
              { src: C('image/upload/v1777224819/GS2_qoryrt.png'), alt: 'GoodSpace screen 2' },
              { src: C('image/upload/v1777224819/GS3_jbyfsx.png'), alt: 'GoodSpace screen 3' },
              { src: C('image/upload/v1777224821/GS4_r8uihi.png'), alt: 'GoodSpace screen 4' },
              { src: C('image/upload/v1777224822/GS5_w2cjes.png'), alt: 'GoodSpace screen 5' },
            ],
          },
        ],
      },
      {
        title: 'Impact',
        blocks: [
          { type: 'para', html: 'After rollout, the impact was visible across key metrics.' },
          { type: 'para', html: 'The overall hiring process became significantly faster, with a <strong>47% reduction</strong> in time required from application to interview completion.' },
          { type: 'para', html: 'User engagement also improved, with an <strong>8% increase</strong> in application interactions, indicating that users were more confident in the process.' },
          { type: 'para', html: 'Most importantly, drop-offs decreased by <strong>12%</strong>, showing that reducing uncertainty had a direct impact on user retention.' },
        ],
      },
      {
        title: 'Reflection',
        blocks: [
          { type: 'para', html: 'This project shifted my approach from designing individual flows to designing systems that enable better decisions.' },
          {
            type: 'list',
            lead: 'I learned that:',
            items: [
              'AI features require transparency to build trust',
              'Reducing uncertainty has more impact than adding features',
              'Good systems improve both user experience and business efficiency',
            ],
          },
          { type: 'para', html: 'If I were to take this further, I would focus on improving AI explainability and making the system more adaptive to different user behaviors.' },
        ],
      },
    ],
  },

  /* ─────────────── VEDA SMRITI ─────────────── */
  {
    id: 'veda',
    slug: 'veda',
    href: '/work/veda',
    cardTitle: 'The Passion Project',
    cardMeta: 'Vedasmriti | 2024',
    cardImage: C('image/upload/v1777222159/Veda_b2rcsr.png'),
    cardBg: '#fff7e8',
    title: 'Veda Smriti — Personalized Vedic Learning Experience',
    role: 'Product Designer',
    timeline: '2024',
    team: 'Naman Bhateja',
    skills: ['UI UX Design', 'Brand', 'Visual Design'],
    hero: C('image/upload/v1777222159/Veda_b2rcsr.png'),
    intro:
      'Veda Smriti is a personalized learning platform designed to make Vedic knowledge accessible and engaging for modern users. By combining guided learning, structured content, and AI-driven recommendations, the platform reduces entry barriers and improves learning continuity.',
    sections: [
      {
        title: 'Problem',
        emphasis: true,
        blocks: [
          { type: 'para', html: 'Exploring Vedic knowledge today is overwhelming, especially for beginners. Content is scattered, highly complex, and often lacks structure, making it difficult to know where to begin. At the same time, more experienced users struggle to find meaningful, organized content that fits into their daily routines.' },
          {
            type: 'list',
            lead: 'This creates a broken experience across the spectrum:',
            items: [
              'Beginners feel lost and drop off early',
              'Intermediate users lack continuity',
              'Advanced users don&rsquo;t find structured depth',
            ],
          },
          { type: 'para', html: '👉 The issue wasn&rsquo;t lack of content, it was lack of structure and guidance' },
        ],
      },
      {
        title: 'Context',
        blocks: [
          { type: 'para', html: 'The product sits between wellness, education, and spirituality. While apps like Headspace and Calm simplify meditation, there are very few platforms focused on Vedic learning with modern UX and personalization.' },
          {
            type: 'list',
            lead: 'This creates a clear opportunity:',
            items: [
              'Transform static knowledge into guided learning',
              'Make spiritual exploration more approachable',
              'Bridge tradition with modern digital behavior',
            ],
          },
        ],
      },
      {
        title: 'Research & Insights',
        blocks: [
          { type: 'para', html: 'To understand user needs, I conducted interviews with 20 users and supported findings with survey data from 50+ participants.' },
          { type: 'para', html: 'A strong interest in Vedic knowledge was evident, but accessibility remained the biggest barrier.' },
          {
            type: 'list',
            items: [
              '65% felt intimidated by the complexity',
              '75% wanted personalized experiences',
              '60% preferred interactive formats like AI or guided sessions',
            ],
          },
          { type: 'image', src: C('image/upload/v1777224839/Veda2_olsgeu.png'), alt: 'Veda Smriti — research insights' },
        ],
      },
      {
        title: 'Key Findings',
        blocks: [
          { type: 'para', html: 'A majority of users showed interest in Vedic knowledge, but were held back by accessibility issues.', bold: true },
          {
            type: 'list',
            items: [
              '65% were interested but felt intimidated by complexity',
              '75% wanted a personalized learning experience',
              '60% preferred interactive formats like guided meditation or AI recommendations',
            ],
          },
          { type: 'para', html: 'Beyond numbers, behavioral patterns emerged' },
          {
            type: 'list',
            lead: 'Users didn&rsquo;t just want content — they wanted:',
            items: ['Guidance on where to start', 'Simplified explanations', 'A structured path'],
          },
          { type: 'para', html: 'User Segments', bold: true },
          {
            type: 'list',
            lead: 'From interviews, three distinct mindsets emerged:',
            items: [
              'Curious beginners → Need guidance &amp; simplicity',
              'Modern spiritual users → Prefer flexible, non-ritualistic learning',
              'Deep learners → Want structured and detailed content',
            ],
          },
          { type: 'image', src: C('image/upload/v1777224841/Veda3_i8fhfx.png'), alt: 'Veda Smriti — key findings' },
        ],
      },
      {
        title: 'Solution',
        blocks: [
          { type: 'para', html: 'The app is built around three loops, each operating on a different cadence.' },
          { type: 'para', html: '1. Daily — 10-minute practice', bold: true },
          { type: 'para', html: 'A single mantra paired with a short audio guide, transliteration, and meaning. No streaks, no badges — just a quiet check-in.' },
          { type: 'para', html: '2. Weekly — story', bold: true },
          { type: 'para', html: 'A short narrative drawn from the Puranas or Upanishads, written in plain language, with links into the original text for those who want to go deeper.' },
          { type: 'para', html: '3. Monthly — arc', bold: true },
          { type: 'para', html: 'A four-week thematic arc (e.g., the Pancha Bhutas, the Gayatri family of mantras) that weaves daily mantras and weekly stories into one frame.' },
          { type: 'para', html: 'Calm, off-white visual language. Devanagari prominent. Sanskrit transliteration alongside meaning so the user is never guessing.' },
          {
            type: 'images',
            layout: 'stack',
            items: [
              { src: C('image/upload/v1777224837/Veda1_yapjgd.png'), alt: 'Veda Smriti — mantra detail' },
              { src: C('image/upload/v1777224845/Veda4_mfdkpq.png'), alt: 'Veda Smriti — weekly story' },
            ],
          },
        ],
      },
      {
        title: 'Impact',
        blocks: [
          { type: 'para', html: 'Veda Smriti is a personal project — there&rsquo;s no analytics dashboard. But the people I onboarded as the first cohort reported back two things consistently:' },
          {
            type: 'list',
            items: [
              '<strong>Daily completion rate near 80%</strong> across a 3-week trial — the 10-minute floor was the unlock',
              '<strong>Pronunciation confidence</strong> grew enough that several users started reciting in family settings',
            ],
          },
          { type: 'para', html: 'The qualitative feedback was the most encouraging: practitioners said the app made the tradition feel <em>less heavy</em> — accessible without feeling diluted.' },
        ],
      },
      {
        title: 'Reflection',
        blocks: [
          { type: 'para', html: 'The lesson I&rsquo;m taking forward is that respect for source material is itself a design choice. Stock photography, bright illustrations, and gamified streaks would have worked for retention metrics — but they would have flattened the thing the user actually cares about.' },
          { type: 'para', html: 'If I take Veda Smriti further, the next push is community: shared mantras, weekly circles, and the option for a teacher to onboard students through the same loops without turning the app into a course platform.' },
        ],
      },
    ],
  },
];

/** Lookup helper used by the `/work/[slug]` dynamic detail page. */
export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id || c.slug === id);
}
