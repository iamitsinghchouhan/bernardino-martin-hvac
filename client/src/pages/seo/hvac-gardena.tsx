import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-gardena.json";

export default function HvacGardenaPage() {
  return <CityPageTemplate cityData={cityData} />;
}
