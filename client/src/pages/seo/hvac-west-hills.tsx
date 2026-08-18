import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-west-hills.json";

export default function HvacWestHillsPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Far West Valley", title: "From Shadow Ranch to Valley Circle." }}
      statement="Dry summer heat. Mild winters. Comfort, all season long."
    />
  );
}
