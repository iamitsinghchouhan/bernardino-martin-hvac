import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-canoga-park.json";

export default function HvacCanogaParkPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Old Town Canoga Park", title: "Aerospace Roots. New Energy." }}
      statement="Manufacturing legacy. Revived downtown. Comfort for both."
    />
  );
}
