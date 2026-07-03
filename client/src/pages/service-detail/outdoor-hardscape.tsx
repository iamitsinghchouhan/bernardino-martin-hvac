import { ServiceDetailTemplate } from "./template";

export default function OutdoorHardscape() {
  return (
    <ServiceDetailTemplate
      serviceName="Hardscape — Driveways & Patios"
      slug="outdoor-hardscape"
      category="Outdoor & Property"
      categoryColor="green"
      heroVideo="/videos/svc-landscaping.mp4"
      heroImage="/images/svc-landscaping.png"
      tagline="Stamped concrete driveways, patios, pool coping, and outdoor living spaces in Los Angeles"
      overview={[
        "A well-designed hardscape dramatically increases the usability and value of your property. In Los Angeles's indoor-outdoor lifestyle, a beautifully finished patio, driveway, or pool deck transforms underutilized outdoor space into an extension of the living area. We design and install stamped concrete, plain concrete, exposed aggregate, and paver hardscape for driveways, patios, walkways, pool decks, outdoor kitchens, and fire pit areas.",
        "Stamped concrete offers the beauty of natural stone, brick, or wood at a fraction of the cost and with significantly less maintenance. We offer dozens of pattern options — including Ashlar slate, cobblestone, flagstone, wood plank, and herringbone — combined with integral color and antiquing release agents that create remarkably realistic finishes. Stamped concrete is sealed for protection against Los Angeles's UV exposure and occasional winter rainfall.",
        "Proper drainage is the most critical technical aspect of any hardscape project in Los Angeles. We engineer every installation with adequate slope away from structures, and install drains, channels, or French drain systems where needed to manage the concentrated runoff that hardscape creates. Improper drainage is the most common cause of hardscape failures and property water damage in the region.",
      ]}
      keyBenefits={[
        "Stamped concrete in dozens of patterns and integral color combinations",
        "Pavers, flagstone, travertine, and exposed aggregate options",
        "Proper drainage engineering — slope and drainage channels included",
        "Outdoor kitchen and fire pit integration",
        "Pool deck resurfacing and new coping installation",
        "Free 3D design rendering for major projects",
      ]}
      whatWeInclude={[
        "Site survey and design consultation",
        "Drainage assessment and engineering",
        "Excavation to proper depth for base",
        "Compacted aggregate sub-base installation",
        "Rebar or wire mesh reinforcement",
        "Concrete pour with integral color",
        "Stamp pattern application",
        "Antiquing release agent application",
        "Joint sawing and sealing",
        "Final sealer coat application",
        "Post-cure sealing at 28 days",
      ]}
      duration="2-5 days"
      startingPrice="Free estimate"
      relatedServices={[
        { name: "Landscaping Design & Installation", slug: "outdoor-landscaping" },
        { name: "Planting & Garden Care", slug: "outdoor-planting" },
        { name: "Smart Irrigation Systems", slug: "outdoor-irrigation" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How does stamped concrete compare to pavers for a Los Angeles patio?",
          answer: "Stamped concrete is less expensive upfront ($12–$22 per square foot installed vs $15–$30 for pavers), presents a seamless surface, and is faster to install. Pavers can be removed and replaced individually if damaged, allow for better natural drainage through joints, and can be reset if settling occurs. Both are excellent long-term surfaces — the choice often comes down to design aesthetic and budget.",
        },
        {
          question: "How long does concrete last in Los Angeles?",
          answer: "Properly installed and sealed concrete in LA's mild climate lasts 25–50 years. The main threats are tree root intrusion (we can install root barriers at the perimeter), seismic movement creating crack planes (we saw control joints to control where cracks occur), and UV fading (periodic resealing every 3–5 years maintains color and protects the surface).",
        },
        {
          question: "Do patios and driveways require permits in Los Angeles?",
          answer: "It depends on the project. Patio slabs generally do not require permits. Driveways require a permit from LA Public Works when they involve curb cutting or changes to the approach from the street. Retaining walls over 4 feet require structural permits. We identify permit requirements during the estimate and include them in the project.",
        },
        {
          question: "How much maintenance does stamped concrete require?",
          answer: "Low maintenance compared to natural stone or pavers. The main requirement is periodic resealing every 3–5 years, which refreshes color and protects the surface. A pressure washing before resealing removes accumulated dirt and grime. Stamped concrete doesn't grow weeds in joints (unlike pavers), doesn't settle unevenly (unlike flagstone with sand setting bed), and doesn't require sanding joint maintenance.",
        },
        {
          question: "Can you resurface or restore an existing concrete driveway without full replacement?",
          answer: "In many cases, yes. Concrete overlay systems can be applied over existing concrete in good structural condition (no major cracking, heaving, or subsurface voids) to give it a fresh stamped or textured surface. This costs significantly less than full removal and replacement. We evaluate whether your existing concrete is a good candidate during the estimate.",
        },
      ]}
    />
  );
}
