import { ServiceDetailTemplate } from "./template";

export default function TechNetwork() {
  return (
    <ServiceDetailTemplate
      serviceName="Network & Structured Cabling"
      slug="tech-network"
      category="Technology"
      categoryColor="purple"
      heroVideo="/videos/svc-network.mp4"
      heroImage="/images/svc-network.png"
      tagline="Professional Cat6 network infrastructure for fast, reliable wired internet in every room"
      overview={[
        "Wi-Fi dead zones, video call dropouts, and buffering happen when your network relies entirely on wireless signals trying to penetrate walls, floors, and furniture. Structured cabling — running Cat6 ethernet cables through your walls to every room — delivers rock-solid wired connections that are 10x faster and significantly more reliable than Wi-Fi for the devices that need it most: desktops, smart TVs, game consoles, streaming devices, and home office workstations.",
        "Our network installers run Cat6 or Cat6a cables through walls using low-impact fishing techniques that minimize drywall work. Each run terminates in a clean wall-plate outlet, and all cables route back to a central network panel typically located in a utility closet, garage, or dedicated network rack. A patch panel and managed network switch allow you to control which device gets priority and simplify future troubleshooting.",
        "Structured cabling is the professional standard used in offices and modern smart homes precisely because it's permanent, scalable, and future-proof. Cat6 supports gigabit speeds and beyond, so a proper installation done today will serve your household for 20+ years regardless of how internet technology evolves. We label every run, provide a network diagram, and test each cable end-to-end for performance before signing off.",
      ]}
      keyBenefits={[
        "Cat6 wiring delivers gigabit speeds to every room — eliminates dead zones",
        "Clean wall-plate terminations — no surface-mounted cable raceways",
        "Central patch panel for organized, manageable network infrastructure",
        "Network switch installation and basic configuration included",
        "Each cable tested end-to-end for performance after installation",
        "Labeled cables and network diagram provided for future reference",
      ]}
      whatWeInclude={[
        "Network audit and cable route planning",
        "Cat6 cable installation to each drop location",
        "Wall-plate keystone jack termination",
        "Central patch panel installation",
        "Network switch installation and configuration",
        "Cable labeling at both ends",
        "Cable continuity and performance test at each outlet",
        "Network diagram documentation",
        "Wi-Fi access point mounting and cable connections if needed",
        "Clean-up and wall patch where needed",
      ]}
      duration="2-6 hours"
      startingPrice="Starting at $199"
      relatedServices={[
        { name: "Smart Home Connectivity", slug: "tech-smarthome" },
        { name: "Google Nest Integration", slug: "tech-nest" },
        { name: "Electrical Panel Services", slug: "electrical-panel" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "Is wired ethernet really faster than Wi-Fi?",
          answer: "Yes, substantially. Wired Cat6 connections provide consistent 1 Gbps (gigabit) speeds with virtually zero latency. Wi-Fi 6, the current generation, can match this in ideal conditions, but real-world Wi-Fi speed drops significantly with distance, walls, interference, and multiple devices competing for bandwidth. For video conferencing, gaming, 4K streaming, and home office work, wired connections provide a dramatically better experience.",
        },
        {
          question: "How many ethernet drops do I need?",
          answer: "A typical home benefits from drops in: the home office (1–2 drops for desktop and docking station), living room (TV and streaming device), each bedroom with a desktop or gaming setup, and a central location for network equipment. A basic whole-home infrastructure is 6–10 drops for most houses. We can advise based on a walkthrough of how you use each room.",
        },
        {
          question: "Will you have to cut holes in my walls?",
          answer: "Minimal wall penetration is required. We use professional cable-fishing tools to snake cables through existing wall cavities without opening large areas of drywall. Typically we make small holes at the outlet location (covered by the wall plate) and access at the ceiling or basement. We discuss the route with you before running any cable so you know exactly where we're going and how it will look.",
        },
        {
          question: "What is the difference between Cat6 and Cat6a?",
          answer: "Cat6 supports gigabit speeds up to 100 meters — more than enough for any home. Cat6a supports 10-gigabit speeds at the same distance and has better shielding against interference from adjacent cables in dense runs. For residential installations, Cat6 is the practical standard. If you're building a home theater or gaming space where 10-gigabit is relevant, we can run Cat6a to those locations.",
        },
        {
          question: "Is structured cabling worth it if I already have a mesh Wi-Fi system?",
          answer: "Yes, because even the best mesh Wi-Fi system benefits from wired backhaul between nodes. Running Cat6 to each mesh node location converts wireless node-to-node communication to wired, dramatically improving mesh performance and freeing up wireless spectrum for your devices. For demanding users — video editors, streamers, gamers — replacing Wi-Fi with wired connections at key locations is one of the highest-value network upgrades available.",
        },
      ]}
    />
  );
}
