import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-chatsworth.json";

export default function HvacChatsworthPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Northwest Valley", title: "From Stoney Point to the Santa Susana Pass." }}
      statement="Dry heat. Strong sun. Comfort built to handle both."
    />
  );
}
