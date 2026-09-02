// src/data/servicesData.js — the five core offerings. Icons are lucide-react names resolved by the UI.
export const servicesData = [
  {
    id: "3d-interactive-web",
    slug: "3d-interactive-web",
    order: 1,
    icon: "Boxes",
    eyebrow: "Immersive",
    title: "3D Interactive Web",
    shortDescription:
      "WebGL experiences built with Three.js and React Three Fiber that load fast, run at 60fps and turn a landing page into something people remember.",
    longDescription:
      "We design and engineer real-time 3D scenes that serve the product story instead of distracting from it. Every scene ships with capped pixel ratios, compressed geometry and textures, Suspense fallbacks and fixed-size canvas wrappers so the experience is immersive without sacrificing Core Web Vitals.",
    deliverables: [
      "Custom Three.js / R3F scenes and shaders",
      "Scroll-driven camera and GSAP timelines",
      "Draco / KTX2 asset compression pipeline",
      "Progressive loading with static fallbacks",
      "Mobile and low-power device tiers",
    ],
    techBadges: ["Three.js", "React Three Fiber", "Drei", "GSAP", "GLSL", "Blender"],
    startingPrice: "From $3,000",
    seo: {
      title: "3D Web Development Studio — React Three Fiber & Three.js",
      description:
        "Hire React Three Fiber & GSAP developers. Immersive WebGL websites engineered for 60fps and 95+ Lighthouse scores for startups and luxury brands.",
      keywords: ["3D web development studio", "React Three Fiber developers", "Three.js agency", "WebGL website design", "GSAP scroll animation"],
    },
    bento: { colSpan: 2, rowSpan: 2, featured: true },
  },
  {
    id: "ai-web-apps",
    slug: "ai-web-apps",
    order: 2,
    icon: "BrainCircuit",
    eyebrow: "Intelligent",
    title: "AI Web Apps",
    shortDescription:
      "Production AI features inside React apps: assistants, semantic search, document intelligence and lead qualification wired to your data.",
    longDescription:
      "We integrate LLM APIs, vector search and Supabase into React 19 applications with streaming UIs, rate limiting, prompt versioning and observability. The result is an AI feature your customers actually use, not a demo that breaks in production.",
    deliverables: [
      "LLM integration with streaming responses",
      "Retrieval pipelines (pgvector / Supabase)",
      "Conversational and voice-cued interfaces",
      "Guardrails, evals and usage analytics",
      "Secure edge functions and key handling",
    ],
    techBadges: ["React 19", "Supabase", "pgvector", "Edge Functions", "OpenAI / Anthropic APIs"],
    startingPrice: "From $4,000",
    seo: {
      title: "AI-Powered Web Applications & Landing Pages",
      description:
        "Custom AI-powered web applications and AI landing pages with React 19 and Supabase: assistants, semantic search and lead qualification built for production.",
      keywords: ["AI-powered web applications", "AI landing page development", "React 19 AI app", "Supabase pgvector", "LLM integration agency"],
    },
    bento: { colSpan: 1, rowSpan: 2 },
  },
  {
    id: "enterprise-wordpress",
    slug: "enterprise-wordpress",
    order: 3,
    icon: "Layers",
    eyebrow: "Scalable",
    title: "Enterprise WordPress",
    shortDescription:
      "Headless or classic WordPress builds with custom blocks, hardened hosting and editorial workflows that marketing teams can run without a developer.",
    longDescription:
      "For organisations that need WordPress, we deliver custom Gutenberg blocks, headless React frontends where it pays off, role-based editorial flows and a security and caching stack that holds up under traffic spikes.",
    deliverables: [
      "Custom theme and Gutenberg block library",
      "Headless WordPress with React frontends",
      "Multilingual and multisite setups",
      "Security hardening and CDN caching",
      "Content migration and SEO preservation",
    ],
    techBadges: ["WordPress", "Gutenberg", "WPGraphQL", "PHP 8", "Cloudflare"],
    startingPrice: "From $2,500",
    seo: {
      title: "Enterprise & Headless WordPress Development",
      description:
        "Enterprise-grade WordPress: custom Gutenberg blocks, headless React and Next.js frontends, hardened hosting and migrations that keep your rankings.",
      keywords: ["enterprise WordPress agency", "headless WordPress Next.js", "custom Gutenberg blocks", "WordPress performance"],
    },
    bento: { colSpan: 1, rowSpan: 1 },
  },
  {
    id: "ui-ux-design-systems",
    slug: "ui-ux-design-systems",
    order: 4,
    icon: "PenTool",
    eyebrow: "Systematic",
    title: "UI/UX Design Systems",
    shortDescription:
      "Research-led interfaces and token-based design systems in Figma and Tailwind, so every screen ships consistent and every handoff is clean.",
    longDescription:
      "We run discovery, map user flows and design high-fidelity interfaces backed by a component library with documented tokens, states and accessibility rules. Designers and engineers work from the same source of truth.",
    deliverables: [
      "UX research, flows and wireframes",
      "High-fidelity UI in Figma",
      "Design tokens mapped to Tailwind config",
      "Accessible component library (WCAG 2.2 AA)",
      "Motion and interaction guidelines",
    ],
    techBadges: ["Figma", "Tailwind CSS", "Storybook", "Radix UI", "WCAG 2.2"],
    startingPrice: "From $2,000",
    seo: {
      title: "UI/UX Design Systems — Interactive Creative Agency",
      description:
        "User-centred UI/UX design and scalable Figma-to-Tailwind design systems from an interactive creative agency for product teams that ship fast.",
      keywords: ["UI/UX design agency", "design system Figma Tailwind", "interactive creative agency", "product design studio"],
    },
    bento: { colSpan: 1, rowSpan: 1 },
  },
  {
    id: "web-performance-audits",
    slug: "web-performance-audits",
    order: 5,
    icon: "Gauge",
    eyebrow: "Measurable",
    title: "Web Performance Audits",
    shortDescription:
      "Core Web Vitals audits and remediation that move LCP, INP and CLS into the green and keep them there with monitoring.",
    longDescription:
      "We profile real-user data, identify render-blocking resources, layout shifts and long tasks, then fix them at the source: bundle splitting, image pipelines, font strategy and third-party script governance. Reports are prioritised by impact per hour of effort.",
    deliverables: [
      "Lab and field (CrUX) performance audit",
      "Prioritised remediation roadmap",
      "Bundle, image and font optimisation",
      "Third-party script governance",
      "Continuous monitoring dashboards",
    ],
    techBadges: ["Lighthouse", "CrUX", "WebPageTest", "Vite", "Cloudflare"],
    startingPrice: "From $1,000",
    seo: {
      title: "High Performance Web Design & Core Web Vitals Audits",
      description:
        "Core Web Vitals audits and fixes: faster LCP, lower INP and zero CLS. High performance web design for React, Next.js, WordPress and e-commerce sites.",
      keywords: ["Core Web Vitals optimization agency", "Next.js high performance web design", "website speed optimization", "Lighthouse 95+ audit"],
    },
    bento: { colSpan: 1, rowSpan: 1 },
  },
];

export const getServiceBySlug = (slug) => servicesData.find((s) => s.slug === slug);
export default servicesData;
