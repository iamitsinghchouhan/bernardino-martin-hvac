import { ServiceDetailTemplate } from "./template";

export default function HvacThermostat() {
  return (
    <ServiceDetailTemplate
      serviceName="Thermostat Installation & Repair"
      slug="hvac-thermostat"
      category="Heating Specialties"
      categoryColor="orange"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/svc-install-thermostat.webp"
      tagline="Smart and programmable thermostat upgrades for better comfort and lower energy bills"
      overview={[
        "A properly functioning thermostat is the brain of your HVAC system. Whether you're upgrading from a manual dial to a smart Wi-Fi thermostat or dealing with a faulty unit that causes temperature swings, our licensed technicians handle all thermostat makes and models quickly and correctly. We carry the most popular brands in our vans for same-day swap-outs.",
        "Smart thermostats can reduce your heating and cooling bills by 10–15% simply by learning your schedule and adjusting temperatures automatically. We program your new thermostat for your household routine, set up energy-saving away modes, and connect it to your smartphone so you always have control — whether you're at the office or across the country.",
        "Many older HVAC systems require a C-wire (common wire) for smart thermostats to function. Our technicians identify this quickly during the installation and add a C-wire adapter or run a new wire if needed, so your new thermostat operates reliably without battery issues or connectivity drops.",
      ]}
      keyBenefits={[
        "All thermostat brands installed and repaired — Nest, Ecobee, Honeywell, Emerson",
        "Smart and programmable thermostat upgrades with energy-saving scheduling",
        "C-wire installation or adapter added if your system needs it",
        "Multi-stage and heat-pump compatible wiring handled correctly",
        "Full app setup, pairing, and scheduling completed before we leave",
        "90-day installation guarantee — we fix any wiring issues at no charge",
      ]}
      whatWeInclude={[
        "Compatibility check for your HVAC system",
        "Existing thermostat removal and wire identification",
        "New thermostat mounting and wiring",
        "C-wire adapter installation if required",
        "Wi-Fi pairing and smartphone app setup",
        "Schedule programming for your household routine",
        "Heat and cool mode test",
        "Energy-saving mode configuration",
        "Owner walkthrough and training",
      ]}
      duration="1-2 hours"
      startingPrice="Starting at $49"
      relatedServices={[
        { name: "Google Nest Thermostat", slug: "heating-nest-thermostat" },
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
        { name: "AC Repair & Diagnostics", slug: "hvac-repair" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How much can a smart thermostat save on my energy bill?",
          answer: "Smart thermostats typically save 10–15% on heating and cooling costs by automatically adjusting temperatures when you're away or asleep. In Los Angeles where air conditioning runs much of the year, that can translate to $100–$200 in annual savings depending on your home size.",
        },
        {
          question: "Will a smart thermostat work with my existing HVAC system?",
          answer: "Most modern HVAC systems are compatible with popular smart thermostats. Heat pumps, two-stage systems, and older systems sometimes need additional wiring. Our technician confirms compatibility before installation and handles any wiring modifications needed at no extra charge.",
        },
        {
          question: "What is a C-wire and do I need one?",
          answer: "The C-wire (common wire) provides continuous power to a smart thermostat so it stays connected to Wi-Fi and the app without draining batteries. If your system doesn't have one, we install a C-wire adapter or run a new wire — whichever is cleanest for your setup.",
        },
        {
          question: "Can you repair my existing thermostat instead of replacing it?",
          answer: "Yes. We diagnose thermostat faults including faulty displays, unresponsive buttons, incorrect temperature readings, and wiring problems. If the repair is cost-effective, we fix it. If replacement is the better value, we'll tell you honestly and show you options.",
        },
        {
          question: "How long does thermostat installation take?",
          answer: "A standard thermostat swap typically takes 45–90 minutes. If C-wire installation is needed or if we're troubleshooting wiring issues from a previous installation, allow 2 hours. Most appointments are same-day or next-day in the Los Angeles area.",
        },
      ]}
    />
  );
}
