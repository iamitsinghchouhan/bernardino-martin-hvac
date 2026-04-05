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
  "Plumbing service in Los Angeles often starts with the age of the home. Many neighborhoods across Los Angeles still have older pipe systems, aging shutoff valves, and fixtures that were never designed for today’s water quality or usage patterns. In areas with mid-century homes and older duplexes, galvanized lines, hidden leaks, and inconsistent water pressure are common. Bernardino Martin provides plumbing services in Los Angeles that focus on practical repairs, water-saving upgrades, and whole-home protection. We help homeowners handle everything from leaking pipes and fixture replacements to filtration systems and smart shutoff technology designed to prevent major damage.",
  "Southern California water conditions create their own challenges. Hard water can leave buildup inside fixtures, affect appliances, and shorten the life of plumbing components over time. At the same time, Los Angeles homeowners are more aware than ever of drought conditions and the need to reduce waste without sacrificing comfort. That is why we offer water filtration, reverse osmosis systems, soft water installation, smart jet cleanup solutions, and leak detection that helps identify issues before they become expensive emergencies. Whether the concern is older infrastructure in a classic Los Angeles home or a modern property that needs better water quality management, we tailor our recommendations to the way the property is used.",
  "Our plumbing work in Los Angeles is designed around reliability, cleanliness, and long-term value. We repair and install piping, upgrade fixtures, address water heater concerns, and add modern smart devices that help protect homes from hidden leaks and sewer-related problems. For customers who want more control, Bernardino Martin also installs smart shutoff valves and monitoring systems that support better maintenance and can even help with insurance-related savings. With so many Los Angeles homes blending older construction with newer technology, homeowners need plumbing professionals who understand both sides of that equation. We provide that local experience while keeping the process straightforward, respectful, and focused on solutions that make sense for your home.",
];

const services = [
  "Pipe Installation & Repair",
  "Water Heater Service",
  "Reverse Osmosis & Water Filtration",
  "Soft Water Installation",
  "SMART SHUTOFF VALVE Installation",
  "SMART JET CLEANUP System",
  "Fixture Upgrades",
  "Leak Detection",
];

export default function PlumbingLosAngeles() {
  return (
    <Layout>
      <SEO
        title="Plumbing Services in Los Angeles, CA | Bernardino Martin"
        description="Full-service residential plumbing in Los Angeles. Pipe repair, water filtration, smart shutoff valves, drain cleaning. Call (818) 400-0227."
      />

      <SeoHero
        badge="Los Angeles Plumbing"
        title="Plumbing Services in Los Angeles, CA"
        description="Residential plumbing repair and upgrades for Los Angeles homes dealing with aging pipes, hard water, leaks, and efficiency concerns."
        imageSrc="/images/services/plumbing-hero.webp"
        imageAlt="Professional plumber working under a kitchen sink in a Los Angeles home"
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
        heading="Our Plumbing Services in Los Angeles"
        items={services}
      />

      <SeoImageGrid
        images={[
          {
            src: "/images/services/plumbing-hero.webp",
            alt: "Plumber Los Angeles residential",
            caption: "Residential Plumbing",
          },
          {
            src: "/images/services/plumbing-pipes.webp",
            alt: "Copper pipe installation Los Angeles",
            caption: "Pipe Installation",
          },
          {
            src: "/images/services/plumbing-shutoff.webp",
            alt: "Smart water shutoff valve Los Angeles",
            caption: "Smart Shutoff Protection",
          },
        ]}
      />

      <SeoWhyChoose heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN" />

      <SeoServiceAreas
        heading="Serving All of Los Angeles"
        areas={losAngelesAreas}
      />

      <SeoCtaBanner
        title="Ready to Book Plumbing Service in Los Angeles?"
        description="Call (818) 400-0227 or book online for leak repair, pipe work, water quality upgrades, and smart plumbing solutions in Los Angeles."
      />
    </Layout>
  );
}
