import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function PlantersLandscapingLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("planters-landscaping-los-angeles")!} />;
}
