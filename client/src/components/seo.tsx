import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string;
  image?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL = "https://bernardinomartinhvac.com";
const SITE_NAME = "BERNARDINO MARTIN Heating, Air Conditioning & Solar";

function normalizeUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function canonicalPath(location: string) {
  const [pathWithoutHash] = location.split("#");
  const [pathWithoutQuery] = pathWithoutHash.split("?");
  return pathWithoutQuery || "/";
}

export function SEO({
  title,
  description,
  canonical,
  noindex = false,
  keywords,
  image,
  structuredData,
}: SEOProps) {
  const [location] = useLocation();
  const canonicalUrl = normalizeUrl(canonical ?? canonicalPath(location));
  const imageUrl = image ? normalizeUrl(image) : `${SITE_URL}/opengraph.webp`;
  const fullTitle = title.includes("|") ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </Helmet>
  );
}
