import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-reseda.json";

export default function HvacResedaPage() {
  return <CityPageTemplate cityData={cityData} />;
}
