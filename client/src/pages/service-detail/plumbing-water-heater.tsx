import { ServiceDetailTemplate } from "./template";

export default function PlumbingWaterHeater() {
  return (
    <ServiceDetailTemplate
      serviceName="Water Heater Installation & Repair"
      slug="plumbing-water-heater"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/svc-plumbing.webp"
      tagline="Tank and tankless water heater service, installation, and replacement in Los Angeles"
      overview={[
        "A failed water heater is one of the most disruptive plumbing problems a homeowner faces — no hot water affects every aspect of daily life. Our plumbers provide same-day diagnosis and, for most failures, same-day replacement. We carry common tank water heater sizes (40, 50, and 75 gallon) in our service vehicles, and can order tankless units for next-day installation. We work with both gas and electric water heaters.",
        "The most common water heater repairs we perform include anode rod replacement (which dramatically extends tank life), thermostat or thermopile replacement on gas units, heating element testing and replacement on electric units, and T&P (temperature and pressure relief) valve replacement. Many units that appear to need full replacement can be repaired and given several more years of service life.",
        "California has specific water heater installation requirements, including seismic strapping, proper flue venting for gas units, and permit requirements for new installations. Our technicians know LA's building codes and handle all permit applications. When your water heater is in a garage or utility room with specific clearance requirements, we ensure the installation is compliant from the start.",
      ]}
      keyBenefits={[
        "Same-day replacement for failed water heaters — most sizes in stock",
        "Gas and electric tank water heaters serviced",
        "Tankless (on-demand) water heater installation available",
        "California seismic strapping and code compliance included",
        "Permit application handled for all new installations",
        "Anode rod replacement doubles tank service life",
      ]}
      whatWeInclude={[
        "Water heater diagnostic inspection",
        "Anode rod inspection and replacement",
        "T&P valve test and replacement if needed",
        "Thermostat inspection and calibration (electric units)",
        "Heating element resistance test (electric units)",
        "Pilot and thermopile inspection (gas units)",
        "Sediment flush for older tanks",
        "Flue venting inspection (gas units)",
        "Permit application for replacements",
        "Seismic strapping per California code",
        "Haul-away of old unit",
      ]}
      duration="2-4 hours"
      startingPrice="Starting at $149"
      relatedServices={[
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "Natural Gas Line Replacement", slug: "plumbing-gas-line" },
        { name: "Electrical Panel Services", slug: "electrical-panel" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "Tank or tankless water heater — which should I choose?",
          answer: "Tank water heaters are less expensive upfront ($400–$1,500 installed) and simpler to maintain. Tankless units cost more upfront ($1,500–$3,500 installed) but use 24–34% less energy for most households and provide unlimited hot water. Tankless is ideal for larger families who run out of hot water, or homeowners focused on energy efficiency. We'll walk you through the economics for your specific situation.",
        },
        {
          question: "How do I know if my water heater needs repair or replacement?",
          answer: "Repair makes sense for units under 8 years old with a specific fixable fault (bad element, failed thermostat, faulty T&P valve). Replacement is usually better for units over 10–12 years old, units with rust-colored water indicating tank corrosion, or units that have needed multiple repairs. We'll give you an honest assessment — we'll tell you if repair makes more financial sense.",
        },
        {
          question: "Why is my water heater making a rumbling or popping noise?",
          answer: "Rumbling or popping sounds are almost always caused by sediment — mineral deposits from hard Los Angeles water that accumulate on the tank floor and heat unevenly. A sediment flush can help if caught early. In severe cases the noise means the tank bottom is starting to fail and replacement is needed. Annual flushing prevents this problem from developing.",
        },
        {
          question: "Do I need a permit to replace my water heater in Los Angeles?",
          answer: "Yes, the City of Los Angeles and most surrounding municipalities require a permit for water heater replacement. The permit ensures the installation is inspected for correct venting, seismic strapping, T&P relief valve installation, and proper clearances. We handle the permit paperwork and arrange for inspection as part of the installation.",
        },
        {
          question: "What is a tankless water heater's minimum flow rate requirement?",
          answer: "Tankless units require a minimum water flow rate (typically 0.5–0.75 GPM) to activate the burner. If you have very low water pressure or are using a single low-flow fixture, the unit may not fire. This is rarely a problem in practice but is worth knowing if your home has unusually low water pressure. We test flow rate during installation.",
        },
      ]}
    />
  );
}
