import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-hermosa-beach.json";

export default function HvacHermosaBeachPage() {
  return <CityPageTemplate cityData={cityData} />;
}
