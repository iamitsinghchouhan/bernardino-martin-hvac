import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-santa-monica.json";

export default function HvacSantaMonicaPage() {
  return <CityPageTemplate cityData={cityData} />;
}
