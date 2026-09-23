import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-redondo-beach.json";

export default function HvacRedondoBeachPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "King Harbor", title: "A Working Harbor, Not Just a View." }}
      statement="Working harbor. Family homes. Comfort that fits both."
    />
  );
}
