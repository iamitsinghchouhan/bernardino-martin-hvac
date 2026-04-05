import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/constants";
import type { Service, ServiceCategory } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link, useLocation } from "wouter";
import {
  Check,
  MessageCircle,
  Clock,
  ChevronRight,
  DollarSign,
  Smartphone,
  Droplets,
  ShieldCheck,
  Flame,
  ImageOff,
  X,
} from "lucide-react";

const BRANDS = [
  { name: "Carrier", image: "/images/brands/carrier.svg" },
  { name: "Trane", image: "/images/brands/trane.svg" },
  { name: "Lennox", image: "/images/brands/lennox.svg" },
  { name: "Rheem", image: "/images/brands/rheem.svg" },
  { name: "Goodman", image: "/images/brands/goodman.svg" },
  { name: "York", image: "/images/brands/york.svg" },
  { name: "Daikin", image: "/images/brands/daikin.svg" },
  { name: "Mitsubishi", image: "/images/brands/mitsubishi.svg" },
  { name: "LG", image: "/images/brands/lg.svg" },
  { name: "Bosch", image: "/images/brands/bosch.svg" },
] as const;

const HASH_TO_CATEGORY: Record<string, ServiceCategory> = {
  hvac: "HVAC & Heating",
  solar: "Solar & Energy",
  plumbing: "Plumbing",
  electrical: "Electrical",
  outdoor: "Outdoor & Property",
  technology: "Technology",
};

const HEATING_SPECIALTIES = [
  { label: "Gas Furnace Repair", desc: "All gas furnace makes and models" },
  { label: "Electric Furnace Repair", desc: "Fast diagnostics and repair" },
  { label: "Floor Furnace Services", desc: "Installation, repair and cleaning" },
  { label: "Wall Furnace Services", desc: "Safe and efficient wall units" },
  { label: "Furnace Replacement", desc: "Energy-efficient upgrades" },
];

function getImageFallbacks(src: string) {
  const sources = [src];

  if (src.endsWith(".webp")) {
    sources.push(src.replace(/\.webp$/, ".png"));
    sources.push(src.replace(/\.webp$/, ".jpg"));
  } else if (src.endsWith(".png")) {
    sources.push(src.replace(/\.png$/, ".webp"));
    sources.push(src.replace(/\.png$/, ".jpg"));
  } else if (src.endsWith(".jpg")) {
    sources.push(src.replace(/\.jpg$/, ".webp"));
    sources.push(src.replace(/\.jpg$/, ".png"));
  }

  return Array.from(new Set(sources));
}

function AdaptiveImage({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const fallbacks = useMemo(() => getImageFallbacks(src), [src]);
  const [index, setIndex] = useState(0);
  const currentSrc = fallbacks[index];

  useEffect(() => {
    setIndex(0);
  }, [src]);

  return (
    <div className={className}>
      {currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          className={imgClassName}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          width={width}
          height={height}
          onError={() => {
            if (index < fallbacks.length - 1) {
              setIndex(index + 1);
            } else {
              setIndex(fallbacks.length);
            }
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
          <ImageOff className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}

function ServiceModal({
  service,
  open,
  onClose,
}: {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <AdaptiveImage
            src={service.image}
            alt={service.title}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover"
            width={1280}
            height={720}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white transition-colors hover:bg-black/60"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="flex w-fit items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900">
              <Clock className="h-3.5 w-3.5 text-primary" /> {service.duration}
            </span>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="mb-1 text-2xl font-bold text-slate-900">
              {service.title}
            </DialogTitle>
          </DialogHeader>

          <div className="mb-4 mt-2 flex w-fit items-center gap-2 rounded-md bg-secondary/10 px-3 py-1.5 text-sm font-bold text-secondary">
            <DollarSign className="h-4 w-4" />
            {service.price}
          </div>

          <p className="mb-5 text-sm leading-relaxed text-slate-600">{service.overview}</p>

          <ul className="mb-6 space-y-2">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
            <Button className="flex-1 bg-primary font-semibold hover:bg-primary/90" asChild>
              <Link href={`/booking?service=${service.id}`} onClick={onClose}>
                Book This Service
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/5"
              asChild
            >
              <Link href="/quote" onClick={onClose}>
                Get a Free Quote
              </Link>
            </Button>
            <a
              href={getWhatsAppLink(`Hi, I'm interested in your ${service.title} service.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat about ${service.title} on WhatsApp`}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-secondary/20 text-secondary transition-colors hover:bg-secondary/5"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Services() {
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("HVAC & Heating");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const syncCategoryFromHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const nextCategory = HASH_TO_CATEGORY[hash];
      if (nextCategory) {
        setActiveCategory(nextCategory);
      }
    };

    syncCategoryFromHash();
    window.addEventListener("hashchange", syncCategoryFromHash);
    return () => window.removeEventListener("hashchange", syncCategoryFromHash);
  }, [location]);

  const filteredServices = SERVICES.filter((service) => service.category === activeCategory);

  return (
    <Layout>
      <SEO
        title="HVAC, Solar, Plumbing & More Services in Los Angeles"
        description="HVAC, plumbing, electrical, solar, landscaping, irrigation and network services in Los Angeles. Licensed technicians, same-day service and free estimates. Call (818) 400-0227."
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-700 to-blue-900 py-16 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/hero-home.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(61,181,74,0.15),_transparent)]" />
        <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90">
            Los Angeles Home Services
          </span>
          <h1 className="mb-4 text-4xl font-heading font-bold text-white md:text-5xl">
            Los Angeles HVAC Experts
          </h1>
          <p className="mb-8 text-lg text-blue-100">
            24/7 service • All brands • Licensed &amp; insured
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "5,000+", label: "Happy Customers" },
              { value: "Same-Day", label: "Service Available" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-center"
              >
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-blue-200">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-secondary px-8 font-bold text-white hover:bg-secondary/90"
              asChild
            >
              <Link href="/booking?service=hvac-repair">Book AC Repair</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 px-8 font-bold text-white hover:bg-white/10"
              asChild
            >
              <Link href="/quote">Get Free Estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-5">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted Brands We Service
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  className="h-12 w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-[500px] bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          {activeCategory === "HVAC & Heating" && (
            <div className="mb-10">
              <h2 className="mb-1 text-xl font-bold text-slate-900">Heating Specialties</h2>
              <p className="mb-5 text-sm text-slate-500">
                Expert furnace and heating system services across Los Angeles
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {HEATING_SPECIALTIES.map(({ label, desc }) => (
                  <div
                    key={label}
                    className="cursor-default rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Flame className="h-5 w-5 text-primary" />
                    </div>
                    <p className="mb-1 text-xs font-bold leading-tight text-slate-900">{label}</p>
                    <p className="text-xs leading-tight text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === "Outdoor & Property" && (
            <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="p-6 md:p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    <Droplets className="h-4 w-4" />
                    Featured Irrigation Service
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    Smarter Irrigation for Lawns, Gardens, and Water-Wise Landscaping
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
                    Our irrigation service is built for Los Angeles properties that need more control and less waste.
                    We install smart controllers, drip systems, sprinkler zones, and shutoff protection that help
                    homeowners manage outdoor watering from their phone while keeping plants healthy and utility costs in check.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Phone-based scheduling and zone control",
                      "Drip irrigation for beds, planters, and shrubs",
                      "Sprinkler optimization for lawns and turf",
                      "Leak alerts and smart shutoff protection",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-medium text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-1">
                  <AdaptiveImage
                    src="/images/services/irrigation-install.png"
                    alt="Technician installing smart irrigation in a residential garden"
                    className="h-full min-h-[220px]"
                    imgClassName="h-full w-full object-cover"
                    width={1280}
                    height={720}
                  />
                  <AdaptiveImage
                    src="/images/services/irrigation-app.png"
                    alt="Smartphone controlling a garden irrigation system"
                    className="h-full min-h-[220px]"
                    imgClassName="h-full w-full object-cover"
                    width={1280}
                    height={720}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{activeCategory}</h2>
              <p className="mt-0.5 text-sm text-slate-500">
                {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-slate-900/10 transition-colors group-hover:bg-slate-900/0" />
                  <AdaptiveImage
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={640}
                    height={480}
                  />
                  <div className="absolute right-3 top-3 z-20 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
                    <Clock className="h-3 w-3 text-primary" /> {service.duration}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="rounded-lg bg-primary/5 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary">
                      {service.title}
                    </h3>
                  </div>
                  <p className="mb-3 flex-1 text-xs leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-sm font-bold text-secondary">
                      {service.price}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2">
                      View Details <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {activeCategory === "Outdoor & Property" && (
            <div className="mt-12 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-green-50 p-8 shadow-sm md:p-10">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-primary p-3 text-white shadow-md">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Smart Irrigation & Smart Valve Technology
                </h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Our smart irrigation systems connect to your phone so you can monitor and control your water usage from anywhere. The Moen Smart Water Shutoff Valve detects leaks instantly and automatically shuts off your water supply to prevent costly damage.
              </p>
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: Smartphone,
                    title: "Mobile Monitoring",
                    desc: "Control irrigation and water shutoff from your smartphone, anywhere.",
                  },
                  {
                    icon: Droplets,
                    title: "Leak Detection",
                    desc: "Smart sensors detect leaks instantly and shut off water automatically.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Insurance Discounts",
                    desc: "Many insurers offer discounts for smart water monitoring devices.",
                  },
                  {
                    icon: DollarSign,
                    title: "Save on Water Bills",
                    desc: "Intelligent scheduling and zone control reduces water waste.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <Icon className="mb-2 h-7 w-7 text-primary" />
                    <h4 className="mb-1 text-sm font-bold text-slate-900">{title}</h4>
                    <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary font-semibold hover:bg-primary/90" asChild>
                  <Link href="/booking?service=outdoor-irrigation">Schedule Installation</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-primary/20 text-primary hover:bg-primary/5"
                  asChild
                >
                  <a
                    href={getWhatsAppLink("Hi, I'd like to learn more about smart irrigation and smart valve technology.")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Ask Us About It
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50 py-14">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Payment Options
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
              Flexible Financing Available
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Get the service you need today - pay over time.
            </p>
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-slate-600">
            We understand that home repairs and upgrades can be unexpected. That's why BERNARDINO MARTIN offers flexible financing options to qualified customers. Whether you're replacing your HVAC system, installing solar, or upgrading your plumbing, we can help you find a payment plan that works for your budget. Apply in minutes with no hard credit pull required.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {["0% Interest Promotions", "Quick Approval Process", "Flexible Monthly Payments"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm"
              >
                <Check className="h-4 w-4 text-primary" /> {item}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" className="bg-primary px-8 font-bold hover:bg-primary/90" asChild>
              <Link href="/contact">Ask About Financing</Link>
            </Button>
          </div>
        </div>
      </section>

      <ServiceModal
        service={selectedService}
        open={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </Layout>
  );
}
