import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import {
  CityHero,
  CityProblems,
  SeoCtaBanner,
  SeoFeatureImage,
  SeoImageGrid,
  SeoIntro,
  SeoRelatedLinks,
  SeoWhyChoose,
} from "./shared";
import { Clock, Phone, Shield, Star } from "lucide-react";

const introParagraphs: [string, string, string] = [
  "Glendale is a city with a wide range of HVAC needs because it stretches from busy urban corridors to quieter hillside neighborhoods near the Verdugo foothills. Bernardino Martin provides HVAC services in Glendale for apartments, townhomes, and single-family houses that need better cooling, heating, and indoor air performance. Areas like Adams Hill, Montecito Park, Glenoaks Canyon, and Sparr Heights can all present different system challenges based on elevation, exposure, age of construction, and how the home was originally designed. Glendale also experiences strong seasonal swings in air quality and wind conditions, which can make ventilation and filtration just as important as temperature control.",
  "Many Glendale properties reflect a mix of older apartment buildings, established homes, and hillside residences with more complex layouts. Shared systems, hard-to-access duct runs, and retrofitted additions can all affect how evenly a home cools and heats. We often see homeowners in Glendale dealing with weak airflow, hot upper levels, aging equipment, and systems that struggle during Santa Ana conditions when outside air becomes hotter, drier, and dustier. Bernardino Martin approaches HVAC service with attention to both equipment condition and property layout, helping Glendale customers identify the real source of discomfort instead of guessing at quick fixes.",
  "Glendale's location between downtown Los Angeles and the San Gabriel foothills means homeowners need systems that can handle both everyday demand and periods of more extreme weather. Reliable air conditioning is essential in summer, but good filtration and properly maintained equipment also matter during windy, dusty periods that affect indoor comfort. Bernardino Martin services all major brands and helps Glendale customers with repairs, maintenance, upgrades, and replacement planning that fit the home rather than forcing a generic solution. Whether you live in a hillside property, a classic neighborhood home, or a multi-unit building environment, our Glendale HVAC work is designed to improve comfort, reliability, and efficiency for the long term.",
];

const problems = [
  {
    title: "Challenging duct routing in hillside homes",
    description:
      "Glendale hillside properties often have layouts that make airflow balancing harder, especially when older duct systems were adapted instead of redesigned.",
  },
  {
    title: "Shared HVAC issues in older apartment buildings",
    description:
      "Multi-unit properties in Glendale can have aging equipment and distribution problems that lead to uneven comfort and inconsistent maintenance history.",
  },
  {
    title: "Air quality stress during Santa Ana winds",
    description:
      "Hot, dry wind events can bring dust and outdoor pollutants into Glendale homes, making filtration, sealing, and maintenance more important.",
  },
  {
    title: "Heat buildup in upper-floor and west-facing rooms",
    description:
      "Glendale homes with strong afternoon sun exposure often develop persistent hot zones that point to airflow, insulation, or equipment sizing issues.",
  },
];

export default function HvacGlendale() {
  return (
    <Layout>
      <SEO
        title="HVAC Services in Glendale, CA | Bernardino Martin"
        description="Professional HVAC repair & installation in Glendale, CA. Fast same-day service for all makes & models. Call (818) 400-0227."
      />

      <CityHero
        city="Glendale"
        badge="Glendale HVAC"
        title="HVAC Services in Glendale, CA"
        description="Repair, installation, and maintenance for Glendale homes dealing with foothill conditions, older systems, and demanding summer heat."
        imageSrc="/images/services/hvac-glendale-hero.webp"
        imageAlt="HVAC technician servicing an AC unit at a hillside home in Glendale California"
      />

      <SeoIntro paragraphs={introParagraphs} />

      <SeoFeatureImage
        src="/images/cities/glendale-city.png"
        alt="Glendale California Verdugo Mountains HVAC service"
      />

      <SeoImageGrid
        heading="Glendale HVAC Services"
        columns={2}
        images={[
          {
            src: "/images/services/hvac-repair.webp",
            alt: "HVAC repair in Glendale CA",
            caption: "HVAC Repair",
          },
          {
            src: "/images/services/hvac-ductless.webp",
            alt: "Ductless mini-split installation Glendale CA",
            caption: "Ductless Mini-Split",
          },
        ]}
      />

      <CityProblems city="Glendale" problems={problems} />

      <SeoWhyChoose
        heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN"
        items={[
          {
            icon: Shield,
            title: "Licensed & Insured",
            description:
              "We bring careful, professional HVAC workmanship to Glendale homes of all ages and layouts.",
          },
          {
            icon: Clock,
            title: "Same-Day Service",
            description:
              "Fast response helps Glendale homeowners restore comfort before heat or poor airflow turns into a bigger problem.",
          },
          {
            icon: Star,
            title: "All Brands Serviced",
            description:
              "We work on major residential HVAC brands commonly installed throughout Glendale and nearby communities.",
          },
          {
            icon: Phone,
            title: "Glendale-Focused Recommendations",
            description:
              "From hillside airflow issues to apartment system problems, we tailor solutions to real Glendale conditions.",
          },
        ]}
      />

      <section className="bg-white">
        <div className="container mx-auto px-4 pb-12">
          <div className="mx-auto max-w-4xl">
            <SeoRelatedLinks
              heading="Related local page"
              links={[
                {
                  href: "/hvac-los-angeles",
                  label: "HVAC services throughout Los Angeles",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <SeoCtaBanner
        title="Book HVAC Service in Glendale Today"
        description="Call (818) 400-0227 or book online for HVAC repair, installation, and maintenance in Glendale."
      />
    </Layout>
  );
}
