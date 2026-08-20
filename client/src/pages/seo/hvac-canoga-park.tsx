import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-canoga-park.json";

export default function HvacCanogaParkPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "West Valley", title: "From Westfield Topanga to Warner Center." }}
      statement="Long summer sun. Dry air. Comfort that never lets up."
    />
  );
}
