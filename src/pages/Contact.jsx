import { useSearchParams } from "react-router-dom";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import SEO from "../components/seo/SEO";
import PageHeader from "../components/layout/PageHeader";
import LeadForm from "../components/forms/LeadForm";
import { siteConfig } from "../data/siteConfig";
import { buildBreadcrumbs, buildProfessionalService } from "../lib/schema";

const crumbs = [{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }];

export default function Contact() {
  const [params] = useSearchParams();
  const preset = params.get("service") ?? "";
  const a = siteConfig.address;
  const nap = [a.streetAddress, a.addressLocality, a.postalCode, a.addressCountry === "PK" ? "Pakistan" : a.addressCountry].filter(Boolean).join(", ");

  return (
    <>
      <SEO 
        title="Contact" 
        description={`Start a project with Codeics. Email ${siteConfig.contact.email} or send a brief; replies ${siteConfig.contact.responseTime.toLowerCase()}.`} 
        path="/contact" 
        schemas={[buildBreadcrumbs(crumbs), buildProfessionalService()]} 
      />
      <PageHeader 
        eyebrow="Contact" 
        title="Tell us what you're building." 
        description={`Custom scopes from ${siteConfig.priceRange}. Every brief is read personally by ${siteConfig.founder.name}.`} 
        crumbs={crumbs} 
      />

      <section 
        aria-label="Contact details and project brief" 
        className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-8 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] lg:py-24"
      >
        <aside 
          aria-label="Studio direct contact details"
          className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start"
        >
          <address className="flex flex-col gap-6 not-italic">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Founder</p>
              <p className="mt-2 text-lg font-semibold text-zinc-50">{siteConfig.founder.name}</p>
              <p className="text-sm text-zinc-400">{siteConfig.founder.title}</p>
            </div>
            
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-3.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span className="flex flex-col">
                  <a 
                    href={`mailto:${siteConfig.contact.email}`} 
                    className="inline-flex min-h-[44px] items-center text-zinc-200 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
                  >
                    {siteConfig.contact.email}
                  </a>
                  {siteConfig.contact.secondaryEmail && (
                    <a 
                      href={`mailto:${siteConfig.contact.secondaryEmail}`} 
                      className="inline-flex min-h-[44px] items-center text-zinc-400 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
                    >
                      {siteConfig.contact.secondaryEmail}
                    </a>
                  )}
                </span>
              </li>

              {siteConfig.contact.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <a 
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} 
                    className="inline-flex min-h-[44px] items-center text-zinc-200 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
              )}

              {siteConfig.contact.whatsapp && (
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <a 
                    href={siteConfig.contact.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex min-h-[44px] items-center text-zinc-200 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
                  >
                    Chat on WhatsApp
                  </a>
                </li>
              )}

              <li className="flex items-start gap-3 pt-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span className="text-zinc-300">
                  {nap}
                  <span className="block text-zinc-500">
                    Serving clients {siteConfig.areaServed.join(", ").toLowerCase()}
                  </span>
                </span>
              </li>

              <li className="flex items-start gap-3 pt-1">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                <span className="text-zinc-300">
                  {siteConfig.contact.availability}
                  <span className="block text-zinc-500">
                    Replies {siteConfig.contact.responseTime.toLowerCase()}
                  </span>
                </span>
              </li>
            </ul>
          </address>

          <ul className="flex flex-wrap gap-2 text-sm" aria-label="Social channels">
            {Object.entries(siteConfig.social).map(([k, href]) => (
              <li key={k}>
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer me" 
                  className="inline-flex min-h-[44px] items-center px-2 capitalize text-zinc-400 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
                >
                  {k}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <LeadForm key={preset} source="contact" heading="Project brief" presetService={preset} />
      </section>
    </>
  );
}