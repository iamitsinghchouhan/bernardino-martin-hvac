import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-culver-city.json";

export default function HvacCulverCityPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Studio Lots", title: "Downtown Walkable. Studio-Lot Reliable." }}
      statement="Walkable streets. Studio hours. Comfort, dialed in."
    />
  );
}
