import { ServiceDetailTemplate } from "./template";

export default function Handyman() {
  return (
    <ServiceDetailTemplate
      serviceName="Handyman"
      slug="handyman"
      category="Home Services"
      categoryColor="amber"
      heroImage="/images/rebrand/tile-handyman.png"
      tagline="Small repairs, mounting, and general fixes for homes across Los Angeles"
      overview={[
        "Not every job needs a full service call — sometimes it's a squeaky door, a loose fence board, a shelf that needs mounting, or a small drywall patch. Our handyman service covers the smaller jobs that still deserve a licensed, reliable team.",
        "Tell us what needs fixing around your home and we'll let you know if it's a quick handyman visit or if it calls for one of our specialty teams (HVAC, plumbing, electrical, etc.) instead.",
      ]}
      keyBenefits={[
        "General repairs, mounting, and small fixes",
        "One call covers a list of small jobs, not just one",
        "Backed by the same licensed, insured team behind our other services",
        "Straightforward pricing after a quick conversation about the job",
      ]}
      whatWeInclude={[
        "Furniture and TV mounting",
        "Door, cabinet, and drawer adjustments",
        "Minor drywall patching and touch-ups",
        "Shelving and fixture installation",
        "General small repairs around the home",
      ]}
      duration="Varies by job"
      startingPrice="Free quote — call for pricing"
      relatedServices={[]}
      cityLinks={[]}
      faqs={[
        {
          question: "What kind of jobs count as handyman work versus a specialty service?",
          answer: "General repairs, mounting, and small fixes are handyman work. Anything involving gas lines, electrical panels, or major systems gets routed to our licensed HVAC, plumbing, or electrical teams instead — just describe the job and we'll point you the right way.",
        },
        {
          question: "Can I bundle several small jobs into one visit?",
          answer: "Yes — tell us everything on your list and we'll scope one visit to cover as much of it as makes sense.",
        },
        {
          question: "How is pricing determined?",
          answer: "Pricing depends on the job and how long it takes. Call our team, describe what needs fixing, and we'll give you a straightforward quote.",
        },
      ]}
    />
  );
}
