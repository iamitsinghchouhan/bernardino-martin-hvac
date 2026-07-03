import { ServiceDetailTemplate } from "./template";

export default function PlumbingToilet() {
  return (
    <ServiceDetailTemplate
      serviceName="Toilet Replacement"
      slug="plumbing-toilet"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/svc-plumbing.webp"
      tagline="High-efficiency, water-saving toilet replacement with same-day installation in Los Angeles"
      overview={[
        "Toilets manufactured before 1994 use 3.5–7 gallons per flush, while today's WaterSense certified models use just 1.28 gallons — a reduction of over 60%. For an average Los Angeles household, replacing one old toilet saves approximately 16,000 gallons of water per year. With the Metropolitan Water District and LADWP actively offering rebates for qualifying toilet replacements, the upgrade often pays for itself within the first year.",
        "Our licensed plumbers remove your old toilet, inspect and repair the floor flange if needed, and install your new unit with a fresh wax ring and properly tightened bolts. We always replace the supply line at the same time — it's inexpensive insurance against a common source of leaks. The installation is complete in 1–2 hours, and we haul away the old toilet at no extra charge.",
        "We install comfort height (ADA-compliant) toilets, standard height models, dual-flush systems, and bidet-compatible units depending on your preferences. If you haven't purchased a toilet yet, we're happy to recommend reliable brands and models that fit your rough-in measurement and bathroom style. Supply-and-install packages are available.",
      ]}
      keyBenefits={[
        "WaterSense 1.28 GPF models available — saves 16,000 gallons per year vs old toilets",
        "Old toilet removal and haul-away included",
        "Floor flange inspection and repair",
        "New wax ring and supply line always installed",
        "Comfort height, standard, dual-flush, and bidet-ready options",
        "LADWP and MWD rebate qualification assistance provided",
      ]}
      whatWeInclude={[
        "Old toilet water shutoff and removal",
        "Floor flange inspection and repair if needed",
        "New wax ring installation",
        "New toilet leveling and bolt tightening",
        "New supply line installation",
        "Toilet seat installation",
        "Water level adjustment in tank",
        "Flush test and leak check",
        "Caulking around base",
        "Old toilet hauled away",
      ]}
      duration="2-3 hours"
      startingPrice="Starting at $149"
      relatedServices={[
        { name: "Sink & Faucet Replacement", slug: "plumbing-sink" },
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "Water Heater Installation & Repair", slug: "plumbing-water-heater" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How do I know what size toilet will fit my bathroom?",
          answer: "The critical measurement is the rough-in distance — the gap from the wall to the center of the drain flange. Most homes have a 12-inch rough-in, but 10-inch and 14-inch are not uncommon in older Los Angeles homes. We measure this on arrival so the right toilet is always installed. If you're purchasing the toilet yourself, measure before buying.",
        },
        {
          question: "Is it worth replacing a working toilet just for water savings?",
          answer: "In most cases, yes. LADWP offers rebates of $75–$100 per qualifying toilet replaced, and the water savings at current LADWP rates pay back the net cost within 1–3 years. If your toilet also has any flushing issues, phantom running, or a cracked tank, the case for replacement is even stronger.",
        },
        {
          question: "What is comfort height and should I get it?",
          answer: "Comfort height (also called ADA height or right height) toilets have a seat height of 17–19 inches versus the standard 14–15 inches. Many adults find comfort height easier to sit down and stand up from, particularly those with knee or hip issues. They're now the most common choice in new construction and remodels.",
        },
        {
          question: "Can I install a bidet with a new toilet?",
          answer: "Yes. Most modern toilets accept bidet seat attachments or bidet toilet combos. If you want a bidet seat, we'll make sure the toilet we install has a compatible elongated bowl shape. If you want a fully integrated bidet toilet, we can supply and install those as well — they require a nearby electrical outlet.",
        },
        {
          question: "What causes a toilet to run constantly?",
          answer: "A constantly running toilet is almost always a flapper valve that isn't sealing properly, a float set too high causing overflow into the overflow tube, or a faulty fill valve. These are typically inexpensive to repair. However, if the toilet is very old, has other issues, or you want the water savings of a new model, replacement often makes more sense than multiple repairs.",
        },
      ]}
    />
  );
}
