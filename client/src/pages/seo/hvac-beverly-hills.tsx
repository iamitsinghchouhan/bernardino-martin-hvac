import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-beverly-hills.json";

export default function HvacBeverlyHillsPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      headline={{ eyebrow: "Los Angeles Westside", title: "Where premium homes meet expert HVAC service." }}
      statement="Rodeo Drive elegance. Every room comfort."
    />
  );
}
