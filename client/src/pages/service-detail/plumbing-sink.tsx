import { ServiceDetailTemplate } from "./template";

export default function PlumbingSink() {
  return (
    <ServiceDetailTemplate
      serviceName="Sink & Faucet Replacement"
      slug="plumbing-sink"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/svc-plumbing.webp"
      tagline="Modern sink and faucet upgrades with professional installation and a leak-free guarantee"
      overview={[
        "A new faucet or sink can completely transform the look and function of a kitchen or bathroom without the cost of a full remodel. Whether you're upgrading to a pull-down kitchen faucet, replacing a dripping bathroom faucet, or installing a new undermount sink, our licensed plumbers ensure the installation is done correctly the first time — with no leaks, no drips, and no water damage risk.",
        "We install all faucet types and brands, including single-hole and three-hole kitchen faucets, single-handle and dual-handle bathroom faucets, pot-fillers, vessel sink faucets, and touchless models. For sink replacements, we work with drop-in, undermount, and farmhouse-style sinks in stainless steel, porcelain, composite, and stone. If you haven't selected a fixture yet, we can advise on what fits your existing counter and cabinet openings.",
        "Every faucet and sink installation includes replacing the supply lines below the valve — these rubber-braided lines are the number-one cause of kitchen and bathroom water damage and should be renewed whenever fixtures are changed. We also inspect the P-trap and drain assembly and replace it if it shows any wear, ensuring your new fixture is connected to a fully sound drain system.",
      ]}
      keyBenefits={[
        "All faucet brands installed: Moen, Delta, Kohler, Grohe, American Standard",
        "Drop-in, undermount, and farmhouse sink installations",
        "New supply lines always installed — eliminates the #1 water damage risk",
        "P-trap and drain assembly inspection and replacement if needed",
        "Single and three-hole configurations, vessel sinks, pot-fillers",
        "Leak-free guarantee — we test every connection before leaving",
      ]}
      whatWeInclude={[
        "Old faucet or sink removal",
        "Water supply shutoff and drain disconnection",
        "Sink hole and mounting assessment",
        "New faucet or sink mounting",
        "New braided supply line installation",
        "P-trap and drain assembly connection",
        "Basket strainer or drain stopper installation",
        "Caulk and sealant application around sink perimeter",
        "Pressure test and leak inspection",
        "Cleanup of work area",
      ]}
      duration="1-3 hours"
      startingPrice="Starting at $89"
      relatedServices={[
        { name: "Toilet Replacement", slug: "plumbing-toilet" },
        { name: "Garbage Disposal Installation", slug: "plumbing-disposal" },
        { name: "General Plumbing Services", slug: "plumbing-general" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "Can I supply my own faucet or sink, or should I let you provide one?",
          answer: "Either option works. If you supply the fixture, we install it for a labor rate. If you'd like us to source it, we can provide quality fixtures at competitive prices with a full parts-and-labor warranty. If you're buying your own, check that the faucet matches your sink's hole configuration (single-hole or 3-hole spread) and that the sink's drain size matches your existing drain opening.",
        },
        {
          question: "How long does faucet installation take?",
          answer: "A straightforward faucet swap on an accessible under-sink connection typically takes 45–60 minutes. Kitchen faucets with pull-down sprayers or multiple valves take about 90 minutes. Full sink replacements, including cutting out the old drop-in or lifting out an undermount, take 2–3 hours. Unexpected issues like corroded shut-off valves can add time.",
        },
        {
          question: "My faucet drips — should I repair it or replace it?",
          answer: "If the faucet is less than 5 years old and under warranty, repair is usually the right call. If it's older, the cost of cartridge, seat, and O-ring replacement often approaches the cost of a new faucet when you include labor, and a new faucet comes with a fresh warranty. We'll give you an honest comparison of repair vs replacement costs before doing any work.",
        },
        {
          question: "What causes low water pressure at a single faucet?",
          answer: "Low pressure at one faucet usually points to a clogged aerator (the screen at the tip of the spout) — these are easily cleaned or replaced for a few dollars. If cleaning the aerator doesn't help, a failing cartridge or a partially closed supply valve under the sink are the next suspects. We diagnose and fix the cause rather than just masking the symptom.",
        },
        {
          question: "Can you replace just the faucet handles without replacing the whole faucet?",
          answer: "Yes, if replacement handles are available for your faucet model. For common brands like Moen and Delta, handles and trim kits are widely available and much less expensive than full faucet replacement. We identify your faucet model and source the right handles. If the faucet body itself is corroded or failing, full replacement is the better value.",
        },
      ]}
    />
  );
}
