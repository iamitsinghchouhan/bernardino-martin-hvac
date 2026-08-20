import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-van-nuys.json";

export default function HvacVanNuysPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Central Valley", title: "From the Civic Center to the Sepulveda Basin." }}
      statement="Hot, dry summers. Long cooling seasons. Comfort that keeps up."
    />
  );
}
