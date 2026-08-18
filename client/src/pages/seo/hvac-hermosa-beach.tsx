import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hermosa-beach.json";

export default function HvacHermosaBeachPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South Bay Coast", title: "From The Strand to the Pier Plaza." }}
      statement="Foggy mornings. Salty air. Comfort that holds up."
    />
  );
}
