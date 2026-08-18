import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-glendale.json";

export default function HvacGlendalePage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Foothill Gateway", title: "From the Galleria to the Foothills." }}
      statement="Dry summer winds. Mild winters. Comfort you can count on."
    />
  );
}
