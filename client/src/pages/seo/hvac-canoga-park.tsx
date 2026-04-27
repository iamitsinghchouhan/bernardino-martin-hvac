import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-canoga-park.json";

export default function HvacCanogaParkPage() {
  return <CityPageTemplate cityData={cityData} />;
}
