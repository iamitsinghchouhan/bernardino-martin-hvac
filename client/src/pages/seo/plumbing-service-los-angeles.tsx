import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function PlumbingServiceLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("plumbing-service-los-angeles")!} />;
}
