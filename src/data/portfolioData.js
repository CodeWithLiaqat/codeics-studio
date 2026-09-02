// src/data/portfolioData.js — flagship case studies. Concept showcases and interactive studio demos.
export const portfolioData = [
  {
    id: "lumen-3d-landing",
    slug: "lumen-3d-interactive-landing",
    order: 1,
    featured: true,
    type: "Concept showcase",
    client: "Lumen Audio",
    industry: "Consumer hardware",
    title: "Lumen: 3D product landing page",
    summary:
      "A scroll-driven WebGL product reveal for a premium headphone concept. Camera, lighting and copy move together, and the page still hits a 0.8s LCP.",
    challenge:
      "Show a physical product from every angle without shipping a heavy 3D bundle that tanks load time on mobile.",
    solution:
      "A Draco-compressed GLTF at 1.1 MB, KTX2 textures, a static poster frame rendered for LCP, and a GSAP ScrollTrigger timeline driving the R3F camera. Low-power devices get a video fallback.",
    metrics: [
      { label: "Engagement", value: "+180%", note: "Average time on page vs. 2D prototype" },
      { label: "LCP", value: "0.8s", note: "Mobile, 4G, Lighthouse" },
      { label: "Lighthouse", value: "97", note: "Performance score" },
    ],
    techTags: ["React 19", "Three.js", "React Three Fiber", "GSAP", "Vite"],
    services: ["3d-interactive-web", "web-performance-audits"],
    liveUrl: "https://lumen.codeics.me",
    repoUrl: "",
    year: 2025,
    cover: { src: "/work/lumen-cover.jpg", alt: "Lumen headphones rendered in a dark WebGL scene", width: 1600, height: 1000 },
    gallery: [
      { src: "/work/lumen-01.jpg", alt: "Lumen hero section with rotating headphones", width: 1600, height: 1000 },
      { src: "/work/lumen-02.jpg", alt: "Exploded view driven by scroll position", width: 1600, height: 1000 },
    ],
    seo: {
      title: "Lumen 3D Product Landing Page Case Study",
      description:
        "How Codeics built a scroll-driven Three.js product page with a 0.8s LCP and +180% engagement.",
    },
  },
  {
    id: "atlas-ai-workspace",
    slug: "atlas-ai-research-workspace",
    order: 2,
    featured: true,
    type: "Interactive studio demo",
    client: "Atlas",
    industry: "B2B SaaS",
    title: "Atlas: AI research workspace",
    summary:
      "A React 19 web app where teams upload documents and query them in plain language. Streaming answers, cited sources and a Supabase-backed workspace model.",
    challenge:
      "Make retrieval-augmented answers feel instant and trustworthy for non-technical users, with strict per-workspace data isolation.",
    solution:
      "Supabase Postgres with pgvector for embeddings, row-level security per workspace, edge functions for chunking and embedding, and a streaming chat UI with inline citations.",
    metrics: [
      { label: "First token", value: "420ms", note: "p50 time to first streamed token" },
      { label: "Task completion", value: "+62%", note: "vs. keyword search in usability tests" },
      { label: "INP", value: "48ms", note: "Field data, p75" },
    ],
    techTags: ["React 19", "Supabase", "pgvector", "Edge Functions", "Tailwind CSS"],
    services: ["ai-web-apps", "ui-ux-design-systems"],
    liveUrl: "https://atlas.codeics.me",
    repoUrl: "",
    year: 2025,
    cover: { src: "/work/atlas-cover.jpg", alt: "Atlas AI workspace chat interface with cited sources", width: 1600, height: 1000 },
    gallery: [
      { src: "/work/atlas-01.jpg", alt: "Document library with embedding status", width: 1600, height: 1000 },
      { src: "/work/atlas-02.jpg", alt: "Streaming answer with citation drawer", width: 1600, height: 1000 },
    ],
    seo: {
      title: "Atlas AI Research Workspace Case Study",
      description:
        "A production AI web app with Supabase pgvector, streaming responses and row-level security, built by Codeics.",
    },
  },
  {
    id: "vantage-performance-rebuild",
    slug: "vantage-performance-rebuild",
    order: 3,
    featured: true,
    type: "Concept showcase",
    client: "Vantage Realty",
    industry: "Luxury real estate",
    title: "Vantage: performance rebuild",
    summary:
      "A luxury property site rebuilt from a 6.2s LCP WordPress theme into a headless React frontend with a 0.9s LCP and zero layout shift.",
    challenge:
      "Preserve rankings and the editorial workflow while removing the page-builder bloat that was costing mobile conversions.",
    solution:
      "Headless WordPress via WPGraphQL, Vite-built React frontend, responsive AVIF pipeline, self-hosted fonts with size-adjust fallbacks, and 301 mapping for every legacy URL.",
    metrics: [
      { label: "LCP", value: "6.2s → 0.9s", note: "Mobile field data, p75" },
      { label: "CLS", value: "0.00", note: "Down from 0.31" },
      { label: "Enquiries", value: "+44%", note: "Form submissions, 90 days post-launch" },
    ],
    techTags: ["React 19", "Headless WordPress", "WPGraphQL", "Vite", "Cloudflare"],
    services: ["web-performance-audits", "enterprise-wordpress"],
    liveUrl: "https://vantage.codeics.me",
    repoUrl: "",
    year: 2024,
    cover: { src: "/work/vantage-cover.jpg", alt: "Vantage Realty property listing page on mobile and desktop", width: 1600, height: 1000 },
    gallery: [
      { src: "/work/vantage-01.jpg", alt: "Before and after Lighthouse comparison", width: 1600, height: 1000 },
    ],
    seo: {
      title: "Vantage Realty Performance Rebuild Case Study",
      description:
        "From 6.2s to 0.9s LCP: a headless WordPress performance rebuild with zero CLS by Codeics.",
    },
  },
  {
    id: "orbit-design-system",
    slug: "orbit-design-system",
    order: 4,
    featured: false,
    type: "Interactive studio demo",
    client: "Orbit Fintech",
    industry: "Fintech",
    title: "Orbit: multi-product design system",
    summary:
      "A token-based design system spanning a marketing site, dashboard and mobile web app, with Figma variables mapped one-to-one to Tailwind config.",
    challenge:
      "Three product teams shipping inconsistent UI and re-implementing the same components in every sprint.",
    solution:
      "Figma variables exported to a tokens JSON, a Tailwind preset consuming those tokens, 48 accessible React components documented in Storybook, and a contribution process.",
    metrics: [
      { label: "UI build time", value: "-55%", note: "Sprint velocity for new screens" },
      { label: "Components", value: "48", note: "Documented, WCAG 2.2 AA" },
      { label: "Accessibility", value: "100", note: "Lighthouse a11y across products" },
    ],
    techTags: ["Figma", "Tailwind CSS", "Storybook", "Radix UI", "React 19"],
    services: ["ui-ux-design-systems"],
    liveUrl: "https://orbit.codeics.me",
    repoUrl: "",
    year: 2024,
    cover: { src: "/work/orbit-cover.jpg", alt: "Orbit design system component overview", width: 1600, height: 1000 },
    gallery: [],
    seo: {
      title: "Orbit Fintech Design System Case Study",
      description:
        "A Figma-to-Tailwind design system with 48 accessible components that cut UI build time by 55%.",
    },
  },
];

export const getProjectBySlug = (slug) => portfolioData.find((p) => p.slug === slug);
export const featuredProjects = portfolioData.filter((p) => p.featured);
export default portfolioData;
