import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function HeatPumpLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("heat-pump-los-angeles")!} />;
}
