import { ServiceDetailTemplate } from "./template";

export default function HvacAtticHeat() {
  return (
    <ServiceDetailTemplate
      serviceName="Attic Heat Reduction"
      slug="hvac-attic-heat"
      category="HVAC & Heating"
      categoryColor="blue"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/hvac-tech-attic-flex-duct.webp"
      tagline="Reduce attic temperatures to make your AC dramatically more efficient"
      overview={[
        "On a typical Los Angeles summer afternoon, an unventilated attic can reach 150–160°F. That superheated air radiates through your ceiling and directly into your living space, forcing your air conditioner to work against an enormous and constant heat source. Studies have shown that attic temperatures this high can increase cooling loads by 20–30%, meaning your AC is fighting a losing battle against a problem that has nothing to do with the AC itself.",
        "We address attic heat through a combination of solutions tailored to your home's construction. Radiant barrier foil installed on the underside of the roof decking can block up to 97% of radiant heat from penetrating into the attic space. Powered attic ventilation fans exhaust hot air mechanically to keep attic temperatures close to outdoor ambient. Ridge vents paired with properly sized soffit vents create continuous passive airflow that carries heat out around the clock without any electricity cost.",
        "Homeowners in Los Angeles who invest in attic heat reduction typically see their monthly cooling bills drop by 10–25%, with the improvement most noticeable during the June through September heat season. Beyond the bill savings, the reduction in AC runtime also extends the life of the compressor, fan motors, and refrigerant seals — meaning you'll likely get several additional years from your equipment before needing a replacement.",
      ]}
      keyBenefits={[
        "Reduces attic temps by up to 40°F",
        "Lowers cooling costs 10-25%",
        "Extends AC unit lifespan",
        "Reduces strain on ductwork running through attic",
        "Multiple solutions: ventilation fans, radiant barrier, insulation",
        "Improves overall home comfort",
      ]}
      whatWeInclude={[
        "Attic temperature assessment",
        "Existing ventilation inspection",
        "Radiant barrier installation (if needed)",
        "Attic ventilation fan installation",
        "Ridge vent and soffit vent optimization",
        "Ductwork insulation check",
        "Follow-up energy audit",
      ]}
      duration="3-5 hours"
      startingPrice="Starting at $199"
      relatedServices={[
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
        { name: "Duct Cleaning & Installation", slug: "hvac-ducts" },
        { name: "AC Repair & Diagnostics", slug: "hvac-repair" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How much can attic heat reduction save on my electricity bill?",
          answer:
            "Most Los Angeles homeowners see a 10–25% reduction in cooling costs after attic heat reduction work is completed. The exact savings depend on your current attic conditions, the type of roofing material, and how well-sealed the living space below is. Homes with dark-colored roofs and minimal existing ventilation typically see the largest improvements. We can provide an estimate of projected savings during the assessment visit.",
        },
        {
          question: "How hot does an attic get in Los Angeles summers?",
          answer:
            "In the San Fernando Valley, Inland Empire, and other areas that routinely see outdoor temperatures above 100°F, attic temperatures can exceed 150–160°F during peak afternoon hours. Even in coastal areas of Los Angeles where outdoor temperatures stay in the 80s, attics regularly reach 120–130°F due to the sun heating the roof deck directly above the enclosed air space.",
        },
        {
          question: "How long does attic heat reduction installation take?",
          answer:
            "The total time depends on the scope of work. Installing a radiant barrier alone typically takes 2–3 hours. Adding a powered ventilation fan takes 1–2 hours. A comprehensive project that includes radiant barrier, fan installation, and vent optimization can be completed in a single day for most homes. We'll outline the timeline in the written estimate.",
        },
        {
          question: "Does attic heat reduction help in winter too?",
          answer:
            "Yes, though the primary benefit is in summer. In winter, a properly ventilated and insulated attic prevents warm, moist interior air from condensing on the cold roof deck, which can cause mold and wood rot over time. Attic insulation improvements that reduce summer heat gain also reduce winter heat loss, lowering both cooling and heating costs year-round.",
        },
        {
          question: "Is a radiant barrier or better insulation more effective for my attic?",
          answer:
            "Radiant barriers block radiant heat transfer from the hot roof deck into the attic air space — they're most effective when there's a significant temperature difference between the roof and the attic. Insulation slows conductive heat transfer from the attic into the living space below. For most LA homes, the two work best together: a radiant barrier reduces how hot the attic gets, and ceiling insulation minimizes how much of that remaining heat reaches your living space.",
        },
      ]}
    />
  );
}
