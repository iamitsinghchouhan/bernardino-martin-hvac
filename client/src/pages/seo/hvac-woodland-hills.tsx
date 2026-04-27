import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-woodland-hills.json";

export default function HvacWoodlandHillsPage() {
  return <CityPageTemplate cityData={cityData} />;
}
