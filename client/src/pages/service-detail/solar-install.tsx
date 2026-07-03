import { ServiceDetailTemplate } from "./template";

export default function SolarInstall() {
  return (
    <ServiceDetailTemplate
      serviceName="Solar Panel Installation"
      slug="solar-install"
      category="Solar & Energy"
      categoryColor="amber"
      heroVideo="/videos/svc-solar.mp4"
      heroImage="/images/svc-solar-service.webp"
      tagline="Custom residential solar systems designed for maximum Los Angeles sunshine harvest"
      overview={[
        "Los Angeles enjoys an average of 284 sunny days per year — more solar energy potential than nearly anywhere in the country. A properly designed residential solar system can eliminate 80–100% of your monthly electricity bill, and with California's net metering policy, excess power your panels generate is credited back to your account by your utility company.",
        "Our solar installations begin with a detailed on-site assessment: we evaluate your roof condition, angle, shading, and available space alongside your last 12 months of electricity bills to design a system sized precisely for your household. We handle every aspect of the project — from permit applications with your city and utility interconnection paperwork with SCE or LADWP, to final inspection sign-off.",
        "Every installation uses Tier 1 panels with 25-year performance warranties and paired with high-efficiency inverters that include real-time monitoring. After installation, you can track your system's daily and lifetime production through a smartphone app. Federal tax credit currently allows you to claim 30% of the system cost, which our team helps you document properly.",
      ]}
      keyBenefits={[
        "Custom system design based on your roof and actual energy usage",
        "All permits, utility interconnection, and inspection coordination handled",
        "Federal 30% Investment Tax Credit documentation provided",
        "25-year manufacturer panel performance warranty",
        "Real-time smartphone monitoring of daily solar production",
        "Net metering setup so excess power earns utility credits",
      ]}
      whatWeInclude={[
        "On-site roof and energy assessment",
        "Custom solar system design and layout",
        "City permit application and approval",
        "Utility interconnection application (SCE or LADWP)",
        "Racking and mounting system installation",
        "Solar panel installation and wiring",
        "Inverter installation and configuration",
        "Utility meter upgrade coordination",
        "Monitoring system setup and app configuration",
        "Owner training and production walkthrough",
      ]}
      duration="1-2 days"
      startingPrice="Free estimate"
      relatedServices={[
        { name: "Solar System Maintenance", slug: "solar-maintenance" },
        { name: "Solar Inverter Installation", slug: "solar-inverter" },
        { name: "Electrical Panel Services", slug: "electrical-panel" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How many solar panels does my home need?",
          answer: "System size depends on your electricity usage and available roof space. The average Los Angeles home uses about 600–800 kWh per month and requires a 5–8 kW system, which is typically 14–22 panels. We calculate the exact number based on your last 12 months of bills during the free estimate.",
        },
        {
          question: "What is the payback period for solar in Los Angeles?",
          answer: "Most Los Angeles homeowners see a 5–8 year payback period with the federal tax credit applied. After that, you're generating free electricity for the remaining 17–20 years of panel life. With rising SCE and LADWP rates, payback is getting faster each year.",
        },
        {
          question: "What happens on cloudy days?",
          answer: "Solar panels still generate power on cloudy days — just less of it. Los Angeles averages fewer than 35 cloudy days per year, so production dips are minimal. Net metering means any shortfall is simply drawn from the grid at your normal rate, and any surplus from sunny days offsets those costs.",
        },
        {
          question: "How long does solar installation take?",
          answer: "The installation itself typically takes 1–2 days for a residential system. However, the full process from signed contract to permission to operate (PTO) from your utility takes 4–8 weeks, most of which is waiting for city permit approval and utility interconnection.",
        },
        {
          question: "What tax credits and rebates are available in Los Angeles?",
          answer: "The federal Investment Tax Credit (ITC) lets you claim 30% of your total system cost on your federal tax return. California has no state solar rebate currently, but SCE and LADWP offer net metering programs that credit excess production. Your HOA also cannot legally prevent solar installation in California under AB 2188.",
        },
      ]}
    />
  );
}
