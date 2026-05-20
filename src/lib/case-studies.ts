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
    cardTitle: 'The student financing solution',
    cardMeta: 'Nomadcredit | 2025–2026',
    cardImage: C('image/upload/v1777222158/Nomadcredit_yufy2w.png'),
    cardBg: '#0072bc',
    title: 'Nomad Credit — Modernizing the Student Financing Experience',
    role: 'Product Designer (End-to-End)',
    timeline: '2025 — Present',
    team: 'Naman Bhateja',
    skills: ['UX strategy', 'Product thinking', 'Visual design', 'Responsive design', 'User flows'],
    hero: '/nomad/image-1.png',
    intro:
      'Redesigned Nomad Credit’s student-facing ecosystem to create a more modern, trustworthy, and conversion-friendly financing experience for international students. The project covered the public website, loan discovery flows, student dashboard, Doc Pilot document upload system, and supporting CRM workflows used by loan managers internally.',
    sections: [
      {
        title: 'Overview',
        blocks: [
          { type: 'para', html: 'Nomad Credit is a student financing platform designed to help international students discover and apply for education loans, scholarships, and related financial products.' },
          { type: 'para', html: 'I worked alongside the PM to redesign and modernize the platform’s overall experience while improving operational workflows connected to the loan journey.' },
          {
            type: 'list',
            lead: 'The project expanded across multiple interconnected systems:',
            items: [
              'Website revamp',
              'Student dashboard',
              'Loan discovery experience',
              'Scholarship tool',
              'Application flow',
              'Doc Pilot document collection system',
              'Internal CRM improvements'
            ],
          },
          { type: 'para', html: 'Rather than redesigning isolated screens, the goal was to create a more connected ecosystem that balanced trust, clarity, and operational efficiency.' },
        ],
      },
      {
        title: 'Problem',
        emphasis: true,
        blocks: [
          { type: 'para', html: 'The existing platform no longer reflected the scale and maturity of the brand. The experience felt visually outdated, inconsistent across touchpoints, and lacked the clarity expected from modern fintech products.' },
          { type: 'para', html: 'At the same time, the loan journey itself involved high-trust decision making. Students were expected to compare financial products, understand eligibility, manage documentation, and stay updated throughout the process — often while navigating unfamiliar systems.' },
          { type: 'para', html: 'The operational side faced similar friction. Document collection was heavily fragmented across WhatsApp and email threads, making it difficult for both students and loan managers to track required paperwork efficiently.' },
          {
            type: 'list',
            lead: 'This created:',
            items: [
              'Fragmented communication',
              'Delayed document collection',
              'Operational inefficiencies',
              'Reduced visibility into application progress',
              'Inconsistent user experiences across platforms'
            ],
          },
          { type: 'para', html: 'The challenge wasn’t only modernizing the interface — it was designing a more connected and trustworthy ecosystem.', bold: true },
        ],
      },
      {
        title: 'Goals',
        blocks: [
          {
            type: 'list',
            lead: 'The redesign focused on four primary goals:',
            items: [
              'Improve responsiveness across devices',
              'Modernize the brand perception',
              'Increase clarity across complex financial workflows',
              'Create consistency across the ecosystem'
            ],
          },
          {
            type: 'list',
            lead: 'Operationally, the project also aimed to:',
            items: [
              'Centralize document collection',
              'Reduce dependency on scattered communication channels',
              'Streamline follow-up workflows internally'
            ],
          },
        ],
      },
      {
        title: 'Research & Direction',
        blocks: [
          { type: 'para', html: 'The project began with an audit of the existing platform to identify usability gaps, inconsistencies, and outdated interaction patterns. We then explored competitor and reference platforms across fintech, SaaS, and travel-tech products to define a more modern direction for the experience.' },
          {
            type: 'list',
            lead: 'Two key references shaped the design approach:',
            items: [
              '<strong>Marketplace-style exploration</strong>: Inspired by platforms like Amazon, the loan discovery experience focused on helping students browse and compare lenders more intuitively instead of forcing them into rigid flows immediately.',
              '<strong>Trust-focused onboarding</strong>: Platforms like Atlys influenced the way trust signals, guidance, and clarity were introduced throughout the journey.'
            ],
          },
          { type: 'para', html: 'This combination helped create an experience that balanced discoverability with reassurance.' },
          {
            type: 'image',
            src: '/nomad/image-2.png',
            caption: 'Mapping the existing journey before touching pixels.',
          },
        ],
      },
      {
        title: 'Design Process',
        blocks: [
          {
            type: 'list',
            lead: 'The workflow remained highly iterative throughout the project:',
            items: [
              '<strong>1. Platform Audit</strong>: Reviewed the existing ecosystem to identify friction points, outdated UI patterns, and inconsistencies.',
              '<strong>2. Competitor Research</strong>: Analyzed modern fintech and marketplace experiences to establish a stronger visual and UX direction.',
              '<strong>3. High-Fidelity Explorations</strong>: Multiple high-fidelity directions were explored early to evaluate visual tone, information hierarchy, lender discovery patterns, dashboard structures, and interaction clarity.',
              '<strong>4. Iterations with PM</strong>: Designs evolved through continuous feedback loops with the PM to align business priorities with usability needs.',
              '<strong>5. Stakeholder Feedback & Handoff</strong>: Finalized flows and interfaces were refined based on stakeholder discussions before developer handoff.'
            ],
          },
        ],
      },
      {
        title: 'Landing Experience',
        blocks: [
          { type: 'para', html: 'The landing page redesign focused on transforming the platform into a clearer and more trustworthy discovery experience for students exploring education financing options.' },
          {
            type: 'list',
            lead: 'The redesign introduced:',
            items: [
              'Stronger information hierarchy and cleaner modular layouts',
              'Lender comparison systems and trust-focused sections',
              'Clearer CTAs and responsive structures'
            ],
          },
          {
            type: 'list',
            lead: 'The lender comparison cards became a key part of the experience, allowing students to quickly scan:',
            items: ['Interest rates', 'Repayment information', 'Loan amounts', 'Eligibility indicators', 'Processing timelines'],
          },
          { type: 'para', html: 'This marketplace-inspired structure helped simplify exploration while maintaining conversion-focused flows.' },
          {
            type: 'image',
            src: '/nomad/image-10.png',
            caption: 'The new on-ramp: one short questionnaire, then the application opens with everything pre-filled it can pre-fill.',
          },
        ],
      },
      {
        title: 'Application Flow',
        blocks: [
          { type: 'para', html: 'Applying for education loans can often feel intimidating, especially for students navigating financial systems for the first time.' },
          {
            type: 'list',
            lead: 'The application flow redesign focused on reducing cognitive overload through:',
            items: ['Simplified progression', 'Cleaner form structures', 'Guided interactions', 'Clearer hierarchy', 'Better responsive layouts'],
          },
          { type: 'para', html: 'A major UX challenge involved balancing trust and conversion. Too much friction reduced momentum, while overly aggressive conversion patterns risked reducing credibility. The final experience attempted to create a more reassuring and action-oriented journey.' },
        ],
      },
      {
        title: 'Student Dashboard',
        blocks: [
          { type: 'para', html: 'The student dashboard was redesigned to provide a more centralized and structured experience throughout the financing journey.' },
          {
            type: 'list',
            lead: 'The goal was to reduce ambiguity by giving students:',
            items: ['Clearer progress visibility', 'Easier navigation', 'Centralized actions', 'Structured task visibility', 'Streamlined document access'],
          },
          { type: 'para', html: 'The updated dashboard also created stronger alignment between the student experience and internal operational workflows.' },
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
          {
            type: 'image',
            src: '/nomad/image-5.png',
            caption: 'Optimization moved from a buried tab to a card on the dashboard.',
          },
        ],
      },
      {
        title: 'Doc Pilot System',
        blocks: [
          { type: 'para', html: 'One of the biggest operational challenges involved document collection. Previously, required loan documents were often shared across fragmented communication channels such as WhatsApp and email. This created inefficiencies for both students and loan managers while reducing visibility into application progress.' },
          { type: 'para', html: 'The Doc Pilot system was designed to centralize this workflow into a single structured experience. Students could securely upload required documents through guided flows while loan managers could trigger magic links directly from the CRM. These links could then be shared through email or WhatsApp depending on the student’s preferred communication channel.' },
          {
            type: 'list',
            lead: 'The system aimed to:',
            items: [
              'Reduce fragmented communication and improve organization',
              'Centralize uploads and speed up document collection',
              'Improve operational visibility',
              'Increase trust through platform-based uploads'
            ],
          },
          { type: 'para', html: 'Rather than forcing students away from familiar communication habits, the workflow integrated with them more naturally. This became one of the most operationally impactful parts of the redesign.' },
        ],
      },
      {
        title: 'Internal CRM Improvements',
        blocks: [
          { type: 'para', html: 'In addition to the student-facing ecosystem, smaller workflow improvements were introduced across the internal CRM experience.' },
          {
            type: 'list',
            lead: 'These updates included:',
            items: [
              'One-click follow-ups',
              'Task management improvements',
              'Communication triggers',
              'Magic-link based workflows',
              'Operational workflow optimization'
            ],
          },
          { type: 'para', html: 'The goal was to simplify repetitive actions for loan managers while improving communication efficiency with students.' },
        ],
      },
      {
        title: 'Impact',
        blocks: [
          { type: 'para', html: 'The redesign helped establish a more modern and trustworthy digital presence for Nomad Credit while improving workflow clarity across both student and operational experiences.' },
          {
            type: 'list',
            lead: 'Key Outcomes:',
            items: [
              'Faster document collection workflows',
              'Reduced workflow fragmentation across communication channels',
              'Improved centralized visibility for loan managers',
              'Better responsiveness across devices',
              'More consistent UX across products',
              'Positive stakeholder feedback during rollout',
              'Increased trust in platform-based document uploads'
            ],
          },
        ],
      },
      {
        title: 'Reflection',
        blocks: [
          { type: 'para', html: 'This project reinforced how important trust is within financial experiences.' },
          { type: 'para', html: 'Students were not simply interacting with forms — they were making high-stakes decisions connected to their education and future. Designing for clarity, reassurance, and operational simplicity became just as important as visual modernization.' },
          { type: 'para', html: 'It also highlighted the importance of designing systems rather than isolated screens. The most meaningful improvements emerged when student workflows, communication channels, and internal operations were treated as connected parts of the same ecosystem.' },
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
          { type: 'image', src: C('image/upload/v1778685713/e2c4e5fcabca1f285744b8a19482d30954dc198c_u7qsby.png'), alt: 'Veda Smriti — problem visualization' },
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
