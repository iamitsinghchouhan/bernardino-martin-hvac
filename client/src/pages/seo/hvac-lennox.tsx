import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-lennox.json";

export default function HvacLennoxPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Hawthorne Boulevard", title: "Small Footprint. Real Community." }}
      statement="Small footprint. Real prices. Comfort that doesn't cut corners."
    />
  );
}
