import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-tarzana.json";

export default function HvacTarzanaPage() {
  return <CityPageTemplate cityData={cityData} />;
}
