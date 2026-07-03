import { ServiceDetailTemplate } from "./template";

export default function PlumbingShutoff() {
  return (
    <ServiceDetailTemplate
      serviceName="SMART SHUTOFF VALVE"
      slug="plumbing-shutoff"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/moen-smart-water-shutoff.webp"
      tagline="Automatic leak detection and whole-home water shutoff protection"
      duration="2-3 hours"
      startingPrice="Starting at $299"
      overview={[
        "Water damage is the single most common and costly homeowner insurance claim in the United States, averaging over $11,000 per incident. Unlike fire or theft, most water damage events — a washing machine hose failure, a supply line bursting while you're at work, a slow leak under a sink going undetected for weeks — are preventable with the right technology. A smart whole-home shutoff valve monitors your water flow around the clock and cuts the water off automatically the moment it detects abnormal behavior, stopping a potential disaster before it soaks through your floors and walls.",
        "Smart shutoff valves from brands like Moen Flo, Phyn Plus, and Flume work by installing on your main water line and using ultrasonic or flow-based sensors to establish a baseline of your normal water usage patterns. When water flow doesn't match expected patterns — a pipe burst that causes continuous high flow, or a toilet that runs all night — the valve shuts off water to the entire home within seconds. Many units can also detect micro-leaks: slow drips that would go unnoticed for months but still cause mold and structural damage over time.",
        "Beyond emergency shutoff, these systems give you a live dashboard of your home's water usage through a smartphone app, with alerts for unusual consumption. If you're on vacation and a pipe fails, your phone notifies you and the water is already off. Many homeowners insurance providers now offer discounts of 5 to 10 percent on annual premiums when a certified smart water shutoff is installed — making the device pay for itself over time while also providing peace of mind.",
      ]}
      keyBenefits={[
        "Automatically shuts off water the moment a leak is detected",
        "Remote control and monitoring via smartphone app",
        "Micro-leak detection catches slow leaks before they cause damage",
        "Insurance discount qualification (up to 10% off premium)",
        "Real-time water usage monitoring and alerts",
        "Compatible with Google Home and Amazon Alexa",
      ]}
      whatWeInclude={[
        "Main water line location and assessment",
        "Smart shutoff valve installation on main supply line",
        "App setup and smartphone pairing",
        "Flow sensor calibration to your home's usage pattern",
        "Leak detection sensitivity settings",
        "Smart home integration (Google Home or Alexa)",
        "Test leak simulation to verify automatic shutoff",
        "Owner training on app controls and alert management",
      ]}
      relatedServices={[
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "Reverse Osmosis Water Filtration", slug: "plumbing-water-filter" },
        { name: "Smart Irrigation Systems", slug: "outdoor-irrigation" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How does a smart shutoff valve actually detect a leak?",
          answer:
            "The valve monitors water flow continuously. It learns your home's normal usage patterns — how much water flows when you shower, run the dishwasher, or water the lawn — and flags flow that falls outside those patterns. A burst pipe produces unusually high continuous flow. A dripping supply line produces low but never-stopping flow when everything should be off. The valve's algorithm distinguishes normal usage from anomalies and acts accordingly, shutting off when it detects a problem.",
        },
        {
          question: "Do smart shutoff valves work with well water systems?",
          answer:
            "Most smart shutoff valves are designed for municipal water service and require a consistent inlet pressure between 20 and 100 PSI. Some models, including the Phyn Plus, are compatible with well systems, but the flow characteristics and sensor calibration differ from city water. If you're on a well, let us know during the estimate so we can recommend the appropriate valve model for your setup.",
        },
        {
          question: "What kind of insurance discount can I expect?",
          answer:
            "Many major homeowners insurance providers offer a 5 to 10 percent annual premium discount for certified smart water shutoff devices. Some insurers require specific brands or third-party certification. We provide documentation of the installed device that you can submit to your insurance carrier. The discount amount varies by carrier and policy — we recommend calling your agent to confirm eligibility before purchase.",
        },
        {
          question: "Which brands do you install?",
          answer:
            "We install Moen Flo (the most widely recognized brand, compatible with most insurance programs), Phyn Plus (which offers dual-purpose leak detection and water usage analytics), and Flume (a non-invasive sensor that attaches to your existing meter without cutting any pipes). The best choice depends on your pipe configuration, home size, and whether you want basic shutoff protection or full water usage monitoring.",
        },
        {
          question: "Will the valve accidentally shut off water when I'm using it normally?",
          answer:
            "False shutoffs become rare once the valve has been calibrated — typically after 7 to 14 days of learning your household's usage patterns. If you plan to run a lot of water for an unusual reason (filling a pool, extended garden watering), you can put the valve in 'away' mode via the app, which relaxes the alert thresholds temporarily. We configure the initial settings conservatively and adjust based on your feedback during the first few weeks.",
        },
      ]}
    />
  );
}
