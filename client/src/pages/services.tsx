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
  { name: "Carrier", color: "#004B87" },
  { name: "Trane", color: "#E31837" },
  { name: "Lennox", color: "#0057A8" },
  { name: "Rheem", color: "#003087" },
  { name: "Goodman", color: "#00529B" },
  { name: "York", color: "#C41230" },
  { name: "Daikin", color: "#005BAC" },
  { name: "Mitsubishi", color: "#E60012" },
  { name: "LG", color: "#A50034" },
  { name: "Bosch", color: "#EA0016" },
] as const;

const HASH_TO_CATEGORY: Record<string, ServiceCategory> = {
  hvac: "HVAC & Heating",
  solar: "Solar & Energy",
  plumbing: "Plumbing",
  electrical: "Electrical",
  outdoor: "Outdoor & Property",
  technology: "Technology",
};

type HeatingSpecialty = {
  title: string;
  description: string;
  overview: string;
  bullets: string[];
  icon: string;
  image: string;
  serviceId: string;
};

type ProductItem = {
  category: string;
  image: string;
  description: string;
  specs: string[];
  overview: string;
};

const HEATING_SPECIALTIES: HeatingSpecialty[] = [
  {
    title: 'Gas Furnace Repair',
    description: 'All gas furnace makes and models',
    overview: 'Our certified technicians diagnose and repair all gas furnace brands quickly and reliably. We restore your heat fast with lasting repairs backed by our workmanship guarantee.',
    bullets: ['All brands serviced', 'Same-day service available', 'Gas leak safety check', 'Igniter & burner repair', 'Full system inspection'],
    icon: '🔥',
    image: '/images/services/heating-gas-furnace.png',
    serviceId: 'hvac-heating',
  },
  {
    title: 'Electric Furnace Repair',
    description: 'Fast diagnostics and repair',
    overview: 'We use industry-leading diagnostic tools to quickly identify and fix electric furnace faults — from heating elements and sequencers to control boards and blower motors.',
    bullets: ['Fast diagnostics', 'Heating element replacement', 'Control board repair', 'Blower motor service', 'Thermostat calibration'],
    icon: '⚡',
    image: '/images/services/heating-electric-furnace.png',
    serviceId: 'hvac-heating',
  },
  {
    title: 'Floor Furnace Services',
    description: 'Installation, repair and cleaning',
    overview: 'We service all floor furnace models — cleaning, repairing, and replacing units safely. Proper maintenance keeps your floor furnace running efficiently and safely all winter.',
    bullets: ['Deep cleaning service', 'Burner replacement', 'Thermocouple service', 'Pilot light repair', 'Safety inspection'],
    icon: '🏠',
    image: '/images/services/heating-floor-furnace.png',
    serviceId: 'hvac-heating',
  },
  {
    title: 'Wall Furnace Services',
    description: 'Safe and efficient wall units',
    overview: 'Our technicians install, repair, and maintain wall furnaces of all types. We ensure safe and efficient operation with thorough inspections and quality parts.',
    bullets: ['New unit installation', 'Burner cleaning', 'Gas valve service', 'Thermostat hookup', 'Carbon monoxide check'],
    icon: '🌡️',
    image: '/images/services/heating-wall-furnace.png',
    serviceId: 'hvac-heating',
  },
  {
    title: 'Furnace Replacement',
    description: 'Energy-efficient upgrades',
    overview: 'Upgrade to a modern, energy-efficient furnace and start saving on your heating bills immediately. We handle full removal of old equipment, installation, and system commissioning.',
    bullets: ['Free in-home estimate', 'All major brands', 'Energy-efficient models', 'Old unit disposal', 'Manufacturer warranty honored'],
    icon: '🔧',
    image: '/images/services/heating-furnace-replacement.png',
    serviceId: 'hvac-heating',
  },
];

const PRODUCTS: ProductItem[] = [
  {
    category: 'Solar Inverters',
    image: '/images/products/fronius-inverter.png',
    description: 'Fronius Symo Series - High-efficiency grid-tied inverters',
    overview: 'The Fronius Symo inverter delivers industry-leading efficiency and reliability for grid-tied solar systems. WiFi-enabled monitoring lets you track production from your phone.',
    specs: ['Efficiency: 98%+', 'Warranty: 10 years', 'WiFi Enabled'],
  },
  {
    category: 'Battery Systems',
    image: '/images/products/battery-based-inverter.png',
    description: 'Battery-based inverters for energy storage integration',
    overview: 'Battery-based inverters allow your solar system to store excess energy and power your home during outages. Perfect for energy independence and backup power.',
    specs: ['Backup Power', 'Off-Grid Capable', 'Smart Integration'],
  },
  {
    category: 'Hybrid Systems',
    image: '/images/products/hybrid-inverter.png',
    description: 'Hybrid inverters combining solar, battery, and grid',
    overview: 'Hybrid inverters give you the best of all worlds — grid-tied solar with battery backup capability. Expand your system easily as your energy needs grow.',
    specs: ['Grid-Tie Ready', 'Battery Compatible', 'Expandable'],
  },
  {
    category: 'Microinverters',
    image: '/images/products/microinverters.png',
    description: 'Panel-level optimization for maximum energy harvest',
    overview: 'Microinverters maximize output from every individual solar panel, so shading or dirt on one panel doesn\'t reduce your whole system\'s production.',
    specs: ['Panel-Level Control', 'Monitoring Included', 'Safe DC Design'],
  },
  {
    category: 'Rapid Shutdown',
    image: '/images/products/rapid-shutdown.png',
    description: 'Fronius Rapid Shutdown Box for code compliance',
    overview: 'The Fronius Rapid Shutdown Box ensures your solar system meets NEC code requirements for rapid shutdown, providing critical safety for first responders.',
    specs: ['Code Compliant', 'DC Optimization', 'Rapid Response'],
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
            aria-label="Close"
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

function HeatingSpecialtyModal({
  item,
  open,
  onClose,
}: {
  item: HeatingSpecialty | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-slate-700 to-slate-900">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white transition-colors hover:bg-black/60"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="text-3xl">{item.icon}</span>
          </div>
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="mb-1 text-2xl font-bold text-slate-900">{item.title}</DialogTitle>
          </DialogHeader>
          <p className="mb-5 mt-2 text-sm leading-relaxed text-slate-600">{item.overview}</p>
          <ul className="mb-6 space-y-2">
            {item.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
            <Button className="flex-1 bg-primary font-semibold hover:bg-primary/90" asChild>
              <Link href={`/booking?service=${item.serviceId}`} onClick={onClose}>
                Book This Service
              </Link>
            </Button>
            <Button variant="outline" className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/5" asChild>
              <Link href="/quote" onClick={onClose}>
                Get a Free Quote
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductModal({
  product,
  open,
  onClose,
}: {
  product: ProductItem | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-slate-100 to-slate-200">
          <img
            src={product.image}
            alt={product.category}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white transition-colors hover:bg-black/60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="mb-1 text-2xl font-bold text-slate-900">{product.category}</DialogTitle>
          </DialogHeader>
          <p className="mb-2 mt-2 text-sm font-medium text-slate-500">{product.description}</p>
          <p className="mb-5 text-sm leading-relaxed text-slate-600">{product.overview}</p>
          <ul className="mb-6 space-y-2">
            {product.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row">
            <Button className="flex-1 bg-primary font-semibold hover:bg-primary/90" asChild>
              <Link href="/booking" onClick={onClose}>
                Book Installation
              </Link>
            </Button>
            <Button variant="outline" className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/5" asChild>
              <Link href="/quote" onClick={onClose}>
                Get a Free Quote
              </Link>
            </Button>
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
  const [selectedHeatingSpecialty, setSelectedHeatingSpecialty] = useState<HeatingSpecialty | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
              className="flex gap-6"
              style={{
                animation: 'scroll 30s linear infinite',
                width: 'fit-content',
              }}
            >
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-44 h-20 bg-white rounded-2xl border border-slate-200 flex items-center justify-center hover:shadow-md transition-shadow px-4"
                >
                  <span
                    className="text-xl font-extrabold tracking-tight text-center leading-tight"
                    style={{ color: brand.color }}
                  >
                    {brand.name}
                  </span>
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
                {HEATING_SPECIALTIES.map((specialty) => (
                  <button
                    key={specialty.title}
                    type="button"
                    onClick={() => setSelectedHeatingSpecialty(specialty)}
                    className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition h-full text-left cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden flex items-center justify-center relative">
                      <img
                        src={specialty.image}
                        alt={specialty.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-2 right-2 text-2xl">{specialty.icon}</div>
                    </div>
                    {/* Content */}
                    <div className="p-4 bg-white">
                      <h3 className="text-sm font-bold text-gray-900 mb-1 text-center group-hover:text-primary transition-colors">
                        {specialty.title}
                      </h3>
                      <p className="text-xs text-gray-500 text-center">{specialty.description}</p>
                      <p className="mt-2 text-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details →
                      </p>
                    </div>
                  </button>
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
            {PRODUCTS.map((product, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 text-left cursor-pointer"
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center relative">
                  <img
                    src={product.image}
                    alt={product.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </div>
                </div>
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {product.category}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="space-y-1 mb-4">
                    {product.specs.map((spec) => (
                      <p key={spec} className="text-sm text-gray-700">
                        <span className="text-green-600">✓</span> {spec}
                      </p>
                    ))}
                  </div>
                  <div className="block w-full bg-blue-600 group-hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold transition">
                    View Details & Book
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SOD Installation & Landscaping Materials Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 px-4 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            SOD Installation & Landscaping Materials
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Premium decorative woodchips, ground cover, recycled wood and more — quality materials delivered reliably across Los Angeles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking?service=landscaping" className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition transform hover:scale-105">
              Schedule Landscaping Service
            </a>
            <a href="/quote" className="inline-block bg-white hover:bg-gray-100 text-blue-900 px-8 py-3 rounded-lg font-bold text-lg transition">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* SOD Materials Showcase */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/sod/sod-materials.png"
              alt="Bernardino Martin landscaping materials - quality woodchips, ground cover and soil delivered to Los Angeles"
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center font-heading">Premium Materials We Deliver</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            High-quality landscaping materials for beautiful, lasting results. Delivered to your door across Los Angeles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Decorative Woodchips', size: '500 LBS', img: '/images/sod/sod-1.png', color: 'from-red-700 to-red-800', benefits: ['Vibrant color options', 'Natural wood appearance', 'Excellent moisture retention', 'Long-lasting finish'] },
              { name: 'Ground Cover', size: '500 LBS', img: '/images/sod/sod-2.png', color: 'from-amber-700 to-amber-800', benefits: ['Suppresses weeds', 'Regulates soil temperature', 'Beautiful curb appeal', 'Professional finish'] },
              { name: 'Recycled Wood', size: '500 LBS', img: '/images/sod/sod-3.png', color: 'from-amber-600 to-amber-700', benefits: ['Eco-friendly material', 'Budget-friendly option', 'Natural appearance', 'Sustainable choice'] },
              { name: 'Bark Mulch', size: '500 LBS', img: '/images/sod/sod-4.png', color: 'from-stone-600 to-stone-700', benefits: ['Deep brown tones', 'Excellent water retention', 'Natural decomposition', 'Enriches soil'] },
              { name: 'Compost & Soil Mix', img: '/images/sod/sod-5.png', color: 'from-amber-800 to-amber-900', benefits: ['50/50 organic mix', 'Nutrient-rich formula', 'Improves soil structure', 'Promotes healthy growth'] },
              { name: 'Premium SOD Installation', img: '/images/sod/sod-6.png', color: 'from-green-600 to-green-700', benefits: ['San Augustine variety', 'RTF tall fescue option', 'Soil prep included', 'Watering guidance provided'] },
            ].map((material, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className={`h-48 bg-gradient-to-br ${material.color} overflow-hidden relative`}>
                  <img
                    src={material.img}
                    alt={material.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{material.name}</h3>
                  {material.size && <p className="text-xs font-semibold text-green-600 mb-3">{material.size} Per Load</p>}
                  <div className="space-y-1 mb-4">
                    {material.benefits.map((b) => (
                      <p key={b} className="text-sm text-gray-700"><span className="text-green-600">✓</span> {b}</p>
                    ))}
                  </div>
                  <a href="/booking?service=landscaping" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold transition text-sm">
                    Request Delivery
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOD Installation 7-Step Process */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center font-heading">Our Complete Installation Process</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Seven professional steps to create the perfect lawn</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { step: 1, title: 'Soil Selection & Preparation', desc: 'Quality soil selected from our farm, properly dried for optimal consistency and tested for use.', icon: '🌱', color: 'bg-blue-500' },
              { step: 2, title: 'Rototilling & Organic Mix', desc: 'Professional rototiller and our premium 50/50 organic mix to enrich soil with nutrients and improve structure.', icon: '⚙️', color: 'bg-amber-500' },
              { step: 3, title: 'Ground Leveling', desc: 'Precise leveling to ensure proper water drainage and a professional even surface for your lawn.', icon: '📐', color: 'bg-green-500' },
              { step: 4, title: 'Smart Irrigation System', desc: 'Advanced irrigation with smart timers controllable via your smartphone for convenient water management.', icon: '💧', color: 'bg-cyan-500' },
              { step: 5, title: 'Dripper System Installation', desc: 'Individual drip lines for targeted watering directly to plant roots for optimal growth and health.', icon: '🚿', color: 'bg-blue-400' },
              { step: 6, title: 'Mulch & Decorative Cover', desc: 'Premium decorative bark mulch or colorful rocks to retain moisture and enhance curb appeal.', icon: '🌿', color: 'bg-amber-600' },
              { step: 7, title: 'Final SOD Installation', desc: 'Premium sod installed on the perfectly prepared foundation for quick establishment and a lush green lawn.', icon: '🏡', color: 'bg-green-600' },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
                <div className={`${s.color} text-white rounded-xl w-12 h-12 flex-shrink-0 flex items-center justify-center font-bold text-lg`}>
                  {s.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{s.icon}</span>
                    <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/booking?service=landscaping" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition">
              Schedule SOD Installation
            </a>
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
      <HeatingSpecialtyModal
        item={selectedHeatingSpecialty}
        open={!!selectedHeatingSpecialty}
        onClose={() => setSelectedHeatingSpecialty(null)}
      />
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Layout>
  );
}
