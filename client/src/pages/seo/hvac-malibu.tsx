import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-malibu.json";

export default function HvacMalibuPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      redesignV2
      headline={{ eyebrow: "Santa Monica Mountains Coast", title: "From Zuma Beach to the Malibu Pier." }}
      statement="Coastal air. Canyon heat. Comfort built for both."
      localFaqs={[
        {
          q: "I'm right on the coast — does salt air actually damage HVAC equipment?",
          a: "Yes — salt air accelerates corrosion on outdoor condenser coils, especially from the Colony to Point Dume. We inspect and treat for it as part of routine service instead of waiting for a coil to fail.",
        },
      ]}
    />
  );
}
