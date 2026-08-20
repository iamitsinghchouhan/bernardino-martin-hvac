import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-north-hollywood.json";

export default function HvacNorthHollywoodPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "East Valley", title: "From the NoHo Arts District to the Chandler Bikeway." }}
      statement="Hot summer days. Cool winter nights. Comfort, dialed in."
    />
  );
}
