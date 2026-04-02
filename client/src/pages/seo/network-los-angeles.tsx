import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import {
  SeoCtaBanner,
  SeoHero,
  SeoIntro,
  SeoRelatedLinks,
  SeoServiceAreas,
  SeoServicesList,
  SeoWhyChoose,
  losAngelesAreas,
} from "./shared";

const introParagraphs: [string, string, string] = [
  "Reliable home networking matters more than ever in Los Angeles. Remote work, streaming, security systems, smart lighting, app-controlled HVAC, and voice assistants all depend on stable connections throughout the house. Bernardino Martin provides network and smart home installation in Los Angeles for homeowners and businesses that want stronger coverage, cleaner wiring, and systems that are easier to manage. Instead of patchwork solutions and visible cables, we build organized infrastructure that supports home offices, entertainment spaces, security devices, and modern connected living.",
  "Los Angeles properties often have networking challenges that are easy to underestimate. Older homes may have thick walls, limited access paths, or layouts that make WiFi coverage inconsistent from room to room. Larger homes and mixed-use spaces can struggle with dead zones, weak backhaul, or poor device placement. At the same time, fiber internet expansion across Los Angeles County has created more opportunities for higher-speed service, but many homes still need interior cabling and equipment setup to take full advantage of it. We help customers with structured network cabling, Cat6 and fiber runs, router and switch configuration, whole-home WiFi planning, and clean installation methods that match the look and function of the property.",
  "Smart home adoption in Los Angeles continues to grow because homeowners want comfort, convenience, and better control over daily routines. Bernardino Martin installs network panels, device wiring, security camera cabling, and smart home integrations that work together instead of competing for bandwidth or creating clutter. We also support practical home office setups for customers who need dependable video calls, better wired connections, and more stable internet performance. Whether you are upgrading a residence in Los Angeles, wiring a business space, or organizing a full smart home ecosystem, our goal is to create a network environment that feels fast, dependable, and professionally finished.",
];

const services = [
  "Structured Network Cabling",
  "Cat6 & Fiber Installation",
  "Router & Switch Configuration",
  "Whole-Home WiFi",
  "Smart Home Integration",
  "Security Camera Wiring",
  "Voice Assistant Setup",
  "Network Panel Installation",
];

export default function NetworkLosAngeles() {
  return (
    <Layout>
      <SEO
        title="Network Installation in Los Angeles, CA | Bernardino Martin"
        description="Professional network cabling, fiber internet, smart home setup in Los Angeles. Homes & businesses. Clean install. Call (818) 400-0227."
      />

      <SeoHero
        badge="Los Angeles Network"
        title="Network & Smart Home Installation in Los Angeles, CA"
        description="Professional cabling, WiFi planning, and smart home setup for Los Angeles homes and businesses that need reliable connectivity."
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
        heading="Our Network & Smart Home Services in Los Angeles"
        items={services}
      />

      <SeoWhyChoose heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN" />

      <SeoServiceAreas
        heading="Serving All of Los Angeles"
        areas={losAngelesAreas}
      />

      <SeoCtaBanner
        title="Ready to Book Network Installation in Los Angeles?"
        description="Call (818) 400-0227 or book online for structured cabling, WiFi upgrades, and smart home installation across Los Angeles."
      />
    </Layout>
  );
}
