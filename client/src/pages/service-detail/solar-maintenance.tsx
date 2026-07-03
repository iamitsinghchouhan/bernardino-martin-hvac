import { ServiceDetailTemplate } from "./template";

export default function SolarMaintenance() {
  return (
    <ServiceDetailTemplate
      serviceName="Solar System Maintenance"
      slug="solar-maintenance"
      category="Solar & Energy"
      categoryColor="amber"
      heroVideo="/videos/svc-solar.mp4"
      heroImage="/images/solar-service.webp"
      tagline="Professional solar maintenance to keep your panels producing at peak efficiency"
      overview={[
        "Solar panels are low-maintenance by design, but they are not maintenance-free. In Los Angeles, dust, pollen, bird droppings, and wildfire ash accumulate on panel surfaces and can reduce energy production by 15–25% if left uncleaned. A professional maintenance visit restores full output and allows a thorough inspection of your entire system while technicians are already on the roof.",
        "Beyond cleaning, our maintenance visits include a full electrical inspection: we check string voltages and currents against your system's design specs, review inverter error logs for hidden faults, inspect all DC and AC wiring for rodent damage or corrosion, and verify that racking hardware remains properly torqued. Many system problems — like a single underperforming panel due to a cracked cell — are invisible from the ground but show up clearly in a voltage reading.",
        "We recommend annual maintenance for most Los Angeles systems, with an additional cleaning after any nearby wildfire produces significant ash fall. Keeping up with maintenance also satisfies the maintenance requirements of most panel and inverter warranty agreements, protecting your long-term coverage.",
      ]}
      keyBenefits={[
        "Restores full panel output after dust, ash, and bird dropping accumulation",
        "Inverter error log review catches hidden faults before they cause failures",
        "String-level voltage and current testing identifies underperforming panels",
        "Racking and hardware inspection prevents loose mount issues",
        "Wiring inspection for rodent damage, corrosion, or UV degradation",
        "Written performance report with before-and-after production comparison",
      ]}
      whatWeInclude={[
        "Panel-by-panel visual inspection for cracks and delamination",
        "Professional panel cleaning with purified water",
        "Inverter error code review and log clearing",
        "String voltage and current measurement at combiner box",
        "DC and AC wiring condition inspection",
        "Racking torque check on all mounting hardware",
        "Conduit and weatherproofing inspection",
        "Monitoring system data review",
        "Written performance report with findings and recommendations",
      ]}
      duration="2-4 hours"
      startingPrice="Starting at $149"
      relatedServices={[
        { name: "Solar Panel Installation", slug: "solar-install" },
        { name: "Solar Inverter Installation", slug: "solar-inverter" },
        { name: "Energy Efficiency Consulting", slug: "solar-consulting" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How much does dirt actually affect solar panel output?",
          answer: "Studies in Southern California show that soiling (dust, bird droppings, pollen) reduces output by 15–25% over a year without cleaning. A single bird dropping on a panel can drop that panel's output significantly due to the way string inverters work — one shaded panel reduces the output of the entire string.",
        },
        {
          question: "How often should solar panels be professionally maintained?",
          answer: "For most Los Angeles homes, once a year is sufficient. If you live in a dusty area near major roads, industrial zones, or in the path of wildfire smoke, twice a year is better. After any significant ash event — such as a nearby wildfire — a cleaning within 2–4 weeks prevents ash from bonding permanently to panel glass.",
        },
        {
          question: "Can I just clean the panels myself with a garden hose?",
          answer: "You can rinse panels from the ground with a standard garden hose, and this removes loose surface dust effectively. However, professional cleaning uses purified (de-ionized) water that doesn't leave mineral deposits, and includes the inspection components — electrical checks, hardware inspection, inverter review — that a garden hose can't provide.",
        },
        {
          question: "Is maintenance required to keep my panel warranty valid?",
          answer: "Most panel warranties require the system to be operated and maintained within manufacturer guidelines. While they don't always require annual professional maintenance explicitly, neglect that causes damage (such as corrosion from standing water around dirty panels) can be used to void warranty claims. We provide documentation of each visit for your records.",
        },
        {
          question: "What problems does maintenance catch that monitoring doesn't show?",
          answer: "Monitoring shows production numbers but doesn't explain why. Maintenance catches physical issues: micro-cracks from thermal cycling, delamination, loose electrical connections, pest damage to wiring under the array, and hardware corrosion. These are invisible in a monitoring dashboard but obvious on inspection and, if caught early, are inexpensive to fix.",
        },
      ]}
    />
  );
}
