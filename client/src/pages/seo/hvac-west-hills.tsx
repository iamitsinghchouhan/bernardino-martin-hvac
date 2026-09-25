import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-west-hills.json";

export default function HvacWestHillsPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Shadow Ranch", title: "Newer Streets. Same Valley Sun." }}
      statement="Master-planned quiet. Far-west heat. Comfort either way."
    />
  );
}
