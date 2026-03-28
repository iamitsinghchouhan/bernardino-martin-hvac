import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/constants";
import type { Service, ServiceCategory } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "wouter";
import {
  Check, MessageCircle, Clock, ChevronRight, DollarSign,
  Smartphone, Droplets, ShieldCheck, Flame, X,
} from "lucide-react";

/* ─── Trusted Brands ─── */
const BRANDS = ["Carrier","Trane","Lennox","Rheem","Goodman","York","Daikin","Mitsubishi","LG","Bosch"];

/* ─── Heating Specialties ─── */
const HEATING_SPECIALTIES = [
  { label: "Gas Furnace Repair",      desc: "All gas furnace makes and models" },
  { label: "Electric Furnace Repair", desc: "Fast diagnostics and repair" },
  { label: "Floor Furnace Services",  desc: "Installation, repair and cleaning" },
  { label: "Wall Furnace Services",   desc: "Safe and efficient wall units" },
  { label: "Furnace Replacement",     desc: "Energy-efficient upgrades" },
];

/* ─── Service Detail Modal ─── */
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Image */}
        <div className="relative w-full aspect-video overflow-hidden rounded-t-lg">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
              <Clock className="h-3.5 w-3.5 text-primary" /> {service.duration}
            </span>
          </div>
        </div>

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 mb-1">
              {service.title}
            </DialogTitle>
          </DialogHeader>

          {/* Price badge */}
          <div className="flex items-center gap-2 text-sm font-bold text-secondary bg-secondary/10 w-fit px-3 py-1.5 rounded-md mt-2 mb-4">
            <DollarSign className="h-4 w-4" />
            {service.price}
          </div>

          {/* Overview */}
          <p className="text-slate-600 leading-relaxed text-sm mb-5">
            {service.overview}
          </p>

          {/* Bullets */}
          <ul className="space-y-2 mb-6">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 font-semibold"
              asChild
            >
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
            
              href={getWhatsAppLink(
                `Hi, I'm interested in your ${service.title} service.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat about ${service.title} on WhatsApp`}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-secondary/20 text-secondary hover:bg-secondary/5 transition-colors shrink-0"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Main Page ─── */
export default function Services() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(
    "HVAC & Heating"
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = SERVICES.filter(
    (s) => s.category === activeCategory
  );

  return (
    <Layout>
      <SEO
        title="HVAC, Solar, Plumbing & More Services in Los Angeles"
        description="HVAC, plumbing, electrical, solar, landscaping, irrigation & network services in Los Angeles. Licensed technicians, same-day service & free estimates. Call (818) 400-0227."
      />

      {/* ── HVAC Hero ── */}
      <section className="bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/hero-home.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(61,181,74,0.15),_transparent)]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="inline-block bg-white/10 border border-white/20 text-white/90 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Los Angeles Home Services
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">
            Los Angeles HVAC Experts
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            24/7 service • All brands • Licensed & insured
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { value: "15+",      label: "Years Experience" },
              { value: "5,000+",   label: "Happy Customers" },
              { value: "Same-Day", label: "Service Available" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-center"
              >
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-xs text-blue-200">{label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8"
              asChild
            >
              <Link href="/booking?service=hvac-repair">Book AC Repair</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-bold px-8"
              asChild
            >
              <Link href="/quote">Get Free Estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Trusted Brands ── */}
      <section className="bg-white border-b border-slate-100 py-5">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Trusted Brands We Service
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {BRANDS.map((brand) => (
              <span
                key={brand}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-1.5 rounded-full"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Selector ── */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="py-12 bg-slate-50 min-h-[500px]">
        <div className="container mx-auto px-4">

          {/* HVAC extras — only shown when HVAC category is active */}
          {activeCategory === "HVAC & Heating" && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Heating Specialties
              </h2>
              <p className="text-sm text-slate-500 mb-5">
                Expert furnace and heating system services across Los Angeles
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {HEATING_SPECIALTIES.map(({ label, desc }) => (
                  <div
                    key={label}
                    className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Flame className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-tight mb-1">
                      {label}
                    </p>
                    <p className="text-xs text-slate-500 leading-tight">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category heading */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {activeCategory}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {filteredServices.length} service
                {filteredServices.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group text-left bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                  />
                  <div className="absolute top-3 right-3 z-20 bg-white/95 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" /> {service.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1 mb-3">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-md">
                      {service.price}
                    </span>
                    <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Smart Irrigation Info — only shown when Outdoor category is active */}
          {activeCategory === "Outdoor & Property" && (
            <div className="mt-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-10 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-primary text-white shadow-md">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Smart Irrigation & Smart Valve Technology
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Our smart irrigation systems connect to your phone so you can
                monitor and control your water usage from anywhere. The Moen Smart
                Water Shutoff Valve detects leaks instantly and automatically shuts
                off your water supply to prevent costly damage.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  {
                    Icon: Smartphone,
                    title: "Mobile Monitoring",
                    desc: "Control irrigation and water shutoff from your smartphone, anywhere.",
                  },
                  {
                    Icon: Droplets,
                    title: "Leak Detection",
                    desc: "Smart sensors detect leaks instantly and shut off water automatically.",
                  },
                  {
                    Icon: ShieldCheck,
                    title: "Insurance Discounts",
                    desc: "Many insurers offer discounts for smart water monitoring devices.",
                  },
                  {
                    Icon: DollarSign,
                    title: "Save on Water Bills",
                    desc: "Intelligent scheduling and zone control reduces water waste.",
                  },
                ].map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
                  >
                    <Icon className="h-7 w-7 text-primary mb-2" />
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      {title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-primary hover:bg-primary/90 font-semibold"
                  asChild
                >
                  <Link href="/booking?service=outdoor-irrigation">
                    Schedule Installation
                  </Link>
                </Button>
                
                  href={getWhatsAppLink(
                    "Hi, I'd like to learn more about smart irrigation and smart valve technology."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/20 text-primary hover:bg-primary/5 text-sm font-medium transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask Us About It
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Financing Section ── */}
      <section className="py-14 bg-blue-50 border-y border-blue-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-6">
            <span className="text-secondary text-xs font-semibold uppercase tracking-widest">
              Payment Options
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Flexible Financing Available
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Get the service you need today — pay over time.
            </p>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed text-center max-w-2xl mx-auto mb-8">
            We understand that home repairs and upgrades can be unexpected.
            That's why BERNARDINO MARTIN offers flexible financing options to
            qualified customers. Whether you're replacing your HVAC system,
            installing solar, or upgrading your plumbing, we can help you find a
            payment plan that works for your budget. Apply in minutes with no hard
            credit pull required.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "0% Interest Promotions",
              "Quick Approval Process",
              "Flexible Monthly Payments",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-white border border-blue-200 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
              >
                <Check className="h-4 w-4 text-primary" /> {item}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 font-bold px-8"
              asChild
            >
              <Link href="/contact">Ask About Financing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Service Detail Modal ── */}
      <ServiceModal
        service={selectedService}
        open={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </Layout>
  );
}