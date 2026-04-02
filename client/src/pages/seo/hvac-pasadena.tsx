import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import {
  CityBreadcrumb,
  CityProblems,
  SeoCtaBanner,
  SeoIntro,
  SeoRelatedLinks,
  SeoWhyChoose,
} from "./shared";
import { Clock, Phone, Shield, Star } from "lucide-react";
import { Link } from "wouter";

const introParagraphs: [string, string, string] = [
  "Pasadena has some of the most distinctive residential HVAC challenges in the region because it combines inland summer heat with a large inventory of historic housing. Bernardino Martin provides HVAC services in Pasadena for homeowners who want comfort improvements that respect the age and character of their property. In neighborhoods near Old Pasadena, Bungalow Heaven, and the San Marino border, we regularly see homes that were built long before modern air conditioning was standard. Those properties often need careful retrofitting, updated controls, or ductless and zoned solutions that improve comfort without forcing a one-size-fits-all system into a historic structure.",
  "Pasadena's housing mix includes Craftsman homes, Victorian-era properties, updated family houses, and larger residences that have been renovated in stages over time. That often means HVAC systems are dealing with incomplete duct layouts, basement equipment locations, limited mechanical space, or electrical constraints from older wiring. Even when a system technically runs, Pasadena homeowners may still deal with uneven room temperatures, poor airflow, and thermostat compatibility issues. Bernardino Martin helps identify those root causes and build a realistic improvement plan, whether the answer is targeted repair, duct correction, filtration upgrades, thermostat replacement, or a more comprehensive system update.",
  "Heat is another major factor in Pasadena. As an inland city, Pasadena often records some of the highest summer temperatures in Los Angeles County, and prolonged heat events can quickly expose weaknesses in older HVAC systems. Reliable cooling is essential, especially in properties with large windows, aging insulation, or no original ductwork. Bernardino Martin services all major brands and works with homeowners throughout Pasadena who need better cooling performance, cleaner air, and more dependable year-round comfort. From historic homes that require thoughtful retrofitting to modern properties looking for higher efficiency, our Pasadena HVAC work is designed around local architecture, local weather, and the long-term needs of each home.",
];

const problems = [
  {
    title: "Historic homes with no original ductwork",
    description:
      "Many Pasadena properties need creative cooling and heating solutions because they were built before central air systems were ever part of the design.",
  },
  {
    title: "Basement and hidden mechanical layouts",
    description:
      "Older Pasadena homes can place equipment in basements or tight utility spaces, which makes access, airflow, and replacement planning more complex.",
  },
  {
    title: "High inland cooling demand",
    description:
      "Pasadena heat waves place sustained stress on air conditioners, especially in older homes with large sun exposure and limited insulation upgrades.",
  },
  {
    title: "Older wiring affecting thermostat compatibility",
    description:
      "Some Pasadena homes still have electrical limitations that can complicate modern thermostat upgrades and require careful compatibility checks.",
  },
];

export default function HvacPasadena() {
  return (
    <Layout>
      <SEO
        title="HVAC Services in Pasadena, CA | Bernardino Martin"
        description="Trusted HVAC repair & installation in Pasadena, CA. Serving historic homes & modern properties. Call (818) 400-0227."
      />

      <section className="bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl">
            <CityBreadcrumb city="Pasadena" />
            <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em]">
              Pasadena HVAC
            </div>
            <h1 className="mt-6 text-4xl font-heading font-black leading-tight md:text-6xl">
              HVAC Services in Pasadena, CA
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              Reliable HVAC service for Pasadena's historic homes, modern upgrades, and high-demand inland summer conditions.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-slate-100"
                asChild
              >
                <a href="tel:+18184000227">Call (818) 400-0227</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href="/booking">Book Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SeoIntro paragraphs={introParagraphs} />

      <CityProblems city="Pasadena" problems={problems} />

      <SeoWhyChoose
        heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN"
        items={[
          {
            icon: Shield,
            title: "Licensed & Insured",
            description:
              "We approach Pasadena HVAC projects carefully, especially when older homes require more thoughtful planning and installation methods.",
          },
          {
            icon: Clock,
            title: "Same-Day Service",
            description:
              "Fast response matters in Pasadena when inland temperatures spike and cooling becomes essential.",
          },
          {
            icon: Star,
            title: "All Brands Serviced",
            description:
              "We maintain and repair major HVAC brands used in both historic and updated Pasadena properties.",
          },
          {
            icon: Phone,
            title: "Historic Home Awareness",
            description:
              "We help Pasadena homeowners choose solutions that improve comfort while respecting the realities of older construction.",
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
        title="Book HVAC Service in Pasadena Today"
        description="Call (818) 400-0227 or book online for HVAC repair, installation, and maintenance in Pasadena."
      />
    </Layout>
  );
}
