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
  "Landscaping in Los Angeles should look beautiful, but it also has to make sense for Southern California water conditions, sun exposure, and year-round outdoor use. Homeowners across Los Angeles want spaces that feel welcoming without creating constant maintenance headaches or unnecessary water waste. Bernardino Martin provides landscaping services in Los Angeles that balance curb appeal, practical plant choices, and efficient site planning. From refreshed front yards to full backyard transformations, we design and install outdoor spaces that fit the climate, the property, and the way each family actually uses the space.",
  "Water-wise planning is a major part of landscaping in Los Angeles. With drought conditions, changing restrictions, and a growing focus on conservation, homeowners often need alternatives to traditional high-water designs. We help customers choose drought-tolerant plantings, smart layout strategies, mulch and ground cover, and sod options that are more suitable for local conditions. We also pay close attention to drainage, grade transitions, and how landscapes interact with walkways, retaining walls, and irrigation systems. That kind of planning matters in neighborhoods from Santa Monica and Culver City to the hillsides and Valley communities where sun, runoff, and soil conditions can vary significantly.",
  "Los Angeles landscaping also needs to support lifestyle. Many homeowners want yards that are easier to maintain, more useful for entertaining, and better suited to long outdoor seasons. Bernardino Martin installs sod, planting beds, shrubs, trees, retaining walls, and seasonal landscape improvements with a focus on durability and appearance. We can build around Mediterranean climate plant selection, low-water concepts, and the kinds of practical enhancements that help properties feel finished rather than temporary. Whether you are replacing a tired lawn, upgrading a front yard for better curb appeal, or creating a more functional backyard, our Los Angeles landscaping services are built to improve both beauty and everyday usability.",
];

const services = [
  "Custom Landscape Design",
  "Sod Installation (San Augustine & RTF)",
  "Drought-Tolerant Planting",
  "Tree & Shrub Installation",
  "Retaining Walls",
  "Mulching & Ground Cover",
  "Garden Bed Installation",
  "Seasonal Maintenance",
];

export default function LandscapingLosAngeles() {
  return (
    <Layout>
      <SEO
        title="Landscaping Services in Los Angeles, CA | Bernardino Martin"
        description="Professional landscaping in Los Angeles. Sod installation, drought-tolerant designs, planting & garden care. Free estimate. Call (818) 400-0227."
      />

      <SeoHero
        badge="Los Angeles Landscaping"
        title="Landscaping Services in Los Angeles, CA"
        description="Thoughtful outdoor design and installation for Los Angeles homes that need beauty, durability, and water-wise planning."
        imageSrc="/images/services/landscaping-hero.webp"
        imageAlt="Professional landscaper working in a drought-tolerant Los Angeles front yard"
      />

      <SeoIntro paragraphs={introParagraphs} />

      <section className="bg-white">
        <div className="container mx-auto px-4 pb-4">
          <div className="mx-auto max-w-4xl">
            <SeoRelatedLinks
              heading="Explore related pages"
              links={[
                { href: "/irrigation-los-angeles", label: "Smart Irrigation Los Angeles" },
                { href: "/services", label: "All Services" },
              ]}
            />
          </div>
        </div>
      </section>

      <SeoServicesList
        heading="Our Landscaping Services in Los Angeles"
        items={services}
      />

      <SeoImageGrid
        images={[
          {
            src: "/images/services/landscaping-hero.webp",
            alt: "Landscaping design Los Angeles",
            caption: "Landscape Design",
          },
          {
            src: "/images/services/landscaping-sod.webp",
            alt: "Sod installation Los Angeles",
            caption: "Sod Installation",
          },
          {
            src: "/images/services/landscaping-design.webp",
            alt: "Drought tolerant landscape Los Angeles",
            caption: "Drought-Tolerant Landscapes",
          },
        ]}
      />

      <SeoWhyChoose heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN" />

      <SeoServiceAreas
        heading="Serving All of Los Angeles"
        areas={losAngelesAreas}
      />

      <SeoCtaBanner
        title="Ready to Book Landscaping in Los Angeles?"
        description="Call (818) 400-0227 or book online to schedule a landscaping estimate for your Los Angeles property."
      />
    </Layout>
  );
}
