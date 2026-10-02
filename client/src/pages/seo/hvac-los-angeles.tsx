import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-los-angeles.json";

export default function HvacLosAngelesPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      redesignV2
      headline={{ eyebrow: "Home Base", title: "One Team, Every LA Neighborhood." }}
      statement="Hillside to flats, bungalow to high-rise. Comfort built for all of it."
    />
  );
}
