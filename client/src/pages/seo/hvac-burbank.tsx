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
  "Burbank is one of the most heat-sensitive HVAC markets in the region because it sits in the eastern San Fernando Valley, where summer temperatures regularly rise into the 95 to 105 degree range. Homes near Magnolia Park, Toluca Lake, and Burbank Hills often rely on cooling systems that work hard for long stretches, especially during heat waves. Bernardino Martin provides HVAC services in Burbank for homeowners who need dependable repair, replacement, and tune-up work that accounts for local weather and older housing stock. Many properties in Burbank were built between the 1940s and 1960s, which means they may still have aging ductwork, outdated insulation, and systems that were not designed for current comfort expectations.",
  "Burbank is also a city with a unique mix of residential neighborhoods and busy commercial corridors near the Warner Bros and Disney studio districts. That means HVAC needs can vary widely from one property to the next. Some homeowners are trying to cool post-war ranch houses with limited attic insulation, while others are upgrading additions, converted garages, or multi-zone homes that need better airflow control. Bernardino Martin helps Burbank customers evaluate what is happening inside the system, not just what temperature is coming out of the vents. We look at duct leakage, thermostat accuracy, airflow restrictions, equipment age, and how hard the system is working during the hottest parts of the day.",
  "For homeowners in Burbank, fast and practical HVAC service matters because discomfort can build quickly in Valley heat. Older homes may need more than a simple repair if the system is undersized or airflow is poorly distributed. We service all major brands, offer maintenance for better seasonal reliability, and recommend upgrades when they truly support lower operating costs or improved comfort. Whether you are dealing with weak cooling near the studios, replacing failing ductwork in a ranch-style home, or planning a more efficient system for a Burbank property with high summer demand, Bernardino Martin brings local HVAC experience built around the way this city actually lives and cools.",
];

const problems = [
  {
    title: "Aging ductwork in post-war homes",
    description:
      "Many Burbank ranch-style homes still have older duct systems with leaks, crushed runs, or poor insulation that reduce airflow and waste cooling capacity.",
  },
  {
    title: "High cooling loads during Valley summers",
    description:
      "Burbank heat can push HVAC systems for long hours, especially when outside temperatures stay high into the evening and systems never get a real recovery period.",
  },
  {
    title: "Poor insulation in mid-century construction",
    description:
      "Older attics, wall assemblies, and windows often make Burbank homes lose conditioned air faster, forcing air conditioners to work harder and cycle more often.",
  },
  {
    title: "Uneven comfort in additions and converted spaces",
    description:
      "Expanded living areas, detached rooms, and older floor plans can create hot spots that need mini-splits, zoning, or duct corrections to cool properly.",
  },
];

export default function HvacBurbank() {
  return (
    <Layout>
      <SEO
        title="HVAC Services in Burbank, CA | Bernardino Martin"
        description="Expert HVAC repair & installation in Burbank, CA. Same-day service, all brands, licensed technicians. Call (818) 400-0227."
      />

      <CityHero
        city="Burbank"
        badge="Burbank HVAC"
        title="HVAC Services in Burbank, CA"
        description="Cooling and heating service for Burbank homes facing Valley heat, older ductwork, and high summer demand."
        imageSrc="/images/services/hvac-burbank-hero.webp"
        imageAlt="HVAC technician working on a residential rooftop system in Burbank California"
      />

      <SeoIntro paragraphs={introParagraphs} />

      <SeoFeatureImage
        src="/images/cities/burbank-city.png"
        alt="Burbank California neighborhood HVAC service"
      />

      <SeoImageGrid
        heading="Burbank HVAC Services"
        columns={2}
        images={[
          {
            src: "/images/services/hvac-repair.webp",
            alt: "HVAC repair in Burbank CA",
            caption: "HVAC Repair",
          },
          {
            src: "/images/services/hvac-maintenance.webp",
            alt: "HVAC maintenance Burbank CA",
            caption: "HVAC Maintenance",
          },
        ]}
      />

      <CityProblems city="Burbank" problems={problems} />

      <SeoWhyChoose
        heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN"
        items={[
          {
            icon: Shield,
            title: "Licensed & Insured",
            description:
              "We complete Burbank HVAC work with careful workmanship, clean job sites, and reliable communication.",
          },
          {
            icon: Clock,
            title: "Same-Day Service",
            description:
              "When Burbank temperatures surge, we move quickly to restore cooling and protect indoor comfort.",
          },
          {
            icon: Star,
            title: "All Brands Serviced",
            description:
              "We repair and maintain major equipment brands commonly found throughout Burbank homes and light commercial properties.",
          },
          {
            icon: Phone,
            title: "Upfront Pricing",
            description:
              "You get clear recommendations before work begins, so your Burbank HVAC decision feels informed and straightforward.",
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
        title="Book HVAC Service in Burbank Today"
        description="Call (818) 400-0227 or book online for HVAC repair, installation, and maintenance in Burbank."
      />
    </Layout>
  );
}
