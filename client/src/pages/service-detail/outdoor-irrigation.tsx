import { ServiceDetailTemplate } from "./template";

export default function OutdoorIrrigation() {
  return (
    <ServiceDetailTemplate
      serviceName="Smart Irrigation Systems"
      slug="outdoor-irrigation"
      category="Outdoor & Property"
      categoryColor="green"
      heroVideo="/videos/svc-irrigation.mp4"
      heroImage="/images/svc-smart-irrigation.png"
      tagline="App-controlled smart irrigation with weather-based scheduling and automatic leak protection"
      overview={[
        "Traditional irrigation timers run on a fixed schedule regardless of weather — watering the same amount whether it rained yesterday or temperatures are 55°F or 105°F. Smart irrigation controllers change this completely. They connect to local weather data and automatically adjust your watering schedule based on evapotranspiration, temperature, and recent rainfall, reducing outdoor water use by 30–50% compared to conventional timer systems.",
        "Our smart irrigation installations pair a smart controller (such as Rachio, Rain Bird, or Hunter) with properly designed drip zones for planting beds and optimized spray or rotor zones for lawn areas. Drip irrigation delivers water directly to plant root zones at low pressure, dramatically reducing evaporation and preventing the surface runoff that wastes water on hardscape. For Los Angeles properties under LADWP or regional water district restrictions, drip irrigation for non-lawn areas is often required and always encouraged.",
        "Smart shutoff valves and flow sensors are integral to our installations. A flow sensor detects when water is running at a higher rate than expected — indicating a broken sprinkler head, burst line, or open hose — and automatically shuts off irrigation to prevent water waste and property damage. Many insurance companies offer discounts of 5–10% on homeowner's insurance premiums for homes with qualified water monitoring systems.",
      ]}
      keyBenefits={[
        "Reduces outdoor water use 30–50% vs conventional timer systems",
        "Weather-based automatic scheduling — no manual seasonal adjustments needed",
        "App control for all zones from your smartphone from anywhere",
        "Flow sensor with automatic shutoff detects broken lines and heads",
        "Drip irrigation for planting beds eliminates runoff onto hardscape",
        "Insurance premium discount eligibility for smart water monitoring",
      ]}
      whatWeInclude={[
        "Irrigation zone assessment and layout design",
        "Smart controller selection and installation",
        "Zone valve installation or replacement",
        "Drip emitter and microspray installation for planting beds",
        "Spray or rotor head installation or upgrade for lawn zones",
        "Flow sensor installation on main irrigation line",
        "Smart shutoff integration",
        "Wi-Fi setup and app pairing",
        "Zone-by-zone scheduling and run-time programming",
        "Coverage test and head adjustment",
        "30-day follow-up scheduling adjustment visit",
      ]}
      duration="3-6 hours"
      startingPrice="Starting at $499"
      relatedServices={[
        { name: "SMART SHUTOFF VALVE", slug: "plumbing-shutoff" },
        { name: "Solar-Powered Irrigation", slug: "solar-irrigation" },
        { name: "Landscaping Design & Installation", slug: "outdoor-landscaping" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How much does a smart irrigation controller save on water bills?",
          answer: "EPA WaterSense studies show that smart controllers save an average of 15,000 gallons per year for a typical residential landscape. In Los Angeles, where water rates are high and tiered pricing penalizes heavy usage, that translates to $100–$300 per year for most homes. Larger properties with multiple zones save proportionally more.",
        },
        {
          question: "Will a smart controller work with my existing irrigation system?",
          answer: "In almost all cases, yes. Smart controllers connect to your existing zone valves and use the same low-voltage wiring. If your existing valves are functional (not leaking or seized), they continue working normally — only the controller brain is replaced. We assess your existing system when we arrive and advise if any valves or heads need replacement as part of the upgrade.",
        },
        {
          question: "What are the LA water restrictions and does a smart controller keep me compliant?",
          answer: "LADWP currently restricts outdoor watering to two days per week (or varies by water shortage tier). Smart controllers can be programmed to your specific watering day allowance and will not run on restricted days. Some controllers, like Rachio, have built-in water restriction settings by zip code that update automatically when restrictions change.",
        },
        {
          question: "What is the difference between drip and spray irrigation?",
          answer: "Spray heads emit a fan of water visible in the air — efficient for lawn areas but lose water to evaporation and wind drift. Drip irrigation emits water at ground level directly to plant root zones at very low flow rates — up to 90% efficiency vs 50–70% for spray heads. LADWP and California code now require drip or microspray for all non-lawn areas in new irrigation installations.",
        },
        {
          question: "Does the flow sensor work if a sprinkler head breaks overnight?",
          answer: "Yes — that's exactly what it's designed for. A broken sprinkler head or blown irrigation line runs water at a higher flow rate than the programmed zone expects. The flow sensor detects this anomaly in real time, automatically shuts off that zone (or the whole system, depending on settings), and sends an alert to your smartphone. You avoid significant water waste and potential property flooding.",
        },
      ]}
    />
  );
}
