import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-el-segundo.json";

export default function HvacElSegundoPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Smoky Hollow", title: "Small Town. Big Neighbors." }}
      statement="Refineries next door. Runways overhead. Comfort inside."
    />
  );
}
