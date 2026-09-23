import CityPageTemplate from "./city-page-template";
import cityData from "@/data/cities/hvac-santa-monica.json";

export default function HvacSantaMonicaPage() {
  return (
    <CityPageTemplate
      cityData={cityData}
      redesign
      headline={{ eyebrow: "Silicon Beach", title: "Coastal Density. Startup Energy." }}
      statement="Rent-controlled charm. Luxury condos. Comfort, block by block."
    />
  );
}
