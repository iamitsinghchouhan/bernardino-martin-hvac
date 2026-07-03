import { ServiceDetailTemplate } from "./template";

export default function SolarInverter() {
  return (
    <ServiceDetailTemplate
      serviceName="Solar Inverter Installation"
      slug="solar-inverter"
      category="Solar & Energy"
      categoryColor="amber"
      heroVideo="/videos/svc-solar.mp4"
      heroImage="/images/svc-solar-service.webp"
      tagline="Grid-connected inverter installation and replacement for maximum solar system performance"
      overview={[
        "The inverter is the heart of any solar system — it converts the DC electricity your panels produce into the AC electricity your home uses and your utility accepts. Choosing the right inverter and installing it correctly determines your system's efficiency, reliability, and monitoring capability. Our solar-certified technicians handle string inverters, microinverters, and hybrid (battery-ready) inverter installations for new and existing systems.",
        "String inverters are installed close to your electrical panel, typically in the garage or on an exterior wall, where they're easily accessible for monitoring and service. Microinverters are installed behind each individual panel, maximizing output when partial shading is a concern. We evaluate your roof's shading profile and recommend the technology that will produce the most energy for your specific home.",
        "All inverter installations include the required Rapid Shutdown Device where mandated by current NEC code, proper labeling per LA building department standards, and Wi-Fi monitoring setup so you can track your system's production in real time from your phone. We also handle utility net metering paperwork, which is required before your system can export power to the grid.",
      ]}
      keyBenefits={[
        "String inverters, microinverters, and hybrid battery-ready inverters installed",
        "All major brands: Fronius, Enphase, SolarEdge, SMA, Tesla Powerwall-compatible",
        "Rapid Shutdown Device included where required by code",
        "Wi-Fi monitoring portal setup with smartphone app",
        "Utility net metering interconnection paperwork handled",
        "Failed inverter replacement with production restoration same day",
      ]}
      whatWeInclude={[
        "Inverter technology consultation (string vs micro vs hybrid)",
        "Site electrical inspection and panel capacity check",
        "Inverter mounting and weatherproofing",
        "DC combiner wiring and connections",
        "AC breaker and disconnect installation",
        "Rapid Shutdown Device installation",
        "Utility net metering interconnection paperwork",
        "Wi-Fi setup and monitoring app configuration",
        "Production verification and commissioning test",
        "NEC and LA building code label installation",
      ]}
      duration="4-6 hours"
      startingPrice="Starting at $499"
      relatedServices={[
        { name: "Solar Panel Installation", slug: "solar-install" },
        { name: "Solar System Maintenance", slug: "solar-maintenance" },
        { name: "Electrical Panel Services", slug: "electrical-panel" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What is the difference between a string inverter and microinverters?",
          answer: "A string inverter connects all your panels in series and converts power centrally — it's less expensive but means one shaded panel reduces output from the whole string. Microinverters attach to each panel individually, so each panel operates independently. Microinverters cost more but significantly outperform string inverters on roofs with partial shading, chimneys, or multiple roof angles.",
        },
        {
          question: "How long do solar inverters last?",
          answer: "String inverters typically last 10–15 years, which means most homeowners replace their inverter once during the 25-year life of their panels. Microinverters are rated for 25 years and are usually warranted for that period. Planning an inverter replacement now is common for systems installed before 2015.",
        },
        {
          question: "My inverter shows a fault code — what does that mean?",
          answer: "Fault codes indicate the inverter has detected a problem and stopped exporting power. Common causes include a grid voltage issue (utility-side problem, usually clears itself), an arc-fault detection (wiring issue that needs diagnosis), or an internal hardware fault. We diagnose fault codes same-day and carry common replacement boards and units in our vans.",
        },
        {
          question: "Can I add battery storage to my existing solar inverter?",
          answer: "It depends on your current inverter. Some string inverters are 'battery-ready' and can accept a battery module. Most older string inverters are not. Microinverter systems can add battery storage through a separate AC-coupled battery unit. We assess your existing system and recommend the most cost-effective battery integration path.",
        },
        {
          question: "What is a Rapid Shutdown Device and do I need one?",
          answer: "The NEC 2017 and later editions require solar systems to have a Rapid Shutdown system that de-energizes the DC wiring on the roof within 30 seconds — protecting firefighters from live DC voltage. All new installations in Los Angeles must include this. If your older system doesn't have it, a retrofit device can be added to bring it up to current code.",
        },
      ]}
    />
  );
}
