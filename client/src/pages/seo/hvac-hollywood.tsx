import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hollywood.json";

export default function HvacHollywoodPage() {
  return <CityPageTemplate cityData={cityData} />;
}
