import { Link } from "react-router-dom";
import { Github, Linkedin, Facebook, Mail, Phone, MessageCircle } from "lucide-react";
import { siteConfig, navigation } from "../../data/siteConfig";
import AuroraGlow from "../ui/AuroraGlow";

const socialIcons = { github: Github, linkedin: Linkedin, facebook: Facebook };
const socialLabels = { github: "GitHub", linkedin: "LinkedIn", facebook: "Facebook" };

export default function Footer() {
  const year = new Date().getFullYear();
  const { address } = siteConfig;
  const hasAddress = Boolean(address.streetAddress || address.addressLocality);

  return (
    <footer className="relative isolate overflow-hidden border-t border-stroke bg-obsidian">
      <AuroraGlow position="bottom" strength={0.7} />
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="font-display text-lg font-semibold tracking-tight text-zinc-50">{siteConfig.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">{siteConfig.description}</p>

            <address className="break-words not-italic text-sm leading-relaxed text-zinc-400">
              <p className="text-zinc-200">{siteConfig.founder.name}</p>
              <p>{siteConfig.founder.title}</p>
              {hasAddress && (
                <p>
                  {[address.streetAddress, address.addressLocality, address.addressRegion, address.postalCode].filter(Boolean).join(", ")}
                </p>
              )}
              <a href={`mailto:${siteConfig.contact.email}`} className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-zinc-300 transition-colors hover:text-emerald-400">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
              {siteConfig.contact.secondaryEmail && (
                <a href={`mailto:${siteConfig.contact.secondaryEmail}`} className="block text-zinc-300 transition-colors hover:text-emerald-400">{siteConfig.contact.secondaryEmail}</a>
              )}
              {siteConfig.contact.phone && (
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="mt-1 inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-emerald-400">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              )}
              {siteConfig.contact.whatsapp && (
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-zinc-300 transition-colors hover:text-emerald-400">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              )}
            </address>

            <ul className="flex items-center gap-2" aria-label="Social channels">
              {Object.entries(siteConfig.social).map(([key, href]) => {
                const Icon = socialIcons[key];
                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={socialLabels[key]}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.07] bg-[#0b0b0f] text-zinc-400 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {navigation.footer.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{group.heading}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="inline-flex min-h-[36px] items-center text-sm text-zinc-300 transition-colors hover:text-emerald-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.07] pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="inline-flex items-center gap-2" role="status">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {siteConfig.contact.availability} · Replies {siteConfig.contact.responseTime.toLowerCase()}
            </p>
            <p>Serving {siteConfig.areaServed.join(", ").toLowerCase()} · {siteConfig.priceRange}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
