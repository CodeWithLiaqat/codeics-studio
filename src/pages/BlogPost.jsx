import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import SEO from "../components/seo/SEO";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import MagneticButton from "../components/ui/MagneticButton";
import NotFound from "./NotFound";
import { getPostBySlug, blogData } from "../data/blogData";
import { siteConfig } from "../data/siteConfig";
import { buildBreadcrumbs, buildArticle } from "../lib/schema";

const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

function Block({ b }) {
  switch (b.type) {
    case "h2": return <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{b.text}</h2>;
    case "h3": return <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-zinc-100">{b.text}</h3>;
    case "ul": return <ul className="my-5 flex flex-col gap-2.5 pl-5 text-zinc-300 marker:text-emerald-500 list-disc">{b.items.map((it) => <li key={it} className="leading-relaxed">{it}</li>)}</ul>;
    case "code": return (
      <pre className="my-6 overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#0b0b0f] p-5 text-[13px] leading-relaxed text-zinc-200" data-lang={b.lang}><code>{b.text}</code></pre>
    );
    default: return <p className="my-5 text-pretty text-lg leading-[1.75] text-zinc-300">{b.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <NotFound />;

  const crumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }];
  const more = blogData.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      <SEO title={post.seo.title} description={post.seo.description} path={`/blog/${post.slug}`} image={post.cover.src} type="article" publishedTime={post.publishedAt} modifiedTime={post.updatedAt} schemas={[buildBreadcrumbs(crumbs), buildArticle(post)]} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-8 lg:py-16">
        <header className="flex flex-col gap-6">
          <Breadcrumbs items={crumbs} />
          <p className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="text-emerald-400">{post.category}</span>
            <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{post.readingTime} min read</span>
          </p>
          <h1 className="font-display text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">{post.title}</h1>
          <p className="text-pretty text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>
          <address className="flex items-center gap-3 not-italic">
            <span className="h-9 w-9 rounded-full border border-emerald-500/30 bg-emerald-500/10" aria-hidden="true" />
            <span className="text-sm"><span className="text-zinc-100">{post.author.name}</span><span className="text-zinc-500"> · {post.author.title}</span></span>
          </address>
          <figure className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0b0f]">
            <div className="relative w-full" style={{ aspectRatio: `${post.cover.width} / ${post.cover.height}` }}>
              <img src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height} loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </figure>
        </header>

        <div className="mt-6">{post.body.map((b, i) => <Block key={i} b={b} />)}</div>

        <footer className="mt-14 flex flex-col gap-8 border-t border-white/[0.07] pt-8">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.map((t) => <li key={t} className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[11px] tracking-wide text-zinc-400">{t}</li>)}
          </ul>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/[0.07] bg-[#0b0b0f] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-300">Need this applied to your product? {siteConfig.founder.name.split(" ")[0]} replies {siteConfig.contact.responseTime.toLowerCase()}.</p>
            <MagneticButton to="/contact#intake-form">Start a project</MagneticButton>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All articles</Link>
        </footer>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="border-t border-white/[0.07]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8">
            <h2 id="more-heading" className="font-display text-2xl font-semibold tracking-tight text-zinc-50">Keep reading</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {more.map((p) => (
                <li key={p.id}>
                  <Link to={`/blog/${p.slug}`} className="group flex h-full flex-col gap-2 rounded-2xl border border-white/[0.07] bg-[#0b0b0f] p-5 transition-colors hover:border-emerald-500/40">
                    <span className="text-xs text-emerald-400">{p.category}</span>
                    <span className="font-display text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-emerald-300">{p.title}</span>
                    <span className="text-sm text-zinc-500">{p.readingTime} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
