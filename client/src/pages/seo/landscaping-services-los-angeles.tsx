import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function LandscapingServicesLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("landscaping-services-los-angeles")!} />;
}
