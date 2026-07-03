import { ServiceDetailTemplate } from "./template";

export default function PlumbingSewer() {
  return (
    <ServiceDetailTemplate
      serviceName="Sewer Line Replacement"
      slug="plumbing-sewer"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/real-trenching.webp"
      tagline="4-inch ABS sewer pipe replacement of old clay and cast iron lines"
      duration="1-2 days"
      startingPrice="Free estimate"
      overview={[
        "Los Angeles was largely built between the 1920s and 1960s, and many of those original sewer laterals — the pipe that carries waste from your home to the city main — are still in the ground today. Clay tile pipe from that era is notoriously prone to root intrusion, joint separation as the ground shifts, and cracking from decades of soil movement. Cast iron corrodes from the inside out. When these pipes fail, the result is slow drains throughout the home, sewage backups, and in severe cases, wastewater pooling under the foundation or in the yard.",
        "Before we ever dig, we run a high-definition video camera through your sewer lateral to precisely identify the type and location of the problem. This prevents unnecessary excavation and lets us recommend the right repair or replacement method. For lines with root intrusion but intact pipe structure, trenchless cured-in-place lining is often possible — we insert a resin-saturated liner and inflate it against the old pipe wall, creating a smooth new pipe inside the old one with minimal yard disruption. For severely deteriorated clay pipe or collapsed sections, open-trench replacement with 4-inch ABS is the appropriate solution.",
        "Modern 4-inch ABS (acrylonitrile butadiene styrene) sewer pipe is lightweight, completely resistant to root penetration, and carries a century-plus service life when properly installed. We maintain the precise 1/4-inch-per-foot slope required for self-cleaning sewer flow, install cleanout access points at code-required locations, and verify the final grade with a level before backfilling. All work is permitted and inspected by the City of Los Angeles.",
      ]}
      keyBenefits={[
        "Camera inspection before any digging",
        "4-inch ABS — code-compliant and durable",
        "Trenchless lining option to minimize yard disruption",
        "City permit and inspection handled",
        "Properly sloped for self-cleaning flow",
        "Grade and root barrier installation",
      ]}
      whatWeInclude={[
        "Video camera sewer inspection",
        "Permit application",
        "Excavation and access",
        "Old clay or cast iron pipe removal",
        "4-inch ABS sewer line installation",
        "Proper slope and grade verification",
        "City inspection coordination",
        "Cleanout installation",
        "Backfill and surface restoration",
        "Smoke test for final verification",
      ]}
      relatedServices={[
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "SMART JET CLEANUP System", slug: "plumbing-jet-cleanup" },
        { name: "Mainline Installation", slug: "plumbing-mainline" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What are the warning signs that my sewer line is failing?",
          answer:
            "Multiple slow drains throughout the house that respond slowly even after cleaning is a strong indicator. Other red flags include recurring sewage backups in the lowest drain in the home (usually a basement or ground-floor tub), gurgling sounds from toilets when you use other fixtures, a persistent sewage odor in the yard or under the house, and unusually lush or wet patches of grass over where the sewer line runs.",
        },
        {
          question: "What does the camera inspection involve?",
          answer:
            "We insert a flexible rod-mounted camera into the sewer clean-out and push it through the entire lateral to the city main. The camera transmits real-time video to a monitor so we can identify root intrusion, pipe cracks, joint separations, belly sections (where the pipe has sagged and holds standing water), and the overall condition of the pipe wall. We can locate the camera's position on the ground surface to pinpoint exactly where any problem exists.",
        },
        {
          question: "Is trenchless sewer repair always an option?",
          answer:
            "Not always. Trenchless cured-in-place pipe lining works well when the existing pipe is deteriorated but still mostly in one piece and holds its shape. If the pipe has collapsed sections, major offsets at joints, or extremely heavy root mass blocking the line, open-trench replacement is necessary. The camera inspection always tells us which approach is appropriate before we commit to either method.",
        },
        {
          question: "How long does sewer line replacement take?",
          answer:
            "Open-trench sewer replacement from the house foundation to the property line is typically completed in one to two days of on-site work. The permit process and city inspection scheduling add time to the overall project. Trenchless lining is usually completed in a single day. Water service and toilets are restored within hours of completing the installation.",
        },
        {
          question: "What causes sewer line failures in Los Angeles specifically?",
          answer:
            "LA's expansive clay soil shifts significantly with wet and dry seasons, and that soil movement stresses the rigid clay pipe joints used in older construction. Tree roots — particularly from ficus trees, which are extremely common in LA — aggressively seek moisture and find hairline cracks in old clay pipe, then expand inside the pipe over years. The 1994 Northridge earthquake and its aftershocks also damaged sewer laterals throughout the region, and many of those repairs were never completed.",
        },
      ]}
    />
  );
}
