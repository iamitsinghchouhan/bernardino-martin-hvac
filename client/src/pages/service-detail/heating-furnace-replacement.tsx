import { ServiceDetailTemplate } from "./template";

export default function HeatingFurnaceReplacement() {
  return (
    <ServiceDetailTemplate
      serviceName="Furnace Replacement"
      slug="heating-furnace-replacement"
      category="Heating Specialties"
      categoryColor="orange"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/services/heating-furnace-replacement.png"
      tagline="Energy-efficient furnace upgrades with professional installation and old unit disposal"
      overview={[
        "Deciding to replace a furnace rather than repair it is rarely a snap decision, and we approach it as a financial conversation. If your furnace is under 10 years old and the repair cost is modest, repair almost always makes more sense. But furnaces older than 15–20 years that require costly repairs — a new heat exchanger, a blower motor, or a control board — are often better candidates for replacement with a modern, high-efficiency unit that will cost less to operate for the next 20 years than the old one did in its prime.",
        "Today's high-efficiency gas furnaces achieve Annual Fuel Utilization Efficiency (AFUE) ratings of 80% to 97%, compared to the 60–70% typical of furnaces from the 1980s and early 1990s. That efficiency gap translates to meaningful monthly savings on your SoCalGas bill. We carry a full lineup of furnaces from Carrier, Trane, Lennox, Rheem, and Goodman and can help you select the efficiency tier that delivers the best payback period for your household's heating usage.",
        "Furnace replacement in Los Angeles requires a mechanical permit from the local building department, and we handle that entire process on your behalf. We submit the application, schedule the required inspection, and keep the job open until the inspector signs off. Your old furnace is disconnected, removed from the premises, and properly disposed of — including recovering any refrigerant if a combination heat pump is involved. You're left with a clean installation, valid permits, and a full manufacturer warranty.",
      ]}
      keyBenefits={[
        "Free in-home estimate and brand comparison",
        "All major brands: Carrier, Trane, Lennox, Rheem, Goodman",
        "Energy-efficient models qualify for tax rebates",
        "Old furnace disposal included",
        "LA building code permits handled",
        "Manufacturer warranty honored",
      ]}
      whatWeInclude={[
        "In-home assessment",
        "Load calculation",
        "Equipment selection consultation",
        "Permit application",
        "Old furnace disconnection and removal",
        "New furnace installation",
        "Duct connection",
        "System startup and testing",
        "Owner walkthrough",
      ]}
      duration="4-8 hours"
      startingPrice="Free estimate"
      relatedServices={[
        { name: "Gas Furnace Repair", slug: "heating-gas-furnace" },
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
        { name: "Thermostat Installation", slug: "hvac-thermostat" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How do I know when to replace rather than repair my furnace?",
          answer:
            "Use the '5,000 rule' as a starting point: multiply the furnace's age in years by the estimated repair cost. If that number exceeds $5,000, replacement is generally the better value. Additional factors favoring replacement include a furnace over 20 years old, recurring failures in the same components, a cracked heat exchanger, or efficiency below 80% AFUE on a unit that runs through a moderate LA heating season.",
        },
        {
          question: "What does AFUE mean and how much will I save with a higher-efficiency furnace?",
          answer:
            "AFUE stands for Annual Fuel Utilization Efficiency — it represents the percentage of fuel energy that actually becomes usable heat, with the remainder going up the flue as waste. Replacing a 65% AFUE furnace with a 95% AFUE unit means that for every dollar you spend on gas, you get about 30 more cents worth of heat. For a household spending $600/year on gas heating, that's roughly $180 in annual savings.",
        },
        {
          question: "How long does furnace replacement take?",
          answer:
            "Most single-system replacements in an existing utility closet or garage location take 4–8 hours in one day. That includes disconnecting and removing the old unit, setting the new equipment, making duct connections, running gas line connections, wiring electrical controls, charging and testing the system, and walking you through the new thermostat. More complex projects involving duct modifications or electrical upgrades may extend to a second day.",
        },
        {
          question: "Are there rebates or tax credits for replacing an old furnace?",
          answer:
            "Yes — several programs apply to Los Angeles homeowners. SoCalGas offers rebates for upgrading to high-efficiency furnaces, and the federal Inflation Reduction Act provides a 30% tax credit (up to $600 annually) for qualifying high-efficiency heating equipment. Certain income-qualified programs through the California Alternate Rates for Energy (CARE) and HEAR programs offer additional rebates. We'll help you identify which incentives apply to your project.",
        },
        {
          question: "What furnace brand do you recommend?",
          answer:
            "We install all major brands and don't have a financial incentive to push any particular manufacturer. Carrier, Trane, and Lennox consistently rank highest for reliability and dealer support networks, while Goodman and Rheem offer strong value at a lower upfront cost. The 'best' brand for your home depends on your budget, efficiency goals, and how long you plan to stay in the home. We'll walk through the options honestly during the estimate visit.",
        },
      ]}
    />
  );
}
