import { ServiceDetailTemplate } from "./template";

export default function PlumbingDisposal() {
  return (
    <ServiceDetailTemplate
      serviceName="Garbage Disposal Installation"
      slug="plumbing-disposal"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/svc-plumbing.webp"
      tagline="Professional motorized garbage disposal installation with full electrical and plumbing hookup"
      overview={[
        "A properly installed garbage disposal makes kitchen cleanup faster and reduces food waste going into the trash. Our licensed plumbers handle the complete installation — from removing the old unit and cleaning up the mounting flange to connecting the new disposal's drain to your P-trap and wiring the wall switch. We ensure every connection is leak-free and the motor is correctly grounded.",
        "Choosing the right disposal matters. Motor horsepower determines what your unit can handle — a 1/2 HP unit suits light daily use, while a 3/4 or 1 HP motor handles tougher waste and is less likely to jam in a busy household. We carry InSinkErator, Moen, and Waste King units in various power levels and can help you choose based on your household size and usage habits.",
        "Most disposals connect to the existing drain under your kitchen sink without any modification. If your kitchen sink has a dishwasher, the disposal has a dedicated dishwasher knockout port that we connect during installation. We test the unit with water and food waste before leaving, and walk you through what materials the unit can and cannot handle.",
      ]}
      keyBenefits={[
        "All major brands installed: InSinkErator, Moen, Waste King, KitchenAid",
        "1/2 HP to 1 HP motor options for every household size",
        "Old disposal removal and drain cleanup included",
        "Dishwasher drain connection made if applicable",
        "Electrical switch wiring checked and updated if needed",
        "Leak-free guarantee — we test thoroughly before leaving",
      ]}
      whatWeInclude={[
        "Old disposal disconnection and removal",
        "Mounting ring and sink flange inspection or replacement",
        "New disposal mounting assembly",
        "Drain elbow and P-trap connection",
        "Dishwasher drain knockout connection if applicable",
        "Electrical cord or hardwire connection",
        "Wall switch wiring check",
        "Water flow test for leaks",
        "Test grinding with food scraps",
        "Jam clearance tool and reset button demonstration",
      ]}
      duration="1-2 hours"
      startingPrice="Starting at $99"
      relatedServices={[
        { name: "Sink & Faucet Replacement", slug: "plumbing-sink" },
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "General Electrical Services", slug: "electrical-general" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What HP motor do I need for a garbage disposal?",
          answer: "A 1/2 HP disposal is fine for a household of 1–2 people who use it lightly. For families of 3–5, a 3/4 HP model handles daily use without frequent jams. For large families or those who cook frequently and put harder food scraps down the drain, a 1 HP unit is the most reliable choice. We can advise based on your situation.",
        },
        {
          question: "What food should not go in a garbage disposal?",
          answer: "Avoid fibrous foods (celery, artichokes), starchy foods (potato peels, pasta, rice), grease and oils, eggshells in quantity, large fruit pits or bones, and non-food items. Most food waste including small bones, coffee grounds, vegetable scraps, and cooked meat is fine in a properly powered disposal.",
        },
        {
          question: "Does a garbage disposal require its own electrical circuit?",
          answer: "Garbage disposals typically run on a 120V circuit shared with the dishwasher or under-sink outlets. In most homes, no dedicated circuit is needed. If your kitchen wiring is very old or the circuit is already heavily loaded, we may recommend a dedicated 20A circuit — we assess this during installation.",
        },
        {
          question: "How long do garbage disposals typically last?",
          answer: "Quality disposals from InSinkErator or Moen typically last 8–15 years with normal use. Signs it's time to replace: frequent jamming, loud grinding or rattling noises, water leaks from the body (not just connections), and persistent odors that cleaning doesn't resolve. A disposal that's jamming frequently may simply need a professional cleaning rather than replacement.",
        },
        {
          question: "My disposal just hums but won't spin — can that be fixed?",
          answer: "A humming motor usually means the disposal is jammed and the motor is straining against the jam. Insert the Allen key (hex wrench) into the port on the bottom of the unit and work it back and forth to free the jam, then press the red reset button. If this doesn't work, call us — the jam may be deeper or the motor may have burned out.",
        },
      ]}
    />
  );
}
