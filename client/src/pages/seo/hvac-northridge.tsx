import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-northridge.json";

export default function HvacNorthridgePage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "CSUN Territory", title: "A College Town, Cooled Right." }}
      statement="Campus rhythm. Valley heat. Built to handle both."
    />
  );
}
