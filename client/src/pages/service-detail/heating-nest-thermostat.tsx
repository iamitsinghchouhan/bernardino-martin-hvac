import { ServiceDetailTemplate } from "./template";

export default function HeatingNestThermostat() {
  return (
    <ServiceDetailTemplate
      serviceName="Google Nest Thermostat Installation"
      slug="heating-nest-thermostat"
      category="Heating Specialties"
      categoryColor="orange"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/svc-install-thermostat.webp"
      tagline="Professional Google Nest installation with full Google Home ecosystem integration"
      overview={[
        "The Google Nest Learning Thermostat is one of the most intelligent home upgrades available today. It learns your schedule within a week, adjusts temperatures automatically when you leave home, and connects seamlessly with Google Home, Google Assistant, and other smart devices throughout your house. Our licensed technicians handle the full installation and setup so you get all the benefits from day one.",
        "Beyond the Nest itself, we configure the Google Home app on your smartphone, set up your preferred temperature schedule, and link your thermostat to any other Google Nest devices you own — from cameras to smoke detectors. If you have multiple family members, we set up shared access so everyone in the household can control comfort from their own phone.",
        "Los Angeles's variable climate — cool mornings, hot afternoons, and chilly evenings — makes Nest's auto-scheduling particularly effective. The system reads your patterns and keeps your home comfortable without you thinking about it, while the Energy History report shows exactly what you're saving each month.",
      ]}
      keyBenefits={[
        "Nest Learning Thermostat programs itself from your behavior within a week",
        "Google Home and Google Assistant voice control configured and tested",
        "Remote control from anywhere via the Nest or Google Home app",
        "Energy History report shows daily, monthly, and seasonal savings",
        "Works with most 24V heating and cooling systems",
        "C-wire adapter or new wire installed if your system requires it",
      ]}
      whatWeInclude={[
        "HVAC system compatibility check",
        "Old thermostat removal",
        "Nest device mounting and wiring",
        "C-wire adapter installation if needed",
        "Google account and Home app setup",
        "Wi-Fi network pairing and testing",
        "Temperature schedule programming",
        "Eco temperatures and away mode setup",
        "Google Assistant voice command testing",
        "All HVAC modes verified (heat, cool, fan)",
      ]}
      duration="1-2 hours"
      startingPrice="Starting at $149"
      relatedServices={[
        { name: "Thermostat Installation & Repair", slug: "hvac-thermostat" },
        { name: "Smart Home Connectivity", slug: "tech-smarthome" },
        { name: "Google Nest Integration", slug: "tech-nest" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "Is the Google Nest thermostat compatible with my HVAC system?",
          answer: "Nest thermostats work with most 24V heating and cooling systems including central air, heat pumps, forced air, radiant, and mini-splits with control boards. Systems using millivolt wiring (like some floor furnaces) are typically not compatible. Our technician confirms compatibility on arrival before starting installation.",
        },
        {
          question: "How does the Nest learn my schedule?",
          answer: "For the first week you use it normally — adjusting temperatures when you're warm, cold, comfortable, or leaving the house. The Nest records these patterns and after about a week begins setting temperatures automatically. You can also manually set a schedule in the app at any time.",
        },
        {
          question: "Can it integrate with my other Google Nest devices?",
          answer: "Yes. Through the Google Home app, your Nest thermostat can work with Nest cameras, Nest Protect smoke detectors, Nest doorbell, and any other Google Home compatible devices. We set up these integrations and create basic automations during our installation visit.",
        },
        {
          question: "How much does it save on energy bills?",
          answer: "Google reports that Nest thermostats save an average of 10–12% on heating and 15% on cooling. In Los Angeles, where cooling is the dominant HVAC cost, most homeowners see meaningful savings on their SCE or LADWP bills, typically paying back the device cost in under 2 years.",
        },
        {
          question: "What happens if the internet goes out?",
          answer: "The Nest continues to operate normally if your internet is down — it runs its current schedule and you can still adjust temperatures on the device itself. Remote control through the app requires internet. When connectivity restores, everything syncs automatically.",
        },
      ]}
    />
  );
}
