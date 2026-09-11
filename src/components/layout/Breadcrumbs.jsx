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
      <nav aria-label="Breadcrumbs" className={`text-xs tracking-wide text-zinc-400 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={`${c.href}-${i}`} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-zinc-200 py-1">
                    {c.label}
                  </span>
                ) : (
                  <Link
                    to={c.href}
                    className="inline-flex items-center py-1 text-zinc-400 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:text-emerald-400"
                  >
                    {c.label}
                  </Link>
                )}
                {!last && (
                  <ChevronRight
                    className="h-3 w-3 shrink-0 text-zinc-400"
                    aria-hidden="true"
                    focusable="false"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}