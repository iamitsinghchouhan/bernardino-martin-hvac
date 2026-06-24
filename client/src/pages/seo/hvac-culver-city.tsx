import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-culver-city.json";

export default function HvacCulverCityPage() {
  return <CityPageTemplate cityData={cityData} />;
}
