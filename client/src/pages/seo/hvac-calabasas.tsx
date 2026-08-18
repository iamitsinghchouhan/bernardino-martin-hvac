import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-calabasas.json";

export default function HvacCalabasasPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "West Valley Foothills", title: "From The Commons to Calabasas Lake." }}
      statement="Warm afternoons. Cool evenings. Comfort that keeps pace."
    />
  );
}
