import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-studio-city.json";

export default function HvacStudioCityPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South East Valley", title: "From Ventura Boulevard to Fryman Canyon." }}
      statement="Sunny afternoons. Cool canyon evenings. Comfort in between."
    />
  );
}
