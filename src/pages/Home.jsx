import SEO from "../components/seo/SEO";
import Hero from "../components/sections/Hero";
import BentoCapabilities from "../components/sections/BentoCapabilities";
import CaseStudies from "../components/sections/CaseStudies";
import FAQ from "../components/sections/FAQ";
import LeadForm from "../components/forms/LeadForm";
import { siteConfig } from "../data/siteConfig";
import { globalSchemas, buildFAQPage } from "../lib/schema";

export default function Home() {
  return (
    <>
      <SEO path="/" schemas={[...globalSchemas(), buildFAQPage()]} />
      <Hero />
      <BentoCapabilities />
      <CaseStudies />
      <FAQ />
      <section id="contact" aria-labelledby="home-contact-heading" className="scroll-mt-24 border-t border-stroke">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-8 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">Start a project</p>
            <h2 id="home-contact-heading" className="font-display text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">Two minutes to brief us. {siteConfig.contact.responseTime} to hear back.</h2>
            <p className="text-pretty leading-relaxed text-zinc-400">Custom scopes from {siteConfig.priceRange}. Every enquiry is read by {siteConfig.founder.name}.</p>
          </div>
          <LeadForm source="home" heading="Tell us about the project" />
        </div>
      </section>
    </>
  );
}
