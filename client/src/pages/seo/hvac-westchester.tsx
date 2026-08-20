import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-westchester.json";

export default function HvacWestchesterPage() {
  return <CityPageTemplate cityData={cityData} />;
}
