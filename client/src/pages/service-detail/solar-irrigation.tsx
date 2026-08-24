import { ServiceDetailTemplate } from "./template";

export default function SolarIrrigation() {
  return (
    <ServiceDetailTemplate
      serviceName="Solar-Powered Irrigation"
      slug="solar-irrigation"
      category="Solar & Energy"
      categoryColor="amber"
      heroVideo="/videos/svc-solar-irrigation.mp4"
      heroImage="/images/svc-smart-irrigation.png"
      tagline="Eco-friendly solar-powered watering systems — run your irrigation for free with sunshine"
      overview={[
        "Solar-powered irrigation combines two of the most impactful home improvements available in Los Angeles: solar energy generation and smart water management. A solar irrigation system uses a dedicated solar pump or solar-charged battery to power your irrigation controller and pump, eliminating electricity costs for outdoor watering entirely. This is particularly valuable for properties with large landscapes, orchard areas, or multiple irrigation zones.",
        "Unlike connecting irrigation to your home's main solar system (which works but competes with other electrical loads), a dedicated solar irrigation setup uses its own small panel array sized precisely for the pump's requirements. This means your irrigation runs reliably even if your home battery is depleted, and the system can operate in remote areas of the property without running electrical conduit from the house.",
        "We pair solar irrigation with smart controllers that connect to your smartphone for zone-by-zone scheduling, weather-based adjustments, and leak detection. During LA's mandatory watering restriction periods, the smart controller ensures you remain compliant automatically, while the solar power means you're not adding to your electricity bill during already-expensive summer rate periods.",
      ]}
      keyBenefits={[
        "Runs irrigation at zero ongoing electricity cost using solar power",
        "Operates independently from home solar — dedicated irrigation panel array",
        "App-controlled scheduling with weather-based automatic adjustments",
        "Works during grid power outages — fully off-grid capable",
        "Qualifies for both solar and water conservation rebates",
        "Expandable — add zones or increase pump capacity as your garden grows",
      ]}
      whatWeInclude={[
        "Water and energy needs assessment",
        "Solar panel sizing for irrigation pump requirements",
        "Solar panel and mounting installation",
        "Solar pump or battery controller installation",
        "Drip and sprinkler zone installation",
        "Smart irrigation controller setup",
        "Smartphone app pairing and programming",
        "Flow sensor and automatic shutoff installation",
        "Zone-by-zone coverage test",
        "Owner operation and scheduling training",
      ]}
      duration="3-5 hours"
      startingPrice="Starting at $399"
      relatedServices={[
        { name: "Solar Panel Installation", slug: "solar-install" },
        { name: "Smart Irrigation Systems", slug: "outdoor-irrigation" },
        { name: "Landscaping Design & Installation", slug: "outdoor-landscaping" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How does a solar irrigation system work?",
          answer: "A small solar panel array (typically 1–2 panels) charges a battery or powers a DC pump directly. The solar controller manages when the pump runs based on sunlight availability and your programmed schedule. On cloudy days, the battery provides backup so your plants still get watered on schedule.",
        },
        {
          question: "Will it still work on cloudy days?",
          answer: "Yes. The battery storage component ensures your irrigation runs on schedule regardless of daily weather. The battery is sized to provide 2–3 days of irrigation runtime without any solar input, so short cloudy periods have no impact on your watering schedule.",
        },
        {
          question: "How much can I save on water and electricity bills?",
          answer: "By eliminating electricity cost for irrigation (which can run 30–60 minutes daily during summer), you save on your electricity bill. Combined with smart scheduling that reduces water waste by 30–50% compared to traditional timers, total utility savings can exceed $300–600 per year for a typical Los Angeles property.",
        },
        {
          question: "How many irrigation zones can a solar system handle?",
          answer: "A standard residential solar irrigation setup handles 6–12 zones comfortably. Larger properties with more zones require a larger battery bank and pump, which we size during the initial assessment. There is no practical upper limit — commercial orchards and farms use solar irrigation systems at any scale.",
        },
        {
          question: "Are there rebates for solar irrigation in Los Angeles?",
          answer: "Yes — potentially from two programs. The federal solar Investment Tax Credit (30%) applies to the solar components. Additionally, LADWP, LA County, and the Metropolitan Water District all offer rebates for smart irrigation controllers that reduce water waste. We help you identify and apply for applicable rebates during the project.",
        },
      ]}
    />
  );
}
