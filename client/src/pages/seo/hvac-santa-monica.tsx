import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-santa-monica.json";

export default function HvacSantaMonicaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Westside", title: "From the Pier to Palisades Park." }}
      statement="Coastal mornings. Marine air. Comfort, dialed in."
    />
  );
}
