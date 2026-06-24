import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-malibu.json";

export default function HvacMalibuPage() {
  return <CityPageTemplate cityData={cityData} />;
}
