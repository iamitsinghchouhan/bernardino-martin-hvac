import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-redondo-beach.json";

export default function HvacRedondoBeachPage() {
  return <CityPageTemplate cityData={cityData} />;
}
