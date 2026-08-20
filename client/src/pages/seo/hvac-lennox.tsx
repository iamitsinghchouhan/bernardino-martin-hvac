import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-lennox.json";

export default function HvacLennoxPage() {
  return <CityPageTemplate cityData={cityData} />;
}
