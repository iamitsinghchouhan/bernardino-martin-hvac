import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-playa-del-rey.json";

export default function HvacPlayaDelReyPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Ballona Wetlands", title: "Quiet Bluffs. Wetlands Next Door." }}
      statement="Marina calm. Wetlands air. Comfort, undisturbed."
    />
  );
}
