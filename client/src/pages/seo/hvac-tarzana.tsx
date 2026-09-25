import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-tarzana.json";

export default function HvacTarzanaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Tarzana Village", title: "Quieter Boulevard. Same Valley Heat." }}
      statement="Ranch homes. Hillside builds. Comfort, no fuss."
    />
  );
}
