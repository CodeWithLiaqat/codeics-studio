import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import SEO from "../components/seo/SEO";
import PageHeader from "../components/layout/PageHeader";
import { blogData } from "../data/blogData";
import { buildBreadcrumbs } from "../lib/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }];
const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export default function Blog() {
  const posts = [...blogData].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  return (
    <>
      <SEO title="Blog" description="Engineering notes on WebGL performance, AI web apps and Core Web Vitals from the Codeics studio." path="/blog" schemas={[buildBreadcrumbs(crumbs)]} />
      <PageHeader eyebrow="Blog" title="Engineering notes from the studio." description="How we ship 3D, AI and performance work that holds up in production." crumbs={crumbs} />
      <section aria-label="Articles" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <ul className="grid gap-6 lg:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0b0f] transition-colors hover:border-emerald-500/40">
                <Link to={`/blog/${post.slug}`} aria-label={post.title} className="relative block" style={{ aspectRatio: `${post.cover.width} / ${post.cover.height}` }}>
                  <img src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height} loading={i === 0 ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]" />
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="text-emerald-400">{post.category}</span>
                    <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time>
                    <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{post.readingTime} min</span>
                  </p>
                  <h2 className="font-display text-balance text-xl font-semibold tracking-tight text-zinc-50">
                    <Link to={`/blog/${post.slug}`} className="transition-colors group-hover:text-emerald-300">{post.title}</Link>
                  </h2>
                  <p className="text-pretty text-sm leading-relaxed text-zinc-400">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-zinc-300 hover:text-emerald-400">Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
