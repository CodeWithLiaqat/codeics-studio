// src/data/blogData.js — launch articles. Body is an array of blocks so the UI renders semantic HTML (h2/h3/p/ul/code).
const author = { name: "Liaqat Ali Khan", title: "Creative Web Developer & Designer", url: "https://codeics.me/about" };

export const blogData = [
  {
    id: "webgl-performance-react-three-fiber",
    slug: "webgl-performance-react-three-fiber",
    title: "WebGL performance in React Three Fiber: shipping 3D without wrecking Core Web Vitals",
    excerpt:
      "A practical checklist for 3D websites that still score 95+: asset compression, pixel ratio caps, Suspense fallbacks and fixed canvas bounds.",
    category: "3D Web",
    tags: ["Three.js", "React Three Fiber", "Performance", "Core Web Vitals"],
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    readingTime: 8,
    author,
    cover: { src: "/blog/webgl-performance.jpg", alt: "Wireframe 3D mesh over a performance timeline", width: 1600, height: 900 },
    seo: {
      title: "WebGL Performance in React Three Fiber",
      description:
        "How to ship Three.js scenes with a fast LCP, zero CLS and smooth INP: compression, DPR caps, Suspense and canvas sizing.",
    },
    body: [
      { type: "p", text: "Most 3D websites are slow for predictable reasons: multi-megabyte models, uncapped pixel ratios on high-density screens, and a canvas that appears late and shoves the layout around. None of these are inherent to WebGL. They are pipeline decisions, and each has a fix." },
      { type: "h2", text: "1. Reserve the canvas box before it renders" },
      { type: "p", text: "Cumulative Layout Shift comes from elements arriving without reserved space. Wrap every Canvas in a container with an explicit aspect-ratio and min-height. The scene can load whenever it likes; the layout never moves." },
      { type: "code", lang: "jsx", text: "<div className=\"relative aspect-[16/9] min-h-[420px]\">\n  <Suspense fallback={<PosterFrame />}>\n    <Canvas dpr={Math.min(window.devicePixelRatio, 2)} />\n  </Suspense>\n</div>" },
      { type: "h2", text: "2. Cap the device pixel ratio" },
      { type: "p", text: "A 3x display renders nine times the pixels of a 1x display. Capping dpr at 2 is visually indistinguishable on most scenes and roughly halves GPU work on modern phones. For scroll-heavy scenes, consider dropping to 1.5 while scrolling and restoring at rest." },
      { type: "h2", text: "3. Compress geometry and textures" },
      { type: "ul", items: ["Draco or Meshopt for geometry: typical 5–10x reduction.", "KTX2 with Basis Universal for textures: GPU-native, no decode on the main thread.", "Bake lighting where possible and drop real-time shadows on mobile tiers."] },
      { type: "h2", text: "4. Give LCP something static" },
      { type: "p", text: "Largest Contentful Paint does not count WebGL canvases reliably. Render a poster image or headline as the LCP element, preload it, and let the scene fade in behind it. Your LCP becomes a fast image instead of a slow canvas." },
      { type: "h2", text: "5. Keep the main thread free" },
      { type: "p", text: "Load the 3D bundle with a dynamic import after first paint, decode assets in workers, and pause the render loop when the canvas leaves the viewport. Interaction to Next Paint suffers most from long tasks during scene setup, so split that setup across frames." },
      { type: "h3", text: "Checklist" },
      { type: "ul", items: ["aspect-ratio and min-height on every canvas wrapper", "dpr capped at 2", "Draco/Meshopt geometry, KTX2 textures", "Static LCP element with preload", "Dynamic import and viewport-paused render loop"] },
    ],
  },
  {
    id: "building-ai-web-apps-react-supabase",
    slug: "building-ai-web-apps-react-supabase",
    title: "Building production AI web apps with React 19 and Supabase",
    excerpt:
      "The architecture behind retrieval-augmented assistants that stream, cite their sources and respect tenant boundaries.",
    category: "AI Engineering",
    tags: ["AI", "React 19", "Supabase", "pgvector"],
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    readingTime: 10,
    author,
    cover: { src: "/blog/ai-web-apps.jpg", alt: "Streaming chat interface with database schema overlay", width: 1600, height: 900 },
    seo: {
      title: "Production AI Web Apps with React 19 and Supabase",
      description:
        "Architecture for AI web apps: pgvector retrieval, edge functions, streaming UIs with React 19 and row-level security in Supabase.",
    },
    body: [
      { type: "p", text: "The gap between an AI demo and an AI product is mostly infrastructure: where the data lives, who can read it, how fast the first token arrives and what happens when the model is wrong. This is the stack we use to close that gap." },
      { type: "h2", text: "Data layer: Postgres with pgvector" },
      { type: "p", text: "Supabase gives you Postgres, auth and storage in one place. Enable pgvector, store document chunks with their embeddings, and enforce row-level security keyed on workspace_id so retrieval can never cross tenants, even if application code has a bug." },
      { type: "code", lang: "sql", text: "create table chunks (\n  id uuid primary key default gen_random_uuid(),\n  workspace_id uuid not null references workspaces(id),\n  content text not null,\n  embedding vector(1536)\n);\ncreate index on chunks using hnsw (embedding vector_cosine_ops);\nalter table chunks enable row level security;" },
      { type: "h2", text: "Compute layer: edge functions" },
      { type: "p", text: "Chunking, embedding and model calls run in Supabase Edge Functions. API keys never reach the browser, rate limits live in one place, and every request is logged with its workspace, token count and latency." },
      { type: "h2", text: "UI layer: React 19 streaming" },
      { type: "p", text: "Use the Actions and useOptimistic patterns in React 19 to append the user message immediately, then stream tokens from a ReadableStream into state. Render citations as the model emits them so users can verify while reading." },
      { type: "h2", text: "Trust layer: evals and fallbacks" },
      { type: "ul", items: ["Keep a golden set of questions with expected sources and run it on every prompt change.", "Show retrieved passages, not just answers.", "Return an explicit 'not found in your documents' state instead of a confident guess."] },
      { type: "p", text: "None of this is exotic. It is the same discipline any production web app needs, applied to a component that happens to call a language model." },
    ],
  },
  {
    id: "core-web-vitals-2026-guide",
    slug: "core-web-vitals-guide-lcp-inp-cls",
    title: "Core Web Vitals in practice: fixing LCP, INP and CLS at the source",
    excerpt:
      "What actually moves each metric, how to read field versus lab data, and the fixes we apply first on every performance audit.",
    category: "Performance",
    tags: ["Core Web Vitals", "LCP", "INP", "CLS", "SEO"],
    publishedAt: "2026-09-01",
    updatedAt: "2026-09-01",
    readingTime: 9,
    author,
    cover: { src: "/blog/core-web-vitals.jpg", alt: "Three Core Web Vitals gauges in the green", width: 1600, height: 900 },
    seo: {
      title: "Core Web Vitals Guide: LCP, INP and CLS Fixes",
      description:
        "A field-tested guide to improving Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift.",
    },
    body: [
      { type: "p", text: "Core Web Vitals are a ranking signal, but more importantly they are a proxy for whether a page feels fast. Field data from real users (CrUX) is what Google uses; lab data from Lighthouse is what you use to diagnose. Fix in the lab, verify in the field." },
      { type: "h2", text: "LCP: make the biggest thing arrive first" },
      { type: "ul", items: ["Identify the LCP element on mobile; it is usually a hero image or heading.", "Preload it with fetchpriority=\"high\" and serve AVIF/WebP at the rendered size.", "Self-host fonts with font-display: swap and size-adjust fallbacks so text paints immediately.", "Remove render-blocking CSS and third-party scripts from the head."] },
      { type: "h2", text: "INP: shorten every long task" },
      { type: "p", text: "Interaction to Next Paint measures the slowest interactions across the visit. The usual culprits are hydration on large component trees, analytics scripts running on click, and synchronous state updates that re-render the world. Split bundles by route, defer third parties until idle, and yield to the main thread with scheduler.yield or setTimeout inside heavy handlers." },
      { type: "h2", text: "CLS: reserve space for everything" },
      { type: "ul", items: ["Explicit width and height (or aspect-ratio) on every image, video, iframe and canvas.", "min-height on containers that fill from async data.", "Never inject banners above existing content; use a reserved slot or a bottom sheet.", "Animate with transform and opacity, never with top, left, width or height."] },
      { type: "h2", text: "Order of operations on an audit" },
      { type: "p", text: "We start with the LCP element and render-blocking resources because they compound into everything else, then CLS because it is usually mechanical, then INP because it requires the most profiling. Each fix is measured against field data over 28 days before we call it done." },
    ],
  },
];

export const getPostBySlug = (slug) => blogData.find((p) => p.slug === slug);
export default blogData;
