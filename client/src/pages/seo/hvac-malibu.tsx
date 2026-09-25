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
    />
  );
}
