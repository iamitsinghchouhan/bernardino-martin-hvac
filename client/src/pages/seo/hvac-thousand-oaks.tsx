import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-thousand-oaks.json";

export default function HvacThousandOaksPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      redesignV2
      headline={{ eyebrow: "Conejo Valley", title: "Tree-Lined Streets. Reliable Comfort." }}
      statement="Warm summers. Quiet neighborhoods. Comfort that keeps up."
    />
  );
}
