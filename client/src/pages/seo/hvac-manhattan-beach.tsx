import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-manhattan-beach.json";

export default function HvacManhattanBeachPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "The Strand", title: "Small Lots. Big Rebuilds." }}
      statement="Tight lots. Salt air. Comfort, precisely fitted."
    />
  );
}
