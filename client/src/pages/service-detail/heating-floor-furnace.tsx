import { ServiceDetailTemplate } from "./template";

export default function HeatingFloorFurnace() {
  return (
    <ServiceDetailTemplate
      serviceName="Floor Furnace Services"
      slug="heating-floor-furnace"
      category="Heating Specialties"
      categoryColor="orange"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/services/heating-floor-furnace.png"
      tagline="Installation, repair, and cleaning for floor furnace systems in Los Angeles homes"
      overview={[
        "Floor furnaces are a heating solution deeply embedded in the history of Los Angeles residential construction. Thousands of homes built in the 1930s through 1960s — particularly in neighborhoods like Silver Lake, Echo Park, Highland Park, and Mid-City — still rely on these recessed gas-fired units that sit below the floor and radiate heat upward through a grate. Our technicians have extensive experience with the specific components, clearances, and code requirements that apply to these older systems.",
        "The most common service issue with floor furnaces is the thermocouple — a safety device that senses whether the pilot flame is burning and shuts off the gas supply if it goes out. Thermocouple replacement is the single most frequent floor furnace repair we perform, and it's typically a same-day fix. Burner cleaning is nearly as common, as years of accumulated dust, lint, and debris on the burner orifices cause ignition problems, incomplete combustion, and in some cases, fire hazard conditions that require immediate attention.",
        "Beyond repair, regular cleaning of a floor furnace is genuinely a fire safety matter, not just a maintenance preference. The floor grate and the furnace cavity collect years of dust, pet hair, and flammable debris that sit directly on and around the burner assembly. We perform thorough deep cleaning that removes this material, inspects the firebox for cracks or deterioration, and verifies that the unit meets current California safety requirements before returning it to service.",
      ]}
      keyBenefits={[
        "Experienced with older Los Angeles housing stock",
        "Deep cleaning prevents fire hazard buildup",
        "Thermocouple replacement same day",
        "Pilot light troubleshooting and repair",
        "Safety inspection with every service",
        "Gas valve and burner cleaning",
      ]}
      whatWeInclude={[
        "Floor furnace deep cleaning",
        "Burner orifice cleaning",
        "Thermocouple testing and replacement",
        "Pilot assembly inspection",
        "Gas pressure check",
        "Safety shutoff test",
        "Floor grate cleaning and restoration",
        "Post-service operation verification",
      ]}
      duration="2-4 hours"
      startingPrice="Starting at $149"
      relatedServices={[
        { name: "Gas Furnace Repair", slug: "heating-gas-furnace" },
        { name: "Wall Furnace Services", slug: "heating-wall-furnace" },
        { name: "Thermostat Installation", slug: "hvac-thermostat" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How does a floor furnace work?",
          answer:
            "A floor furnace is a gas-fired heating unit recessed into the floor beneath a metal grate, typically located in a central hallway or main living area. The burner assembly sits in a firebox below the subfloor, and heat rises naturally through the grate by convection — warm air rises, drawing cooler room air down around the edges of the grate to be reheated. Most floor furnaces use a standing pilot light and a millivolt thermostat system that requires no 120V electrical power to operate.",
        },
        {
          question: "How often should a floor furnace be cleaned?",
          answer:
            "Annual cleaning is the minimum recommendation, and we strongly suggest scheduling it before the start of the heating season — typically October in Los Angeles. Homes with pets, high dust levels, or carpeting near the grate may benefit from cleaning twice a year. Neglecting cleaning allows combustible material to accumulate directly in and around the burner, which creates a genuine fire hazard.",
        },
        {
          question: "Are floor furnaces energy-efficient?",
          answer:
            "Floor furnaces are far less efficient than modern forced-air furnaces. They operate on a simple on/off cycle with no variable heat output, they lose heat to the underfloor cavity, and their heat distribution by convection is less effective at evenly warming a whole home compared to forced-air circulation. Many LA homeowners choose to supplement them with a ductless mini-split or upgrade to a modern central furnace when the floor furnace requires significant repair.",
        },
        {
          question: "Are there safety concerns with floor furnaces?",
          answer:
            "Yes — floor furnaces present specific safety considerations. The grate surface gets very hot during operation and can cause burns on contact, which is a concern for young children and pets. Debris accumulation in the firebox is a fire risk. Carbon monoxide from incomplete combustion can enter the living space if the unit is not properly serviced. We test for CO and inspect the combustion chamber at every service call.",
        },
        {
          question: "How much does it cost to replace a floor furnace?",
          answer:
            "New floor furnace units typically cost $400–$800 for the equipment, with installation running $300–$600 depending on whether the existing firebox can be reused and the complexity of reconnecting the gas supply. If you're weighing replacement of an older unit against continuing to repair it, we can assess the condition of the existing firebox and provide an honest recommendation on which path makes more financial sense.",
        },
      ]}
    />
  );
}
