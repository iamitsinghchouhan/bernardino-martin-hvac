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
  "Smart irrigation has become one of the most practical upgrades a Los Angeles homeowner can make. Water costs, seasonal restrictions, and the realities of Southern California heat all make manual watering harder to manage efficiently. Bernardino Martin installs smart irrigation systems in Los Angeles that give homeowners better control over schedules, runoff, and system performance. Instead of relying on guesswork, you can manage watering based on zones, weather patterns, and property needs while protecting landscaping investments and avoiding unnecessary waste. That matters whether you are maintaining a front lawn, a planted yard, a garden bed, or a mixed outdoor space that needs different watering patterns in different areas.",
  "Los Angeles properties often need irrigation systems that do more than simply turn sprinklers on and off. Sloped lots, full-sun exposures, drought-tolerant plantings, and year-round growing conditions all require more precise planning. We help customers throughout Los Angeles choose smart controllers, app-based scheduling, shutoff protection, drip systems, sprinkler zones, and solar-powered irrigation options that match the property. We also consider how water pricing tiers from LADWP and broader conservation goals affect long-term use. A well-designed smart irrigation system can reduce waste, support healthier plant material, and make maintenance much easier for homeowners who do not want to spend every week adjusting timers manually.",
  "There is also a protection and savings side to smart irrigation in Los Angeles. Dry conditions, fire season concerns, and hidden leaks can all increase the importance of system monitoring and automatic shutoff technology. Bernardino Martin installs smart valves and monitoring features that help homeowners reduce the risk of damage, track usage, and potentially support insurance-related savings where applicable. We build irrigation systems that work with landscaping instead of fighting it, and we keep the technology approachable for everyday use. If you want a Los Angeles irrigation setup that is efficient, modern, and easier to manage from your phone, our team can design and install a system that fits your property and priorities.",
];

const services = [
  "Smart Irrigation Installation",
  "App-Controlled Scheduling",
  "Smart Shutoff Valve",
  "Drip Irrigation Systems",
  "Sprinkler Installation",
  "Solar-Powered Irrigation",
  "Water Usage Monitoring",
  "Insurance Discount Systems",
];

export default function IrrigationLosAngeles() {
  return (
    <Layout>
      <SEO
        title="Smart Irrigation Systems in Los Angeles, CA | Bernardino Martin"
        description="App-controlled smart irrigation systems in Los Angeles. Save water, reduce bills, protect your home. Insurance discounts up to 40%. Call (818) 400-0227."
      />

      <SeoHero
        badge="Los Angeles Irrigation"
        title="Smart Irrigation Systems in Los Angeles, CA"
        description="Water-saving, app-controlled irrigation systems built for Los Angeles landscapes, dry seasons, and year-round property care."
        imageSrc="/images/services/irrigation-hero.png"
        imageAlt="Smart irrigation system watering a Los Angeles lawn with app control"
      />

      <SeoIntro paragraphs={introParagraphs} />

      <section className="bg-white">
        <div className="container mx-auto px-4 pb-4">
          <div className="mx-auto max-w-4xl">
            <SeoRelatedLinks
              heading="Explore related pages"
              links={[
                { href: "/landscaping-los-angeles", label: "Landscaping Los Angeles" },
                { href: "/services", label: "All Services" },
              ]}
            />
          </div>
        </div>
      </section>

      <SeoServicesList
        heading="Our Smart Irrigation Services in Los Angeles"
        items={services}
      />

      <SeoImageGrid
        images={[
          {
            src: "/images/services/irrigation-hero.png",
            alt: "Smart irrigation system Los Angeles",
            caption: "Smart Irrigation Systems",
          },
          {
            src: "/images/services/irrigation-install.png",
            alt: "Irrigation installation Los Angeles",
            caption: "Irrigation Installation",
          },
          {
            src: "/images/services/irrigation-app.png",
            alt: "Smart irrigation app control Los Angeles",
            caption: "App-Controlled Watering",
          },
        ]}
      />

      <SeoWhyChoose heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN" />

      <SeoServiceAreas
        heading="Serving All of Los Angeles"
        areas={losAngelesAreas}
      />

      <SeoCtaBanner
        title="Ready to Book Smart Irrigation in Los Angeles?"
        description="Call (818) 400-0227 or book online to install a more efficient irrigation system for your Los Angeles home."
      />
    </Layout>
  );
}
