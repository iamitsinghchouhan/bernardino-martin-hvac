import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-san-fernando-valley.json";

export default function HvacSanFernandoValleyPage() {
  return <CityPageTemplate cityData={cityData} />;
}
