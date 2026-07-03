import { ServiceDetailTemplate } from "./template";

export default function PlumbingGasLine() {
  return (
    <ServiceDetailTemplate
      serviceName="Natural Gas Line Replacement"
      slug="plumbing-gas-line"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/real-copper-welding.webp"
      tagline="Safe gas meter to house line replacement by licensed plumbers"
      duration="4-8 hours"
      startingPrice="Free estimate"
      overview={[
        "Natural gas work is the most safety-critical service a plumber performs. A leaking or improperly installed gas line is a genuine danger — not just a comfort issue. Bernardino Martin's technicians are California-licensed for natural gas line work, and we treat every gas project with the level of precision and documentation the job demands. We work on service lines from the street gas meter into the home, as well as the interior distribution piping that feeds your furnace, water heater, stove, and dryer.",
        "Many Los Angeles homes built before 1980 still have their original black iron threaded gas pipe. While iron pipe is durable, the threaded connections corrode and develop micro-leaks over time, and the pipe diameter is often undersized for modern appliances. We replace old black iron runs with properly sized, properly supported new pipe — using approved materials and fittings for each section of the system. Every replacement is pressure-tested to confirm there are no leaks before we restore gas service.",
        "Gas line replacement requires a permit from the City of Los Angeles and coordination with Southern California Gas Company (SoCalGas) for service disconnection before work begins and meter turn-on after the inspection passes. We handle all of that coordination on your behalf. After restoring gas, we relight all pilots, reconnect all appliances, and perform a final carbon monoxide safety check throughout the home before we leave.",
      ]}
      keyBenefits={[
        "Licensed for natural gas work in California",
        "Leak test on every installation",
        "SoCal Gas coordination included",
        "Old iron pipe removal and disposal",
        "Proper permits obtained before work begins",
        "Carbon monoxide safety check post-install",
      ]}
      whatWeInclude={[
        "Gas line safety inspection",
        "Permit application",
        "Old gas line disconnection",
        "New gas line installation",
        "Pressure testing of entire gas system",
        "SoCal Gas reconnection coordination",
        "All appliance reconnection",
        "Pilot relight on all gas appliances",
        "Final leak test with electronic detector",
        "Inspection sign-off coordination",
      ]}
      relatedServices={[
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "Electrical Panel Services", slug: "electrical-panel" },
        { name: "Mainline Installation", slug: "plumbing-mainline" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What are the warning signs of a gas line problem?",
          answer:
            "The most obvious sign is the smell of rotten eggs or sulfur, which is the odorant added to natural gas for safety. Other signs include a hissing or whistling sound near appliances or pipes, dead vegetation in a line above a buried gas pipe, higher-than-normal gas bills without a change in usage, and pilot lights that won't stay lit. If you suspect a gas leak, leave the home immediately without operating any switches, and call your gas company and 911.",
        },
        {
          question: "Can I smell every gas leak?",
          answer:
            "No — very slow micro-leaks at corroded threaded fittings may not produce a detectable odor at normal concentrations. That's why we use an electronic combustible gas detector during every inspection, which can detect gas levels far below what the human nose can identify. Relying solely on smell for gas leak detection gives a false sense of security in older homes with aging pipe connections.",
        },
        {
          question: "Is a permit required for gas line replacement?",
          answer:
            "Yes, absolutely. Any work on a natural gas line in Los Angeles requires a permit from the city building department, and the installation must pass a pressure test inspection before service is restored. This is non-negotiable from a code and insurance standpoint — unpermitted gas work can void your homeowner's insurance and create significant liability. We always pull the permit before beginning.",
        },
        {
          question: "How long does a gas line replacement take?",
          answer:
            "The on-site work for a typical service line replacement (meter to house connection) takes 4 to 8 hours. Interior re-piping of distribution lines to multiple appliances can take a full day. The overall timeline from estimate to completed inspection is typically 2 to 3 weeks due to permit processing and SoCalGas scheduling. We request priority scheduling where available.",
        },
        {
          question: "What does a gas line replacement cost?",
          answer:
            "Cost depends heavily on the length of line being replaced, the number of appliance connections, accessibility (crawl space vs. open basement), and permit fees. A simple service line replacement from meter to house entry commonly runs $800 to $2,500. Full interior re-piping of a 3-bedroom home is typically $2,000 to $5,000. We provide free on-site estimates with itemized pricing before any work begins.",
        },
      ]}
    />
  );
}
