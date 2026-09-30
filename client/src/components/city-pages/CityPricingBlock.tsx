import { SERVICES } from "@/lib/constants";
import type { CityData } from "@/data/cities/types";

type CityPricingBlockProps = {
  cityData: CityData;
};

/** "What it costs" — a simple grid, not a full price list, per the doc. Uses the same 4
    commonServices already highlighted in "Core Service Mix," each showing its real price field
    from SERVICES (client/src/lib/constants.ts) — every entry there already has either a specific
    "Starting at $X" or "Free estimate," so nothing here is invented or backfilled. */
export function CityPricingBlock({ cityData }: CityPricingBlockProps) {
  const highlighted = cityData.commonServices
    .map((title) => SERVICES.find((s) => s.title === title))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  if (highlighted.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">What It Costs</p>
            <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-4xl">
              Real Pricing in {cityData.city}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              No hidden fees, no call for a call — here's what our most-requested {cityData.city} services actually start at.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
            {highlighted.map((service) => (
              <div
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{service.title}</p>
                </div>
                <p className="mt-4 text-2xl font-black text-primary">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
