import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hollywood.json";

export default function HvacHollywoodPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Below the Line", title: "Comfort on Your Call Sheet, Not Ours." }}
      statement="Odd hours. Old buildings. Comfort that adapts."
    />
  );
}
