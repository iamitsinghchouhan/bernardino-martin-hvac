import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-pasadena.json";

export default function HvacPasadenaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      redesignV2
      headline={{ eyebrow: "Historic Pasadena", title: "Craftsman Homes. Modern Comfort." }}
      statement="Historic character. Inland heat. Comfort that respects both."
    />
  );
}
