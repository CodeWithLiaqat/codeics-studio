import { siteConfig } from "../data/siteConfig";
import { faqData } from "../data/faqData";
import { servicesData } from "../data/servicesData";

const abs = (path = "/") => (path.startsWith("http") ? path : new URL(path, siteConfig.url).href);
const compact = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== "" && v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)));

const ORG_ID = `${siteConfig.url}/#organization`;
const FOUNDER_ID = `${siteConfig.url}/#founder`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export const buildFounder = () =>
  compact({
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.title,
    url: siteConfig.founder.url,
    image: siteConfig.founder.image,
    worksFor: { "@id": ORG_ID },
    sameAs: Object.values(siteConfig.social),
  });

export const buildPostalAddress = () => {
  const a = siteConfig.address;
  const body = compact({ "@type": "PostalAddress", ...a });
  return Object.keys(body).length > 1 ? body : undefined;
};

export const buildOrganization = () =>
  compact({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: siteConfig.logo },
    image: siteConfig.ogImage,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    foundingDate: siteConfig.foundingDate,
    founder: buildFounder(),
    address: buildPostalAddress(),
    sameAs: Object.values(siteConfig.social),
    keywords: siteConfig.seo.keywords.join(", "),
    knowsAbout: siteConfig.knowsAbout,
    slogan: siteConfig.tagline,
    areaServed: { "@type": "Place", name: siteConfig.serviceArea.name },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        availableLanguage: ["English", "Urdu"],
        areaServed: siteConfig.areaServed,
      },
      ...(siteConfig.contact.secondaryEmail
        ? [{ "@type": "ContactPoint", contactType: "customer support", email: siteConfig.contact.secondaryEmail, availableLanguage: ["English", "Urdu"] }]
        : []),
    ],
  });

export const buildProfessionalService = () =>
  compact({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange: siteConfig.priceRange,
    parentOrganization: { "@id": ORG_ID },
    founder: { "@id": FOUNDER_ID },
    address: buildPostalAddress(),
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.latitude, longitude: siteConfig.geo.longitude },
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "Place", name })),
    serviceArea: { "@type": "AdministrativeArea", name: siteConfig.serviceArea.name, description: siteConfig.serviceArea.description },
    serviceType: siteConfig.serviceType,
    keywords: siteConfig.seo.keywords.join(", "),
    knowsAbout: siteConfig.knowsAbout,
    slogan: siteConfig.tagline,
    openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Codeics services",
      itemListElement: servicesData.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: abs(`/services/${s.slug}`) },
        price: s.startingPrice.replace(/[^0-9]/g, ""),
        priceCurrency: "USD",
      })),
    },
    sameAs: Object.values(siteConfig.social),
  });

export const buildWebSite = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.language,
  publisher: { "@id": ORG_ID },
});

export const buildBreadcrumbs = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label,
    item: abs(c.href),
  })),
});

export const buildFAQPage = (items = faqData) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const buildService = (service) =>
  compact({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/services/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    description: service.longDescription,
    url: abs(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: siteConfig.areaServed,
    serviceArea: { "@type": "AdministrativeArea", name: siteConfig.serviceArea.name },
    keywords: (service.seo.keywords || []).join(", "),
    category: service.eyebrow,
    offers: { "@type": "Offer", price: service.startingPrice.replace(/[^0-9]/g, ""), priceCurrency: "USD", url: abs("/contact") },
  });

export const buildArticle = (post) => ({
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": abs(`/blog/${post.slug}#article`),
  headline: post.title,
  description: post.excerpt,
  image: abs(post.cover.src),
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  keywords: post.tags.join(", "),
  articleSection: post.category,
  wordCount: post.body.reduce((n, b) => n + (b.text ? b.text.split(/\s+/).length : (b.items || []).join(" ").split(/\s+/).length), 0),
  inLanguage: siteConfig.language,
  author: { "@type": "Person", "@id": FOUNDER_ID, name: post.author.name, url: post.author.url },
  publisher: { "@id": ORG_ID },
  mainEntityOfPage: { "@type": "WebPage", "@id": abs(`/blog/${post.slug}`) },
});

export const buildCreativeWork = (project) =>
  compact({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": abs(`/work/${project.slug}#work`),
    name: project.title,
    headline: project.title,
    description: project.summary,
    image: abs(project.cover.src),
    url: abs(`/work/${project.slug}`),
    dateCreated: String(project.year),
    keywords: project.techTags.join(", "),
    genre: project.industry,
    creator: { "@id": ORG_ID },
    sourceOrganization: { "@id": ORG_ID },
    sameAs: project.liveUrl,
  });

export const globalSchemas = () => [buildOrganization(), buildProfessionalService(), buildWebSite()];
