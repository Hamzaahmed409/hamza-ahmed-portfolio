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
    "Senior Mobile & Frontend Engineer with 6+ years shipping production-grade React Native & React.js applications for distributed teams. Proven track record in white-label multi-tenant architecture, custom native bridges (Swift/Kotlin), VoIP/telephony (Twilio/CallKit), turn-by-turn navigation (Mapbox), and automated testing (TDD, Detox E2E). AI-First engineer leveraging Cursor, Claude, and OpenCode across US/EU time zones.",
  location: "Karachi, Pakistan · Open to Remote / US-EU Shifts",
  email: "hamzaahmed4095@gmail.com",
  phone: "+92-307-015-9904",
  availability: "Open to Senior Mobile & Frontend Roles",
  links: {
    linkedin: "https://linkedin.com/in/hamza-ahmed-49b783201",
    github: "https://github.com/HamzaAhmed4059",
    resume: "/Hamza_Ahmed_CV.pdf",
  },
  impactStats: [
    {
      value: "11+",
      label: "Store Apps",
      detail: "App Store & Play Store shipped",
    },
    {
      value: "6+",
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
      label: "Mobile Development",
      items: [
        "React Native (CLI & Expo)",
        "Flutter",
        "Swift",
        "Kotlin",
        "Custom Native Modules",
        "SQLite",
        "Offline Sync",
      ],
    },
    {
      label: "Frontend & Web",
      items: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "Redux Toolkit",
        "Zustand",
        "Tailwind CSS",
      ],
    },
    {
      label: "Backend & APIs",
      items: [
        "Node.js",
        "Express",
        "NestJS",
        "REST APIs",
        "GraphQL",
        "Supabase",
        "Firebase",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      label: "Testing & Delivery",
      items: [
        "Test-Driven Development (TDD)",
        "Detox (E2E Testing)",
        "Jest",
        "Sentry",
        "CodePush (OTA)",
        "Fastlane",
        "CI/CD",
      ],
    },
    {
      label: "Integrations & AI",
      items: [
        "Twilio VoIP",
        "iOS CallKit",
        "Android Notifee/FCM",
        "Mapbox Navigation",
        "Google Maps",
        "WebRTC",
        "LiveKit",
        "Cursor",
        "Claude",
      ],
    },
  ],
  experience: [
    {
      company: "Akvateq",
      role: "Lead Mobile Engineer (Knockio Core) / Team Lead",
      period: "May 2022 – Present",
      location: "Karachi, Pakistan",
      points: [
        "Lead mobile architecture and manage a squad of 3 engineers within an 18-person agile team; oversee sprint delivery and code reviews.",
        "Architected Knockio (Core Flagship Product), an enterprise CRM & field-ops platform (React Native CLI) deployed nationwide.",
        "Engineered real-time Twilio VoIP calling (iOS CallKit, Android Notifee/FCM), handling 500+ daily calls.",
        "Built custom native bridges (Swift/Kotlin) for Mapbox turn-by-turn navigation, live GPS tracking, territory clustering, and route planning.",
        "Delivered a multi-tenant white-label theming engine, enabling instant branding and automated client deployments from a single codebase.",
        "Pioneered TDD adoption and Detox E2E test suites, reducing critical regression bugs by 45% and elevating release stability.",
        "Implemented an automated OTA pipeline via CodePush, cutting hotfix distribution cycles from 48 hours to under 15 minutes.",
      ],
    },
    {
      company: "Gotech",
      role: "Lead Mobile Engineer (Advisory & Delivery)",
      period: "May 2025 – Present",
      location: "Remote / Part-Time",
      points: [
        "Provide technical oversight, architectural direction, and code quality governance across mobile development teams.",
        "Supervised modular refactoring and state optimization in React Native, improving cold-start launch times by ~30%.",
        "Mentored engineers in adopting AI-first development workflows (Cursor, Claude) and enforced automated testing standards.",
      ],
    },
    {
      company: "SudoWare",
      role: "Mobile App Developer (React Native)",
      period: "Nov 2020 – Dec 2021",
      location: "Karachi, Pakistan",
      points: [
        "Developed cross-platform mobile apps (React Native / Expo) with Google Maps API integration for real-time geolocation and tracking.",
        "Optimized REST API consumption and local SQLite caching, cutting network latency and enhancing UI fluidity.",
      ],
    },
  ],
  remoteSignals: [
    {
      title: "Async by default",
      body: "Written updates, Loom walkthroughs, and ticket-ready PRs so time zones never block shipping.",
    },
    {
      title: "Clear ownership",
      body: "I own features end-to-end: architecture, UI polish, store submission, Detox coverage, and post-release monitoring.",
    },
    {
      title: "Hiring-manager ready",
      body: "Every case study shows problem, constraints, my decisions, and measurable outcomes — not just screenshots.",
    },
  ],
  projects: [
    {
      slug: "knockio",
      name: "Knockio",
      platform: "iOS · Android",
      year: "Dec 2023",
      category: "Field Service / Door-to-Door CRM",
      group: "field-crm",
      featured: true,
      summary:
        "Developed Knockio, a white-label React Native field-service CRM with map canvassing, Twilio calling/SMS, work orders & financials, push notifications, and multi-tenant branding.",
      impact: "Flagship · App Store + Play Store + knockio.com",
      stack: [
        "React Native",
        "TypeScript",
        "React Navigation",
        "Redux Toolkit",
        "Axios",
        "SQLite",
        "Google Maps",
        "Mapbox",
        "FCM / Notifee",
        "Twilio Voice",
        "OTA updates",
        "White-label",
      ],
      accent: "#1D4ED8",
      features: [
        "Lead management — create, edit, map + list views",
        "Map-based canvassing — markers, clustering, filters (Google Maps + Mapbox)",
        "Territories & routes — KML, route planning, live location",
        "In-app calling & SMS via Twilio Voice",
        "Appointments / calendar",
        "Tasks & notifications — FCM push + deep links",
        "Kanban pipeline with drag & drop",
        "Work orders, inventory, purchase orders",
        "Financials — estimates, invoices, payments, PDFs",
        "Camera / gallery uploads, docs, e-contracts",
        "Time sheet — check-in / clock-in",
        "White-label multi-client (Knockio + Outlaws Roofing)",
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
      summary:
        "White-label of Knockio for a roofing contractor. Same CRM core — leads, routes, dispatch, workforce tracking — branded and configured for Outlaws Roofing field ops.",
      impact: "Knockio white-label · App Store + Play Store",
      stack: ["React Native", "White-label", "Maps", "Field ops"],
      accent: "#B45309",
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
      summary:
        "AI customer-support chatbot that evolves with use — not a static FAQ bot. Handles support conversations with context-aware replies that improve over time.",
      impact: "App Store + Play Store · AI support",
      stack: ["iOS", "Android", "AI / LLM", "Chat", "Supabase"],
      accent: "#7C3AED",
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
      slug: "cruisimity",
      name: "Cruisimity",
      platform: "iOS",
      year: "Jan 2026",
      category: "Navigation",
      group: "consumer",
      summary:
        "Driving-social navigation app with custom routes, trip tracking, nearby drivers, leaderboards, and in-app chat for solo or group cruises.",
      impact: "Live on the App Store · Navigation",
      stack: ["iOS", "Maps & Navigation", "Realtime chat"],
      accent: "#0D9488",
      storeUrl: "https://apps.apple.com/us/app/cruisimity/id6744337395",
      icon: "/apps/cruisimity-icon.jpg",
      screenshots: [
        "/apps/cruisimity-shot-1.jpg",
        "/apps/cruisimity-shot-2.jpg",
        "/apps/cruisimity-shot-3.jpg",
      ],
    },
    {
      slug: "wedstimate-wedding-vendors",
      name: "Wedstimate Wedding Vendors",
      platform: "iOS · Android",
      year: "Jan 2025",
      category: "Lifestyle",
      group: "consumer",
      summary:
        "Wedding vendor matching with upfront pricing, budget tracking, direct messaging, and exclusive deals — less scrolling, clearer costs.",
      impact: "4.8★ on App Store · Live on Play Store",
      stack: ["iOS", "Android", "Firebase", "In-app purchases"],
      accent: "#BE185D",
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
      category: "Business",
      group: "consumer",
      summary:
        "Marketplace connecting shoppers with local organic vendors and backyard growers — listings, product uploads, and direct messaging.",
      impact: "5.0★ on App Store · Live on Play Store",
      stack: ["iOS", "Android", "Marketplace", "Messaging"],
      accent: "#15803D",
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
      category: "LMS · Tracking · Web + Mobile",
      group: "education",
      summary:
        "After-school LMS-style platform with strong tracking — Next.js admin for schools (leads, enrollments, retention) and the Monstro X Android app for families to track classes, attendance, rewards, and schedule changes.",
      impact: "LMS + tracking · Play Store + mymonstro.com",
      stack: ["Next.js", "TypeScript", "Admin portal", "Android", "REST API"],
      accent: "#0F766E",
      features: [
        "Next.js web admin for school owners — leads & enrollments",
        "Retention and activity tracking dashboards",
        "Monstro X Android app for family schedules & attendance",
        "Rewards / points tracking for families",
        "Class reminders, cancellations & in-app messaging",
        "Web + mobile LMS + tracking in one product",
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
      slug: "ivy-online",
      name: "IVY Online",
      platform: "iOS · Android · Web",
      year: "Aug 2024",
      category: "LMS · Online Learning",
      group: "education",
      summary:
        "LMS for O & A Levels — IVY Online Learning Platform. Students get HD video lectures, structured courses, past papers, and study resources; web + iOS + Android so learning continues across devices.",
      impact: "LMS · App Store + Play Store + ivyonline.co",
      stack: ["React Native", "LMS", "iOS", "Android", "Web"],
      accent: "#6D28D9",
      features: [
        "Full LMS for O / A Level students",
        "HD studio video lectures by expert instructors",
        "Structured courses across Maths, Sciences, Business & more",
        "Past papers, notes, and exam prep resources",
        "Self-paced learning with progress tracking",
        "In-app subscriptions and course purchase",
        "Cross-platform — iOS, Android, and web (ivyonline.co)",
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
      name: "Obol App",
      platform: "iOS",
      year: "Mar 2026",
      category: "Native Swift · Productivity",
      group: "tools",
      summary:
        "Native iOS (Swift) legacy messaging app — securely store videos, audio, emails, and files to be delivered to loved ones after death is verified. Built end-to-end in Swift for privacy and reliability.",
      impact: "Live on the App Store · Native Swift",
      stack: ["Swift", "UIKit / SwiftUI", "Secure storage", "iOS"],
      accent: "#334155",
      features: [
        "Native iOS app built in Swift",
        "Record video, audio, and email messages",
        "Attach files for trusted recipients",
        "Secure storage until passing is verified",
        "Privacy-focused legacy delivery flow",
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
        "Fast, privacy-first QR and barcode scanner — offline history on device, flashlight support, image scan, and one-tap open/copy/share.",
      impact: "Live on the App Store · Utilities",
      stack: ["iOS", "Camera / Vision", "Offline-first"],
      accent: "#0369A1",
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
      category: "Sports / Games",
      group: "games",
      summary:
        "Physics-based softball game with batting/pitching control, roster stats, customization, multiplayer, and character updates shipped to the store.",
      impact: "3.8★ on App Store · Sports",
      stack: ["iOS", "Unity / Gameplay", "Multiplayer"],
      accent: "#B45309",
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
