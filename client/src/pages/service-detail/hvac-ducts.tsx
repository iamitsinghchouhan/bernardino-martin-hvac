import { ServiceDetailTemplate } from "./template";

export default function HvacDucts() {
  return (
    <ServiceDetailTemplate
      serviceName="Duct Cleaning & Installation"
      slug="hvac-ducts"
      category="HVAC & Heating"
      categoryColor="blue"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/svc-clean-ducts.webp"
      tagline="Clean, sealed, and properly sized ductwork for maximum airflow and air quality"
      overview={[
        "The ductwork in your home is essentially the respiratory system of your HVAC equipment. Over time, it accumulates dust, debris, pet dander, mold spores, and in some cases rodent nesting material — all of which reduce airflow efficiency and circulate contaminants through every room every time the system runs. A professional duct cleaning using HEPA-filtered vacuum equipment removes this buildup at the source rather than just pushing it back into the living space.",
        "Leaking duct connections are one of the most overlooked sources of energy waste in LA homes. The U.S. Department of Energy estimates that the typical home loses 20–30% of its conditioned air through duct leaks — air that has already been cooled or heated but escapes into unconditioned attic or crawlspace before reaching the room it was meant for. We locate and seal these leaks with mastic compound or UL-listed foil tape, which provides a lasting airtight seal that duct tape alone cannot deliver.",
        "For homes undergoing room additions, renovations, or whose existing ductwork is failing beyond repair, we design and fabricate new duct systems from scratch. Proper duct sizing is calculated using ACCA Manual D procedures to ensure each room receives the right volume of airflow for its load — not too much, not too little. New ductwork is fully insulated to R-8 per California Title 24 requirements and pressure-tested before sign-off.",
      ]}
      keyBenefits={[
        "Removes mold, dust, and debris from duct system",
        "Improves indoor air quality",
        "Restores proper airflow throughout home",
        "Sealing leaks saves 20-30% on energy bills",
        "Custom ductwork fabrication for additions",
        "Video inspection available",
      ]}
      whatWeInclude={[
        "Video inspection of ductwork",
        "HEPA-filtered vacuum cleaning",
        "Sanitization treatment",
        "Duct leak test",
        "Mastic or foil tape sealing of leaks",
        "Register and grille cleaning",
        "Blower door test (if requested)",
        "Post-cleaning airflow measurement",
      ]}
      duration="3-6 hours"
      startingPrice="Starting at $299"
      relatedServices={[
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
        { name: "Electrostatic Air Filtration", slug: "hvac-air-filtration" },
        { name: "AC Installation", slug: "hvac-install-ac" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How often should I have my ducts professionally cleaned?",
          answer:
            "The EPA and NADCA (National Air Duct Cleaners Association) recommend cleaning every 3–5 years for most homes. Clean more frequently if you have pets that shed heavily, household members with allergies or asthma, a recent renovation that generated drywall dust, visible mold inside ducts, or if you've recently moved into an older home with unknown maintenance history.",
        },
        {
          question: "What are the signs that my ducts need cleaning?",
          answer:
            "Key signs include visible dust puffs coming from supply registers when the system turns on, musty or stale odors that persist even after filter changes, rooms that are consistently difficult to heat or cool, noticeable dust accumulation on furniture shortly after cleaning, or visible mold or pest debris around register openings. An unexplained spike in allergy symptoms indoors is also a common indicator.",
        },
        {
          question: "Will duct cleaning help with my allergies?",
          answer:
            "It can — especially if allergens like dust mites, pet dander, mold spores, or rodent detritus have built up in the ductwork. However, duct cleaning is most effective as part of a broader approach that also includes regular filter replacement, electrostatic filtration, and humidity control. For allergy sufferers, we often recommend combining duct cleaning with our electrostatic air filtration installation for maximum relief.",
        },
        {
          question: "How much does professional duct cleaning cost?",
          answer:
            "Duct cleaning for an average 3-bedroom Los Angeles home typically runs $299–$599 depending on the number of vents, duct accessibility, and degree of contamination. Sanitization treatment and additional sealing work are quoted separately based on what the video inspection reveals. We provide a written estimate before any work begins.",
        },
        {
          question: "How do I know if I need duct cleaning or full duct replacement?",
          answer:
            "Cleaning is appropriate for ducts that are fundamentally sound but contaminated with dust and debris. Replacement makes more sense when ducts are crushed, disconnected, severely deteriorated (common in flex duct that's over 20 years old), or so heavily contaminated with mold that cleaning alone cannot restore them to a safe condition. Our video inspection determines which category applies to your system.",
        },
      ]}
    />
  );
}
