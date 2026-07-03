import { ServiceDetailTemplate } from "./template";

export default function PlumbingGeneral() {
  return (
    <ServiceDetailTemplate
      serviceName="General Plumbing Services"
      slug="plumbing-general"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/svc-plumbing.webp"
      tagline="Full residential plumbing services for every need — from leaks to full system repairs"
      duration="1-4 hours"
      startingPrice="Starting at $89"
      overview={[
        "Los Angeles homeowners rely on Bernardino Martin for the full spectrum of residential plumbing work. Whether you have a dripping faucet under the kitchen sink, a water pressure problem affecting your entire home, or a hidden slab leak causing your water bill to spike, our licensed CA plumbing technicians arrive ready to diagnose and fix the problem the same day. We handle supply lines, drain lines, and gas plumbing — nothing is out of scope.",
        "Leaks don't wait for convenient hours, which is why we offer same-day service for urgent plumbing issues across Los Angeles and the surrounding communities. When you call, a licensed plumber — not a trainee — picks up and comes to your home. We locate the problem, explain what needs to be done, and give you a flat-rate price before any work begins. No hourly billing surprises and no upselling services you don't need.",
        "Every service vehicle in our fleet is stocked with the parts most commonly needed for LA-area homes — copper fittings, shutoff valves, supply lines, wax rings, drain components, and more. In most cases, we complete the repair in a single visit without having to order parts or return the next day. All workmanship is guaranteed, and we leave your home cleaner than we found it.",
      ]}
      keyBenefits={[
        "Same-day service for leaks and emergencies",
        "All plumbing systems: supply, drain, gas lines",
        "Licensed CA plumbing contractor",
        "Flat-rate pricing — no hourly surprises",
        "Parts and labor guaranteed",
        "Fully stocked service vehicles",
      ]}
      whatWeInclude={[
        "Plumbing system inspection",
        "Leak location and repair",
        "Pipe replacement (section or full line)",
        "Fixture repair or replacement",
        "Water pressure test",
        "Drain inspection",
        "Code compliance check",
        "Written estimate before work begins",
      ]}
      relatedServices={[
        { name: "Water Heater Installation", slug: "plumbing-water-heater" },
        { name: "Sink & Faucet Replacement", slug: "plumbing-sink" },
        { name: "Mainline Installation", slug: "plumbing-mainline" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What qualifies as an emergency plumbing situation?",
          answer:
            "A plumbing emergency is any condition that poses an immediate risk of water damage, health hazard, or gas exposure. This includes burst pipes, sewage backing up into your home, no water throughout the house, a gas smell near appliances, or a flooded utility room. If you're unsure, call us — we'd rather assess a false alarm than have you wait on a genuine emergency.",
        },
        {
          question: "How much do common plumbing repairs cost?",
          answer:
            "Simple repairs like replacing a shutoff valve or fixing a running toilet typically range from $89 to $199. Leak repairs vary based on access difficulty — a visible supply line fix may be under $150, while a slab leak repair can range from $400 to $2,000 depending on the method. We always provide a written flat-rate quote before starting, so there are no surprises.",
        },
        {
          question: "How can I prevent plumbing leaks in my home?",
          answer:
            "The most effective prevention steps are: install a whole-home water pressure regulator if your pressure exceeds 80 PSI (which damages fittings over time), replace supply lines made of braided steel every 5–7 years, keep drains clear of grease and hair buildup, and have a plumber inspect your system every 2–3 years. Smart shutoff valves that detect micro-leaks are also an excellent investment.",
        },
        {
          question: "My water pressure is very low — what causes that?",
          answer:
            "Low water pressure in Los Angeles homes is commonly caused by a failing or improperly set pressure regulator, mineral scale buildup inside older galvanized supply pipes, a partially closed shutoff valve somewhere in the system, or a hidden leak diverting flow. We run a pressure test at the meter and at fixtures to pinpoint the exact cause and recommend the right fix.",
        },
        {
          question: "How do I know if a plumber is licensed in California?",
          answer:
            "You can verify any contractor's license at the California Contractors State License Board website (cslb.ca.gov) using their license number. A valid California plumbing contractor must hold a C-36 license classification. Bernardino Martin holds all required licenses and carries full liability insurance — our license number is always available upon request.",
        },
      ]}
    />
  );
}
