import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-north-hollywood.json";

export default function HvacNorthHollywoodPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "NoHo Arts District", title: "Theaters, Transit, and Everything Between." }}
      statement="Old apartments. New towers. One transit hub."
    />
  );
}
