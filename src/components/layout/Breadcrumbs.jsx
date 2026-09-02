import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import SEO from "../seo/SEO";
import { buildBreadcrumbs } from "../../lib/schema";

/**
 * items: [{ label, href }] — first item is Home, last is the current page.
 * Renders semantic nav + emits BreadcrumbList JSON-LD. When `withSchema` is false the
 * parent page is expected to pass buildBreadcrumbs(items) into its own <SEO schemas>.
 */
export default function Breadcrumbs({ items, withSchema = false, className = "" }) {
  if (!items || items.length < 2) return null;
  return (
    <>
      {withSchema && <SEO schemas={[buildBreadcrumbs(items)]} />}
      <nav aria-label="Breadcrumb" className={`text-xs tracking-wide text-zinc-500 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-zinc-300">{c.label}</span>
                ) : (
                  <Link to={c.href} className="transition-colors hover:text-emerald-400">{c.label}</Link>
                )}
                {!last && <ChevronRight className="h-3 w-3 text-zinc-600" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
