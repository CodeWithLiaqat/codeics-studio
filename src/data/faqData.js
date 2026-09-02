// src/data/faqData.js — drives both the accordion UI and FAQPage JSON-LD. Keep answers plain text for schema validity.
export const faqData = [
  {
    id: "what-does-codeics-do",
    question: "What does Codeics build?",
    answer:
      "Codeics is a 3D web and AI engineering studio. We design and build immersive Three.js websites, AI-powered web applications, enterprise WordPress platforms, UI/UX design systems and Core Web Vitals performance rebuilds for B2B companies, tech startups and luxury brands worldwide.",
    category: "General",
  },
  {
    id: "pricing",
    question: "How much does a project cost?",
    answer:
      "Every engagement is scoped individually. Performance audits start at $1,000, design systems and WordPress builds from $2,000 to $2,500, 3D interactive websites from $3,000 and AI web apps from $4,000. You receive a fixed quote and timeline before any work begins.",
    category: "Pricing",
  },
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "A performance audit takes one to two weeks. A landing page with a custom 3D scene typically takes four to six weeks. Full web applications and design systems run eight to twelve weeks depending on scope. We share a milestone schedule at kickoff.",
    category: "Process",
  },
  {
    id: "3d-performance",
    question: "Will a 3D website hurt my page speed or SEO?",
    answer:
      "Not when it is engineered correctly. We compress models and textures, cap the pixel ratio, reserve canvas space to prevent layout shift and render a static element for Largest Contentful Paint. Our 3D projects target Lighthouse performance scores of 95 or higher.",
    category: "3D Web",
  },
  {
    id: "tech-stack",
    question: "What technology stack do you use?",
    answer:
      "React 19 with Vite, Three.js and React Three Fiber for 3D, GSAP for motion, Tailwind CSS for styling and Supabase for authentication, database and edge functions. For content-heavy sites we also deliver headless or classic WordPress.",
    category: "Technical",
  },
  {
    id: "ai-data-privacy",
    question: "How do you handle data privacy in AI web apps?",
    answer:
      "Your data stays in your own Supabase project with row-level security enforced at the database. Model API keys are held in edge functions, never in the browser, and we can route to providers with zero-retention policies on request.",
    category: "AI",
  },
  {
    id: "worldwide",
    question: "Do you work with clients outside Pakistan?",
    answer:
      "Yes. Codeics works with clients worldwide, primarily in North America, Europe and the Middle East. Communication is async-first over email and a shared project board, with scheduled calls in your time zone.",
    category: "General",
  },
  {
    id: "after-launch",
    question: "What happens after launch?",
    answer:
      "Every project includes 30 days of post-launch support. After that you can choose a monthly retainer for monitoring, content updates and performance upkeep, or hand the codebase to your team with full documentation.",
    category: "Process",
  },
  {
    id: "get-started",
    question: "How do I start a project?",
    answer:
      "Send a brief through the contact form or email contact@codeics.me with your goals, timeline and budget range. You will hear back within 24 hours with next steps and, if it is a fit, a proposal within one week.",
    category: "Process",
  },
];

// Shape used by the SEO engine for FAQPage JSON-LD.
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default faqData;
