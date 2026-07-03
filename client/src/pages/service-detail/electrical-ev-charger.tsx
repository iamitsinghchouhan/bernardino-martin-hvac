import { ServiceDetailTemplate } from "./template";

export default function ElectricalEvCharger() {
  return (
    <ServiceDetailTemplate
      serviceName="EV Charger Installation"
      slug="electrical-ev-charger"
      category="Electrical"
      categoryColor="yellow"
      heroVideo="/videos/svc-electrical.mp4"
      heroImage="/images/svc-electrical.png"
      tagline="Level 2 home EV charging station — charge your vehicle overnight and wake up with a full battery"
      overview={[
        "A Level 2 home EV charger adds 25–30 miles of range per hour of charging — compared to just 3–5 miles per hour from a standard 120V outlet. For most electric vehicle owners in Los Angeles, a full overnight charge on a Level 2 charger delivers a complete battery from near-empty, eliminating range anxiety and the need for public charging stations for daily commuting.",
        "Installation involves running a dedicated 240V, 50-amp circuit from your electrical panel to your garage or parking location. This is similar to the wiring behind a standard electric dryer outlet. Our licensed electricians evaluate your panel capacity to ensure it can support the new circuit without overloading, and handle all permit requirements — the City of Los Angeles requires permits for new 240V circuit installations.",
        "California's Southern California Edison (SCE) and LADWP both offer rebates for Level 2 EV charger installations, and the federal EV Charger Tax Credit (30C) allows you to claim 30% of installation costs. We document your installation to help you claim both. If you have solar panels, we can time your EV charging to coincide with peak solar production, further reducing your effective charging cost.",
      ]}
      keyBenefits={[
        "Level 2 charging adds 25–30 miles of range per hour",
        "All major charger brands: ChargePoint, JuiceBox, Wallbox, ClipperCreek, Tesla",
        "Dedicated 240V 50A circuit from panel to garage",
        "SCE and LADWP rebate assistance provided",
        "Federal 30C tax credit documentation included",
        "Smart chargers with app scheduling and solar charge-sync available",
      ]}
      whatWeInclude={[
        "Panel capacity assessment for new 240V circuit",
        "Permit application with City of Los Angeles",
        "Conduit and wire routing from panel to charger location",
        "240V dedicated circuit installation",
        "Charger mounting and hardwiring (or NEMA 14-50 outlet)",
        "Breaker installation at panel",
        "Wi-Fi pairing and app setup for smart chargers",
        "Charging speed test and verification",
        "Rebate paperwork documentation",
        "Permit inspection scheduling",
      ]}
      duration="2-4 hours"
      startingPrice="Starting at $399"
      relatedServices={[
        { name: "Electrical Panel Services", slug: "electrical-panel" },
        { name: "Solar Panel Installation", slug: "solar-install" },
        { name: "General Electrical Services", slug: "electrical-general" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What is the difference between Level 1 and Level 2 EV charging?",
          answer: "Level 1 uses a standard 120V household outlet (like your phone charger) and adds 3–5 miles of range per hour — fine for plug-in hybrids but too slow for pure electric vehicles with large batteries. Level 2 uses a 240V circuit (like your dryer) and adds 25–30 miles per hour, giving most EV owners a full charge overnight. Level 2 is the standard home charging solution for all-electric vehicles.",
        },
        {
          question: "Does my electrical panel have capacity for an EV charger?",
          answer: "Most 200-amp service panels have capacity to add a 50-amp EV charger circuit. Homes with 100-amp service may be at or near capacity, particularly if they also have a gas dryer and other large appliances. We assess your panel load during the estimate at no charge. If you need a panel upgrade, we can bundle it with the EV charger installation.",
        },
        {
          question: "What rebates are available for EV charger installation in Los Angeles?",
          answer: "SCE residential customers can receive up to $500 in rebates. LADWP customers have the LADWP EV Charger Rebate program. The federal government offers a 30% tax credit (up to $1,000 for residential) on equipment and installation costs under the 30C credit. We provide the documentation you need to claim all applicable incentives.",
        },
        {
          question: "Can I charge my EV using my solar panels?",
          answer: "Yes — and it's one of the most cost-effective combinations available. A smart EV charger with scheduling can be programmed to charge during your solar system's peak production hours (typically 10am–3pm), using power that would otherwise export to the grid. Some smart chargers automatically detect solar surplus and prioritize EV charging — we set this up during installation.",
        },
        {
          question: "Should I get a hardwired charger or a NEMA 14-50 outlet?",
          answer: "Hardwired chargers are permanent, look cleaner, and are slightly more efficient. A NEMA 14-50 outlet gives you flexibility to plug in different charger brands or move the outlet's use to another appliance if needed. If you own your home and plan to stay, hardwired is usually the better choice. For renters or if you want maximum flexibility, the outlet approach works well.",
        },
      ]}
    />
  );
}
