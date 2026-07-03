import { ServiceDetailTemplate } from "./template";

export default function HvacDuctless() {
  return (
    <ServiceDetailTemplate
      serviceName="Ductless Mini-Split Systems"
      slug="hvac-ductless"
      category="HVAC & Heating"
      categoryColor="blue"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/svc-ductless.webp"
      tagline="Zone cooling and heating without ductwork — perfect for any room including nurseries"
      overview={[
        "Ductless mini-split systems work by connecting a compact outdoor compressor to one or more indoor air handlers through a small refrigerant line set that passes through a 3-inch hole in the wall. Because there's no ductwork required, installation is fast, minimally invasive, and suitable for virtually any room in the home — without tearing open ceilings or walls to run ducts.",
        "Mini-splits excel in situations where central air falls short. Room additions, converted garages, home offices, detached guesthouses, and nurseries that struggle to stay comfortable with a central system are ideal candidates. Each indoor unit operates independently, letting occupants set their own temperature in each zone, which eliminates the household thermostat wars that plague central-air homes and reduces energy waste in unoccupied rooms.",
        "Modern inverter-driven mini-splits are among the most energy-efficient heating and cooling solutions available today. Many models achieve SEER ratings above 20 — nearly twice the efficiency of a standard central AC — and because they provide both heating and cooling in one system, you eliminate the need for a separate space heater or baseboard heater in isolated areas. The result is year-round comfort at a fraction of the operating cost of electric resistance heat.",
      ]}
      keyBenefits={[
        "No ductwork required — minimal home disruption",
        "Individual zone temperature control",
        "Energy savings vs central air",
        "Quiet operation (as low as 19dB)",
        "Ideal for room additions, garages, nurseries",
        "Heating and cooling in one system",
      ]}
      whatWeInclude={[
        "Free in-home consultation",
        "System sizing for your space",
        "Wall mount or ceiling cassette installation",
        "Refrigerant line set installation",
        "Electrical circuit installation",
        "WiFi thermostat setup",
        "System commissioning",
        "Owner operation training",
      ]}
      duration="4-6 hours"
      startingPrice="Starting at $1,200"
      relatedServices={[
        { name: "AC Installation", slug: "hvac-install-ac" },
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
        { name: "Attic Heat Reduction", slug: "hvac-attic-heat" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How is a mini-split different from a window AC or central air?",
          answer:
            "A window AC sits in a window opening and cools only the immediate room. Central air uses ductwork to distribute conditioned air throughout the whole house. A mini-split sits on the wall or ceiling inside a room but connects to an outdoor compressor through a small refrigerant line — no window blocked, no ducts required. Mini-splits are also far more efficient than window units and can heat as well as cool.",
        },
        {
          question: "Can one outdoor unit serve multiple rooms?",
          answer:
            "Yes — multi-zone mini-split systems pair a single outdoor condenser with two, three, four, or even more indoor air handlers. Each indoor unit runs independently with its own remote control or app, so bedroom 1 can be set to 68°F while bedroom 2 runs at 72°F. We size the outdoor unit to handle the combined load of all connected zones.",
        },
        {
          question: "How long does installation take?",
          answer:
            "A single-zone mini-split installation typically takes 4–6 hours. Adding each additional zone adds roughly 1–2 hours. We handle the electrical circuit, refrigerant line set, and all mounting hardware in a single visit for most installs. More complex multi-zone projects may require a second day.",
        },
        {
          question: "Do mini-splits require regular maintenance?",
          answer:
            "Yes, but maintenance is simpler than for a central system. The washable filters in each indoor air handler should be rinsed monthly during heavy use. An annual professional tune-up covers refrigerant charge check, coil cleaning, and electrical inspection. Well-maintained mini-splits typically last 15–20 years.",
        },
        {
          question: "How does the energy cost of a mini-split compare to central AC?",
          answer:
            "Mini-splits are typically 20–40% more efficient than conventional central AC systems. When you factor in that mini-splits have no duct losses (duct systems lose 20–30% of conditioned air through leaks and heat gain), the real-world savings are even greater. For a room addition or garage conversion, a mini-split will almost always be the most cost-effective choice.",
        },
      ]}
    />
  );
}
