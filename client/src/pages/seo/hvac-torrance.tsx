import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-torrance.json";

export default function HvacTorrancePage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South Bay Roots", title: "Family Roots. South Bay Scale." }}
      statement="Generations here. Systems that last just as long."
    />
  );
}
