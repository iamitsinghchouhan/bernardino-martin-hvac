import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-torrance.json";

export default function HvacTorrancePage() {
  return <CityPageTemplate cityData={cityData} />;
}
