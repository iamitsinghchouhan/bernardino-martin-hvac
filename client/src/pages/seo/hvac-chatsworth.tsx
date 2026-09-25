import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-chatsworth.json";

export default function HvacChatsworthPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Stoney Point", title: "Where the Valley Meets the Rock." }}
      statement="Rock formations. Horse properties. Comfort, built for both."
    />
  );
}
