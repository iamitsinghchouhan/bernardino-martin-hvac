import { ServiceDetailTemplate } from "./template";

export default function ElectricalPanel() {
  return (
    <ServiceDetailTemplate
      serviceName="Electrical Panel Services"
      slug="electrical-panel"
      category="Electrical"
      categoryColor="yellow"
      heroVideo="/videos/svc-electrical.mp4"
      heroImage="/images/svc-electrical.png"
      tagline="Panel upgrades, sub-panel installations, and Federal Pacific replacements for modern LA homes"
      overview={[
        "The electrical panel is the nerve center of your home's power system. In Los Angeles, where solar installations, electric vehicle chargers, and high-efficiency HVAC systems have become standard, an outdated 100-amp panel is often simply too small to meet modern demand. We upgrade residential panels to 200 amps — the current standard for homes with solar, EV charging, and modern appliances — and coordinate with LADWP for service entrance upgrades when needed.",
        "Federal Pacific Electric (FPE) Stab-Lok panels and Zinsco panels — common in Los Angeles homes built between the 1950s and 1980s — have documented safety defects. Their breakers frequently fail to trip during overloads, creating a fire hazard. Insurance companies in California often refuse to insure homes with these panels or charge significantly higher premiums. We specialize in safe removal and replacement of these recalled panel types with modern equipment.",
        "All electrical panel work requires permits and inspection by the City of Los Angeles Department of Building and Safety. We handle the permit application, schedule the inspection, and ensure the installation passes on the first visit. This protects you legally and ensures your homeowner's insurance remains fully valid.",
      ]}
      keyBenefits={[
        "200A panel upgrades to support solar, EV chargers, and modern homes",
        "Federal Pacific Stab-Lok and Zinsco panel replacement — safety upgrade",
        "Sub-panel installation for detached garage, ADU, or addition",
        "LADWP service entrance upgrade coordination when needed",
        "AFCI and GFCI breaker upgrades for current NEC compliance",
        "All permits and LADWP inspection coordination handled",
      ]}
      whatWeInclude={[
        "Electrical load calculation for your home",
        "Panel capacity and condition assessment",
        "Permit application with City of Los Angeles",
        "LADWP power shutoff coordination",
        "Old panel removal and disposal",
        "New panel mounting and installation",
        "Main breaker and circuit breaker installation",
        "AFCI and GFCI breaker upgrades per NEC code",
        "Proper labeling and directory card",
        "LADWP reconnection coordination",
        "Final inspection scheduling and sign-off",
      ]}
      duration="4-8 hours"
      startingPrice="Starting at $199"
      relatedServices={[
        { name: "General Electrical Services", slug: "electrical-general" },
        { name: "EV Charger Installation", slug: "electrical-ev-charger" },
        { name: "Solar Panel Installation", slug: "solar-install" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How do I know if I have a Federal Pacific or Zinsco panel?",
          answer: "Look inside your panel door — Federal Pacific panels have 'Stab-Lok' printed on the breakers and the panel face. Zinsco panels have a distinctive multicolored breaker arrangement. If you're unsure, share a photo with us and we'll identify your panel type. Many LA homeowners discover these panels during solar or EV charger installation evaluations.",
        },
        {
          question: "Do I need a permit to upgrade my electrical panel?",
          answer: "Yes — in Los Angeles, any panel replacement or upgrade requires a permit from the Department of Building and Safety and a LADWP service disconnect. Unpermitted panel work is a serious liability: it can void your homeowner's insurance, create problems during home sale, and leave safety hazards unaddressed. We include all permits in our installation quote.",
        },
        {
          question: "Will a 200A panel support solar and an EV charger?",
          answer: "A 200A service is the minimum recommended if you're adding both solar and EV charging. Solar and an EV charger together can draw significant power simultaneously, and the panel needs headroom for your other circuits. We size the panel, solar inverter, and EV charger breaker together to ensure everything coexists safely on one service.",
        },
        {
          question: "What is a sub-panel and when do I need one?",
          answer: "A sub-panel is a secondary panel fed from your main panel that serves a specific area — a detached garage, backyard ADU, pool equipment, or a workshop. Sub-panels avoid running individual circuit cables long distances from the main panel and make it easy to control power to an outbuilding independently. We install both the sub-panel and the feeder from your main panel.",
        },
        {
          question: "How long does a panel upgrade take?",
          answer: "The physical installation of a 200A panel upgrade takes 4–8 hours. The total project timeline includes permit approval (typically 1–3 business days online in LA), LADWP scheduling for the service disconnect (1–5 business days depending on their schedule), and the post-inspection. We typically complete the full project within 1–2 weeks of contract signing.",
        },
      ]}
    />
  );
}
