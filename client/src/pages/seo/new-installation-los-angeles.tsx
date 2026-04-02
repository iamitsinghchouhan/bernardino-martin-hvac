import { KeywordServicePage } from "./keyword-page";
import { getKeywordPage } from "./keyword-page-data";

export default function NewInstallationLosAngeles() {
  return <KeywordServicePage page={getKeywordPage("new-installation-los-angeles")!} />;
}
