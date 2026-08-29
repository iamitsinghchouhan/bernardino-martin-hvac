import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-inglewood.json";

export default function HvacInglewoodPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      headline={{ eyebrow: "City of Champions", title: "Home of SoFi Stadium. Home to Your Comfort." }}
      statement="Cool mornings. Warm afternoons. Comfort, all day."
    />
  );
}
