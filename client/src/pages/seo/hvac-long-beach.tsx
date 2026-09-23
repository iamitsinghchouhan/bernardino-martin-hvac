import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-long-beach.json";

export default function HvacLongBeachPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Harbor City", title: "A Working Harbor. A Real City." }}
      statement="Salt air. Port air. Comfort, either way."
    />
  );
}
