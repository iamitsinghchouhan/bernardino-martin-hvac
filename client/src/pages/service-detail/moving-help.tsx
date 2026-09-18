import { ServiceDetailTemplate } from "./template";

export default function MovingHelp() {
  return (
    <ServiceDetailTemplate
      serviceName="Moving Help"
      slug="moving-help"
      category="Home Services"
      categoryColor="purple"
      heroImage="/images/rebrand/tile-moving.png"
      tagline="Loading, hauling, and heavy lifting for moves across Los Angeles"
      overview={[
        "Moving is one of the most physically demanding jobs a homeowner takes on — heavy furniture, awkward staircases, and a deadline that doesn't move with you. Our team offers moving help for customers who need an extra set of hands, whether that's for a full move or just the heaviest items.",
        "From loading a truck to hauling away furniture and appliances you're leaving behind, tell us what you need moved and where, and we'll put together a plan and a quote.",
      ]}
      keyBenefits={[
        "Help with loading, unloading, and heavy lifting",
        "Furniture and appliance hauling",
        "Flexible scheduling around your move date",
        "Easy to bundle with a new installation that needs old equipment removed",
      ]}
      whatWeInclude={[
        "Loading and unloading assistance",
        "Heavy furniture and appliance moving",
        "Hauling away unwanted items",
        "Careful handling of doorways, stairs, and tight spaces",
        "Coordination around your move-out or move-in date",
      ]}
      duration="Varies by job"
      startingPrice="Free quote — call for pricing"
      relatedServices={[]}
      cityLinks={[]}
      faqs={[
        {
          question: "Can you help with just the heavy items, not a full move?",
          answer: "Yes — many customers just need help with a few heavy pieces like appliances or furniture. Tell us what you need moved and we'll scope it out.",
        },
        {
          question: "Can moving help be combined with an installation, like a new HVAC unit or water heater?",
          answer: "Yes — if we're installing new equipment at your home, ask about having the old unit hauled away as part of the same visit.",
        },
        {
          question: "How is pricing determined?",
          answer: "Pricing depends on what's being moved, how much, and the distance involved. Call our team with the details and we'll give you a straightforward quote.",
        },
      ]}
    />
  );
}
