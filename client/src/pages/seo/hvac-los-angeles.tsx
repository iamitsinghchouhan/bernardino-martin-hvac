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
  "Los Angeles homeowners need HVAC systems that can keep up with long hot summers, warm shoulder seasons, and the occasional chilly winter morning. In neighborhoods like Hollywood, Silver Lake, Koreatown, Westwood, and across the San Fernando Valley, indoor comfort depends on properly sized equipment, clean airflow, and fast repairs when temperatures climb. Bernardino Martin provides HVAC services in Los Angeles for homes, apartments, and light commercial spaces that need dependable cooling, heating, and ventilation without unnecessary upsells. We work with older ducted systems, newer inverter equipment, rooftop package units, and ductless systems designed for additions, offices, and converted garages that are common throughout Los Angeles.",
  "Because Los Angeles housing stock is so diverse, HVAC service here is never one-size-fits-all. A hillside property in the Westside can have very different airflow challenges than a single-story home in North Hollywood or a duplex in Mid-Wilshire. Our technicians service Carrier, Trane, Lennox, Rheem, Goodman, Daikin, Mitsubishi, and other major brands, and we focus on practical improvements that make a real difference in comfort and efficiency. That means tracking down weak airflow, correcting thermostat issues, repairing failing capacitors and motors, addressing refrigerant problems, and recommending system replacements only when repair no longer makes financial sense. We also help homeowners plan maintenance before peak heat waves put extra strain on their equipment.",
  "For many families in Los Angeles, HVAC performance is also tied to indoor air quality and energy costs. Dust, traffic pollution, wildfire smoke, and older duct systems can all affect the air you breathe inside your home. At the same time, utility bills can rise quickly when an aging system runs longer than it should. Bernardino Martin helps customers across Los Angeles improve comfort with duct cleaning, thermostat upgrades, heat pump solutions, mini-split installations, and seasonal tune-ups that keep systems running efficiently. Whether you need emergency cooling repair in the middle of a Valley heat spike or a long-term plan for better whole-home comfort, we deliver local service built around how people actually live in Los Angeles.",
];

const services = [
  "AC Repair",
  "AC Installation",
  "HVAC Maintenance",
  "Ductless Mini-Split",
  "Furnace Repair",
  "Duct Cleaning",
  "Thermostat Installation",
  "Heat Pump",
  "Indoor Air Quality",
  "Commercial HVAC",
  "Emergency Repair",
];

export default function HvacLosAngeles() {
  return (
    <Layout>
      <SEO
        title="HVAC Services in Los Angeles, CA | Bernardino Martin"
        description="Professional HVAC repair, installation & maintenance in Los Angeles. Licensed technicians, same-day service, all brands. Call (818) 400-0227."
      />

      <SeoHero
        badge="Los Angeles HVAC"
        title="HVAC Services in Los Angeles, CA"
        description="Reliable heating and cooling repair, replacement, and maintenance for Los Angeles homes, apartments, and small businesses."
      />

      <SeoIntro paragraphs={introParagraphs} />

      <section className="bg-white">
        <div className="container mx-auto px-4 pb-4">
          <div className="mx-auto max-w-4xl">
            <SeoRelatedLinks
              heading="Nearby HVAC service pages"
              links={[
                { href: "/hvac-burbank", label: "HVAC Burbank" },
                { href: "/hvac-glendale", label: "HVAC Glendale" },
                { href: "/hvac-pasadena", label: "HVAC Pasadena" },
              ]}
            />
          </div>
        </div>
      </section>

      <SeoServicesList
        heading="Our HVAC Services in Los Angeles"
        items={services}
      />

      <SeoWhyChoose heading="Why Los Angeles Homeowners Choose BERNARDINO MARTIN" />

      <SeoServiceAreas
        heading="Serving All of Los Angeles"
        areas={losAngelesAreas}
      />

      <SeoCtaBanner
        title="Ready to Book HVAC Service in Los Angeles?"
        description="Call (818) 400-0227 today or book online to schedule repair, installation, or maintenance with Bernardino Martin."
      />
    </Layout>
  );
}
