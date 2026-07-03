import { ServiceDetailTemplate } from "./template";

export default function HvacInstallAc() {
  return (
    <ServiceDetailTemplate
      serviceName="AC Installation"
      slug="hvac-install-ac"
      category="HVAC & Heating"
      categoryColor="blue"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/svc-install-ac.webp"
      tagline="Central air, mini-split, and window unit installation across Los Angeles"
      overview={[
        "Installing an air conditioning system is not a one-size-fits-all job. Before recommending any equipment, our technicians perform a Manual J load calculation that accounts for your home's square footage, insulation levels, window placement, ceiling height, and local climate data for your specific LA neighborhood. This ensures the system we install is properly sized — not too small to cool the space and not so large that it short-cycles and wastes energy.",
        "We install all major types of residential AC systems: traditional central air conditioners paired with existing ductwork, high-efficiency ductless mini-splits for homes without ducts, and standard window units for single-room solutions. Each type has its own ideal use case, and our team will explain the pros and cons of each option during your free in-home consultation before you commit to anything.",
        "All of our installations are performed by licensed California HVAC contractors who handle the building permits required by the City of Los Angeles. We coordinate with the local building department, schedule required inspections, and keep the process moving so your new system is online as quickly as possible. Every installation includes a full system startup test and a walkthrough with the homeowner before we close out the job.",
      ]}
      keyBenefits={[
        "Free in-home assessment and load calculation",
        "All system types: central air, mini-split, window units",
        "Licensed installation meets LA building code",
        "Manufacturer warranty honored",
        "Permit handling included",
        "Post-installation testing and walkthrough",
      ]}
      whatWeInclude={[
        "Home load calculation",
        "System sizing recommendation",
        "Equipment procurement",
        "Professional installation",
        "Electrical connections",
        "Refrigerant charging",
        "System testing",
        "Owner walkthrough and training",
      ]}
      duration="4-8 hours"
      startingPrice="Free estimate"
      relatedServices={[
        { name: "AC Repair & Diagnostics", slug: "hvac-repair" },
        { name: "HVAC Maintenance", slug: "hvac-maintenance" },
        { name: "Ductless Mini-Split Systems", slug: "hvac-ductless" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How do I know what size AC system I need for my home?",
          answer:
            "Sizing is determined by a load calculation (Manual J), not just square footage. Factors include your insulation quality, number and size of windows, ceiling height, local climate, and sun exposure. An undersized unit will run constantly without cooling properly, while an oversized unit will cycle on and off too frequently, wasting energy and reducing humidity control. We include this calculation for free with every installation estimate.",
        },
        {
          question: "How long does a full AC installation take?",
          answer:
            "A standard central air installation in a single-family home typically takes 4–8 hours. Mini-split installations are usually faster at 3–5 hours per zone. The timeline can extend if electrical panel upgrades are needed or if ductwork modifications are required. We'll give you a realistic schedule during the estimate visit.",
        },
        {
          question: "Do I need a permit to install a new AC system in Los Angeles?",
          answer:
            "Yes — the City of Los Angeles and most surrounding municipalities require a mechanical permit for new AC installation. Our team handles the permit application, scheduling of the required inspection, and final sign-off. Unpermitted installations can cause issues with home insurance claims and home sales.",
        },
        {
          question: "Can you give me a cost estimate over the phone?",
          answer:
            "We can provide ballpark ranges over the phone, but accurate pricing requires an in-home assessment. A 2-ton mini-split system installation typically starts around $2,000–$3,500, while a full central air installation for an average LA home runs $4,500–$8,000 depending on ductwork needs and system tier. The free estimate locks in your exact price.",
        },
        {
          question: "What's the difference between a mini-split and a central AC system?",
          answer:
            "Central air uses a network of ducts to distribute conditioned air throughout the whole house from a single outdoor unit. Mini-splits are ductless and use individual air handlers mounted in each room, allowing independent temperature control per zone. Central air is usually preferred for whole-home cooling when ducts already exist; mini-splits are ideal for homes without ducts, room additions, or when zone control is a priority.",
        },
      ]}
    />
  );
}
