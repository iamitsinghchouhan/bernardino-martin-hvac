import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function AirConditioningServiceLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("air-conditioning-service-los-angeles")!} />;
}
