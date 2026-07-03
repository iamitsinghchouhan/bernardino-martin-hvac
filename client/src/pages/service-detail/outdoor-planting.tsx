import { ServiceDetailTemplate } from "./template";

export default function OutdoorPlanting() {
  return (
    <ServiceDetailTemplate
      serviceName="Planting & Garden Care"
      slug="outdoor-planting"
      category="Outdoor & Property"
      categoryColor="green"
      heroVideo="/videos/svc-landscaping.mp4"
      heroImage="/images/svc-planting.png"
      tagline="Seasonal planting, garden bed installation, and expert garden care for Los Angeles properties"
      overview={[
        "Los Angeles is one of the rare cities where something is always in bloom — the climate allows for gardening in every month of the year. Whether you want a dramatic entry with colorful seasonal annuals, a productive kitchen garden with herbs and vegetables, or a naturalistic garden with California native wildflowers, our planting team has the horticultural knowledge to select and install the right plants for your specific conditions.",
        "Proper planting technique is far more important than most homeowners realize. Plants installed at the wrong depth, in compacted soil, or without adequate root space consistently fail — regardless of how much they're watered afterward. Our team amends planting holes with appropriate organic material, plants at the exact right depth for each species, stakes trees with proper two-stake or three-stake systems that don't girdle the trunk, and applies mulch to retain moisture and moderate soil temperature.",
        "Beyond installation, we offer ongoing garden maintenance visits that include pruning to shape and encourage blooming, fertilizing on the right schedule for each plant's needs, pest and disease monitoring with integrated pest management approaches, and seasonal color rotations that keep your garden looking its best throughout the year.",
      ]}
      keyBenefits={[
        "LA-appropriate plant selection for your specific sun exposure and soil",
        "Drought-tolerant and California native options for water conservation",
        "Proper planting technique — correct depth, soil amendment, and spacing",
        "Fruit tree planting including citrus, avocado, fig, and stone fruit",
        "Raised bed construction and soil filling for vegetable and herb gardens",
        "Seasonal color rotation plans to keep gardens vibrant year-round",
      ]}
      whatWeInclude={[
        "Site assessment: sun exposure, soil, and drainage analysis",
        "Plant selection consultation matched to your conditions and vision",
        "Soil amendment and preparation for each planting location",
        "Plant installation at correct depth and spacing",
        "Tree staking for specimens over 5 feet",
        "Drip emitter installation at each new plant",
        "2–3 inch mulch layer throughout planting areas",
        "Initial deep watering after installation",
        "Written care instructions for each plant species installed",
        "30-day establishment check visit",
      ]}
      duration="2-6 hours"
      startingPrice="Starting at $149"
      relatedServices={[
        { name: "Landscaping Design & Installation", slug: "outdoor-landscaping" },
        { name: "Sod Installation", slug: "outdoor-sod" },
        { name: "Smart Irrigation Systems", slug: "outdoor-irrigation" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What flowers and plants bloom year-round in Los Angeles?",
          answer: "Several plants provide near year-round color in LA: bougainvillea (summer–fall peak, sporadic other times), lantana (warm months), salvia varieties (spring and fall peak), bird of paradise (late winter through summer), and succulents like aloe and echeveria that flower at different times. Combining species with different bloom cycles creates a garden with something always in color.",
        },
        {
          question: "What fruit trees grow best in Los Angeles?",
          answer: "Los Angeles is excellent for citrus (navel orange, lemon, grapefruit, lime, mandarin), avocado (Hass in most areas), fig, pomegranate, persimmon, and guava. Stone fruits like peaches and plums need enough winter cold hours — they work well in the San Fernando Valley and foothill areas but may underperform near the coast. We match fruit tree selection to your specific location.",
        },
        {
          question: "How deep should plants be planted?",
          answer: "The universal rule is to plant the root crown (where roots meet stem) at or slightly above ground level — never buried. Burying the crown encourages rot and disease. The planting hole should be 2–3 times wider than the root ball to allow roots to spread easily, but not deeper than the root ball height. We follow these principles for every plant we install.",
        },
        {
          question: "Why is mulch important for a new planting?",
          answer: "In LA's long dry summers, mulch is essential. A 2–3 inch layer of organic mulch (shredded bark, wood chips, or compost) reduces soil moisture loss by up to 70%, keeps soil temperature cooler in summer heat, suppresses weeds, and gradually improves soil structure as it decomposes. New plants in unmulched beds in LA often struggle even with regular irrigation.",
        },
        {
          question: "Do you offer ongoing garden maintenance after planting?",
          answer: "Yes. We offer monthly or bi-monthly maintenance visits that include pruning, fertilizing, pest monitoring, irrigation adjustment, and seasonal plant replacement as needed. For larger gardens, we create a maintenance calendar specific to your plant palette so the right care happens at the right time of year for each species.",
        },
      ]}
    />
  );
}
