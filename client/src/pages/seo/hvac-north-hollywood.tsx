import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-north-hollywood.json";

export default function HvacNorthHollywoodPage() {
  return <CityPageTemplate cityData={cityData} />;
}
