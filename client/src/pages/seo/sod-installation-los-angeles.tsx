import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function SodInstallationLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("sod-installation-los-angeles")!} />;
}
