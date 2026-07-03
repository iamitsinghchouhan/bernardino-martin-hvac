import { ServiceDetailTemplate } from "./template";

export default function HeatingWallFurnace() {
  return (
    <ServiceDetailTemplate
      serviceName="Wall Furnace Services"
      slug="heating-wall-furnace"
      category="Heating Specialties"
      categoryColor="orange"
      heroVideo="/videos/svc-hvac.mp4"
      heroImage="/images/services/heating-wall-furnace.png"
      tagline="Safe, efficient wall furnace installation, repair, and maintenance in Los Angeles"
      overview={[
        "Wall furnaces are compact, self-contained gas heating units recessed into an interior wall, most commonly found in apartments, condominiums, and smaller Los Angeles homes built from the 1950s through the 1980s. They use natural convection to heat a room without any blower motor or ductwork, making them reliable, quiet, and simple to operate — but they still require regular service to keep the gas valve, thermocouple, burner, and venting in safe working order.",
        "The gas valve and thermocouple are the most frequently serviced components in wall furnaces. The thermocouple generates a small electrical current from the pilot flame that holds the gas valve open — when it weakens with age or the pilot doesn't fully heat it, the valve interprets it as a safety shutoff condition and closes, cutting gas to the main burner. This is the most common reason a wall furnace lights but then goes out shortly after. We carry thermocouples for all major wall furnace brands on our service vehicles and can usually complete this repair in under an hour.",
        "Every wall furnace service call includes a carbon monoxide safety test and a venting inspection. Wall furnaces vent combustion exhaust directly through the exterior wall to the outside via a short flue passage. If this passage becomes blocked by debris, a bird nest, or a deteriorated vent cap, combustion gases can back-draft into the living space. This is an invisible, odorless hazard — which is why our technicians check it on every single service visit regardless of the reported complaint.",
      ]}
      keyBenefits={[
        "All wall furnace brands serviced",
        "Carbon monoxide safety inspection on every visit",
        "New wall furnace installation available",
        "Gas valve replacement same day",
        "Venting inspection and repair",
        "BTU output verification",
      ]}
      whatWeInclude={[
        "Wall furnace inspection",
        "Gas valve function test",
        "Thermocouple replacement if needed",
        "Burner cleaning",
        "Venting check",
        "Carbon monoxide test",
        "Thermostat hookup check",
        "Pilot reassembly and test lighting",
      ]}
      duration="2-3 hours"
      startingPrice="Starting at $129"
      relatedServices={[
        { name: "Gas Furnace Repair", slug: "heating-gas-furnace" },
        { name: "Floor Furnace Services", slug: "heating-floor-furnace" },
        { name: "Thermostat Installation", slug: "hvac-thermostat" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "How is a wall furnace different from central heating?",
          answer:
            "A wall furnace heats a single room or small area through natural convection — warm air rises from the unit's face and circulates within the space without the help of a fan or duct system. Central heating uses a furnace in a utility area to heat air that is then distributed throughout the entire home through ductwork and registers. Wall furnaces are simpler, less expensive to install and maintain, and efficient for heating individual spaces but impractical for whole-home climate control.",
        },
        {
          question: "When should I replace rather than repair a wall furnace?",
          answer:
            "If your wall furnace is over 20 years old and requires a repair that costs more than 50% of a new unit's price, replacement is typically the better financial decision. Repeated pilot outage failures, a damaged combustion chamber, or a gas valve that has failed multiple times are indicators that the unit is at end-of-life. Newer units are also significantly more efficient and meet current California safety standards that older units may not.",
        },
        {
          question: "Do wall furnaces require building permits in Los Angeles?",
          answer:
            "Repair and like-for-like replacement of a wall furnace typically does not require a permit in the City of Los Angeles. However, installing a new wall furnace where one did not previously exist, or changing the fuel type, or relocating the unit to a different wall, does require a mechanical permit. We advise on permit requirements during the estimate visit to ensure full code compliance.",
        },
        {
          question: "Are wall furnaces safe for apartments and condos?",
          answer:
            "When properly maintained, wall furnaces are safe for apartment and condo use. The key safety requirements are intact venting to the exterior, a functioning thermocouple that shuts off gas if the pilot goes out, and adequate clearance from combustible materials around the unit face. Landlords should have wall furnaces professionally serviced annually before the heating season to ensure tenant safety and liability compliance.",
        },
        {
          question: "How much does wall furnace repair typically cost?",
          answer:
            "Thermocouple replacement runs $95–$175 including labor. Gas valve replacement is $180–$350 depending on the brand and valve type. A full cleaning and tune-up with no parts needed is typically $129–$199. New wall furnace installation ranges from $450–$900 for the unit and installation combined. We'll provide a written estimate before beginning any work.",
        },
      ]}
    />
  );
}
