import { ServiceDetailTemplate } from "./template";

export default function OutdoorSod() {
  return (
    <ServiceDetailTemplate
      serviceName="Sod Installation"
      slug="outdoor-sod"
      category="Outdoor & Property"
      categoryColor="green"
      heroVideo="/videos/svc-landscaping.mp4"
      heroImage="/images/svc-sod-installation.png"
      tagline="San Augustine and RTF sod installation with professional soil preparation across Los Angeles"
      overview={[
        "A new sod lawn transforms a bare or patchy yard into a lush, usable outdoor space almost overnight. Unlike seeding, which takes weeks to germinate and months to establish, sod is instantly walkable after proper installation (with appropriate care) and provides immediate erosion control, cooling, and curb appeal. We source our sod from quality California farms, cutting it fresh to order for delivery to your property.",
        "The foundation of a lasting sod lawn is proper soil preparation — the step that most DIY sod installations get wrong. We rototill the existing soil to a 4–6 inch depth, incorporate our 50/50 organic mix to improve drainage and nutrient content, and grade the area to a smooth, even surface with proper slope for water runoff. Installing sod on hard, nutrient-poor soil leads to shallow roots and a lawn that struggles within months.",
        "We offer two primary sod varieties for Los Angeles. San Augustine (St. Augustine) grass is a warm-season variety that thrives in LA's climate, handles moderate shade, and produces a dense, lush carpet ideal for backyards. RTF (Regenerating Turf Fescue) is a cool-season variety that stays green year-round, tolerates foot traffic extremely well, and requires less water than traditional fescue blends. We help you choose based on your sun exposure, water budget, and use requirements.",
      ]}
      keyBenefits={[
        "Instant lawn — usable within 2–3 weeks of installation vs months for seed",
        "San Augustine (warm-season) and RTF Fescue (year-round green) varieties",
        "Full soil preparation: rototilling, organic amendment, and grading included",
        "Smart irrigation installation available as part of the same project",
        "Fresh-cut sod delivered from California farms on installation day",
        "Detailed establishment watering schedule and care instructions provided",
      ]}
      whatWeInclude={[
        "Old lawn removal (dead grass, weeds, debris)",
        "Rototilling to 4–6 inch depth",
        "50/50 organic soil amendment incorporation",
        "Grading and leveling with proper drainage slope",
        "Fresh sod delivery and laying",
        "Row staggering and seam placement for minimum visibility",
        "Heavy roller compaction for root-to-soil contact",
        "Irrigation head adjustment to cover new sod area",
        "Establishment watering schedule and first watering",
        "Care and mowing instructions",
      ]}
      duration="1-2 days"
      startingPrice="Starting at $1.50/sq ft"
      relatedServices={[
        { name: "Smart Irrigation Systems", slug: "outdoor-irrigation" },
        { name: "Landscaping Design & Installation", slug: "outdoor-landscaping" },
        { name: "Planting & Garden Care", slug: "outdoor-planting" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What is the difference between San Augustine and RTF sod for Los Angeles?",
          answer: "San Augustine (also called St. Augustine) is a warm-season grass that turns semi-dormant in winter — it may look slightly less vibrant from December through February but recovers quickly in spring. It's extremely heat-tolerant and handles partial shade well. RTF Fescue stays green year-round in LA's mild climate and is more drought-tolerant, but prefers full sun. For backyards with shade trees, San Augustine usually performs better.",
        },
        {
          question: "How soon can I walk on new sod?",
          answer: "Light foot traffic is acceptable after 2 weeks if the sod has rooted well — you can test this by gently tugging a corner. Full normal use, including children playing and pets, is best delayed until 3–4 weeks after installation. Heavy foot traffic, lawn furniture, and mowing should wait until the sod has fully knitted to the soil, typically 3–6 weeks depending on the season.",
        },
        {
          question: "How much does sod installation cost per square foot?",
          answer: "Our sod installation starts at $1.50 per square foot, which includes soil preparation, sod material, and installation. The final price depends on the area size, degree of existing lawn removal needed, grading complexity, and whether irrigation work is included. We provide a detailed written estimate after measuring your property.",
        },
        {
          question: "How often does new sod need to be watered?",
          answer: "For the first 2 weeks, new sod needs daily watering — twice daily in summer heat. Keep the soil moist but not standing in water. After 2–3 weeks, reduce to every other day as roots deepen. By week 4–6, you can transition to a normal irrigation schedule. We provide a specific watering calendar for your lawn and installation date.",
        },
        {
          question: "When is the best time of year to install sod in Los Angeles?",
          answer: "Los Angeles's mild climate allows sod installation year-round, but the best times are spring (March–May) and fall (September–November) when temperatures are moderate and natural rainfall provides some supplemental moisture. Summer installation is possible but requires more diligent watering. Winter installation for San Augustine should be avoided as the grass is semi-dormant and establishment is slower.",
        },
      ]}
    />
  );
}
