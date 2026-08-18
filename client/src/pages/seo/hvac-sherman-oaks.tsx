import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-sherman-oaks.json";

export default function HvacShermanOaksPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South Valley", title: "From the Galleria to Mulholland." }}
      statement="Hot afternoons. Mild winters. Comfort that keeps up."
    />
  );
}
