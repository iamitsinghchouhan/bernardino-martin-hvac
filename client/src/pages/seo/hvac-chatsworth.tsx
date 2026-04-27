import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-chatsworth.json";

export default function HvacChatsworthPage() {
  return <CityPageTemplate cityData={cityData} />;
}
