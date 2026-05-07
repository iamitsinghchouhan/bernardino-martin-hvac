import { useEffect, useMemo, useState, useRef } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/constants";
import type { Service, ServiceCategory } from "@/lib/constants";
import { SERVICES as HERO_SERVICES } from "@/data/services";
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
  {
    title: 'Gas Furnace Repair',
    description: 'All gas furnace makes and models',
    icon: '🔥',
    image: '/images/services/heating-gas-furnace.png',
    fallbackText: 'Gas Furnace Repair',
  },
  {
    title: 'Electric Furnace Repair',
    description: 'Fast diagnostics and repair',
    icon: '⚡',
    image: '/images/services/heating-electric-furnace.png',
    fallbackText: 'Electric Furnace Repair',
  },
  {
    title: 'Floor Furnace Services',
    description: 'Installation, repair and cleaning',
    icon: '🏠',
    image: '/images/services/heating-floor-furnace.png',
    fallbackText: 'Floor Furnace Services',
  },
  {
    title: 'Wall Furnace Services',
    description: 'Safe and efficient wall units',
    icon: '🌡️',
    image: '/images/services/heating-wall-furnace.png',
    fallbackText: 'Wall Furnace Services',
  },
  {
    title: 'Furnace Replacement',
    description: 'Energy-efficient upgrades',
    icon: '🔧',
    image: '/images/services/heating-furnace-replacement.png',
    fallbackText: 'Furnace Replacement',
  },
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
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout>();

  // Auto-scroll services hero every 10 seconds
  useEffect(() => {
    autoplayTimerRef.current = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % HERO_SERVICES.length);
    }, 10000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

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
  const currentService = HERO_SERVICES[currentServiceIndex];

  return (
    <Layout>
      <SEO
        title="HVAC, Solar, Plumbing & More Services in Los Angeles"
        description="HVAC, plumbing, electrical, solar, landscaping, irrigation and network services in Los Angeles. Licensed technicians, same-day service and free estimates. Call (818) 400-0227."
      />

      {/* Auto-scrolling Hero Section */}
      <section className="relative h-[500px] overflow-hidden text-white">
        {/* Auto-scrolling video background */}
        <video
          key={currentService.videoFile}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.error(`❌ Video failed to load: ${currentService.videoFile}`);
            console.error(`Tried path: /videos/${currentService.videoFile}`);
            console.log('Available videos: hvac-service-la.mp4, solar-la.mp4, plumbing-la.mp4, electrical-la.mp4, landscaping-la.mp4, irrigation-la.mp4, network-la.mp4');
          }}
          onCanPlay={() => {
            console.log(`✓ Video loaded successfully: ${currentService.videoFile}`);
          }}
        >
          <source src={`/videos/${currentService.videoFile}`} type="video/mp4" />
        </video>

        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4 z-10">
          <div className="text-center text-white max-w-2xl">
            <p className="text-lg opacity-90 mb-2">Now Showing</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
              {currentService.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {currentService.description}
            </p>
            <a
              href="/booking"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
            >
              Schedule Service
            </a>
          </div>
        </div>

        {/* Service indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 rounded-full transition ${
                i === currentServiceIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-5">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted Brands We Service
          </p>
          {/* Horizontal Auto-Scrolling Container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-8"
              style={{
                animation: 'scroll 30s linear infinite',
                width: 'fit-content',
              }}
            >
              {/* Show brands twice for seamless loop */}
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-48 h-24 bg-white rounded-2xl border border-slate-200 flex items-center justify-center hover:shadow-md transition-shadow"
                >
                  <img
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    className="h-12 w-full object-contain p-4"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback: show text if image fails
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.textContent = brand.name;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Add CSS animation */}
          <style>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {HEATING_SPECIALTIES.map(({ title, description, icon, image, fallbackText }) => (
                  <div
                    key={title}
                    className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition h-full"
                  >
                    {/* Image Container */}
                    <div className="h-40 bg-gray-200 overflow-hidden flex items-center justify-center">
                      <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If image fails, show colored background with icon
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                            parent.innerHTML = `
                              <div class="flex flex-col items-center justify-center w-full h-full text-white">
                                <span style="font-size: 2.5rem; margin-bottom: 8px;">${icon}</span>
                                <span style="font-size: 0.75rem; text-align: center; padding: 0 8px;">${fallbackText}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-white">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                        {title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-600 text-center">
                        {description}
                      </p>
                    </div>
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

      {/* Products & Brands Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center font-heading">
            Products & Brands We Use
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Quality equipment from trusted manufacturers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: 'Solar Inverters',
                image: '/images/products/fronius-inverter.png',
                description: 'Fronius Symo Series - High-efficiency grid-tied inverters',
                specs: ['Efficiency: 98%+', 'Warranty: 10 years', 'WiFi Enabled'],
              },
              {
                category: 'Battery Systems',
                image: '/images/products/battery-based-inverter.png',
                description: 'Battery-based inverters for energy storage integration',
                specs: ['Backup Power', 'Off-Grid Capable', 'Smart Integration'],
              },
              {
                category: 'Hybrid Systems',
                image: '/images/products/hybrid-inverter.png',
                description: 'Hybrid inverters combining solar, battery, and grid',
                specs: ['Grid-Tie Ready', 'Battery Compatible', 'Expandable'],
              },
              {
                category: 'Microinverters',
                image: '/images/products/microinverters.png',
                description: 'Panel-level optimization for maximum energy harvest',
                specs: ['Panel-Level Control', 'Monitoring Included', 'Safe Design'],
              },
              {
                category: 'Rapid Shutdown',
                image: '/images/products/rapid-shutdown.png',
                description: 'Fronius Rapid Shutdown Box for code compliance',
                specs: ['Code Compliant', 'DC Optimization', 'Rapid Response'],
              },
            ].map((product, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Product Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.category}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.parentElement!.innerHTML = `<div class="flex items-center justify-center h-full bg-gray-300 text-gray-600 font-semibold">${product.category}</div>`;
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.category}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>

                  {/* Specs */}
                  <div className="space-y-1 mb-4">
                    {product.specs.map((spec, j) => (
                      <p key={j} className="text-sm text-gray-700">
                        <span className="text-green-600">✓</span> {spec}
                      </p>
                    ))}
                  </div>

                  <a
                    href="/booking"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thermostat Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Video */}
            <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-900 aspect-video">
              <video
                src="/videos/google-nest-thermostat.mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ minHeight: '400px' }}
                autoPlay
              />
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-heading">
                Google Nest Thermostat
              </h2>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A smart thermostat that integrates seamlessly with Google Home, 
                adapts to your schedule, and helps reduce energy usage.
              </p>

              {/* Key Features */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <span className="text-2xl">🌡️</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Smart Learning</h4>
                    <p className="text-gray-600 text-sm">Learns your schedule and adjusts temperature automatically</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Remote Control</h4>
                    <p className="text-gray-600 text-sm">Control temperature from anywhere via smartphone app</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl">🔊</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Google Home Integration</h4>
                    <p className="text-gray-600 text-sm">Works seamlessly with Google Home and other smart devices</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Energy Savings</h4>
                    <p className="text-gray-600 text-sm">Save up to 10% on heating and cooling bills</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Eco-Friendly</h4>
                    <p className="text-gray-600 text-sm">Helps reduce your carbon footprint</p>
                  </div>
                </div>
              </div>

              <a
                href="/booking?service=hvac"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                Schedule Thermostat Installation
              </a>
            </div>
          </div>
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
