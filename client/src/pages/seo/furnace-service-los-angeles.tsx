import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function FurnaceServiceLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("furnace-service-los-angeles")!} />;
}
