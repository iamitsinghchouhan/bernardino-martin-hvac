import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-encino.json";

export default function HvacEncinoPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Ventura Corridor", title: "Old Estates. New Builds. Same Standard." }}
      statement="Hillside quiet above. Boulevard energy below."
    />
  );
}
