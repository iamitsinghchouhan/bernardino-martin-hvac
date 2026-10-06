import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const SITE_URL = "https://bernardinomartinhvac.com";
const HOME: Crumb = { name: "Home", href: "/" };

export type Crumb = { name: string; href: string };

const STATIC_PAGE_LABELS: Record<string, string> = {
  "/about": "About Us",
  "/contact": "Contact Us",
  "/services": "Services",
  "/booking": "Book Online",
  "/quote": "Get a Free Estimate",
  "/service-areas": "Service Areas",
};

const SERVICE_LANDING_LABELS: Record<string, string> = {
  "/ac-repair-los-angeles": "AC Repair",
  "/air-conditioning-service-los-angeles": "Air Conditioning Service",
  "/electrical-services-los-angeles": "Electrical Services",
  "/furnace-service-los-angeles": "Furnace Service",
  "/heat-pump-los-angeles": "Heat Pump",
  "/irrigation-los-angeles": "Irrigation",
  "/landscaping-los-angeles": "Landscaping",
  "/landscaping-services-los-angeles": "Landscaping Services",
  "/mini-split-service-los-angeles": "Mini-Split Service",
  "/network-installation-los-angeles": "Network Installation",
  "/network-repair-los-angeles": "Network Repair",
  "/new-installation-los-angeles": "New Installation",
  "/planters-landscaping-los-angeles": "Planters & Landscaping",
  "/plumbing-los-angeles": "Plumbing",
  "/plumbing-service-los-angeles": "Plumbing Service",
  "/sod-installation-los-angeles": "Sod Installation",
  "/solar-installation-los-angeles": "Solar Installation",
  "/solar-optimization-los-angeles": "Solar Optimization",
};

/** Trail for pages that don't render their own breadcrumb. City and service-detail pages
    already do, so they're deliberately absent here — one BreadcrumbList per page. */
export function breadcrumbTrailFor(path: string): Crumb[] | null {
  if (STATIC_PAGE_LABELS[path]) {
    return [HOME, { name: STATIC_PAGE_LABELS[path], href: path }];
  }
  if (SERVICE_LANDING_LABELS[path]) {
    return [HOME, { name: "Services", href: "/services" }, { name: SERVICE_LANDING_LABELS[path], href: path }];
  }
  return null;
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-white">
        <ol className="container mx-auto flex flex-wrap items-center gap-1.5 px-4 py-2.5 text-xs text-slate-500">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 ? <ChevronRight className="h-3 w-3" aria-hidden="true" /> : null}
                {isLast ? (
                  <span aria-current="page" className="font-semibold text-slate-700">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="transition-colors hover:text-[var(--rb-navy)]">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
