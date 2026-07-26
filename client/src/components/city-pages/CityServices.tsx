import { Button } from "@/components/ui/button";
import type { CityData } from "@/data/cities/types";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/constants";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";

type CityServicesProps = {
  cityData: CityData;
};

export default function CityServices({ cityData }: CityServicesProps) {
  const services = cityData.commonServices
    .map((serviceTitle) => SERVICES.find((service) => service.title === serviceTitle))
    .filter((service): service is (typeof SERVICES)[number] => Boolean(service));

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Core Service Mix
            </p>
            <h2 className="mt-3 text-3xl font-heading font-bold text-slate-950 md:text-4xl">
              Services Available in {cityData.city}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              These are the HVAC services homeowners in {cityData.city} request most often when they need reliable comfort, better airflow, and cleaner system performance.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>

                <ul className="mt-5 space-y-2">
                  {service.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                    {service.price}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {service.duration}
                  </span>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-primary font-semibold hover:bg-primary/90" asChild>
                    <Link href={`/booking?service=${service.id}&city=${encodeURIComponent(cityData.city)}`}>
                      Request Service
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Full catalog — link chips only (not full descriptions) to avoid duplicating
              the same service copy across 30 near-identical city pages; each links to
              that service's own dedicated page for the real detail. */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900">
              Every Service We Offer in {cityData.city}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Beyond our most-requested HVAC work above, we also handle the full range of home services below.
            </p>
            <div className="mt-6 space-y-5">
              {SERVICE_CATEGORIES.map((category) => {
                const categoryServices = SERVICES.filter((s) => s.category === category);
                if (categoryServices.length === 0) return null;
                return (
                  <div key={category}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{category}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {categoryServices.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
