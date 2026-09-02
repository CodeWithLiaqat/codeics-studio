import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "../components/seo/SEO";
import { navigation } from "../data/siteConfig";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="The page you requested does not exist." path="/404" noindex />
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-6 px-4 py-24 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">404</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">This page does not exist.</h1>
        <p className="max-w-md text-zinc-400">The link may be outdated or the address mistyped. The rest of the studio is still here.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-medium text-[#050505] hover:bg-emerald-400">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back home
          </Link>
          {navigation.primary.filter((n) => !n.href.includes("#")).map((n) => (
            <Link key={n.href} to={n.href} className="rounded-full border border-white/[0.07] bg-[#0b0b0f] px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50">
              {n.label}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
