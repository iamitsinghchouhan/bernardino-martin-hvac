import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-burbank.json";

export default function HvacBurbankPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Studio District", title: "Backlot Energy. Ranch-Home Comfort." }}
      statement="Post-war homes. Modern heat. Comfort that catches up."
    />
  );
}
