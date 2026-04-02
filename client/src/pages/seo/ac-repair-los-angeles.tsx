import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function AcRepairLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("ac-repair-los-angeles")!} />;
}
