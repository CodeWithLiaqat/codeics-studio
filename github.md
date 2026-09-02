repo: CodeWithLiaqat/codeics-studio
branch: main
path: src

## Last sync
date: 2026-09-02T00:00:00Z
### Updated in this project
- Visual layer: Aceternity/shadcn-style tokens, glass + grain utilities, SpotlightCard, MovingBorder, ShimmerButton, BackgroundBeams, AuroraGlow, TiltCard; Hero/Bento/CaseStudies/AIAgent restyled
- Audit: mobile responsiveness (Header drawer, Hero, Bento, LeadForm, AIAgent), CTA wiring to /contact#intake-form, commercial-intent SEO keywords + schema
- Repository is empty (no commits yet); Phase 1 data files authored from the brief
- Added src/data/{siteConfig,servicesData,portfolioData,blogData,faqData}.js
- Added docs/FILE_TREE.md
- Phase 2: supabase/schema.sql, src/lib/supabaseClient.js, .env.example
- Phase 3: schema.js, SEO.jsx, Header/Footer/Breadcrumbs, App.jsx, NotFound, main.jsx, index.css, tailwind.config.js
- Phase 4: CanvasFrame, SceneFallback, MagneticButton, Toast, Hero, BentoCapabilities, CaseStudies, LeadForm, useLeadForm; budget ranges updated
- Phase 5: AIAgent.jsx, public/robots.txt, public/sitemap.xml, staticwebapp.config.json
- Phase 6: package.json, vite.config.js, index.html, all src/pages/*, Accordion, PageHeader, FAQ section

## Screen map
| Screen | Repo files |
| --- | --- |
| Home | src/pages/Home.jsx, src/components/sections/*.jsx, src/data/* |
| Services / ServiceDetail | src/pages/Services.jsx, src/pages/ServiceDetail.jsx, src/data/servicesData.js |
| Work / CaseStudy | src/pages/Work.jsx, src/pages/CaseStudy.jsx, src/data/portfolioData.js |
| Blog / BlogPost | src/pages/Blog.jsx, src/pages/BlogPost.jsx, src/data/blogData.js |
| Contact | src/pages/Contact.jsx, src/components/forms/LeadForm.jsx, src/hooks/useLeadForm.js |
| Shell | src/App.jsx, src/components/layout/*.jsx, src/components/seo/SEO.jsx, src/lib/schema.js |
| AI Agent | src/components/ai/AIAgent.jsx |
