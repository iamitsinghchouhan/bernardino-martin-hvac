import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-glendale.json";

export default function HvacGlendalePage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Verdugo Foothills", title: "Dense Core. Quiet Hills. One City." }}
      statement="Urban energy below. Foothill calm above."
    />
  );
}
