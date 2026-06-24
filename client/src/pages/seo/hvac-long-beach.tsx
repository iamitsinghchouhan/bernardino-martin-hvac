import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-long-beach.json";

export default function HvacLongBeachPage() {
  return <CityPageTemplate cityData={cityData} />;
}
