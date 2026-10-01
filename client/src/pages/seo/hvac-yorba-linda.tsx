import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-yorba-linda.json";

export default function HvacYorbaLindaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      redesignV2
      headline={{ eyebrow: "North Orange County", title: "Hillside Homes. Dependable Comfort." }}
      statement="Larger lots. Longer summers. Comfort built to match."
    />
  );
}
