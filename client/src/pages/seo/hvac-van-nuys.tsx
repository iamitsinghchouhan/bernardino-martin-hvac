import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-van-nuys.json";

export default function HvacVanNuysPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      redesignV2
      headline={{ eyebrow: "Central Valley", title: "From the Civic Center to the Sepulveda Basin." }}
      statement="Hot, dry summers. Long cooling seasons. Comfort that keeps up."
      localFaqs={[
        {
          q: "Why does it feel so much hotter in Van Nuys than at the coast?",
          a: "The valley floor's heat-island effect means Van Nuys often runs 15+ degrees hotter than coastal LA, with heat radiating off asphalt and parking lots long after sundown. Older ducting in particular struggles to keep up without a tune-up first.",
        },
      ]}
    />
  );
}
