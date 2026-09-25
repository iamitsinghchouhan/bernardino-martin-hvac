import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-westchester.json";

export default function HvacWestchesterPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Aerospace Legacy", title: "Before Silicon Beach, There Was This." }}
      statement="Aerospace roots. Academic energy. Comfort, grounded."
    />
  );
}
