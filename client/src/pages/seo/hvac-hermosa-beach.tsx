import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hermosa-beach.json";

export default function HvacHermosaBeachPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Pier Plaza", title: "Small Town. Big Nightlife." }}
      statement="Tight lots. Late nights. Comfort that doesn't miss a beat."
    />
  );
}
