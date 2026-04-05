import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import {
  SeoCtaBanner,
  SeoHero,
  SeoImageGrid,
  SeoIntro,
  SeoRelatedLinks,
  SeoServiceAreas,
  SeoServicesList,
  SeoWhyChoose,
  losAngelesAreas,
} from "./shared";

const introParagraphs: [string, string, string] = [
  "Electrical work in Los Angeles often means balancing older housing stock with modern power demands. Many homes across Los Angeles still rely on aging panels, undersized circuits, or wiring layouts that were never designed for today’s appliances, office equipment, and smart home devices. Bernardino Martin provides electrical services in Los Angeles for homeowners who need safe upgrades, dependable troubleshooting, and clean installations that support how they actually use their homes. Whether you are planning a panel upgrade, adding recessed lighting, or preparing for an EV charger, we focus on code-compliant work that improves safety and reliability without unnecessary disruption.",
  "The rise of electric vehicles, home automation, and higher-capacity HVAC systems has made electrical planning more important throughout Los Angeles. A property in Mid-Wilshire, Brentwood, or the San Fernando Valley may look ready for new equipment on the surface, but hidden limitations inside the electrical system can create safety risks or performance problems. We help customers evaluate breaker capacity, grounding, circuit layout, and compatibility with California requirements before new equipment is installed. That same practical approach extends to rewiring work, smart home integration, GFCI and AFCI protection, and corrective work for older outlets or lighting systems that are no longer performing the way they should.",
  "For Los Angeles homeowners, quality electrical service should feel organized, clear, and trustworthy. Bernardino Martin handles electrical projects with a strong emphasis on communication, clean workmanship, and realistic recommendations. We work in older homes with outdated wiring, newer remodels that need better load planning, and properties preparing for long-term upgrades like EV charging or automated controls. The goal is not just to fix a single issue today, but to leave your electrical system in better shape for the future. From safety inspections to panel improvements and smart wiring upgrades, our Los Angeles electrical services are built around comfort, efficiency, and peace of mind.",
];

const services = [
  "Electrical Panel Upgrades",
  "Circuit Breaker Service",
  "EV Charger Installation",
  "Home Rewiring",
  "Recessed Lighting",
  "GFCI & AFCI Protection",
  "Smart Home Wiring",
  "Safety Inspections",
];

export default function ElectricalLosAngeles() {
  return (
    <Layout>
      <SEO
        title="Electrical Services in Los Angeles, CA | Bernardino Martin"
        description="Licensed electricians in Los Angeles for panel upgrades, EV charger installation, home rewiring & more. Safe, code-compliant work. Call (818) 400-0227."
      />

      <SeoHero
        badge="Los Angeles Electrical"
        title="Electrical Services in Los Angeles, CA"
        description="Safe, code-conscious electrical upgrades and repairs for Los Angeles homes that need more capacity, better protection, and modern wiring."
        imageSrc="/images/services/electrical-hero.png"
        imageAlt="Licensed electrician working on a residential electrical panel in Los Angeles"
      />

      <SeoIntro paragraphs={introParagraphs} />

      <section className="bg-white">
        <div className="container mx-auto px-4 pb-4">
          <div className="mx-auto max-w-4xl">
            <SeoRelatedLinks
              heading="Explore related pages"
              links={[
                { href: "/hvac-los-angeles", label: "HVAC Los Angeles" },
                { href: "/services", label: "All Services" },
              ]}
            />
          </div>
        </div>
      </section>

      <SeoServicesList
        heading="Our Electrical Services in Los Angeles"
        items={services}
      />

      <SeoImageGrid
        images={[
          {
            src: "/images/services/electrical-hero.png",
            alt: "Licensed electrician Los Angeles",
            caption: "Electrical Service",
          },
          {
            src: "/images/services/electrical-hero.png",
            alt: "Electrical panel service Los Angeles",
            caption: "Panel Upgrades",
          },
          {
            src: "/images/services/electrical-ev-charger.png",
            alt: "EV charger installation Los Angeles",
            caption: "EV Charger Installation",
          },
        ]}
      />

      <SeoWhyChoose heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN" />

      <SeoServiceAreas
        heading="Serving All of Los Angeles"
        areas={losAngelesAreas}
      />

      <SeoCtaBanner
        title="Ready to Book Electrical Service in Los Angeles?"
        description="Call (818) 400-0227 or book online for panel work, rewiring, lighting upgrades, and electrical troubleshooting throughout Los Angeles."
      />
    </Layout>
  );
}
