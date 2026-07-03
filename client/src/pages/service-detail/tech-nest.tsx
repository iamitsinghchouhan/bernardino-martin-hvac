import { ServiceDetailTemplate } from "./template";

export default function TechNest() {
  return (
    <ServiceDetailTemplate
      serviceName="Google Nest Integration"
      slug="tech-nest"
      category="Technology"
      categoryColor="purple"
      heroVideo="/videos/svc-smarthome.mp4"
      heroImage="/images/svc-nest.png"
      tagline="Complete Google Nest ecosystem installation — thermostat, cameras, doorbell, locks, and speakers"
      overview={[
        "Google Nest has built one of the most cohesive smart home ecosystems available: the Nest Learning Thermostat that auto-programs itself to your schedule, Nest Cam and Nest Doorbell with cloud-based AI recognition that distinguishes people from animals and vehicles, Nest Protect smoke/CO detectors that alert you on your phone before an alarm has fully triggered, and Google Home speakers that act as local hubs for all of it. When these devices are properly installed and configured together, they create a remarkably unified experience.",
        "The Nest Learning Thermostat deserves special mention because it genuinely learns rather than just running a schedule you program. Over the first week, it observes when you manually adjust temperature and builds a schedule around your actual behavior. Combined with Home/Away Assist using your phone's location, it switches to Eco mode when you leave and resumes comfort temperature before you return — delivering an average 12% savings on heating and 15% savings on cooling bills according to Google's data.",
        "Our Nest integration service handles everything from selecting the right products for your home to mounting cameras at optimal angles, verifying Nest Protect detector placement meets California code requirements, and programming Google Home Routines that automate scenes across all devices. We ensure your Google Home app shows every device in its correct room assignment and that all household members have access with appropriate permission levels.",
      ]}
      keyBenefits={[
        "Nest Learning Thermostat auto-programs to your schedule — 12–15% energy savings",
        "Home/Away Assist uses phone location to switch Eco mode automatically",
        "Nest Cam AI distinguishes people, animals, and vehicles — reduces false alerts",
        "Nest Protect dual-sensor smoke/CO detection with phone alerts",
        "Google Home speaker placement for whole-home voice control coverage",
        "Unified Google Home app with proper room assignment and family access",
      ]}
      whatWeInclude={[
        "Nest ecosystem assessment and product selection",
        "Nest Learning Thermostat installation and wiring",
        "Nest Cam and/or Nest Doorbell mounting and angle optimization",
        "Nest Protect smoke/CO detector installation per California code",
        "Google Home speaker placement and network connection",
        "Google Home app setup with all devices in correct rooms",
        "Home/Away Assist configuration with all household phones",
        "Google Home Routine programming (good morning, good night, leave, arrive)",
        "Nest Thermostat initial schedule programming",
        "Family account sharing setup",
        "Training walkthrough of app, routines, and manual controls",
      ]}
      duration="3-6 hours"
      startingPrice="Starting at $299"
      relatedServices={[
        { name: "Smart Home Connectivity", slug: "tech-smarthome" },
        { name: "Smart Thermostat Installation", slug: "hvac-thermostat" },
        { name: "Network & Structured Cabling", slug: "tech-network" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How does the Nest Learning Thermostat learn my schedule?",
          answer: "For the first 7–10 days, the Nest observes every time you manually adjust the temperature and notes the time, day, and temperature you set. It builds a weekly schedule around these observations. If you consistently lower the temperature at 10pm on weeknights, it learns to do that automatically within 1–2 weeks. The schedule displays in the app where you can review and edit any auto-learned entries.",
        },
        {
          question: "Does Nest Cam require a subscription?",
          answer: "Basic Nest Cam functionality — live view and the last 3 hours of event clips — is free with no subscription. Google Home Aware (the subscription, currently $8/month or $80/year per home) adds 60 days of clip history, 24/7 continuous recording for wired cameras, and enhanced AI recognition for familiar face detection. For most homeowners, the free tier is sufficient; we discuss the subscription tiers during setup so you can make an informed decision.",
        },
        {
          question: "Where should Nest Protect smoke detectors be installed in California?",
          answer: "California requires smoke detectors in: every bedroom, outside each sleeping area (hallway), on every level of the home, and in the garage if there is a shared wall with living space. CO detectors are required on each level and outside every sleeping area in homes with gas appliances or an attached garage. Nest Protect covers both smoke and CO in one unit. We install and verify detector placement meets California Health & Safety Code requirements.",
        },
        {
          question: "Can Nest work with my existing HVAC system?",
          answer: "The Nest Learning Thermostat is compatible with most 24V HVAC systems including single and multi-stage furnaces, air conditioners, heat pumps (with or without aux heat), and fan coil units. The main requirement is a Common (C-wire) for power — if your existing thermostat wiring doesn't have a C-wire, we use the Nest Power Connector accessory, which extracts power from unused wires without requiring new wiring runs.",
        },
        {
          question: "What Google Home Routines do you configure?",
          answer: "We program four standard routines: Good Morning (starts at your wake time — turns on lights gradually, sets thermostat to day mode, plays your daily briefing), Good Night (dims lights, locks doors, arms alarm if applicable, sets thermostat to sleep mode), I'm Leaving (switches Home/Away to Away, sets Eco temperature, turns off all lights), and I'm Home (switches back to home mode, sets comfort temperature, turns on entry lights). You can customize trigger times and actions in the Google Home app afterward.",
        },
      ]}
    />
  );
}
