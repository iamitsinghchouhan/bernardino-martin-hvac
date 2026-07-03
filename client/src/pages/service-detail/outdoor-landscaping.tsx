import { ServiceDetailTemplate } from "./template";

export default function OutdoorLandscaping() {
  return (
    <ServiceDetailTemplate
      serviceName="Landscaping Design & Installation"
      slug="outdoor-landscaping"
      category="Outdoor & Property"
      categoryColor="green"
      heroVideo="/videos/svc-landscaping.mp4"
      heroImage="/images/svc-landscaping.png"
      tagline="Custom landscape design built for Los Angeles climate, water conservation, and your lifestyle"
      overview={[
        "Los Angeles's mild climate allows for truly year-round gardening, but it also demands a different design philosophy than most parts of the country. Our landscape designs prioritize plants that thrive in Southern California's long dry summers and mild wet winters, choosing species that look beautiful without constant irrigation. From drought-tolerant Mediterranean gardens to tropical paradises fed by efficient drip systems, we design landscapes that match how you actually want to use your outdoor space.",
        "The design process starts with an in-depth consultation at your property. We assess sun exposure throughout the day, existing soil condition, drainage patterns, view angles from the house, and how you envision using the space — entertaining, children's play area, kitchen garden, or a low-maintenance front yard with strong curb appeal. For larger projects, we provide a detailed planting plan with plant list and layout before any work begins.",
        "Beyond plants, we coordinate all hardscape, irrigation, and outdoor lighting that completes the landscape vision. Our team handles the full project from soil preparation and grading through final planting and mulching, working with our other trade divisions to add irrigation, outdoor lighting, or hardscape elements in a single coordinated project.",
      ]}
      keyBenefits={[
        "Free design consultation and site assessment for every project",
        "Drought-tolerant and California-native plant options for water conservation",
        "Fire-resistant landscaping available for hillside and WUI zone properties",
        "Full project management — design, plants, soil, irrigation, and cleanup",
        "Year-round planting calendar takes advantage of LA's mild climate",
        "30-day plant establishment warranty on all installed plant material",
      ]}
      whatWeInclude={[
        "On-site design consultation and property assessment",
        "Planting plan with species list for larger projects",
        "Site preparation, grading, and drainage correction",
        "Soil amendment with organic mix for root establishment",
        "Plant sourcing and installation at proper depth and spacing",
        "Tree staking and support for large specimens",
        "Drip and irrigation system integration",
        "Mulch application (2–3 inch depth) throughout planting beds",
        "Clean-up and haul-away of all construction debris",
        "30-day follow-up check for plant health and establishment",
      ]}
      duration="1-5 days"
      startingPrice="Free estimate"
      relatedServices={[
        { name: "Sod Installation", slug: "outdoor-sod" },
        { name: "Smart Irrigation Systems", slug: "outdoor-irrigation" },
        { name: "Planting & Garden Care", slug: "outdoor-planting" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What plants work best in Los Angeles landscaping?",
          answer: "Top performers for LA landscapes include lavender, rosemary, salvia, agave, succulents, bougainvillea, bird of paradise, California poppy, native grasses, and olive trees. These plants are adapted to dry summers and look excellent year-round with minimal water once established. We customize selections based on your specific sun exposure, soil type, and aesthetic preferences.",
        },
        {
          question: "How long does new landscaping take to look established?",
          answer: "Most plants look somewhat sparse for the first 6–12 months as they establish their root systems. By the second growing season, most landscapes fill in significantly. Faster-growing species like lantana, bougainvillea, and ornamental grasses provide quicker coverage. We factor establishment rate into our plant selection so your landscape looks great even in the first year.",
        },
        {
          question: "Do you offer fire-resistant landscaping for hillside properties?",
          answer: "Yes. For properties in Los Angeles's Very High Fire Hazard Severity Zones (common in the hills, canyons, and Malibu), we design landscapes using fire-resistant species and create defensible space per CAL FIRE guidelines. Plants like ice plant, California fuchsia, and rock gardens are both fire-resistant and attractive. We also advise on clearance zones and fuel management.",
        },
        {
          question: "Do landscaping projects require permits in Los Angeles?",
          answer: "Most residential landscaping — planting, mulching, and sod installation — does not require permits. Projects that do require permits include grading of significant quantities of soil, retaining walls over a certain height, tree removal of certain species or on hillside properties, and installation of permanent irrigation or lighting systems. We identify permit requirements during the design phase.",
        },
        {
          question: "Can you work around my existing mature trees?",
          answer: "Absolutely — and we strongly recommend preserving healthy mature trees whenever possible. They provide shade, property value, and habitat that takes decades to replace. We design around existing trees, respecting their root zones during soil work, and selecting companion plants appropriate for the shade or competition conditions under the canopy.",
        },
      ]}
    />
  );
}
