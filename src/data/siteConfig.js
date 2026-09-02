// src/data/siteConfig.js — single source of truth for agency identity, NAP signals and SEO defaults.
export const siteConfig = {
  name: "Codeics",
  legalName: "Codeics Studio",
  tagline: "3D & AI Creative Web Studio",
  description:
    "Codeics is a 3D web development studio and interactive creative agency. React Three Fiber & GSAP developers building high-performance websites, AI-powered web applications and landing pages for B2B companies, tech startups and luxury brands worldwide.",
  url: "https://codeics.me",
  logo: "https://codeics.me/og/logo.png",
  ogImage: "https://codeics.me/og/codeics-og.jpg",
  locale: "en_US",
  language: "en",
  founder: {
    name: "Liaqat Ali Khan",
    title: "Creative Web Developer & Designer",
    role: "Founder & Principal Engineer",
    url: "https://codeics.me/about",
    image: "https://codeics.me/og/liaqat-ali-khan.jpg",
  },
  contact: {
    email: "contact@codeics.me",
    secondaryEmail: "liaqat.ak-professional@outlook.com",
    phone: "+92 304 5722622",
    whatsapp: "https://wa.me/923045722622",
    responseTime: "Within 24 hours",
    availability: "Accepting new projects",
  },
  address: {
    streetAddress: "Pindi Gheb",
    addressLocality: "Attock",
    addressRegion: "Punjab",
    postalCode: "43260",
    addressCountry: "PK",
  },
  geo: { latitude: 33.2412, longitude: 72.2647 },
  areaServed: ["Worldwide"],
  serviceArea: { type: "Global", name: "Worldwide", description: "Remote-first studio serving North America, Europe, the Middle East and Asia-Pacific" },
  serviceType: [
    "3D Web Development",
    "Interactive Creative Agency Services",
    "React Three Fiber & GSAP Development",
    "High Performance Web Design",
    "AI-Powered Web Applications",
    "AI Landing Page Development",
    "UI/UX Design Systems",
    "Core Web Vitals Optimization",
  ],
  knowsAbout: ["Three.js", "React Three Fiber", "GSAP", "WebGL", "React 19", "Next.js", "Vite", "Tailwind CSS", "Supabase", "Core Web Vitals", "Technical SEO"],
  priceRange: "$1,000+",
  foundingDate: "2024",
  social: {
    linkedin: "https://www.linkedin.com/in/codeics",
    github: "https://github.com/CodeWithLiaqat",
    facebook: "https://www.facebook.com/share/1Ewqfx5Kkr/",
  },
  twitterHandle: "",
  stack: ["React 19", "Vite", "Three.js", "GSAP", "Tailwind CSS", "Supabase"],
  seo: {
    titleTemplate: "%s | Codeics — 3D & AI Creative Web Studio",
    defaultTitle: "Codeics — 3D Web Development Studio & Interactive Creative Agency",
    defaultDescription:
      "3D web development studio and interactive creative agency. React Three Fiber & GSAP developers building high-performance websites and AI-powered web applications for startups and luxury brands worldwide. From $1,000.",
    keywords: [
      "3D web development studio",
      "interactive creative agency",
      "React Three Fiber developers",
      "GSAP developers",
      "Three.js development agency",
      "Next.js high performance web design",
      "AI-powered web applications",
      "AI landing page development",
      "WebGL website design",
      "Core Web Vitals optimization agency",
      "luxury web design studio",
      "creative web developer Pakistan",
    ],
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    themeColor: "#030303",
  },
  theme: {
    obsidian: "#030303",
    obsidian50: "#080808",
    surface: "#0e0e10",
    borderGlass: "rgba(255,255,255,0.08)",
    borderGlassHover: "rgba(255,255,255,0.16)",
    accent: "#10b981",
    accentCyan: "#22d3ee",
  },
};

export const heroContent = {
  eyebrow: "3D Web Development Studio · Interactive Creative Agency",
  headline: "Websites that move. Products that think.",
  headlineAccent: "Engineered to rank.",
  subheadline:
    "Codeics designs and builds immersive Three.js experiences, production AI web apps and Core Web Vitals-optimized platforms for B2B companies, startups and luxury brands worldwide.",
  primaryCta: { label: "Initiate Project", href: "/contact#intake-form" },
  secondaryCta: { label: "Explore Capabilities", href: "/services" },
  tertiaryCta: { label: "Book a Strategy Call", href: "https://wa.me/923045722622?text=Hi%20Liaqat%2C%20I%27d%20like%20to%20book%20a%20strategy%20call%20about%20a%20project." },
  metrics: [
    { value: "95+", label: "Lighthouse performance target" },
    { value: "0.00", label: "Layout shift on every build" },
    { value: "24h", label: "Response to every enquiry" },
    { value: "$1k+", label: "Custom scopes from" },
  ],
};

export const navigation = {
  primary: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Start a Project", href: "/contact#intake-form" },
  footer: [
    {
      heading: "Studio",
      links: [
        { label: "Services", href: "/services" },
        { label: "Case studies", href: "/work" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "3D Interactive Web", href: "/services/3d-interactive-web" },
        { label: "AI Web Apps", href: "/services/ai-web-apps" },
        { label: "Enterprise WordPress", href: "/services/enterprise-wordpress" },
        { label: "UI/UX Design Systems", href: "/services/ui-ux-design-systems" },
        { label: "Web Performance Audits", href: "/services/web-performance-audits" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy policy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
};

export const leadFormOptions = {
  serviceCategories: [
    { value: "3d-interactive-web", label: "3D Interactive Web" },
    { value: "ai-web-apps", label: "AI Web App" },
    { value: "enterprise-wordpress", label: "Enterprise WordPress" },
    { value: "ui-ux-design-systems", label: "UI/UX Design System" },
    { value: "web-performance-audits", label: "Web Performance Audit" },
    { value: "other", label: "Something else" },
  ],
  budgetRanges: [
    { value: "1k-3k", label: "$1k – $3k" },
    { value: "3k-5k", label: "$3k – $5k" },
    { value: "5k-10k", label: "$5k – $10k" },
    { value: "10k-plus", label: "$10k+" },
  ],
  timelines: [
    { value: "asap", label: "As soon as possible" },
    { value: "1-2-months", label: "1–2 months" },
    { value: "3-plus-months", label: "3+ months" },
    { value: "exploring", label: "Just exploring" },
  ],
};

export default siteConfig;
