import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-calabasas.json";

export default function HvacCalabasasPage() {
  return <CityPageTemplate cityData={cityData} />;
}
