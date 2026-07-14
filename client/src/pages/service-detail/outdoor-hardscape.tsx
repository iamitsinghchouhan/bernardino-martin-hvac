import { useState } from "react";
import { ServiceDetailTemplate } from "./template";

const LOOKS = [
  {
    label: "Ashlar Slate — Mahogany",
    image: "/images/hardscape/hardscape-hero-mahogany-driveway.webp",
    alt: "Stamped concrete driveway in Ashlar Slate pattern with Mahogany integral color",
    description: "Large, irregular slate-look flagstones in a deep mahogany tone — a grand, high-contrast look for wide driveways.",
  },
  {
    label: "London Cobble — Ruby Red",
    image: "/images/hardscape/hardscape-texture-london-cobble-ruby-red.webp",
    alt: "Close-up texture of London Cobble stamped concrete pattern in Ruby Red integral color",
    description: "A traditional lightly-textured cobblestone look in a rich brick red — timeless on driveways and courtyards.",
  },
  {
    label: "European Fan — Sunrise Yellow",
    image: "/images/hardscape/hardscape-pool-deck-european-fan-sunrise.webp",
    alt: "Pool deck and patio stamped in European Fan pattern with Sunrise Yellow and Wheat tones at sunset",
    description: "Gently curved fan-shaped stones in warm sunrise tones — a striking choice for pool decks and patios.",
  },
];

/* Interactive photo-based look picker + before/after showcase, specific to this service. */
function HardscapeShowcase() {
  const [active, setActive] = useState(0);
  const look = LOOKS[active];

  return (
    <>
      {/* Before / After */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">See the Transformation</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              A cracked, faded driveway resurfaced with stamped concrete — same footprint, completely new curb appeal.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="/images/hardscape/hardscape-before-after-flagstone.webp"
              alt="Before and after comparison: plain cracked concrete driveway on the left, resurfaced stamped concrete flagstone driveway on the right"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Interactive look picker */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Explore Our Most Popular Looks</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Pick a pattern and color combination below to see it in a real setting.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {LOOKS.map((l, i) => (
              <button
                key={l.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
                  i === active
                    ? "bg-slate-950 text-white border-slate-950"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
            <img
              src={look.image}
              alt={look.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-h-[520px] object-cover"
            />
            <div className="p-6 text-center">
              <p className="font-bold text-slate-900">{look.label}</p>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl mx-auto">{look.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function OutdoorHardscape() {
  return (
    <ServiceDetailTemplate
      serviceName="Hardscape — Driveways & Patios"
      slug="outdoor-hardscape"
      category="Outdoor & Property"
      categoryColor="green"
      heroVideo="/videos/svc-landscaping.mp4"
      heroImage="/images/hardscape/hardscape-hero-mahogany-driveway.webp"
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
      colorOptions={[
        { name: "Caribbean Blue", hex: "#2C7A6B" },
        { name: "Forest Green", hex: "#5F6B5A" },
        { name: "Graham Cracker", hex: "#D99A7C" },
        { name: "Onyx", hex: "#3B4048" },
        { name: "Mahogany", hex: "#6E2A3A" },
        { name: "Royal Blue", hex: "#3A4A5E" },
        { name: "Ruby Red", hex: "#9E3B3B" },
        { name: "Sunbaked Orange", hex: "#D98950" },
        { name: "Tree Bark", hex: "#4A2E35" },
        { name: "Wheat", hex: "#C97B57" },
        { name: "Sunrise Yellow", hex: "#D98F5F" },
        { name: "White", hex: "#DCD3C0" },
        { name: "Gray", hex: "#9C9C94" },
      ]}
      patternOptions={[
        { name: "Ashlar Slate", description: "Large, irregular slate-look flagstones — ideal for wide driveways and grand entries." },
        { name: "Flagstone", description: "Organic, curved-edge stone shapes for a natural garden-path aesthetic." },
        { name: "Wood Plank", description: "Realistic wood grain and plank joints — a warm look for pool decks without real wood's upkeep." },
        { name: "Herringbone", description: "Classic diagonal brick-laid pattern for walkways and courtyards." },
        { name: "London Cobble", description: "A traditional, lightly-textured cobblestone look — a timeless choice for driveways and courtyards." },
        { name: "European Fan", description: "An elegant fan pattern of gently curved rectangular stones — striking on circular driveways and entry courts." },
      ]}
      extraSection={<HardscapeShowcase />}
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
