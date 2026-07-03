import { ServiceDetailTemplate } from "./template";

export default function HeatingElectricFurnace() {
  return (
    <ServiceDetailTemplate
      serviceName="Electric Furnace Repair"
      slug="heating-electric-furnace"
      category="Heating Specialties"
      categoryColor="orange"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/services/heating-electric-furnace.png"
      tagline="Fast diagnostics and expert repair of all electric furnace systems"
      overview={[
        "Electric furnaces heat air by passing it over a series of electric resistance heating elements — think of oversized, high-wattage versions of a toaster coil. Multiple elements activate in sequence (controlled by components called sequencers) to gradually increase heat output and avoid tripping the circuit breaker. When any element, sequencer, relay, or control board in this sequence fails, the furnace either produces no heat, partial heat, or heats inconsistently — all problems our technicians diagnose using digital clamp meters and resistance testing equipment.",
        "Modern electric furnace diagnostics rely heavily on electrical measurement. We test each heating element's resistance to identify which specific element has burned out, measure sequencer timing to find units that are opening too slowly or failing to close, and check control board outputs to isolate faults at the component level. This systematic approach means we identify the exact failed part rather than replacing components by process of elimination — which saves you money and time.",
        "The repair-versus-replace decision for electric furnaces is different from gas furnaces. Because electric furnaces have no combustion components or heat exchanger, they tend to be simpler and longer-lived mechanically — the main failure points are the heating elements and controls, both of which are generally repairable at reasonable cost. We factor in the furnace age, repair cost, and the availability of replacement parts when helping you make that decision.",
      ]}
      keyBenefits={[
        "Advanced digital diagnostic equipment",
        "All heating element types replaced",
        "Sequencer and relay repair",
        "Control board diagnosis and replacement",
        "Blower motor service",
        "No gas safety risk — cleaner repair process",
      ]}
      whatWeInclude={[
        "Electrical diagnostic test",
        "Heating element resistance test",
        "Sequencer testing",
        "Control board inspection",
        "Blower motor amperage check",
        "Thermostat continuity test",
        "Safety limit switch test",
        "Wiring inspection",
      ]}
      duration="1-3 hours"
      startingPrice="Starting at $89"
      relatedServices={[
        { name: "Gas Furnace Repair", slug: "heating-gas-furnace" },
        { name: "Thermostat Installation", slug: "hvac-thermostat" },
        { name: "Furnace Replacement", slug: "heating-furnace-replacement" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How does an electric furnace work?",
          answer:
            "An electric furnace heats air by passing it across a bank of resistance heating elements — typically 2 to 5 elements depending on furnace capacity, measured in kilowatts. A blower motor pulls return air from the home, passes it over the heated elements, and then pushes the warmed air into the supply duct system. Sequencers time the staging of each element to prevent a sudden high-amperage draw when the furnace starts up.",
        },
        {
          question: "What are the most common electric furnace failures?",
          answer:
            "Burned-out heating elements are the most frequent failure — each element can fail individually, so a furnace with 3 elements may still produce some heat even with one failed. Sequencer failure causes elements to not activate in proper sequence. Limit switch trips occur when airflow is restricted (usually by a dirty filter). Control board failures affect multiple functions simultaneously. Blower motor failures cause inadequate heat distribution even when the elements are working.",
        },
        {
          question: "Is electric furnace repair more or less expensive than gas furnace repair?",
          answer:
            "Individual component repairs are generally similar in cost. An electric heating element runs $120–$280 to replace. A sequencer replacement is $100–$220. However, electric furnaces have lower overall service call frequency because they have fewer mechanical components and no combustion system to maintain. The tradeoff is that electric furnaces typically cost more to operate monthly than gas furnaces due to electricity vs. natural gas pricing.",
        },
        {
          question: "Is an electric furnace more energy-efficient than a gas furnace?",
          answer:
            "Electric furnaces convert nearly 100% of the electricity they draw into heat, while even high-efficiency gas furnaces exhaust some heat through flue gases. However, because electricity costs more per BTU than natural gas in most Los Angeles utility rates, gas furnaces are typically less expensive to operate despite the efficiency difference. If you're considering converting fuel types, we can run the numbers for your specific utility rates.",
        },
        {
          question: "How long does an electric furnace repair typically take?",
          answer:
            "Most electric furnace repairs are straightforward once the fault is identified. Element replacement takes about 45–90 minutes. Sequencer or control board replacement adds another 30–60 minutes for testing. In the majority of cases, we complete the repair in a single visit within 1–3 hours. We stock the most common elements, sequencers, and limit switches on our service vehicles to avoid return trip delays.",
        },
      ]}
    />
  );
}
