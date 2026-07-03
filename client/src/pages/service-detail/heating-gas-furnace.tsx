import { ServiceDetailTemplate } from "./template";

export default function HeatingGasFurnace() {
  return (
    <ServiceDetailTemplate
      serviceName="Gas Furnace Repair"
      slug="heating-gas-furnace"
      category="Heating Specialties"
      categoryColor="orange"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/services/heating-gas-furnace.png"
      tagline="Expert gas furnace repair for all makes and models across Los Angeles"
      overview={[
        "Gas furnaces are complex appliances that combine a combustion system, a heat exchanger, an electrical control board, and a blower motor into a single unit — and a failure in any one of those systems can leave your home cold. Our technicians are specifically trained in gas appliance diagnostics and carry the full range of OEM and aftermarket parts to repair any make or model, from legacy pilot-light systems to modern two-stage and variable-speed furnaces.",
        "The three most common gas furnace failures we see across Los Angeles are failed hot surface igniters, cracked heat exchangers, and faulty gas valves. Each requires a different diagnostic approach and carries a different safety profile. A cracked heat exchanger, in particular, is a serious issue because it can allow combustion gases including carbon monoxide to enter the living space — which is why we include a carbon monoxide safety test on every gas furnace call, not just when CO is suspected.",
        "Safety is the foundation of every gas furnace service call. Before we diagnose the mechanical failure, we check for gas leaks at the supply connection and verify that combustion air is reaching the unit properly. After the repair, we run the furnace through a complete heat cycle and test the flue exhaust to confirm combustion gases are venting properly to the outdoors. You'll receive a written safety and service report at the end of every visit.",
      ]}
      keyBenefits={[
        "All gas furnace brands and models serviced",
        "Carbon monoxide safety check on every visit",
        "Gas leak detection included",
        "Same-day service for heating emergencies",
        "90-day repair guarantee",
        "Upfront pricing before any work",
      ]}
      whatWeInclude={[
        "Full furnace diagnostic",
        "Gas pressure check",
        "Igniter and burner inspection",
        "Heat exchanger inspection",
        "Blower motor check",
        "Gas valve test",
        "Carbon monoxide test",
        "Safety shutdown test",
      ]}
      duration="2-4 hours"
      startingPrice="Starting at $99"
      relatedServices={[
        { name: "Furnace Replacement", slug: "heating-furnace-replacement" },
        { name: "Thermostat Installation", slug: "hvac-thermostat" },
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What are the most common gas furnace problems?",
          answer:
            "The most frequent issues we diagnose are failed hot surface igniters (the component that lights the burners), dirty or clogged burners causing ignition failure, failed capacitors or run capacitors on the blower motor, faulty pressure switches that prevent the furnace from starting, and limit switch trips caused by restricted airflow from a clogged filter. Cracked heat exchangers are less common but more serious, requiring immediate attention.",
        },
        {
          question: "Is it safe to run my gas furnace if I smell something unusual?",
          answer:
            "If you smell natural gas — a distinct sulfur or rotten-egg odor — leave the building immediately without using any light switches or open flames, then call your gas utility from outside. Do not attempt to operate the furnace. If the smell is more of a musty or burning-dust odor when the furnace first starts in fall, that's typically harmless dust burning off the heat exchanger after months of disuse. When in doubt, call us for a safety inspection before operating the system.",
        },
        {
          question: "How do I decide whether to repair or replace my gas furnace?",
          answer:
            "The general industry guideline is the '5,000 rule': multiply the age of the furnace in years by the repair cost. If the result exceeds $5,000, replacement is likely more economical. A furnace over 15 years old requiring a major repair like a heat exchanger or control board often makes more financial sense to replace with a high-efficiency model that will pay back through lower gas bills.",
        },
        {
          question: "How much does a typical gas furnace repair cost?",
          answer:
            "Igniter replacement typically runs $150–$300. Blower motor replacement runs $350–$650. A new gas valve is $200–$500 installed. Heat exchanger replacement, when the furnace age justifies it rather than replacement, can run $500–$1,200. We always provide a written estimate before beginning work so you can make an informed decision.",
        },
        {
          question: "How long does a gas furnace repair take?",
          answer:
            "Most single-component repairs are completed in 2–3 hours, including diagnosis time. If the repair requires ordering a part not stocked on our vehicle, we'll make a temporary fix where possible and return for the part installation when it arrives — usually within 1–2 business days. We aim to restore heat on the first visit for the vast majority of service calls.",
        },
      ]}
    />
  );
}
