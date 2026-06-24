import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-playa-del-rey.json";

export default function HvacPlayaDelReyPage() {
  return <CityPageTemplate cityData={cityData} />;
}
