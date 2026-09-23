export type CityData = {
  id: number;
  city: string;
  slug: string;
  region: string;
  population: string;
  zipCodes: string[];
  description: string;
  climate: string;
  commonServices: string[];
  serviceAreas: string[];
  responseTime: string;
  videoFile: string;
  imageFile: string;
  metaDescription: string;
  metaKeywords: string;
  localPhone: string;
  nearestCities: string[];
  notableLandmarks: string[];
  googleMyBusinessUrl: string;
  /** Optional — real, city-specific photos (not the generic stock image) for a "Real Work in [City]" gallery. */
  galleryImages?: string[];
  /** Optional — a real, city-specific landmark photo for the "Landmark Spotlight" section. */
  landmarkPhoto?: { src: string; alt: string; caption: string };
  /** Optional — city-specific narrative for the "Life in {city}" section. */
  localLife?: {
    nature: string;
    community: string;
    howWeHelp: string;
  };
  /** Optional — per-season service angles for the "Seasonal in {city}" section.
      `season` is conventionally "Summer" | "Fall" | "Winter" | "Spring", but typed as
      string since plain .json imports widen string literals and can't hold the union. */
  seasonalNotes?: {
    season: string;
    focus: string;
  }[];
};
