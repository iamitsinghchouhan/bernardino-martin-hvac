import { ServiceDetailTemplate } from "./template";

export default function TechSmarthome() {
  return (
    <ServiceDetailTemplate
      serviceName="Smart Home Connectivity"
      slug="tech-smarthome"
      category="Technology"
      categoryColor="purple"
      heroVideo="/videos/svc-smarthome.mp4"
      heroImage="/images/svc-smarthome.png"
      tagline="Whole-home automation setup — smart lighting, locks, cameras, and voice control integration"
      overview={[
        "Smart home technology has matured dramatically over the last few years, but the reality of self-installation is often frustrating: devices that don't work together, apps that conflict, automation routines that trigger unpredictably, and mesh networks that drop offline. Professional smart home setup eliminates these friction points by starting with a clean network architecture, selecting devices on compatible platforms, and configuring automation rules that actually work reliably every day.",
        "Our smart home installations center on Matter and Thread — the new universal smart home standard that Apple, Google, Amazon, and Samsung all support simultaneously. Matter-certified devices speak the same protocol, meaning a light switch works in Apple Home, Google Home, and Amazon Alexa at the same time without choosing sides. We pair Matter devices with a border router (Apple HomePod mini, Amazon Echo 4th gen, or similar) that creates the Thread mesh network, giving battery-powered devices like sensors and locks extremely long battery life and reliable signal without additional hubs.",
        "Beyond device installation, the real value we deliver is automation design: presence-based routines that know when you've arrived or left, scene-based lighting that changes the entire feel of a room with one command, door locks that arm the alarm and turn off lights when you leave, and energy automation that coordinates HVAC, solar, and high-draw appliances to minimize electricity costs. We document every automation rule so you know exactly what your home is programmed to do.",
      ]}
      keyBenefits={[
        "Matter-protocol devices work with Apple, Google, and Amazon simultaneously",
        "Thread mesh networking for reliable battery-powered sensor and lock connectivity",
        "Presence-based automations — home/away routines that actually work",
        "Scene-based lighting control for living, dining, bedroom, and outdoor areas",
        "Integration with existing HVAC thermostats, garage doors, and security cameras",
        "Full automation documentation so you understand everything your home does",
      ]}
      whatWeInclude={[
        "Smart home needs assessment and platform recommendation",
        "Wi-Fi optimization or mesh network upgrade if needed",
        "Thread border router installation and network setup",
        "Smart switch and dimmer installation (per room)",
        "Smart lock installation and keypad programming",
        "Smart doorbell and camera installation",
        "Motion and door/window sensor installation",
        "Voice assistant speaker placement and setup",
        "Automation rule design and programming",
        "Mobile app setup on all household member phones",
        "Training session and automation documentation",
      ]}
      duration="4-8 hours"
      startingPrice="Starting at $399"
      relatedServices={[
        { name: "Google Nest Integration", slug: "tech-nest" },
        { name: "Network & Structured Cabling", slug: "tech-network" },
        { name: "Smart Thermostat Installation", slug: "hvac-thermostat" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What is Matter and why does it matter for smart home?",
          answer: "Matter is the new universal smart home protocol created by Apple, Google, Amazon, and Samsung together. Before Matter, a smart bulb might only work in Apple Home OR Google Home, not both. Matter-certified devices work with all platforms simultaneously — you can control them through Apple Home, Google Home, Alexa, and SmartThings at the same time without picking one ecosystem. This also makes devices from different brands work together reliably without complex workarounds.",
        },
        {
          question: "Do I need to replace all my existing smart devices?",
          answer: "No. Existing smart devices can continue working through their current apps and platform integrations. We focus new Matter-compatible purchases on devices you're adding or replacing. Existing Philips Hue, LIFX, Nest, Ring, and similar devices integrate into unified platforms through existing bridges and APIs. We assess your current setup and identify what to keep, what to upgrade, and what gaps need filling.",
        },
        {
          question: "How reliable are smart home automations day-to-day?",
          answer: "Reliability depends entirely on setup quality. Automations that depend on cloud servers are single points of failure — if the manufacturer's server is down, automation stops. We configure local-execution automations wherever possible using Thread and Matter, which run entirely on your home network without depending on internet connectivity. A properly set up local-execution smart home works even when the internet is out.",
        },
        {
          question: "What smart home platform do you recommend — Apple, Google, or Amazon?",
          answer: "For iPhone users, Apple Home is the most polished and private platform — automations run on-device, sharing with family works seamlessly, and HomeKit integration with iPhone and Apple Watch is excellent. Google Home is the best choice for Android households. Amazon Alexa has the widest device compatibility and the most third-party integrations. With Matter devices, you don't have to choose — they work in all three. We configure your primary platform based on what phones your household uses.",
        },
        {
          question: "Can you integrate smart home controls with my HVAC system?",
          answer: "Yes. Smart thermostat integration is one of the most impactful automations we configure. A Nest, Ecobee, or Honeywell T6 Pro thermostat connects to Apple Home, Google Home, or Alexa, enabling automations like: away mode drops temperature when you leave, pre-cool the house 30 minutes before you arrive home, vacation mode when you're traveling, and HVAC integration with window sensors to pause cooling when windows are open.",
        },
      ]}
    />
  );
}
