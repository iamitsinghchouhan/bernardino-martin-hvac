import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-woodland-hills.json";

export default function HvacWoodlandHillsPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Warner Center", title: "Office Towers Meet Quiet Streets." }}
      statement="Commercial hours. Residential calm. One team."
    />
  );
}
