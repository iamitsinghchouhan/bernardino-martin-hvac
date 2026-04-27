import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-glendale.json";

export default function HvacGlendalePage() {
  return <CityPageTemplate cityData={cityData} />;
}
