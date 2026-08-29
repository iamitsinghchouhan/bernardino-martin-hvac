export type CityEntry = { name: string; path: string; slug: string };

const CANONICAL_BASE = "https://bernardinomartinhvac.com";

const CITY_LIST: CityEntry[] = [
  { name: "Malibu", path: "/hvac-malibu", slug: "hvac-malibu" },
  { name: "Burbank", path: "/hvac-burbank", slug: "hvac-burbank" },
  { name: "Gardena", path: "/hvac-gardena", slug: "hvac-gardena" },
  { name: "Glendale", path: "/hvac-glendale", slug: "hvac-glendale" },
  { name: "Torrance", path: "/hvac-torrance", slug: "hvac-torrance" },
  { name: "Hawthorne", path: "/hvac-hawthorne", slug: "hvac-hawthorne" },
  { name: "Inglewood", path: "/hvac-inglewood", slug: "hvac-inglewood" },
  { name: "El Segundo", path: "/hvac-el-segundo", slug: "hvac-el-segundo" },
  { name: "Long Beach", path: "/hvac-long-beach", slug: "hvac-long-beach" },
  { name: "Culver City", path: "/hvac-culver-city", slug: "hvac-culver-city" },
  { name: "Los Angeles", path: "/hvac-los-angeles", slug: "hvac-los-angeles" },
  { name: "Santa Monica", path: "/hvac-santa-monica", slug: "hvac-santa-monica" },
  { name: "Hermosa Beach", path: "/hvac-hermosa-beach", slug: "hvac-hermosa-beach" },
  { name: "Redondo Beach", path: "/hvac-redondo-beach", slug: "hvac-redondo-beach" },
  { name: "West Hollywood", path: "/hvac-west-hollywood", slug: "hvac-west-hollywood" },
  { name: "Manhattan Beach", path: "/hvac-manhattan-beach", slug: "hvac-manhattan-beach" },
  { name: "San Fernando Valley", path: "/hvac-san-fernando-valley", slug: "hvac-san-fernando-valley" },
  { name: "Playa del Rey", path: "/hvac-playa-del-rey", slug: "hvac-playa-del-rey" },
  { name: "Hollywood", path: "/hvac-hollywood", slug: "hvac-hollywood" },
  { name: "Pasadena", path: "/hvac-pasadena", slug: "hvac-pasadena" },
  { name: "North Hollywood", path: "/hvac-north-hollywood", slug: "hvac-north-hollywood" },
  { name: "Van Nuys", path: "/hvac-van-nuys", slug: "hvac-van-nuys" },
  { name: "Chatsworth", path: "/hvac-chatsworth", slug: "hvac-chatsworth" },
  { name: "Northridge", path: "/hvac-northridge", slug: "hvac-northridge" },
  { name: "Reseda", path: "/hvac-reseda", slug: "hvac-reseda" },
  { name: "Canoga Park", path: "/hvac-canoga-park", slug: "hvac-canoga-park" },
  { name: "Woodland Hills", path: "/hvac-woodland-hills", slug: "hvac-woodland-hills" },
  { name: "Calabasas", path: "/hvac-calabasas", slug: "hvac-calabasas" },
  { name: "Sherman Oaks", path: "/hvac-sherman-oaks", slug: "hvac-sherman-oaks" },
  { name: "Studio City", path: "/hvac-studio-city", slug: "hvac-studio-city" },
  { name: "Encino", path: "/hvac-encino", slug: "hvac-encino" },
  { name: "Tarzana", path: "/hvac-tarzana", slug: "hvac-tarzana" },
  { name: "West Hills", path: "/hvac-west-hills", slug: "hvac-west-hills" },
  { name: "Westchester", path: "/hvac-westchester", slug: "hvac-westchester" },
  { name: "Lennox", path: "/hvac-lennox", slug: "hvac-lennox" }
];

const CITY_MAP: Record<string, CityEntry> = CITY_LIST.reduce((acc, cur) => {
  acc[cur.path] = cur;
  return acc;
}, {} as Record<string, CityEntry>);

export function getCityForPath(path: string): CityEntry | undefined {
  return CITY_MAP[path];
}

export function buildTitleForCity(name: string) {
  return `HVAC Services in ${name}, CA | Bernardino Martin`;
}

export function buildDescriptionForCity(name: string) {
  return `Local HVAC services in ${name}, CA — repair, installation and maintenance. Call (818) 400-0227.`;
}

export function buildCanonical(path: string) {
  return `${CANONICAL_BASE}${path}`;
}

export function buildBreadcrumbListJsonLD(path: string, name: string) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${CANONICAL_BASE}/` },
    { "@type": "ListItem", position: 2, name: "Service Areas", item: `${CANONICAL_BASE}/service-areas` },
    { "@type": "ListItem", position: 3, name, item: `${CANONICAL_BASE}${path}` },
  ];
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
  });
}

export const ALL_CITY_PATHS = CITY_LIST.map(c => c.path);
