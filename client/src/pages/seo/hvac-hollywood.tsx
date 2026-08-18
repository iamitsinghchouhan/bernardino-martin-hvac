import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hollywood.json";

export default function HvacHollywoodPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Central Los Angeles", title: "From the Walk of Fame to the Hollywood Bowl." }}
      statement="Warm days. Mild nights. Comfort that fits the scene."
    />
  );
}
