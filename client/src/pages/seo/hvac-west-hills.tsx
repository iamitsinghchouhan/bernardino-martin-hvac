import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-west-hills.json";

export default function HvacWestHillsPage() {
  return <CityPageTemplate cityData={cityData} />;
}
