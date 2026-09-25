import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-studio-city.json";

export default function HvacStudioCityPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "CBS Studio Center", title: "Boulevard Energy. Canyon Calm." }}
      statement="Industry pace. Canyon quiet. Comfort without the compromise."
    />
  );
}
