import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-west-hollywood.json";

export default function HvacWestHollywoodPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "The Strip", title: "A City That Runs Late." }}
      statement="Two square miles. Every hour covered."
    />
  );
}
