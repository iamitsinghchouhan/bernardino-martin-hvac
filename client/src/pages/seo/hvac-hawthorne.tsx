import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hawthorne.json";

export default function HvacHawthornePage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South Bay Aerospace", title: "Steady Comfort Under the Flight Path." }}
      statement="Aerospace hours. Working-class prices. Comfort that lasts."
    />
  );
}
