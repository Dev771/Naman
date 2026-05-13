/**
 * Asset manifest — sourced from the Cloudinary CSV at
 * https://docs.google.com/spreadsheets/d/1inxOeIc77DsS62-Sx0iFvZuU5XsdOLb8mh4HPMOV8XU
 *
 * Every image and video URL on the site flows through this file.
 * Each block is also tagged with the Figma node id of the slot it fills,
 * derived from the `Identity-2026` file (canvas 450:1914 "Naman Final").
 */

const C = (path: string) => `https://res.cloudinary.com/duqqte7b4/${path}`;

export const home = {
  // Figma 479:2457 (Top Bar logo) — wordmark version. The small "न" icon
  // used in the actual nav is rendered as inline SVG (see components/logo.tsx).
  logo: C('image/upload/v1777223299/Logo_y161dh.png'),

  // Polaroid avatar (Figma 479:2771 "Gemini_Generated_Image_..." 187x187).
  // The Figma original is an AI-generated cartoon character; until that file
  // is uploaded to Cloudinary we fall back to the profile photo from the
  // CSV's "About Me / Me" row.
  avatar: C('image/upload/v1777222158/Meimage_wqsaei.png'),

  // 3 hero case-study cards — Figma slots 479:2503, 479:2537, 479:2546
  caseStudyCards: [
    {
      id: 'nomad',
      title: 'The Fintech Powerhouse',
      meta: 'Nomadcredit | 2025–2026',
      image: C('image/upload/v1777222158/Nomadcredit_yufy2w.png'),
      bg: '#0072bc',
      href: '/work/nomad',
    },
    {
      id: 'goodspace',
      title: 'The AI & Systems Foundation',
      meta: 'GoodSpace | 2023–2024',
      image: C('image/upload/v1777222161/Goodspace_awosfr.png'),
      bg: 'linear-gradient(180deg,#2a78c2 0%,#14395c 100%)',
      href: '/work/goodspace',
    },
    {
      id: 'veda',
      title: 'The Passion Project',
      meta: 'Vedasmriti | 2024',
      image: C('image/upload/v1777222159/Veda_b2rcsr.png'),
      bg: '#fff7e8',
      href: '/work/veda',
    },
  ],

  // Figma 479:2558 — Experience section (3 entries with descriptions).
  // `logo` URLs are pulled from the CSV so each row icon is the company mark.
  experience: [
    {
      name: 'Nomad Credit',
      role: 'Product Designer',
      period: 'Jan 2025 - Present',
      logo: C('image/upload/v1777223394/Nomadlogo_gdxaug.png'),
      description:
        'Helping simplify complex education loan journeys through intuitive and student-friendly product experiences.',
    },
    {
      name: 'GoodSpace',
      role: 'Product Designer',
      period: 'Aug 2023 - Dec 2024',
      logo: C('image/upload/v1777223372/Goodspacelogo_bubgjb.png'),
      description:
        'Designed human-centered AI hiring experiences that improved engagement and reduced hiring friction.',
    },
    {
      name: 'Kloudrac Group',
      role: 'UI Designer',
      period: 'Apr 2023 - Jul 2023',
      logo: C('image/upload/v1777223436/kloudraclogo_hwu4xm.png'),
      description:
        'Improved enterprise dashboard usability by making complex B2B workflows more intuitive and actionable.',
    },
    {
      name: "BVICAM",
      role: 'UI Developer',
      period: 'Jan 2023 - Apr 2023',
      logo: C('image/upload/v1777223469/Collegelogo_jjccif.png'),
      description:
        'Bridged design and development to create accessible and engaging digital experiences for students and faculty.',
    },
  ],

  // Figma 479:2601 — Education. The CSV ships the same college logo for
  // both rows; we expand the abbreviations into the full institution name
  // (used as a subtitle and the icon's hover tooltip).
  education: [
    {
      name: 'BVICAM',
      fullName: 'Bharati Vidyapeeth Institute of Computer Applications and Management',
      period: '2021 - 2023',
      logo: C('image/upload/v1777223469/Collegelogo_jjccif.png'),
    },
    {
      name: 'BVIMR',
      fullName: 'Bharati Vidyapeeth Institute of Management and Research',
      period: '2018 - 2021',
      logo: C('image/upload/v1777223469/Collegelogo_jjccif.png'),
    },
  ],

  // Figma 479:2644 — Side Project (Dearly card)
  sideProject: {
    cardTitle: 'Dearly',
    title: 'Dearly, Postcard App',
    blurb:
      "I'm learning how to code and exploring new AI tools.",
    description:
      'A curated collection of functional and well-designed objects. Crafted a personalized postcard app, enabling users to share unique moments with loved ones through custom designs and heartfelt messages.',
    image: C('image/upload/v1777222161/Dearly_t200qp.png'),
  },

  // Figma 479:2691 — Tools (icon grid). Cloudinary URLs not provided, so we
  // ship simple monochrome SVG placeholders rendered inline. Replace with
  // brand icons (Figma, Notion, Slack, Photoshop, etc.) when assets land.
  toolsCount: 5,

  // Full-bleed hero section background image (Gemini-generated illustration).
  heroBg: C('image/upload/v1778659836/Gemini_Generated_Image_opjmt2opjmt2opjm_1_1_o7okdz.png'),

  // Floating hero video from CSV (separate from the polaroid). Currently
  // unused on the page — kept here in case the user wants it as a section.
  heroVideo: C('video/upload/v1777222382/Hero_mcaqpg.mp4'),
};

// Figma 466:4964 desktop / 466:5436 mobile
export const about = {
  hero: C('image/upload/v1778693161/Meimage_wqsaei.png'),
  greeting: 'Hey, welcome to my digital abode. Nice to meet you!',
  bio: [
    "Hey there! I'm Naman Bhateja, a passionate UX/UI designer with over a year of experience crafting seamless digital experiences across web, mobile, and AI-driven platforms.",
    'Fuelled by a personal drive for creating intuitive solutions, I specialize in designing user-centric interfaces that not only solve problems but also enhance the joy of everyday interactions.',
    "Outside of work, you'll find me exploring new recipes in the kitchen 🧑‍🍳, baking delicious treats 🍪, getting lost in a great book 📖, experimenting with paint 🎨, lifting weights 🏋️, or indulging in a binge-worthy series or movie (especially cartoons!) 🎥. Oh, and I can never resist window-shopping for sneakers.",
  ],
  photoDumpTitle: 'Photo Dump',
  photoDumpDescription:
    "Designing across industries with curiosity, clarity, and collaboration. Here's a quick scroll through my design journey so far.",

  // 17-image carousel — Figma 466:5616..5632 (mobile) / equivalent 600px-wide tiles on desktop.
  carousel: [
    { id: 1, src: C('image/upload/v1777222162/I1_wusezc.png') },
    { id: 2, src: C('image/upload/v1777222161/I2_r5pnab.png') },
    { id: 3, src: C('image/upload/v1777222159/I3_txwsud.png') },
    { id: 4, src: C('image/upload/v1777222160/I4_nfed2v.png') },
    { id: 5, src: C('image/upload/v1777222161/I5_zadikn.png') },
    { id: 6, src: C('image/upload/v1777222160/I6_izqmxl.png') },
    { id: 7, src: C('image/upload/v1777222157/I7_rjd4nd.png') },
    { id: 8, src: C('image/upload/v1777222158/I8_bsyxk8.png') },
    { id: 9, src: C('image/upload/v1777222159/I9_vv9zci.png') },
    { id: 10, src: C('image/upload/v1777222160/I10_nuiy8c.png') },
    { id: 11, src: C('image/upload/v1777222156/I11_fjejcg.png') },
    { id: 12, src: C('image/upload/v1777222156/I12_k9zvfo.png') },
    { id: 13, src: C('image/upload/v1777222156/I13_tqbt26.png') },
    { id: 14, src: C('image/upload/v1777222156/I14_zbrx5l.png') },
    { id: 15, src: C('image/upload/v1777222158/I15_bsbmqh.png') },
    { id: 16, src: C('image/upload/v1777222155/I16_ercic9.png') },
    { id: 17, src: C('image/upload/v1777222157/I17_wiljma.png') },
  ],
};

// Figma 467:10228 desktop / 467:10291 mobile
export const selectedWork = {
  // 12 phone-mockup screens (UI Section 1 from CSV — Genie/Goodspace/Flight)
  phones: [
    C('image/upload/v1777222684/Genie1_zvtzll.png'),
    C('image/upload/v1777222685/Genie2_htjwno.png'),
    C('image/upload/v1777222686/Genie3_rsil1q.png'),
    C('image/upload/v1777222809/Genie5_matums.png'),
    C('image/upload/v1777222810/Genie6_au0whu.png'),
    C('image/upload/v1777222811/Goodspace1_vbrdg9.png'),
    C('image/upload/v1777222812/Goodspace2_dpjlyq.png'),
    C('image/upload/v1777222813/Goodspace3_huqsvf.png'),
    C('image/upload/v1777222814/Goodspace4_yctarw.png'),
    C('image/upload/v1777222825/Boarding_pass_mxfdxs.png'),
    C('image/upload/v1777222826/Flight_tpsvil.png'),
    C('image/upload/v1777222827/Home_xk5ltl.png'),
  ],
  // 6 square images (UI Section 2 — ORRO + UI1-4)
  squares: [
    C('image/upload/v1777224370/ORRO_wpbwdb.png'),
    C('image/upload/v1777222549/UI1_uzmzam.png'),
    C('image/upload/v1777222551/UI2_vqlsth.png'),
    C('image/upload/v1777224424/UI3_wwdwws.png'),
    C('image/upload/v1777222552/UI4_cd6fpp.png'),
    C('image/upload/v1777222859/Card_Stat_1_szo9ow.png'),
  ],
  // Wide hero images at the bottom — three distinct case-study screens
  // (NOT the same covers used in FeaturedCards above).
  wide: [
    C('image/upload/v1777224819/GS1_p9p2qr.png'),
    C('image/upload/v1777224837/Veda1_yapjgd.png'),
    C('image/upload/v1777224821/GS4_r8uihi.png'),
  ],
};

/** 7 Nomad screen captures dropped into /public/nomad/ by the user. */
export const nomadImages = [
  '/nomad/image-1.png',
  '/nomad/image-2.png',
  '/nomad/image-3.png',
  '/nomad/image-4.png',
  '/nomad/image-5.png',
  '/nomad/image-6.png',
  '/nomad/image-10.png',
] as const;

// Figma 462:6586 desktop / 462:6223 mobile
export const caseStudies = {
  goodspace: {
    title: 'Goodspace',
    role: 'Product Designer',
    timeline: '2023-2024',
    team: 'Naman Bhateja',
    skills: ['User research', 'UIUX Design', 'Prototyping'],
    hero: C('image/upload/v1777222161/Goodspace_awosfr.png'),
    images: [
      C('image/upload/v1777224819/GS1_p9p2qr.png'),
      C('image/upload/v1777224819/GS2_qoryrt.png'),
      C('image/upload/v1777224819/GS3_jbyfsx.png'),
      C('image/upload/v1777224821/GS4_r8uihi.png'),
      C('image/upload/v1777224822/GS5_w2cjes.png'),
    ],
  },
  veda: {
    title: 'Veda Smriti',
    role: 'Product Designer',
    timeline: '2024',
    team: 'Naman Bhateja',
    skills: ['UI UX Design', 'Brand', 'Visual Design'],
    hero: C('image/upload/v1777222159/Veda_b2rcsr.png'),
    images: [
      C('image/upload/v1777224837/Veda1_yapjgd.png'),
      C('image/upload/v1777224839/Veda2_olsgeu.png'),
      C('image/upload/v1777224841/Veda3_i8fhfx.png'),
      C('image/upload/v1777224845/Veda4_mfdkpq.png'),
      '/VedaProblemImage.png',
    ],
  },
};
