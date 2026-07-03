import { ServiceDetailTemplate } from "./template";

export default function ElectricalGeneral() {
  return (
    <ServiceDetailTemplate
      serviceName="General Electrical Services"
      slug="electrical-general"
      category="Electrical"
      categoryColor="yellow"
      heroVideo="/videos/svc-electrical.mp4"
      heroImage="/images/svc-electrical.png"
      tagline="Licensed residential electrical work — outlets, lighting, switches, and rewiring across Los Angeles"
      overview={[
        "From installing a new outlet in a garage to rewiring an outdated kitchen, our licensed California electricians handle the full range of residential electrical needs. We don't just fix what's broken — we bring your home's wiring up to current NEC code, ensuring your electrical system is safe, properly grounded, and ready for modern appliances and technology.",
        "Los Angeles homes built before 1980 often have electrical systems that predate modern requirements for AFCI (Arc-Fault Circuit Interrupter) and GFCI (Ground-Fault Circuit Interrupter) protection. AFCI breakers prevent electrical fires caused by arcing in walls or behind outlets — required in bedrooms, living rooms, and kitchens in new construction and renovations. GFCI outlets and breakers protect against electrocution in wet locations like bathrooms, kitchens, garages, and outdoor areas. We install both as needed.",
        "For lighting, we install recessed (can) lights, pendant fixtures, ceiling fans with light kits, under-cabinet lighting, and exterior security lights. Dimmer switch installation is a popular upgrade that extends bulb life and creates ambient lighting options. All lighting work includes verifying the circuit can handle the load and replacing outlet boxes as needed for the new fixture weight.",
      ]}
      keyBenefits={[
        "Licensed California electrical contractor — all work permitted when required",
        "GFCI outlet installation for kitchens, bathrooms, garages, and outdoor areas",
        "AFCI breaker upgrades for bedrooms and living areas",
        "Recessed lighting, ceiling fan, and fixture installation",
        "Dedicated circuit installation for appliances and EV pre-wiring",
        "Code violation identification and correction",
      ]}
      whatWeInclude={[
        "Electrical safety inspection",
        "Outlet and switch replacement",
        "GFCI outlet and AFCI breaker installation",
        "Recessed light installation (cut-in or new construction)",
        "Ceiling fan installation with light kit",
        "Dimmer switch installation",
        "Dedicated circuit wiring for appliances",
        "Lighting fixture replacement",
        "Junction box installation and cover",
        "Code violation correction and documentation",
      ]}
      duration="1-6 hours"
      startingPrice="Starting at $99"
      relatedServices={[
        { name: "Electrical Panel Services", slug: "electrical-panel" },
        { name: "EV Charger Installation", slug: "electrical-ev-charger" },
        { name: "Google Nest Integration", slug: "tech-nest" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What is the difference between GFCI and AFCI outlets?",
          answer: "GFCI (Ground-Fault Circuit Interrupter) outlets protect against electrocution by detecting current flowing in an unintended path — typically through water or a person. They trip in milliseconds and are required within 6 feet of any water source. AFCI (Arc-Fault Circuit Interrupter) breakers protect against electrical fires by detecting the electrical signature of arcing inside walls. They're required in most living areas of new construction and remodels.",
        },
        {
          question: "When do I need a permit for electrical work in Los Angeles?",
          answer: "The Los Angeles Building Code requires permits for: new circuits, panel changes, adding outlets or switches beyond simple like-for-like replacements, installing hardwired fixtures, and any work inside walls. Simple fixture swaps (changing a light fixture to another light fixture on the same circuit, or replacing an outlet with the same type) are generally exempt. When in doubt, we apply for the permit — it's inexpensive and protects you.",
        },
        {
          question: "My circuit breaker keeps tripping — what does that mean?",
          answer: "A repeatedly tripping breaker means the circuit is drawing more current than the breaker is rated for. This can be caused by too many appliances on one circuit (an overloaded circuit), a failing appliance pulling excess current, or a wiring fault (short circuit). We identify the cause — an overloaded circuit may just need a dedicated circuit for the heavy appliance, while a wiring fault requires investigation.",
        },
        {
          question: "Can you add outlets to a room without tearing open walls?",
          answer: "In many cases, yes. We use fishing techniques to route new wire through existing walls with minimal damage — typically just one small hole at the outlet location and access at the panel or an existing outlet. In homes with accessible attic or crawl space above or below the room, fishing new circuits is straightforward. We'll assess your specific situation and give you an honest expectation of what wall access is required.",
        },
        {
          question: "Is it safe to have two-prong outlets in my home?",
          answer: "Two-prong (ungrounded) outlets are code-legal in existing homes but are not suitable for computers, TVs, or any sensitive electronics that expect a ground path. The safest upgrade is replacing with three-prong grounded outlets wired back to a grounded circuit. A GFCI outlet without a ground wire is also code-allowed as a substitute and provides shock protection while accepting three-prong plugs. We advise the right approach for your wiring.",
        },
      ]}
    />
  );
}
