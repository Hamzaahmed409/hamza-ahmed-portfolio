export type Education = {
  degree: string;
  institution: string;
  period: string;
};

export type Language = {
  language: string;
  level: string;
};

export type ProjectGroup =
  | "field-crm"
  | "ai"
  | "platforms"
  | "education"
  | "consumer"
  | "tools"
  | "games";

export type Project = {
  slug: string;
  name: string;
  platform: string;
  year: string;
  summary: string;
  impact: string;
  stack: string[];
  accent: string;
  category: string;
  group: ProjectGroup;
  storeUrl?: string;
  playStoreUrl?: string;
  websiteUrl?: string;
  icon: string;
  screenshots: string[];
  featured?: boolean;
  features?: string[];
};

export const workFilters: { id: "all" | ProjectGroup; label: string }[] = [
  { id: "all", label: "All" },
  { id: "field-crm", label: "Field CRM" },
  { id: "ai", label: "AI" },
  { id: "platforms", label: "Web + Mobile" },
  { id: "education", label: "LMS" },
  { id: "consumer", label: "Consumer" },
  { id: "tools", label: "Tools" },
  { id: "games", label: "Games" },
];

export const profile = {
  name: "Hamza Ahmed",
  role: "Senior Mobile & Frontend Engineer",
  tagline:
    "5+ years shipping React Native & React apps — white-label platforms, native bridges, VoIP, maps, and E2E tests. Remote-ready across US/EU time zones.",
  location: "Karachi, Pakistan",
  remoteNote: "Remote / US-EU shifts",
  email: "hamza_ahmed95@icloud.com",
  phone: "+92-307-015-9904",
  availability: "Open to Senior Mobile & Frontend Roles",
  links: {
    linkedin: "https://www.linkedin.com/in/hamza-ahmed-9545s75",
    github: "https://github.com/HamzaAhmed4059",
    resume: "/Hamza_Ahmed_CV.pdf",
    /** Set NEXT_PUBLIC_CAL_URL in .env for Cal.com / booking link */
    calendar:
      process.env.NEXT_PUBLIC_CAL_URL?.trim() ||
      "https://www.linkedin.com/in/hamza-ahmed-9545s75",
  },
  seo: {
    title: "Hamza Ahmed · Senior Mobile & Frontend Engineer",
    description:
      "Senior Mobile & Frontend Engineer with 5+ years shipping React Native and React apps — white-label CRMs, VoIP, maps, and store releases. Remote-ready across US/EU time zones.",
  },
  testimonials: [
    {
      quote:
        "Hamza is reliable and easy to work with. He understood the product goals, kept us updated, and delivered on time without drama.",
      name: "Zohair Sario",
      role: "PM, Knockio",
    },
    {
      quote:
        "Clear ownership and strong follow-through. He ships work that holds up — and makes collaboration simple for the whole team.",
      name: "Wahab Dhindrani",
      role: "CEO, Gotech",
    },
  ],
  impactStats: [
    {
      value: "11+",
      label: "Store Apps",
      detail: "App Store & Play Store shipped",
    },
    {
      value: "5+",
      label: "Years Experience",
      detail: "React Native, Flutter & Next.js",
    },
    {
      value: "Lead",
      label: "Product Ownership",
      detail: "Knockio CRM & White-labels",
    },
    {
      value: "UTC+5",
      label: "Remote Ready",
      detail: "US / EU night shift overlap",
    },
  ],
  stackGroups: [
    {
      label: "Mobile",
      items: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Native Modules",
        "SQLite",
        "Offline Sync",
      ],
    },
    {
      label: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Redux Toolkit",
        "Zustand",
        "Tailwind CSS",
      ],
    },
    {
      label: "Backend",
      items: [
        "Node.js",
        "NestJS",
        "REST",
        "GraphQL",
        "Supabase",
        "Firebase",
        "PostgreSQL",
      ],
    },
    {
      label: "Testing & Delivery",
      items: ["TDD", "Detox", "Jest", "Sentry", "CodePush", "Fastlane", "CI/CD"],
    },
    {
      label: "Integrations",
      items: [
        "Twilio VoIP",
        "CallKit",
        "FCM",
        "Mapbox",
        "Google Maps",
        "WebRTC",
        "Cursor",
        "Claude",
      ],
    },
  ],
  experience: [
    {
      company: "Akvateq",
      role: "Lead Mobile Engineer",
      period: "May 2022 – Present",
      location: "Karachi · Knockio Core",
      points: [
        "Lead mobile architecture and a squad of 3 within an 18-person team.",
        "Built Knockio — white-label field CRM with maps, Twilio VoIP, and OTA releases.",
        "Custom Swift/Kotlin bridges for Mapbox navigation, GPS tracking, and territories.",
        "Drove TDD + Detox E2E; cut critical regressions ~45% and hotfixes to under 15 min.",
      ],
    },
    {
      company: "Gotech",
      role: "Lead Mobile Engineer",
      period: "May 2025 – Present",
      location: "Remote · Part-time",
      points: [
        "Architecture oversight and code-quality guidance across mobile teams.",
        "Led React Native modularization — ~30% faster cold starts.",
      ],
    },
    {
      company: "Talkgenie AI",
      role: "Mobile Developer",
      period: "Apr 2026 – Jun 2026",
      location: "Karachi · Hybrid",
      points: [
        "Shipped TalkGenie AI end-to-end on React Native — App Store & Play Store.",
        "LLM chat UX + Supabase backend for production-ready support flows.",
      ],
    },
    {
      company: "SudoWare",
      role: "Mobile Developer",
      period: "Nov 2020 – Dec 2021",
      location: "Karachi",
      points: [
        "Cross-platform React Native / Expo apps with Google Maps geolocation.",
        "REST + SQLite caching for snappier UI and lower network latency.",
      ],
    },
  ],
  education: [
    {
      degree: "BS Computer Science",
      institution: "Iqra University, Karachi",
      period: "2016 – 2020",
    },
  ],
  languages: [
    {
      language: "English",
      level: "Professional",
    },
    {
      language: "Urdu",
      level: "Native",
    },
  ],
  remoteSignals: [
    {
      title: "Async by default",
      body: "Written updates, Loom notes, and ticket-ready PRs — time zones never block shipping.",
    },
    {
      title: "Clear ownership",
      body: "End-to-end features: architecture, UI, store submit, tests, and post-release watch.",
    },
    {
      title: "Outcome-first",
      body: "Case studies show constraints, decisions, and results — not just screenshots.",
    },
  ],
  projects: [
    {
      slug: "knockio",
      name: "Knockio",
      platform: "iOS · Android",
      year: "Dec 2023",
      category: "Field Service CRM",
      group: "field-crm",
      featured: true,
      summary:
        "White-label React Native field CRM — map canvassing, Twilio calling, work orders, and multi-tenant branding.",
      impact: "Flagship · App Store + Play Store",
      stack: [
        "React Native",
        "TypeScript",
        "Maps",
        "Twilio",
        "FCM",
        "SQLite",
      ],
      accent: "#1B3A6B",
      features: [
        "Leads + map canvassing (markers, clustering, filters)",
        "Territories, routes & live GPS tracking",
        "In-app calling & SMS via Twilio",
        "Kanban pipeline with drag & drop",
        "Work orders, estimates, invoices & PDFs",
        "White-label multi-tenant branding",
      ],
      storeUrl:
        "https://apps.apple.com/us/app/knockio-field-service-crm/id6756485440",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.knockio.crm&hl=en&pli=1",
      websiteUrl: "https://knockio.com/",
      icon: "/apps/knockio-icon.jpg",
      screenshots: [
        "/apps/knockio-shot-1.jpg",
        "/apps/knockio-shot-2.jpg",
        "/apps/knockio-shot-3.jpg",
      ],
    },
    {
      slug: "outlaws-roofing",
      name: "Outlaws Roofing",
      platform: "iOS · Android",
      year: "Aug 2026",
      category: "Knockio white-label",
      group: "field-crm",
      featured: true,
      summary:
        "Knockio white-label for a roofing contractor — same CRM core, branded for Outlaws field ops.",
      impact: "White-label · App Store + Play Store",
      stack: ["React Native", "White-label", "Maps"],
      accent: "#B45309",
      features: [
        "Leads, routes & dispatch for roofing crews",
        "Workforce tracking on Knockio core",
        "Client branding from one codebase",
      ],
      storeUrl: "https://apps.apple.com/us/app/outlaws-roofing/id6792015146",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=org.outlawsroofing.com&hl=en",
      icon: "/apps/outlaws-roofing-icon.jpg",
      screenshots: [
        "/apps/outlaws-roofing-shot-1.jpg",
        "/apps/outlaws-roofing-shot-2.jpg",
        "/apps/outlaws-roofing-shot-3.jpg",
      ],
    },
    {
      slug: "talkgenie-ai",
      name: "TalkGenie AI",
      platform: "iOS · Android",
      year: "Jun 2026",
      category: "AI chatbot",
      group: "ai",
      featured: true,
      summary:
        "Context-aware AI support chat — LLM replies that improve with use, not a static FAQ bot.",
      impact: "App Store + Play Store",
      stack: ["React Native", "LLM", "Supabase"],
      accent: "#1B3A6B",
      features: [
        "Context-aware support conversations",
        "Supabase backend for chat data",
        "Shipped end-to-end on both stores",
      ],
      storeUrl: "https://apps.apple.com/us/app/talkgenie-ai/id6778013827",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=ai.talkgenie.mobile&hl=en",
      icon: "/apps/talkgenie-ai-icon.jpg",
      screenshots: [
        "/apps/talkgenie-shot-1.jpg",
        "/apps/talkgenie-shot-2.jpg",
        "/apps/talkgenie-shot-3.jpg",
      ],
    },
    {
      slug: "wedstimate-wedding-vendors",
      name: "Wedstimate",
      platform: "iOS · Android",
      year: "Jan 2025",
      category: "Lifestyle",
      group: "consumer",
      featured: true,
      summary:
        "Wedding vendor matching with upfront pricing, budgets, messaging, and deals.",
      impact: "4.8★ · Both stores",
      stack: ["React Native", "Firebase", "IAP"],
      accent: "#BE185D",
      features: [
        "Vendor matching with clear pricing",
        "Budget tracking & direct messaging",
        "In-app purchases & exclusive deals",
      ],
      storeUrl:
        "https://apps.apple.com/us/app/wedstimate-wedding-vendors/id6712045315",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.wedstimatemobileapp&hl=en",
      icon: "/apps/wedstimate-wedding-vendors-icon.jpg",
      screenshots: [
        "/apps/wedstimate-wedding-vendors-shot-1.jpg",
        "/apps/wedstimate-wedding-vendors-shot-2.jpg",
        "/apps/wedstimate-wedding-vendors-shot-3.jpg",
      ],
    },
    {
      slug: "organic-produce-finder",
      name: "Organic Produce Finder",
      platform: "iOS · Android",
      year: "Jun 2025",
      category: "Marketplace",
      group: "consumer",
      featured: true,
      summary:
        "Marketplace linking shoppers with local organic vendors — listings, uploads, and messaging.",
      impact: "5.0★ · Both stores",
      stack: ["React Native", "Marketplace"],
      accent: "#15803D",
      features: [
        "Local vendor & grower listings",
        "Product uploads for sellers",
        "Direct buyer–seller messaging",
      ],
      storeUrl:
        "https://apps.apple.com/us/app/organic-produce-finder/id6742911565",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.organicproduce.co&hl=en",
      icon: "/apps/organic-produce-finder-icon.jpg",
      screenshots: [
        "/apps/organic-produce-finder-shot-1.jpg",
        "/apps/organic-produce-finder-shot-2.jpg",
        "/apps/organic-produce-finder-shot-3.jpg",
      ],
    },
    {
      slug: "mymonstro",
      name: "MyMonstro",
      platform: "Web · Android",
      year: "Jan 2024",
      category: "LMS · Tracking",
      group: "education",
      featured: true,
      summary:
        "After-school LMS — Next.js admin for schools plus Android app for family schedules and attendance.",
      impact: "Play Store + mymonstro.com",
      stack: ["Next.js", "Android", "REST"],
      accent: "#0F766E",
      features: [
        "School admin: leads, enrollments, retention",
        "Family app: classes, attendance, rewards",
        "Reminders, cancellations & messaging",
      ],
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.monstro.monstrox&hl=en",
      websiteUrl: "https://www.mymonstro.com/",
      icon: "/apps/mymonstro-icon.jpg",
      screenshots: [
        "/apps/mymonstro-shot-1.jpg",
        "/apps/mymonstro-shot-2.jpg",
        "/apps/mymonstro-shot-3.jpg",
      ],
    },
    {
      slug: "cruisimity",
      name: "Cruisimity",
      platform: "iOS",
      year: "Jan 2026",
      category: "Navigation",
      group: "consumer",
      summary:
        "Driving-social navigation — custom routes, trip tracking, nearby drivers, and in-app chat.",
      impact: "Live on App Store",
      stack: ["iOS", "Maps", "Chat"],
      accent: "#0D9488",
      features: [
        "Custom routes & trip tracking",
        "Nearby drivers + leaderboards",
        "In-app chat for group cruises",
      ],
      storeUrl: "https://apps.apple.com/us/app/cruisimity/id6744337395",
      icon: "/apps/cruisimity-icon.jpg",
      screenshots: [
        "/apps/cruisimity-shot-1.jpg",
        "/apps/cruisimity-shot-2.jpg",
        "/apps/cruisimity-shot-3.jpg",
      ],
    },
    {
      slug: "ivy-online",
      name: "IVY Online",
      platform: "iOS · Android · Web",
      year: "Aug 2024",
      category: "LMS",
      group: "education",
      summary:
        "O & A Level LMS — HD lectures, courses, past papers, and subscriptions across web + mobile.",
      impact: "Stores + ivyonline.co",
      stack: ["React Native", "LMS", "Web"],
      accent: "#1E40AF",
      features: [
        "HD video lectures & structured courses",
        "Past papers, notes & exam prep",
        "Subscriptions + progress across devices",
      ],
      storeUrl:
        "https://apps.apple.com/pk/app/ivy-online-learning-platform/id6499261611",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=co.ivyonline.app&hl=en",
      websiteUrl: "https://ivyonline.co/",
      icon: "/apps/ivy-online-icon.jpg",
      screenshots: [
        "/apps/ivy-online-shot-1.jpg",
        "/apps/ivy-online-shot-2.jpg",
        "/apps/ivy-online-shot-3.jpg",
      ],
    },
    {
      slug: "obol-app",
      name: "Obol",
      platform: "iOS",
      year: "Mar 2026",
      category: "Native Swift",
      group: "tools",
      summary:
        "Native Swift legacy messaging — securely store media and files for delivery after verified passing.",
      impact: "Live on App Store",
      stack: ["Swift", "Secure storage"],
      accent: "#334155",
      features: [
        "Video, audio & email legacy messages",
        "Secure storage until passing verified",
        "Privacy-focused delivery flow",
      ],
      storeUrl: "https://apps.apple.com/us/app/obol-app/id6752914605",
      icon: "/apps/obol-icon.jpg",
      screenshots: [
        "/apps/obol-shot-1.jpg",
        "/apps/obol-shot-2.jpg",
        "/apps/obol-shot-3.jpg",
      ],
    },
    {
      slug: "scanlite",
      name: "ScanLite",
      platform: "iOS",
      year: "Jan 2026",
      category: "Utilities",
      group: "tools",
      summary:
        "Privacy-first QR & barcode scanner — offline history, flashlight, and one-tap share.",
      impact: "Live on App Store",
      stack: ["iOS", "Camera", "Offline"],
      accent: "#0369A1",
      features: [
        "Fast QR / barcode scan",
        "On-device history (offline)",
        "Open, copy & share in one tap",
      ],
      storeUrl: "https://apps.apple.com/us/app/scanlite/id6757406279",
      icon: "/apps/scanlite-icon.jpg",
      screenshots: [
        "/apps/scanlite-shot-1.jpg",
        "/apps/scanlite-shot-2.jpg",
        "/apps/scanlite-shot-3.jpg",
      ],
    },
    {
      slug: "queens-of-the-diamond",
      name: "Queens of the Diamond",
      platform: "iOS · iPad",
      year: "Apr 2025",
      category: "Sports",
      group: "games",
      summary:
        "Physics-based softball game — batting/pitching, roster stats, customization, and multiplayer.",
      impact: "3.8★ on App Store",
      stack: ["iOS", "Gameplay", "Multiplayer"],
      accent: "#B45309",
      features: [
        "Batting & pitching controls",
        "Roster stats & customization",
        "Multiplayer + store updates",
      ],
      storeUrl:
        "https://apps.apple.com/us/app/queens-of-the-diamond/id6742409644",
      icon: "/apps/queens-of-the-diamond-icon.jpg",
      screenshots: [
        "/apps/queens-of-the-diamond-shot-1.jpg",
        "/apps/queens-of-the-diamond-shot-2.jpg",
        "/apps/queens-of-the-diamond-shot-3.jpg",
      ],
    },
  ] satisfies Project[],
};

export const flatStack = profile.stackGroups.flatMap((group) => group.items);

export function composeEmailHref(email = profile.email) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}
