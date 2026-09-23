import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-calabasas.json";

export default function HvacCalabasasPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Malibu Canyon Gateway", title: "Gated Estates. Foothill Quiet." }}
      statement="Private roads. Horse trails. Comfort without the noise."
    />
  );
}
