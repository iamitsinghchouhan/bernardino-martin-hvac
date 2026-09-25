import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-reseda.json";

export default function HvacResedaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Reseda Boulevard", title: "Flat Streets. Real Diversity." }}
      statement="Tract homes. Working families. Comfort, no upsell."
    />
  );
}
