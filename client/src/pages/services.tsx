import { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  Clock3,
  DollarSign,
  Flame,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  SERVICES,
  SERVICE_CATEGORIES,
  type Service,
  type ServiceCategory,
} from "@/lib/constants";

const CATEGORY_META: Record<
  ServiceCategory,
  { id: string; eyebrow: string; title: string; summary: string }
> = {
  "HVAC & Heating": {
    id: "hvac",
    eyebrow: "Cooling, heating, airflow",
    title: "HVAC and heating solutions for homes across Los Angeles",
    summary:
      "Browse repairs, installations, tune-ups, and specialty heating services without digging through a long page.",
  },
  "Solar & Energy": {
    id: "solar",
    eyebrow: "Panels, power, efficiency",
    title: "Solar services designed for long-term performance",
    summary:
      "Compare installation, maintenance, and hybrid solar-powered upgrades in one place.",
  },
  Plumbing: {
    id: "plumbing",
    eyebrow: "Leaks, lines, protection",
    title: "Plumbing services that protect your home and comfort",
    summary:
      "From general plumbing to smart protection devices, every service is explained clearly before you book.",
  },
  Electrical: {
    id: "electrical",
    eyebrow: "Panels, circuits, safety",
    title: "Electrical work with cleaner scope and clearer next steps",
    summary:
      "See panel and general electrical services with the essentials customers usually ask about first.",
  },
  "Outdoor & Property": {
    id: "outdoor",
    eyebrow: "Landscape, irrigation, curb appeal",
    title: "Outdoor improvements grouped into one guided experience",
    summary:
      "Landscaping, sod, planting, and irrigation are all organized into a shorter browsing flow.",
  },
  Technology: {
    id: "technology",
    eyebrow: "Network, wiring, smart home",
    title: "Technology services for connected homes and businesses",
    summary:
      "Open each service to understand what is included before requesting a visit or quote.",
  },
};

const HVAC_BRANDS = [
  "Carrier",
  "Trane",
  "Lennox",
  "Rheem",
  "Goodman",
  "York",
  "Daikin",
  "Mitsubishi",
  "LG",
  "Bosch",
];

const HEATING_SPECIALTIES = [
  {
    title: "Gas Furnace Repair",
    description: "Diagnose ignition, airflow, and heat-delivery issues for gas furnaces.",
    icon: Flame,
  },
  {
    title: "Electric Furnace Repair",
    description: "Restore reliable electric heat with focused troubleshooting and service.",
    icon: Wrench,
  },
  {
    title: "Floor Furnace Services",
    description: "Maintenance and repair support for older floor furnace systems.",
    icon: Flame,
  },
  {
    title: "Wall Furnace Services",
    description: "Service, repair, and replacement planning for wall furnace units.",
    icon: Wrench,
  },
  {
    title: "Furnace Replacement",
    description: "Upgrade aging heating equipment with safer, more efficient options.",
    icon: Flame,
  },
];

export default function Services() {
  const defaultCategory = SERVICE_CATEGORIES[0];
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(defaultCategory);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const categoryServices = useMemo(
    () => SERVICES.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const activeService = useMemo(
    () => SERVICES.find((service) => service.id === activeServiceId) ?? null,
    [activeServiceId],
  );

  const activeMeta = CATEGORY_META[activeCategory];

  const openServiceDialog = (service: Service) => {
    setActiveServiceId(service.id);
  };

  return (
    <Layout>
      <SEO
        title="Services | HVAC, Solar, Plumbing, Electrical and More"
        description="Browse services by category, compare starting prices and timing, and open each service for a detailed overview before you book."
      />

      <section className="relative overflow-hidden bg-blue-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.28),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.2),_transparent_32%),linear-gradient(135deg,#0f172a_15%,#0b3b8f_60%,#172554_100%)]" />
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/images/hero-home.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="container relative z-10 mx-auto px-4 py-18 md:py-24">
          <div className="max-w-4xl">
            <Badge className="border-blue-300/30 bg-white/10 px-4 py-1.5 text-blue-50 hover:bg-white/10">
              Los Angeles comfort services
            </Badge>
            <h1 className="mt-6 max-w-3xl text-4xl font-heading font-black tracking-tight md:text-6xl">
              Los Angeles HVAC Experts
            </h1>
            <p className="mt-4 text-base font-medium text-blue-100 md:text-lg">
              24/7 service • All brands • Licensed & insured
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-50/90">
              Explore each service category, compare the right options for your property, and open detailed service information without scrolling through a long page.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="bg-white text-blue-900 hover:bg-blue-50" asChild>
                <Link href="/booking?service=hvac-repair">Book AC Repair</Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href="/quote">Get Free Estimate</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {[
                "15+ Years Experience",
                "5,000+ Happy Customers",
                "Same-Day Service Available",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-semibold text-blue-50 backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-3xl border border-blue-100 bg-blue-50 px-6 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  Trusted brands we service
                </p>
                <h2 className="mt-2 text-2xl font-heading font-bold text-slate-950">
                  Trusted Brands We Service
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {HVAC_BRANDS.map((brand) => (
                  <span
                    key={brand}
                    className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {SERVICE_CATEGORIES.map((category) => {
                const categoryMeta = CATEGORY_META[category];
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    data-testid={`button-category-${categoryMeta.id}`}
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-700 text-white shadow-md"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-800"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      <section className="bg-slate-50 pb-18">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              {activeMeta.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-heading font-bold text-slate-950">
              {activeMeta.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              {activeMeta.summary}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categoryServices.map((service) => (
                <Card
                  key={service.id}
                  className="group overflow-hidden border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  data-testid={`card-service-${service.id}`}
                >
                  <button
                    type="button"
                    onClick={() => openServiceDialog(service)}
                    className="h-full w-full text-left"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-52 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-heading font-bold text-slate-950">
                            {service.title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {service.description}
                          </p>
                        </div>
                        <service.icon className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
                          {service.price}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {service.duration}
                        </span>
                      </div>

                      <div className="mt-6">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                          View Details
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </CardContent>
                  </button>
                </Card>
              ))}
            </div>
          </div>

          {activeCategory === "HVAC & Heating" && (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  Heating specialties
                </p>
                <h2 className="mt-3 text-3xl font-heading font-bold text-slate-950">
                  Heating Specialties
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Specialized support for the furnace and heating services homeowners ask about most often.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {HEATING_SPECIALTIES.map((specialty) => (
                  <div
                    key={specialty.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                        <specialty.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <p className="text-base font-bold text-slate-950">{specialty.title}</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {specialty.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                  Financing support
                </p>
                <h2 className="mt-3 text-3xl font-heading font-bold text-slate-950">
                  Flexible Financing Available
                </h2>
                <p className="mt-3 text-lg font-semibold text-blue-900">
                  Get the service you need today - pay over time.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                  We understand that home repairs and upgrades can be unexpected. That's why BERNARDINO MARTIN offers flexible financing options to qualified customers. Whether you're replacing your HVAC system, installing solar, or upgrading your plumbing, we can help you find a payment plan that works for your budget. Apply in minutes with no hard credit pull required.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "0% Interest Promotions",
                    "Quick Approval Process",
                    "Flexible Monthly Payments",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-900"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-slate-950">
                      Flexible monthly plans
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Ask about financing for HVAC replacements, solar upgrades, plumbing protection systems, and other larger home-service projects.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-blue-700 text-white hover:bg-blue-800" asChild>
                    <Link href="/contact">Ask About Financing</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!activeService} onOpenChange={(open) => !open && setActiveServiceId(null)}>
        {activeService && (
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-slate-200 p-0">
            <div className="overflow-hidden rounded-t-lg">
              <img
                src={activeService.image}
                alt={activeService.title}
                className="h-72 w-full object-cover md:h-80"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="p-6 md:p-8">
              <DialogHeader>
                <DialogTitle className="text-3xl font-heading font-bold text-slate-950">
                  {activeService.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-7 text-slate-600">
                  {activeService.overview}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock3 className="h-4 w-4" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]">Timing / Duration</span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-slate-950">{activeService.duration}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-blue-700">
                    <DollarSign className="h-4 w-4" aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-[0.18em]">Starting price</span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-slate-950">{activeService.price}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-heading font-bold text-slate-950">What's included</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {activeService.bullets.map((bullet) => (
                    <div key={bullet} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <p className="text-sm leading-6 text-slate-700">{bullet}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="bg-blue-700 text-white hover:bg-blue-800" asChild>
                  <Link href={`/booking?service=${activeService.id}`}>Book This Service</Link>
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-800 hover:bg-blue-50" asChild>
                  <Link href="/quote">Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
}
