import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-studio-city.json";

export default function HvacStudioCityPage() {
  return <CityPageTemplate cityData={cityData} />;
}
