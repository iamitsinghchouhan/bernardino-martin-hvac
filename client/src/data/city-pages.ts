export type CanonicalCityPage = {
  name: string;
  path: string;
};

export const SITE_URL = "https://bernardinomartinhvac.com";

export const CANONICAL_CITY_PAGES: CanonicalCityPage[] = [
  { name: "Malibu", path: "/hvac-malibu" },
  { name: "Burbank", path: "/hvac-burbank" },
  { name: "Beverly Hills", path: "/hvac-beverly-hills" },
  { name: "Gardena", path: "/hvac-gardena" },
  { name: "Glendale", path: "/hvac-glendale" },
  { name: "Torrance", path: "/hvac-torrance" },
  { name: "Hawthorne", path: "/hvac-hawthorne" },
  { name: "Inglewood", path: "/hvac-inglewood" },
  { name: "El Segundo", path: "/hvac-el-segundo" },
  { name: "Long Beach", path: "/hvac-long-beach" },
  { name: "Culver City", path: "/hvac-culver-city" },
  { name: "Los Angeles", path: "/hvac-los-angeles" },
  { name: "Santa Monica", path: "/hvac-santa-monica" },
  { name: "Hermosa Beach", path: "/hvac-hermosa-beach" },
  { name: "Redondo Beach", path: "/hvac-redondo-beach" },
  { name: "West Hollywood", path: "/hvac-west-hollywood" },
  { name: "Manhattan Beach", path: "/hvac-manhattan-beach" },
  { name: "San Fernando Valley", path: "/hvac-san-fernando-valley" },
  { name: "Playa del Rey", path: "/hvac-playa-del-rey" },
  { name: "Hollywood", path: "/hvac-hollywood" },
  { name: "Pasadena", path: "/hvac-pasadena" },
  { name: "North Hollywood", path: "/hvac-north-hollywood" },
  { name: "Van Nuys", path: "/hvac-van-nuys" },
  { name: "Chatsworth", path: "/hvac-chatsworth" },
  { name: "Northridge", path: "/hvac-northridge" },
  { name: "Reseda", path: "/hvac-reseda" },
  { name: "Canoga Park", path: "/hvac-canoga-park" },
  { name: "Woodland Hills", path: "/hvac-woodland-hills" },
  { name: "Calabasas", path: "/hvac-calabasas" },
  { name: "Sherman Oaks", path: "/hvac-sherman-oaks" },
  { name: "Studio City", path: "/hvac-studio-city" },
  { name: "Encino", path: "/hvac-encino" },
  { name: "Tarzana", path: "/hvac-tarzana" },
  { name: "West Hills", path: "/hvac-west-hills" },
  { name: "Westchester", path: "/hvac-westchester" },
  { name: "Lennox", path: "/hvac-lennox" },
];

export const CITY_PAGE_LINKS_BY_NAME: Record<string, string> = Object.fromEntries(
  CANONICAL_CITY_PAGES.map((city) => [city.name, city.path]),
);

export function cityPageUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export function getCityPageByName(name: string) {
  const normalized = name.toLowerCase();
  return CANONICAL_CITY_PAGES.find((city) => city.name.toLowerCase() === normalized);
}

export function getCityPageByPath(path: string) {
  return CANONICAL_CITY_PAGES.find((city) => city.path === path);
}

export function buildCityBreadcrumbSchema(cityName: string, cityPath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${SITE_URL}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityName,
        item: cityPageUrl(cityPath),
      },
    ],
  };
}
