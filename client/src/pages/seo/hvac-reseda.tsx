import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-reseda.json";

export default function HvacResedaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Central West Valley", title: "From Reseda Park to the L.A. River." }}
      statement="Warm afternoons. Cool nights. Comfort that keeps pace."
    />
  );
}
