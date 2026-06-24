const SITE_URL = "https://bernardinomartinhvac.com";
const DEFAULT_UPLOAD_DATE = "2026-01-15T08:00:00-08:00";

function absoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function buildVideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  uploadDate = DEFAULT_UPLOAD_DATE,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: absoluteUrl(thumbnailUrl),
    contentUrl: absoluteUrl(contentUrl),
    uploadDate,
  };
}
