import { ServiceDetailTemplate } from "./template";

export default function HvacMaintenance() {
  return (
    <ServiceDetailTemplate
      serviceName="HVAC Maintenance & Tune-Up"
      slug="hvac-maintenance"
      category="HVAC & Heating"
      categoryColor="blue"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/svc-hvac-maint.webp"
      tagline="Seasonal tune-ups to keep your system running at peak efficiency year-round"
      overview={[
        "The leading cause of unexpected AC and heating system failures is deferred maintenance. Dust-clogged coils, low refrigerant, and loose electrical connections are all preventable problems that a routine tune-up catches before they strand you in the middle of a Los Angeles heat wave. Our maintenance visits are designed to proactively identify wear and correct minor issues while they're still inexpensive to fix.",
        "A complete HVAC tune-up covers every critical component of your system: we clean the evaporator and condenser coils, check refrigerant charge, tighten electrical connections, test starting capacitors and contactors, flush the condensate drain line, calibrate your thermostat, and replace the air filter. After the visit, you'll receive a written inspection report detailing the condition of each component and any items to watch for in the future.",
        "Los Angeles residents run their air conditioning systems far longer than homeowners in most other climates — often nine or ten months out of the year. That kind of continuous demand accelerates wear on motors, belts, and refrigerant components. Scheduling a tune-up each spring before peak cooling season and again in fall before the heating season keeps your system prepared for whatever weather LA throws at it.",
      ]}
      keyBenefits={[
        "Extends equipment lifespan by 5-10 years",
        "Reduces energy bills up to 15%",
        "Catches problems before they become costly",
        "Manufacturer warranty maintenance compliance",
        "Bi-annual scheduling available (spring/fall)",
        "Written inspection report provided",
      ]}
      whatWeInclude={[
        "Air filter replacement",
        "Coil cleaning (evaporator and condenser)",
        "Refrigerant level check",
        "Thermostat calibration",
        "Electrical connections tightening",
        "Blower motor inspection",
        "Drain line flush",
        "Safety switch testing",
      ]}
      duration="1-2 hours"
      startingPrice="Starting at $79"
      relatedServices={[
        { name: "AC Repair & Diagnostics", slug: "hvac-repair" },
        { name: "Duct Cleaning & Installation", slug: "hvac-ducts" },
        { name: "Electrostatic Air Filtration", slug: "hvac-air-filtration" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How often should I have my HVAC system maintained?",
          answer:
            "Most manufacturers and HVAC industry standards recommend twice-yearly maintenance — once in spring before the cooling season and once in fall before heating season. In Los Angeles, where AC runs much longer than in colder climates, an annual minimum is essential, and twice-yearly is strongly recommended to maintain peak performance and catch seasonal wear.",
        },
        {
          question: "What exactly is included in a tune-up?",
          answer:
            "Our tune-up covers air filter replacement, coil cleaning on both the evaporator and condenser, refrigerant pressure measurement, thermostat calibration, electrical connection tightening, blower motor inspection, condensate drain flush, and safety switch testing. You'll also receive a written report documenting each item's condition so you have a record for warranty purposes.",
        },
        {
          question: "How much money can regular maintenance actually save me?",
          answer:
            "A well-maintained system runs 10–15% more efficiently than a neglected one, which translates directly to lower monthly electricity bills. Over a typical 10–15 year equipment lifespan, the energy savings alone can pay for maintenance visits several times over — plus you avoid costly mid-season repair calls and premature equipment replacement.",
        },
        {
          question: "Does my manufacturer warranty require regular maintenance?",
          answer:
            "Most HVAC manufacturers include language in their warranty agreements requiring that the equipment receive regular professional maintenance. Skipping maintenance can give the manufacturer grounds to deny a warranty claim if a component fails. Keeping dated service records is the easiest way to protect your warranty coverage.",
        },
        {
          question: "What's the best time of year to schedule a tune-up in Los Angeles?",
          answer:
            "We recommend scheduling your AC tune-up in March or April, before temperatures climb above 90°F and demand for HVAC service peaks. Your heating tune-up is best scheduled in October. Booking during shoulder seasons means faster appointment availability and gives you time to address any discovered issues before the system is under maximum demand.",
        },
      ]}
    />
  );
}
