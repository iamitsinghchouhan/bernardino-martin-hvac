import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hawthorne.json";

export default function HvacHawthornePage() {
  return <CityPageTemplate cityData={cityData} />;
}
