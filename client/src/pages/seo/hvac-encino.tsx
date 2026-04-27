import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-encino.json";

export default function HvacEncinoPage() {
  return <CityPageTemplate cityData={cityData} />;
}
