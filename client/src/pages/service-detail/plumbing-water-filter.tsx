import { ServiceDetailTemplate } from "./template";

export default function PlumbingWaterFilter() {
  return (
    <ServiceDetailTemplate
      serviceName="Reverse Osmosis Water Filtration"
      slug="plumbing-water-filter"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/moen-smart-water-shutoff.webp"
      tagline="Under-sink reverse osmosis water filtration for clean, purified drinking water"
      duration="2-3 hours"
      startingPrice="Starting at $299"
      overview={[
        "Los Angeles tap water meets federal safety standards, but it consistently ranks among the worst-tasting municipal water in the country due to its high mineral content, chloramine disinfection byproducts, and the long distances it travels through aging distribution infrastructure. Many LA homeowners detect a chlorine or earthy taste in their tap water that makes it unappealing to drink — and they spend hundreds of dollars annually on bottled water as a result. A professionally installed reverse osmosis system solves this problem permanently at a fraction of the ongoing cost.",
        "Reverse osmosis works by forcing water under pressure through a semi-permeable membrane that physically blocks molecules larger than water. A typical 5-stage system includes a sediment pre-filter to remove particles, a carbon block to remove chlorine and volatile organic compounds before they damage the membrane, the RO membrane itself (which removes lead, arsenic, fluoride, nitrates, and dissolved solids), a post-carbon polishing filter, and a dedicated pressurized storage tank that holds 3 to 5 gallons of purified water ready on demand. The result is water that is cleaner than most bottled brands.",
        "We install the system entirely under the kitchen sink with a dedicated filtered water faucet mounted through an existing or new hole in the sink or counter. The system requires a connection to the cold water supply, a drain line to the P-trap, and a 120V outlet (which most under-sink cabinets already have). Installation takes 2 to 3 hours, and you'll have purified drinking water flowing within the same appointment. We provide a written filter replacement schedule so you always know when maintenance is due.",
      ]}
      keyBenefits={[
        "Removes 99% of contaminants including chlorine, lead, and fluoride",
        "5-stage filtration system with polishing filter",
        "Dedicated purified water faucet installed at sink",
        "3-5 gallon storage tank included",
        "Filter replacement reminder service",
        "Costs pennies per gallon vs. dollars for bottled water",
      ]}
      whatWeInclude={[
        "Under-sink space assessment",
        "Cold water feed saddle valve installation",
        "Drain connection to P-trap",
        "Pressurized storage tank installation",
        "RO membrane and all filter stage installation",
        "Dedicated drinking water faucet installation",
        "System pressurizing and initial flush",
        "Water quality test before and after",
        "Written filter replacement schedule",
      ]}
      relatedServices={[
        { name: "SMART SHUTOFF VALVE", slug: "plumbing-shutoff" },
        { name: "Sink & Faucet Replacement", slug: "plumbing-sink" },
        { name: "General Plumbing Services", slug: "plumbing-general" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What contaminants does reverse osmosis actually remove?",
          answer:
            "A properly functioning 5-stage RO system removes dissolved solids, lead (down to 98%), arsenic, fluoride, nitrates and nitrites, chlorine and chloramines, chromium 6, sediment, cysts like giardia and cryptosporidium, and many pharmaceutical compounds. It does not remove dissolved gases like radon, though the post-carbon filter handles most volatile organic compounds. For LA water specifically, it dramatically reduces the chloramine taste and eliminates the mineral hardness that leaves scale deposits.",
        },
        {
          question: "How often do the filters need replacing?",
          answer:
            "The pre-sediment and carbon pre-filters should be replaced every 6 to 12 months depending on your water quality and usage volume. The RO membrane typically lasts 2 to 3 years before its rejection rate begins declining. The post-carbon polishing filter should be replaced annually. We provide a dated maintenance card with your installation so you always know what's due and when. Filter replacement is a DIY-friendly task once the system is installed.",
        },
        {
          question: "Is RO water cheaper than buying bottled water?",
          answer:
            "Significantly cheaper. A family that spends $50 per month on bottled water will pay approximately $600 per year. An RO system installed by us typically costs $299 to $499 for the unit and installation, with $60 to $100 in annual filter replacement costs. You break even in less than a year and enjoy cleaner water from the tap at roughly $0.02 per gallon — compared to $1.00 or more per gallon for bottled.",
        },
        {
          question: "Does reverse osmosis waste a lot of water?",
          answer:
            "Traditional RO membranes have a 3:1 or 4:1 waste ratio — producing 3 to 4 gallons of drain water for every gallon of purified water. Modern high-efficiency membranes and permeate pumps improve this to closer to 1:1. While there is some water waste, the amount is small relative to daily household usage — typically 2 to 5 gallons per day for an average family. If water conservation is a priority, we can recommend a permeate pump upgrade.",
        },
        {
          question: "Will the RO system reduce my water pressure at the filtered faucet?",
          answer:
            "The dedicated RO faucet draws from a pressurized storage tank, not directly from the membrane, so flow at that faucet is normal and satisfying. The system does not affect pressure at any other faucets in your home. The tank refills between uses, so you have filtered water available immediately when you turn on the dedicated spout.",
        },
      ]}
    />
  );
}
