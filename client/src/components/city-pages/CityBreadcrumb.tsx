import { CANONICAL_CITY_PAGES, buildCityBreadcrumbSchema } from "@/data/city-pages";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

type CityBreadcrumbProps = {
  cityName: string;
  cityPath?: string;
  className?: string;
};

export function getCityBreadcrumbSchema(cityName: string, cityPath?: string) {
  const cityPage = cityPath
    ? CANONICAL_CITY_PAGES.find((city) => city.path === cityPath)
    : CANONICAL_CITY_PAGES.find((city) => city.name.toLowerCase() === cityName.toLowerCase());

  return buildCityBreadcrumbSchema(cityName, cityPage?.path ?? cityPath ?? `/hvac-${cityName.toLowerCase().replace(/\s+/g, "-")}`);
}

export function CityBreadcrumb({ cityName, cityPath, className = "" }: CityBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-sm font-semibold ${className}`}>
      <ol className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-slate-100 backdrop-blur">
        <li>
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </li>
        <li>
          <Link href="/service-areas" className="transition-colors hover:text-white">
            Service Areas
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </li>
        <li aria-current="page" className="text-white">
          {cityName}
        </li>
      </ol>
    </nav>
  );
}
