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
};
