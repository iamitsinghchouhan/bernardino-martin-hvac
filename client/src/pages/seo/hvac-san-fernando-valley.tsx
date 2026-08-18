import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-san-fernando-valley.json";

export default function HvacSanFernandoValleyPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Greater Valley", title: "Every Corner of the Valley, Covered." }}
      statement="Hot summer days. Cool winter nights. Comfort built for both."
    />
  );
}
