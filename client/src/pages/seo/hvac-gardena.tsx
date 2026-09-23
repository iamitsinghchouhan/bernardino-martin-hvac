import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-gardena.json";

export default function HvacGardenaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Central South Bay", title: "Working Grid. Working-Class Roots." }}
      statement="Dense streets. Honest pricing. No-frills comfort."
    />
  );
}
