import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-west-hollywood.json";

export default function HvacWestHollywoodPage() {
  return <CityPageTemplate cityData={cityData} />;
}
