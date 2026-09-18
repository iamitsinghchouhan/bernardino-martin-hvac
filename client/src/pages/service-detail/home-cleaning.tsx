import { ServiceDetailTemplate } from "./template";

export default function HomeCleaning() {
  return (
    <ServiceDetailTemplate
      serviceName="Home Cleaning"
      slug="home-cleaning"
      category="Home Services"
      categoryColor="cyan"
      heroImage="/images/rebrand/tile-cleaning.png"
      tagline="Routine, move-in, and move-out cleaning for homes across Los Angeles"
      overview={[
        "A clean home is part of a comfortable one — so alongside our HVAC, solar, plumbing, and electrical work, our team also offers home cleaning for customers who'd rather make one call for everything the house needs.",
        "Whether you need a one-time deep clean before or after a move, a post-construction clean-up following a repair or installation, or a recurring cleaning schedule, tell us what you're looking for and we'll put together a plan that fits your home and your budget.",
      ]}
      keyBenefits={[
        "One-time, recurring, and move-in/move-out cleaning options",
        "Flexible scheduling to work around your routine",
        "Easy to bundle with any other service you're already booking",
        "Straightforward pricing after a quick conversation about your home",
      ]}
      whatWeInclude={[
        "Kitchen and bathroom cleaning",
        "Dusting, vacuuming, and floor care",
        "Interior window and glass cleaning on request",
        "Move-in / move-out deep cleaning",
        "Post-project clean-up after installs or repairs",
        "Custom checklist built around your home",
      ]}
      duration="Varies by home size and scope"
      startingPrice="Free quote — call for pricing"
      relatedServices={[]}
      cityLinks={[]}
      faqs={[
        {
          question: "Do you offer one-time cleanings or only recurring service?",
          answer: "Both. Tell us what you need — a single deep clean, a move-in/move-out clean, or a recurring schedule — and we'll set it up around your home and timeline.",
        },
        {
          question: "Can I bundle a cleaning with another service you're already doing at my house?",
          answer: "Yes — if we're already on-site for an HVAC, solar, plumbing, or electrical job, ask about adding a cleaning visit to the same appointment.",
        },
        {
          question: "How is pricing determined?",
          answer: "Pricing depends on your home's size and the scope of cleaning you need. Call our team, describe the job, and we'll give you a straightforward quote.",
        },
      ]}
    />
  );
}
