import type { CityData } from "@/data/cities/types";
import { getCityPageByName } from "@/data/city-pages";
import { Link } from "wouter";

type InternalCityLinksProps = {
  currentCity: CityData;
  allCities: CityData[];
};

export default function InternalCityLinks({
  currentCity,
  allCities,
}: InternalCityLinksProps) {
  void allCities;
  const nearbyCities = currentCity.nearestCities
    .map((cityName) => getCityPageByName(cityName))
    .filter((city): city is NonNullable<ReturnType<typeof getCityPageByName>> => Boolean(city));

  if (!nearbyCities.length) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Nearby Coverage
            </p>
            <h2 className="mt-3 text-3xl font-heading font-bold text-slate-950 md:text-4xl">
              Service Areas Near {currentCity.city}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore nearby cities we also serve if you are comparing neighborhoods, checking response times, or booking for another property in the area.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyCities.map((city) => (
              <Link
                key={city.path}
                href={city.path}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-800 transition-colors hover:border-primary/30 hover:bg-primary hover:text-white"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
