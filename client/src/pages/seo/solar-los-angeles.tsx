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
  "Los Angeles is one of the strongest solar markets in the country for a simple reason: sunshine is abundant and electricity is expensive. With roughly 284 sunny days each year, homes across Los Angeles have a real opportunity to offset utility costs with well-designed solar systems. Bernardino Martin installs solar solutions that are planned around roof layout, household usage patterns, future energy goals, and local utility requirements. Whether you live in a single-family home in Westwood, a hillside property near Echo Park, or a larger residence in the San Fernando Valley, we help you understand what solar can realistically deliver for your property.",
  "A successful solar project in Los Angeles involves more than just putting panels on a roof. Proper design, permitting, utility interconnection, and equipment selection all affect long-term performance. Our team helps homeowners navigate system sizing, panel placement, inverter options, and the documentation needed for LADWP or Southern California Edison interconnection. We also explain how net metering and available California incentive programs can influence overall savings. That practical guidance matters because every Los Angeles property has different shade conditions, electrical infrastructure, and consumption habits. We focus on systems that are cleanly installed, easy to maintain, and built for dependable output over time.",
  "Solar ownership in Los Angeles also works best when it is paired with maintenance and broader energy planning. Dust, heat, and aging electrical components can slowly reduce performance if a system is ignored. Bernardino Martin supports Los Angeles homeowners with solar panel installation, system cleaning, inverter troubleshooting, battery-ready planning, and energy efficiency recommendations that improve overall return on investment. For customers who want to go further, we also integrate solar-powered irrigation and other practical efficiency upgrades. The result is a solar system that is not just designed to look good on day one, but to keep delivering value through Southern California summers, changing utility costs, and the day-to-day demands of modern energy use.",
];

const services = [
  "Solar Panel Installation",
  "System Design & Permitting",
  "Utility Interconnection",
  "Solar Maintenance & Cleaning",
  "Inverter Repair",
  "Battery Storage",
  "Solar-Powered Irrigation",
  "Energy Efficiency Consulting",
];

export default function SolarLosAngeles() {
  return (
    <Layout>
      <SEO
        title="Solar Panel Installation in Los Angeles, CA | Bernardino Martin"
        description="Expert solar panel installation in Los Angeles. Custom systems, permit handling, utility interconnection. Free energy audit. Call (818) 400-0227."
      />

      <SeoHero
        badge="Los Angeles Solar"
        title="Solar Panel Installation in Los Angeles, CA"
        description="Custom solar systems for Los Angeles homeowners looking to reduce electric bills and build long-term energy independence."
        imageSrc="/images/services/solar-hero.webp"
        imageAlt="Solar technicians installing rooftop solar panels on a Los Angeles home"
      />

      <SeoIntro paragraphs={introParagraphs} />

      <section className="bg-white">
        <div className="container mx-auto px-4 pb-4">
          <div className="mx-auto max-w-4xl">
            <SeoRelatedLinks
              heading="Explore more services"
              links={[
                { href: "/hvac-los-angeles", label: "HVAC Los Angeles" },
                { href: "/services", label: "All Services" },
              ]}
            />
          </div>
        </div>
      </section>

      <SeoServicesList
        heading="Our Solar Services in Los Angeles"
        items={services}
      />

      <SeoImageGrid
        images={[
          {
            src: "/images/services/solar-installation.webp",
            alt: "Solar panel installation Los Angeles",
            caption: "Solar Installation",
          },
          {
            src: "/images/services/solar-maintenance.webp",
            alt: "Solar system maintenance Los Angeles",
            caption: "Solar Maintenance",
          },
          {
            src: "/images/services/solar-hero.webp",
            alt: "Solar energy system Los Angeles home",
            caption: "Residential Solar Systems",
          },
        ]}
      />

      <SeoWhyChoose heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN" />

      <SeoServiceAreas
        heading="Serving All of Los Angeles"
        areas={losAngelesAreas}
      />

      <SeoCtaBanner
        title="Ready to Book Solar Installation in Los Angeles?"
        description="Call (818) 400-0227 to schedule a free energy conversation or book online to start planning your Los Angeles solar project."
      />
    </Layout>
  );
}
