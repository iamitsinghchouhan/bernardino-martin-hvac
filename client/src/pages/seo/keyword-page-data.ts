import { keywordPagesA } from "./keyword-page-data-a";
import { keywordPagesB } from "./keyword-page-data-b";
import { keywordPagesC } from "./keyword-page-data-c";

export const keywordPages = [
  ...keywordPagesA,
  ...keywordPagesB,
  ...keywordPagesC,
];

export function getKeywordPage(slug: string) {
  return keywordPages.find((page) => page.slug === slug);
}
