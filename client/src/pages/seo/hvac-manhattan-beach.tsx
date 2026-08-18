import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-manhattan-beach.json";

export default function HvacManhattanBeachPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South Bay Coast", title: "From The Strand to the Pier." }}
      statement="Marine layer mornings. Ocean breeze afternoons. Comfort, dialed in."
    />
  );
}
