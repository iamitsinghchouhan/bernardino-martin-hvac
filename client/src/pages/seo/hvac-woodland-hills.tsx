import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-woodland-hills.json";

export default function HvacWoodlandHillsPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "West Valley", title: "From Warner Center to Topanga Village." }}
      statement="Intense summer sun. Mild winters. Comfort, year-round."
    />
  );
}
