import { ServiceDetailTemplate } from "./template";

export default function HvacRepair() {
  return (
    <ServiceDetailTemplate
      serviceName="AC Repair & Diagnostics"
      slug="hvac-repair"
      category="HVAC & Heating"
      categoryColor="blue"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/svc-repair-ac.webp"
      tagline="Fast, accurate diagnosis and repair of all AC systems in Los Angeles"
      overview={[
        "Our NATE-certified technicians are trained to diagnose and repair every major AC make and model on the market, from decades-old systems to the latest inverter-driven units. Using advanced diagnostic tools, we pinpoint the root cause of failure on the first visit — not just the symptom — so you get a lasting repair instead of a temporary fix.",
        "Los Angeles summers are relentless, and a broken AC isn't just uncomfortable — it's a health risk. That's why we offer same-day emergency service throughout the greater LA area. When you call before noon, we aim to be at your door the same afternoon, ready to restore your comfort before the hottest part of the day.",
        "Every one of our service vehicles is stocked with hundreds of common replacement parts, including compressors, capacitors, contactors, fan motors, and refrigerants. This means the vast majority of repairs are completed in a single visit without waiting for parts to ship, saving you time and keeping your home or business cool when it matters most.",
      ]}
      keyBenefits={[
        "Same-day emergency service throughout Los Angeles",
        "All major AC brands including Carrier, Trane, Lennox, Rheem, Goodman, Daikin, Mitsubishi",
        "Refrigerant leak detection and recharge",
        "90-day workmanship guarantee on all repairs",
        "Upfront transparent pricing before work begins",
        "Electrical fault diagnosis included",
      ]}
      whatWeInclude={[
        "Full system diagnostic inspection",
        "Refrigerant pressure check",
        "Electrical connections inspection",
        "Thermostat calibration check",
        "Condenser coil inspection",
        "Evaporator coil check",
        "Filter inspection",
        "Written service report",
      ]}
      duration="1-3 hours"
      startingPrice="Starting at $89"
      relatedServices={[
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
        { name: "AC Installation", slug: "hvac-install-ac" },
        { name: "Thermostat Installation", slug: "hvac-thermostat" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How quickly can you respond to an emergency AC repair in Los Angeles?",
          answer:
            "For most areas of Los Angeles — including the Valley, Westside, and South Bay — we offer same-day response when you call before noon. Our technicians are dispatched from multiple locations across the metro area to minimize travel time. We'll give you a two-hour arrival window and call 30 minutes before we arrive.",
        },
        {
          question: "Which AC brands do you service?",
          answer:
            "We service all residential and light commercial AC brands, including Carrier, Trane, Lennox, Rheem, Goodman, Daikin, Mitsubishi Electric, LG, Samsung, Friedrich, and many others. Whether your unit is 2 years old or 25 years old, our technicians have the training and parts to repair it.",
        },
        {
          question: "How much does an AC repair typically cost in Los Angeles?",
          answer:
            "Repair costs vary depending on the fault. A capacitor replacement typically runs $85–$180, refrigerant recharge $150–$400, and a compressor replacement $800–$1,800. We always provide a written estimate before starting work so there are no surprises on the invoice.",
        },
        {
          question: "Do you offer a warranty on your AC repairs?",
          answer:
            "Yes — all our repair work is backed by a 90-day workmanship guarantee. If the same issue recurs within 90 days of our repair, we return at no additional labor charge. Parts also carry manufacturer warranties ranging from 1 to 10 years depending on the component.",
        },
        {
          question: "What are the warning signs that my AC needs repair?",
          answer:
            "Common signs include warm air blowing from vents, weak airflow, unusual noises (banging, squealing, or clicking), the unit cycling on and off rapidly, ice forming on the refrigerant line, a noticeable spike in your electricity bill, or a musty smell coming from the vents. If you notice any of these, it's best to call for diagnosis before the system fails completely.",
        },
      ]}
    />
  );
}
