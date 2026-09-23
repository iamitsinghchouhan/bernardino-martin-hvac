import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-beverly-hills.json";

export default function HvacBeverlyHillsPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "90210", title: "White-Glove Comfort for Every Zone." }}
      statement="Discreet service. Zoned precision. Exactly on schedule."
    />
  );
}
