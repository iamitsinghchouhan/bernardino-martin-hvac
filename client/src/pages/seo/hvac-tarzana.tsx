import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-tarzana.json";

export default function HvacTarzanaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South West Valley", title: "From Ventura Boulevard to Corbin Canyon." }}
      statement="Dry summer heat. Cool nights. Comfort, all season."
    />
  );
}
