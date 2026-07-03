import { ServiceDetailTemplate } from "./template";

export default function PlumbingMainline() {
  return (
    <ServiceDetailTemplate
      serviceName="Mainline Installation"
      slug="plumbing-mainline"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/real-pipe-repair.webp"
      tagline="Street water meter to house copper pipe installation with gauge ball and pressure regulator"
      duration="1-2 days"
      startingPrice="Free estimate"
      overview={[
        "The mainline is the single most important pipe on your property — it carries all the water your household uses from the city meter at the street curb into your home. In Los Angeles, homes built before the 1970s often have original galvanized steel mainlines that have corroded internally over decades, restricting water flow, contaminating drinking water with rust, and becoming prone to pinhole leaks and full breaks. Replacing your mainline is one of the highest-impact plumbing upgrades a homeowner can make.",
        "Our standard mainline installation uses 1.25-inch Type K copper pipe, which provides significantly better flow capacity than the 3/4-inch or 1-inch galvanized it replaces. We trench from your meter connection to the home's entry point, remove the old pipe completely, and install the new copper run with a full-port gauge ball valve for easy shutoff access and a pressure-reducing valve to protect your fixtures from high street pressure. A garden faucet connection near the meter is also included as part of every installation.",
        "Because mainline work involves connecting to city infrastructure at the meter box, it requires a permit from the City of Los Angeles Bureau of Engineering and coordination with LA DWP for service interruption and final reconnection. We handle the entire permit process on your behalf and schedule the DWP appointment, so you don't have to navigate the city bureaucracy yourself. Most projects are completed within one to two days with water service restored the same afternoon.",
      ]}
      keyBenefits={[
        "1.25-inch copper pipe for strong, unrestricted flow",
        "Gauge ball valve for easy whole-home shutoff",
        "Pressure regulator protects your fixtures",
        "Garden faucet installation included",
        "Permit and LA DWP coordination handled",
        "Minimum 50-year lifespan on copper",
      ]}
      whatWeInclude={[
        "Site assessment and trench route planning",
        "Permit application to city",
        "Excavation and trenching",
        "Old line disconnection and removal",
        "1.25-inch copper pipe installation",
        "Gauge ball and pressure regulator installation",
        "Garden faucet connection",
        "Backfill and surface restoration",
        "LA DWP inspection coordination",
      ]}
      relatedServices={[
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "Sewer Line Replacement", slug: "plumbing-sewer" },
        { name: "Toilet Replacement", slug: "plumbing-toilet" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "Why use copper pipe instead of PVC for the mainline?",
          answer:
            "Copper is the code-preferred material for underground domestic water service in Los Angeles because it's highly resistant to soil corrosion, doesn't leach chemicals into drinking water, and carries a much longer service life than PVC in LA's clay-heavy soil. PVC can become brittle over time from soil movement, and it is not approved for all LA permit applications. Type K copper is the industry standard for mainline installations.",
        },
        {
          question: "What are the signs that my mainline needs replacement?",
          answer:
            "Warning signs include: consistently low water pressure throughout the house despite no plumbing issues indoors, rusty or discolored water when you first run a faucet, frequent minor leaks at the meter or along the yard, visible pipe corrosion near the meter box, and very old galvanized pipe (identifiable by its gray color and threaded connections). If your home was built before 1970, there's a strong chance your mainline is original.",
        },
        {
          question: "How long does a mainline replacement take from start to finish?",
          answer:
            "The total project typically spans two to three weeks from initial estimate to completion, with most of that time being permit processing and DWP scheduling. The actual on-site installation work takes one to two days. Water service is restored the same day the pipe is installed; the city inspection and DWP final sign-off follow within a few business days.",
        },
        {
          question: "Is a permit required for mainline replacement in Los Angeles?",
          answer:
            "Yes, a building permit is required for any mainline (service lateral) replacement in the City of Los Angeles, and the work must be inspected before backfilling. The permit process protects you as a homeowner by ensuring the work meets current code — unpermitted mainline work can create problems when selling your home. We handle the permit application, inspection scheduling, and all city documentation.",
        },
        {
          question: "Will my water pressure improve after a new mainline?",
          answer:
            "In most cases, yes — dramatically. Old galvanized pipe loses nearly half its interior diameter to corrosion, which severely throttles flow and pressure. Replacing it with 1.25-inch copper restores full flow capacity, and the new pressure regulator is set to 65–70 PSI, which is optimal for most home plumbing. Homeowners regularly report a noticeable improvement in shower pressure and faster hot water delivery throughout the home.",
        },
      ]}
    />
  );
}
