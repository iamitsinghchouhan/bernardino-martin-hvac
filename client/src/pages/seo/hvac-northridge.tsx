import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-northridge.json";

export default function HvacNorthridgePage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "North Central Valley", title: "From CSUN to the Northridge Fashion Center." }}
      statement="Hot summers. Dry winter air. Comfort, year-round."
    />
  );
}
