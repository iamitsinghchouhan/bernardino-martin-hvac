import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-encino.json";

export default function HvacEncinoPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "South Central Valley", title: "From Ventura Boulevard to Los Encinos Park." }}
      statement="Sunny days. Mild winters. Comfort that never misses a beat."
    />
  );
}
