import { useEffect } from "react";
import { siteConfig } from "../../data/siteConfig";

const upsert = (selector, create) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    el.setAttribute("data-seo", "");
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (attr, key, content) => {
  if (!content) {
    document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
    return;
  }
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute("content", content);
};

const setLink = (rel, href) => {
  const el = upsert(`link[rel="${rel}"]`, () => {
    const l = document.createElement("link");
    l.setAttribute("rel", rel);
    return l;
  });
  el.setAttribute("href", href);
};

const abs = (path) => (!path ? undefined : path.startsWith("http") ? path : new URL(path, siteConfig.url).href);

export default function SEO({
  title,
  description = siteConfig.seo.defaultDescription,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  noindex = false,
  keywords,
  publishedTime,
  modifiedTime,
  schemas = [],
}) {
  const fullTitle = title ? siteConfig.seo.titleTemplate.replace("%s", title) : siteConfig.seo.defaultTitle;
  const canonical = abs(path.split("?")[0].split("#")[0]);
  const ogImage = abs(image);
  const schemaJson = JSON.stringify(schemas);
  const keywordList = [...new Set([...(keywords || []), ...siteConfig.seo.keywords])].join(", ");

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = siteConfig.language;

    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : siteConfig.seo.robots);
    setMeta("name", "theme-color", siteConfig.seo.themeColor);
    setMeta("name", "author", siteConfig.founder.name);
    setMeta("name", "keywords", keywordList);
    setMeta("name", "geo.region", `${siteConfig.address.addressCountry}-${siteConfig.address.addressRegion}`.replace(/-$/, ""));
    setMeta("name", "geo.placename", siteConfig.address.addressLocality || undefined);
    setMeta("name", "geo.position", `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`);
    setMeta("name", "ICBM", `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`);
    setLink("canonical", canonical);

    setMeta("property", "og:site_name", siteConfig.name);
    setMeta("property", "og:locale", siteConfig.locale);
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "article:published_time", type === "article" ? publishedTime : undefined);
    setMeta("property", "article:modified_time", type === "article" ? modifiedTime : undefined);
    setMeta("property", "article:author", type === "article" ? siteConfig.founder.name : undefined);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:site", siteConfig.twitterHandle || undefined);
    setMeta("name", "twitter:creator", siteConfig.twitterHandle || undefined);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    document.head.querySelectorAll('script[type="application/ld+json"][data-seo]').forEach((s) => s.remove());
    JSON.parse(schemaJson).forEach((schema) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo", "");
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    });
  }, [fullTitle, description, canonical, ogImage, type, noindex, publishedTime, modifiedTime, schemaJson, keywordList]);

  return null;
}
