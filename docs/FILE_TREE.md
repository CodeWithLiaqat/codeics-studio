# Codeics — Project file tree (Phase 1)

```
codeics-studio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── staticwebapp.config.json          # Azure Static Web Apps (Phase 5)
├── .env.example                      # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
├── public/
│   ├── robots.txt                    # Phase 5
│   ├── sitemap.xml                   # Phase 5
│   ├── favicon.svg
│   ├── og/                           # OG images (1200x630)
│   ├── work/                         # case study covers
│   └── blog/                         # article covers
├── supabase/
│   └── schema.sql                    # leads table (Phase 2)
└── src/
    ├── main.jsx
    ├── App.jsx                       # React Router v6 routes
    ├── index.css                     # Tailwind layers + theme tokens
    ├── data/
    │   ├── siteConfig.js
    │   ├── servicesData.js
    │   ├── portfolioData.js
    │   ├── blogData.js
    │   └── faqData.js
    ├── lib/
    │   ├── supabaseClient.js         # Phase 2
    │   └── schema.js                 # JSON-LD builders (Phase 3)
    ├── hooks/
    │   └── useLeadForm.js
    ├── components/
    │   ├── seo/SEO.jsx               # Phase 3
    │   ├── layout/{Header,Footer,PageHeader,Breadcrumbs}.jsx
    │   ├── ui/{SpotlightCard,MovingBorder,ShimmerButton,BackgroundBeams,AuroraGlow,TiltCard,MagneticButton,Accordion,Toast}.jsx
    │   ├── three/{HeroScene,SceneFallback,CanvasFrame}.jsx   # Phase 4
    │   ├── sections/{Hero,BentoCapabilities,CaseStudies,FAQ}.jsx
    │   ├── forms/LeadForm.jsx        # Phase 4
    │   └── ai/AIAgent.jsx            # Phase 5
    └── pages/
        ├── Home.jsx
        ├── Services.jsx  / ServiceDetail.jsx
        ├── Work.jsx      / CaseStudy.jsx
        ├── Blog.jsx      / BlogPost.jsx
        ├── Contact.jsx
        └── NotFound.jsx
```

## Route → data map
- `/` → siteConfig, servicesData, featuredProjects, faqData
- `/services`, `/services/:slug` → servicesData
- `/work`, `/work/:slug` → portfolioData
- `/blog`, `/blog/:slug` → blogData
- `/contact` → siteConfig.leadFormOptions
