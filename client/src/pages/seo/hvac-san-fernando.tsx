import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-san-fernando.json";

export default function HvacSanFernandoPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      redesignV2
      headline={{ eyebrow: "Northeast Valley", title: "Small-City Roots. Big-Team Backup." }}
      statement="Historic downtown. Valley heat. Comfort that keeps up."
    />
  );
}
