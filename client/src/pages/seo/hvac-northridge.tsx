import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-northridge.json";

export default function HvacNorthridgePage() {
  return <CityPageTemplate cityData={cityData} />;
}
