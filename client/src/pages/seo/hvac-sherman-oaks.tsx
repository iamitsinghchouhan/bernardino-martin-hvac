import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-sherman-oaks.json";

export default function HvacShermanOaksPage() {
  return <CityPageTemplate cityData={cityData} />;
}
