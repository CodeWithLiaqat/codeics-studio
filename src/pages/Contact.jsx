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
      <SEO title="Contact" description={`Start a project with Codeics. Email ${siteConfig.contact.email} or send a brief; replies ${siteConfig.contact.responseTime.toLowerCase()}.`} path="/contact" schemas={[buildBreadcrumbs(crumbs), buildProfessionalService()]} />
      <PageHeader eyebrow="Contact" title="Tell us what you're building." description={`Custom scopes from ${siteConfig.priceRange}. Every brief is read personally by ${siteConfig.founder.name}.`} crumbs={crumbs} />

      <section aria-label="Contact details and project brief" className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-8 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
        <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <address className="flex flex-col gap-6 not-italic">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Founder</p>
              <p className="mt-2 text-lg text-zinc-50">{siteConfig.founder.name}</p>
              <p className="text-sm text-zinc-400">{siteConfig.founder.title}</p>
            </div>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-zinc-200 hover:text-emerald-400">{siteConfig.contact.email}</a>
                  {siteConfig.contact.secondaryEmail && <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="text-zinc-400 hover:text-emerald-400">{siteConfig.contact.secondaryEmail}</a>}
                </span>
              </li>
              {siteConfig.contact.phone && (
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-zinc-200 hover:text-emerald-400">{siteConfig.contact.phone}</a>
                </li>
              )}
              {siteConfig.contact.whatsapp && (
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden="true" />
                  <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-400">Chat on WhatsApp</a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span className="text-zinc-300">{nap}<span className="block text-zinc-500">Serving clients {siteConfig.areaServed.join(", ").toLowerCase()}</span></span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span className="text-zinc-300">{siteConfig.contact.availability}<span className="block text-zinc-500">Replies {siteConfig.contact.responseTime.toLowerCase()}</span></span>
              </li>
            </ul>
          </address>
          <ul className="flex gap-4 text-sm" aria-label="Social channels">
            {Object.entries(siteConfig.social).map(([k, href]) => (
              <li key={k}><a href={href} target="_blank" rel="noopener noreferrer me" className="capitalize text-zinc-400 hover:text-emerald-400">{k}</a></li>
            ))}
          </ul>
        </aside>

        <LeadForm key={preset} source="contact" heading="Project brief" presetService={preset} />
      </section>
    </>
  );
}
