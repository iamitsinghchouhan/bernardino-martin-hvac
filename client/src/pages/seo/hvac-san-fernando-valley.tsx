import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-san-fernando-valley.json";

export default function HvacSanFernandoValleyPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "The Valley Floor", title: "One Basin. Every Neighborhood." }}
      statement="Once orchards. Now millions of neighbors. Comfort for all."
    />
  );
}
