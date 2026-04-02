import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function MiniSplitServiceLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("mini-split-service-los-angeles")!} />;
}
