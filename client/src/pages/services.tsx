import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/constants";
import type { Service, ServiceCategory } from "@/lib/constants";
import { buildVideoObjectSchema } from "@/lib/video-schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Wind, Flame, Sun, Droplets, Zap, TreePine, Wifi,
  Fan, Wrench, Settings, Thermometer, Shield, Home,
  ShieldCheck, Smartphone, Sprout, Flower2, Plug,
  Battery, Check, ChevronRight, Clock, DollarSign, Phone,
  MessageCircle, Volume2, VolumeX, X, ImageOff, ArrowDown, Maximize2,
} from "lucide-react";
import { ImageLightbox, type LightboxImage } from "@/components/image-lightbox";

// ─── KEPT: existing data used by retained sections ────────────────────────
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

// ─── CATEGORY METADATA ────────────────────────────────────────────────────
interface ServiceCard {
  name: string;
  slug: string;
  icon: React.ElementType;
  desc: string;
  duration: string;
  price: string;
  image: string;
}

interface CategoryMeta {
  id: string;
  anchor: string;
  name: string;
  num: string;
  description: string;
  video: string;
  icon: React.ElementType;
  dotColor: string;
  bgClass: string;
  gradientFrom: string;
  gradientTo: string;
  services: ServiceCard[];
}

const CATEGORY_DATA: CategoryMeta[] = [
  {
    id: "hvac", anchor: "hvac", name: "HVAC & Heating", num: "01",
    description: "Complete heating and cooling solutions for every home",
    video: "/videos/hvac-repair-outdoor.mp4", icon: Wind,
    dotColor: "#3B82F6", bgClass: "bg-blue-50",
    gradientFrom: "from-blue-600", gradientTo: "to-blue-800",
    services: [
      { name: "AC Repair & Diagnostics", slug: "hvac-repair", icon: Wrench, desc: "Fast diagnosis and repair of all AC brands", duration: "1-3 hrs", price: "From $89", image: "/images/hvac-tech-tablet.png" },
      { name: "AC Installation", slug: "hvac-install-ac", icon: Wind, desc: "Central air, mini-splits, and window units", duration: "4-8 hrs", price: "Free estimate", image: "/images/hvac-tech-install-outdoor.png" },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", icon: Settings, desc: "Seasonal tune-ups for peak efficiency", duration: "1-2 hrs", price: "From $79", image: "/images/hvac-tech-homeowner.png" },
      { name: "Ductless Mini-Split", slug: "hvac-ductless", icon: Thermometer, desc: "Zone cooling without ductwork — even in nurseries", duration: "4-6 hrs", price: "From $1,200", image: "/images/hvac-tech-minisplit.png" },
      { name: "Electrostatic Air Filtration", slug: "hvac-air-filtration", icon: Shield, desc: "Reduces odors and airborne particles", duration: "2-4 hrs", price: "From $299", image: "/images/hvac-tech-filter.png" },
      { name: "Attic Heat Reduction", slug: "hvac-attic-heat", icon: Home, desc: "Reduce attic heat to make AC more efficient", duration: "3-5 hrs", price: "From $199", image: "/images/hvac-tech-attic-insulation.png" },
      { name: "Duct Cleaning & Installation", slug: "hvac-ducts", icon: Fan, desc: "Clean air starts with clean ducts", duration: "3-6 hrs", price: "From $299", image: "/images/hvac-duct-cleaning.png" },
    ],
  },
  {
    id: "heating", anchor: "heating", name: "Heating Specialties", num: "02",
    description: "Expert furnace and heating specialists across Los Angeles",
    video: "/videos/hvac-family-comfort.mp4", icon: Flame,
    dotColor: "#EA580C", bgClass: "bg-orange-50",
    gradientFrom: "from-orange-600", gradientTo: "to-orange-800",
    services: [
      { name: "Gas Furnace Repair", slug: "heating-gas-furnace", icon: Flame, desc: "All gas furnace makes and models", duration: "2-4 hrs", price: "From $99", image: "/images/heating-furnace-inspection.png" },
      { name: "Electric Furnace Repair", slug: "heating-electric-furnace", icon: Zap, desc: "Fast diagnostics and repair", duration: "1-3 hrs", price: "From $89", image: "/images/heating-furnace-multimeter.png" },
      { name: "Floor Furnace Services", slug: "heating-floor-furnace", icon: Home, desc: "Installation, repair and cleaning", duration: "2-4 hrs", price: "From $149", image: "/images/heating-register-cleaning.png" },
      { name: "Wall Furnace Services", slug: "heating-wall-furnace", icon: Thermometer, desc: "Safe and efficient wall units", duration: "2-3 hrs", price: "From $129", image: "/images/heating-wall-heater.png" },
      { name: "Furnace Replacement", slug: "heating-furnace-replacement", icon: Wrench, desc: "Energy-efficient upgrade installation", duration: "4-8 hrs", price: "Free estimate", image: "/images/heating-furnace-install.png" },
      { name: "Thermostat Installation", slug: "hvac-thermostat", icon: Settings, desc: "Smart and programmable upgrades", duration: "1-2 hrs", price: "From $49", image: "/images/thermostat-nest-install.png" },
      { name: "Google Nest Thermostat", slug: "heating-nest-thermostat", icon: Smartphone, desc: "Integrates with Google Home seamlessly", duration: "1-2 hrs", price: "From $149", image: "/images/thermostat-nest-app.png" },
    ],
  },
  {
    id: "solar", anchor: "solar", name: "Solar & Energy", num: "03",
    description: "Harness Los Angeles sunshine — 284 sunny days per year",
    video: "/videos/solar-panel-install.mp4", icon: Sun,
    dotColor: "#D97706", bgClass: "bg-amber-50",
    gradientFrom: "from-amber-500", gradientTo: "to-amber-700",
    services: [
      { name: "Solar Panel Installation", slug: "solar-install", icon: Sun, desc: "Custom residential solar systems", duration: "1-2 days", price: "Free estimate", image: "/images/hero-bm-solar-roof.png" },
      { name: "Solar System Maintenance", slug: "solar-maintenance", icon: Settings, desc: "Keep panels at peak performance", duration: "2-4 hrs", price: "From $149", image: "/images/solar-panel-cleaning.png" },
      { name: "Solar Inverter Installation", slug: "solar-inverter", icon: Zap, desc: "Grid-connected inverter installation", duration: "4-6 hrs", price: "From $499", image: "/images/solar-inverter-install.png" },
      { name: "Solar-Powered Irrigation", slug: "solar-irrigation", icon: Droplets, desc: "Eco-friendly solar watering systems", duration: "3-5 hrs", price: "From $399", image: "/images/solar-aerial-sprinkler.png" },
    ],
  },
  {
    id: "plumbing", anchor: "plumbing", name: "Plumbing", num: "04",
    description: "Complete residential plumbing — from street to sink",
    video: "/videos/plumbing-la.mp4", icon: Droplets,
    dotColor: "#0891B2", bgClass: "bg-cyan-50",
    gradientFrom: "from-cyan-600", gradientTo: "to-cyan-800",
    services: [
      { name: "General Plumbing Services", slug: "plumbing-general", icon: Droplets, desc: "Full residential plumbing for every need", duration: "1-4 hrs", price: "From $89", image: "/images/plumbing/plumbing-tech-portrait.png" },
      { name: "Mainline Installation", slug: "plumbing-mainline", icon: Wrench, desc: "Water meter to house copper pipe installation", duration: "1-2 days", price: "Free estimate", image: "/images/plumbing/plumbing-mainline-install.png" },
      { name: "Natural Gas Line Replacement", slug: "plumbing-gas-line", icon: Flame, desc: "Gas meter to house line replacement", duration: "4-8 hrs", price: "Free estimate", image: "/images/plumbing/plumbing-gas-line.png" },
      { name: "Sewer Line Replacement", slug: "plumbing-sewer", icon: ArrowDown, desc: "4-inch ABS pipe replacing clay sewer lines", duration: "1-2 days", price: "Free estimate", image: "/images/plumbing/plumbing-sewer-line.png" },
      { name: "Reverse Osmosis Filtration", slug: "plumbing-water-filter", icon: Shield, desc: "Kitchen sink RO system installation", duration: "2-3 hrs", price: "From $299", image: "/images/plumbing/plumbing-water-filter-ro.png" },
      { name: "SMART SHUTOFF VALVE", slug: "plumbing-shutoff", icon: ShieldCheck, desc: "Automatic leak protection for your home", duration: "2-3 hrs", price: "From $299", image: "/images/plumbing/plumbing-smart-shutoff.png" },
      { name: "SMART JET CLEANUP", slug: "plumbing-jet-cleanup", icon: Wrench, desc: "Smartphone-controlled drain cleaning", duration: "2-4 hrs", price: "From $199", image: "/images/plumbing/plumbing-jet-cleanup.png" },
      { name: "Toilet Replacement", slug: "plumbing-toilet", icon: Home, desc: "High-efficiency water-saving models", duration: "2-3 hrs", price: "From $149", image: "/images/plumbing/plumbing-toilet-install.png" },
      { name: "Garbage Disposal Installation", slug: "plumbing-disposal", icon: Settings, desc: "Motorized garbage disposal installation", duration: "1-2 hrs", price: "From $99", image: "/images/plumbing/plumbing-garbage-disposal.png" },
      { name: "Water Heater Installation", slug: "plumbing-water-heater", icon: Thermometer, desc: "Tank and tankless water heater service", duration: "2-4 hrs", price: "From $149", image: "/images/plumbing/plumbing-water-heater-tank.png" },
      { name: "Sink & Faucet Replacement", slug: "plumbing-sink", icon: Droplets, desc: "Modern sink and faucet upgrades", duration: "1-3 hrs", price: "From $89", image: "/images/plumbing/plumbing-faucet-repair.png" },
    ],
  },
  {
    id: "electrical", anchor: "electrical", name: "Electrical", num: "05",
    description: "Licensed electrical services for modern Los Angeles homes",
    video: "/videos/electrical-la.mp4", icon: Zap,
    dotColor: "#CA8A04", bgClass: "bg-yellow-50",
    gradientFrom: "from-yellow-500", gradientTo: "to-yellow-700",
    services: [
      { name: "Electrical Panel Services", slug: "electrical-panel", icon: Plug, desc: "Panel upgrades and replacements", duration: "4-8 hrs", price: "From $199", image: "/images/services/electrical-hero.png" },
      { name: "General Electrical Services", slug: "electrical-general", icon: Zap, desc: "Outlets, switches, lighting, rewiring", duration: "1-6 hrs", price: "From $99", image: "/images/svc-electrical.png" },
      { name: "EV Charger Installation", slug: "electrical-ev-charger", icon: Battery, desc: "Level 2 home EV charging station", duration: "2-4 hrs", price: "From $399", image: "/images/services/electrical-ev-charger.png" },
    ],
  },
  {
    id: "outdoor", anchor: "outdoor", name: "Outdoor & Property", num: "06",
    description: "Beautiful outdoor spaces for Los Angeles living",
    video: "/videos/landscaping-la.mp4", icon: TreePine,
    dotColor: "#16A34A", bgClass: "bg-green-50",
    gradientFrom: "from-green-600", gradientTo: "to-green-800",
    services: [
      { name: "Landscaping Design & Installation", slug: "outdoor-landscaping", icon: TreePine, desc: "Custom landscape design for LA climate", duration: "1-5 days", price: "Free estimate", image: "/images/landscape-feature.jpg" },
      { name: "Sod Installation", slug: "outdoor-sod", icon: Sprout, desc: "San Augustine and RTF sod installation", duration: "1-2 days", price: "From $1.50/sq ft", image: "/images/svc-sod-installation.png" },
      { name: "Planting & Garden Care", slug: "outdoor-planting", icon: Flower2, desc: "Seasonal plants, shrubs, and garden beds", duration: "2-6 hrs", price: "From $149", image: "/images/svc-planting.png" },
      { name: "Smart Irrigation Systems", slug: "outdoor-irrigation", icon: Droplets, desc: "App-controlled irrigation with insurance savings", duration: "3-6 hrs", price: "From $499", image: "/images/hero-bm-irrigation.png" },
      { name: "Hardscape — Driveways & Patios", slug: "outdoor-hardscape", icon: Home, desc: "Stamped concrete driveways, patios, coping", duration: "2-5 days", price: "Free estimate", image: "/images/svc-landscaping.png" },
    ],
  },
  {
    id: "technology", anchor: "technology", name: "Technology", num: "07",
    description: "Smart home and network infrastructure for modern living",
    video: "/videos/network-la.mp4", icon: Wifi,
    dotColor: "#9333EA", bgClass: "bg-purple-50",
    gradientFrom: "from-purple-600", gradientTo: "to-purple-800",
    services: [
      { name: "Network & Structured Cabling", slug: "tech-network", icon: Wifi, desc: "Professional network infrastructure", duration: "2-6 hrs", price: "From $199", image: "/images/services/network-smarthome.png" },
      { name: "Smart Home Connectivity", slug: "tech-smarthome", icon: Smartphone, desc: "Connect and automate all your systems", duration: "2-4 hrs", price: "From $149", image: "/images/hero-bm-smart-home.png" },
      { name: "Google Nest Integration", slug: "tech-nest", icon: Home, desc: "Full Google Home ecosystem setup", duration: "2-3 hrs", price: "From $149", image: "/images/thermostat-nest-app.png" },
    ],
  },
];

// ─── LANDSCAPE MATERIALS ──────────────────────────────────────────────────
const LANDSCAPE_PRODUCTS = [
  { img: "/images/sod-7.png", alt: "Cedar Red Decorative Woodchips 500 LBS", name: "Cedar Red", type: "Decorative Woodchips", colorLabel: "Red", colorHex: "#b83232" },
  { img: "/images/sod-6.png", alt: "Burgundy Decorative Woodchips 500 LBS", name: "Burgundy", type: "Decorative Woodchips", colorLabel: "Burgundy", colorHex: "#6d1a36" },
  { img: "/images/sod-2.png", alt: "Dark Reddish Decorative Woodchips 500 LBS", name: "Dark Reddish", type: "Decorative Woodchips", colorLabel: "Dark Red", colorHex: "#7b3f2e" },
  { img: "/images/sod-3.png", alt: "Chocolate Brown Decorative Woodchips 500 LBS", name: "Chocolate Brown", type: "Decorative Woodchips", colorLabel: "Brown", colorHex: "#4a2c1a" },
  { img: "/images/sod-4.png", alt: "Mocha Brown Decorative Woodchips 500 LBS", name: "Mocha Brown", type: "Decorative Woodchips", colorLabel: "Mocha", colorHex: "#5c3317" },
  { img: "/images/sod-1.png", alt: "Reddish Brown Decorative Ground Cover 500 LBS", name: "Reddish Brown", type: "Decorative Ground Cover", colorLabel: "Reddish", colorHex: "#9b4a2e" },
  { img: "/images/sod-5.png", alt: "Onyx Dark Decorative Ground Cover 500 LBS", name: "Onyx Dark", type: "Decorative Ground Cover", colorLabel: "Onyx", colorHex: "#1a1210" },
  { img: "/images/sod-8.png", alt: "Natural Recycled Wood 500 LBS", name: "Natural", type: "Recycled Wood", colorLabel: "Natural", colorHex: "#8b6914" },
];
const LANDSCAPE_LIGHTBOX: LightboxImage[] = LANDSCAPE_PRODUCTS.map(p => ({ src: p.img, alt: p.alt }));

// ─── ADAPTIVE IMAGE (kept from original) ──────────────────────────────────
function getImageFallbacks(src: string) {
  const sources = [src];
  if (src.endsWith(".webp")) {
    sources.push(src.replace(/\.webp$/, ".png"), src.replace(/\.webp$/, ".jpg"));
  } else if (src.endsWith(".png")) {
    sources.push(src.replace(/\.png$/, ".webp"), src.replace(/\.png$/, ".jpg"));
  } else if (src.endsWith(".jpg")) {
    sources.push(src.replace(/\.jpg$/, ".webp"), src.replace(/\.jpg$/, ".png"));
  }
  return Array.from(new Set(sources));
}

function AdaptiveImage({ src, alt, className, imgClassName, width, height, priority = false }: {
  src: string; alt: string; className?: string; imgClassName?: string;
  width?: number; height?: number; priority?: boolean;
}) {
  const fallbacks = getImageFallbacks(src);
  const [index, setIndex] = useState(0);
  const currentSrc = fallbacks[index];
  return (
    <div className={className}>
      {currentSrc ? (
        <img src={currentSrc} alt={alt} className={imgClassName} loading={priority ? "eager" : "lazy"} decoding="async"
          fetchPriority={priority ? "high" : "auto"} width={width} height={height}
          onError={() => setIndex((i) => Math.min(i + 1, fallbacks.length))} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
          <ImageOff className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}

// ─── FULL-SCREEN CATEGORY VIDEO BANNER ────────────────────────────────────
function CategoryBannerVideo({ cat, Icon }: { cat: CategoryMeta; Icon: React.ElementType }) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  function toggle() {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    setMuted((m) => !m);
  }
  return (
    <div className="relative h-[380px] md:h-[460px] overflow-hidden bg-slate-900">
      {/* Background video — full width/height, clearly visible */}
      <video
        ref={videoRef}
        src={cat.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Minimal dark vignette only at bottom for text legibility — no colour tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

      {/* Text content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl text-white">
            <div className="text-[7rem] font-black opacity-10 font-heading leading-none select-none -mb-8">{cat.num}</div>
            <div className="mb-4">
              <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                <Icon className="h-7 w-7" aria-hidden="true" />
                <h2 id={`${cat.id}-heading`} className="text-2xl md:text-3xl font-bold font-heading">{cat.name}</h2>
              </div>
            </div>
            <p className="text-white/85 text-lg mb-5 leading-relaxed">{cat.description}</p>
            <span className="inline-block bg-white/20 border border-white/30 text-white rounded-full px-4 py-1.5 text-sm font-bold">
              {cat.services.length} service{cat.services.length !== 1 ? "s" : ""} available
            </span>
          </div>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-medium hover:bg-black/80 transition-colors"
      >
        {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        {muted ? "Sound Off" : "Sound On"}
      </button>
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────
function ServiceCard({ svc, categoryBg, onImageClick }: { svc: ServiceCard; categoryBg: string; onImageClick?: () => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1">
      <div
        className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-zoom-in"
        onClick={onImageClick}
        role={onImageClick ? "button" : undefined}
        aria-label={onImageClick ? `View ${svc.name} fullscreen` : undefined}
        tabIndex={onImageClick ? 0 : undefined}
        onKeyDown={onImageClick ? (e) => e.key === "Enter" && onImageClick() : undefined}
      >
        <AdaptiveImage src={svc.image} alt={svc.name}
          className="h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={400} height={300} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
            <Clock className="h-3 w-3 text-primary" aria-hidden="true" /> {svc.duration}
          </span>
        </div>
        {onImageClick && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
              <Maximize2 className="h-3 w-3" /> Fullscreen
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start gap-3">
          <div className={`rounded-lg ${categoryBg} p-2 shrink-0 text-white transition-colors group-hover:scale-110`}>
            <svc.icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary pt-1">
            {svc.name}
          </h3>
        </div>
        <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500">{svc.desc}</p>
        <div className="mb-4">
          <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-sm font-bold text-secondary">{svc.price}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/booking?service=${svc.slug}`}
            className="flex-1 flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors text-center">
            Book Now
          </Link>
          <Link href={`/services/${svc.slug}`}
            className="flex-1 flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-primary/30 transition-colors text-center">
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── STATS COUNTER ────────────────────────────────────────────────────────
function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          const CountUp = (window as any).CountUp;
          if (CountUp) {
            new CountUp("stat-services", 39, { duration: 2, suffix: "+" }).start();
            new CountUp("stat-years", 15, { duration: 2, suffix: "+" }).start();
            new CountUp("stat-homes", 5000, { duration: 2.5, suffix: "+", separator: "," }).start();
          }
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-8 mt-8">
      {[
        { id: "stat-services", label: "Services", fallback: "39+" },
        { id: "stat-years", label: "Years Experience", fallback: "15+" },
        { id: "stat-homes", label: "Homes Served", fallback: "5,000+" },
      ].map(({ id, label, fallback }) => (
        <div key={id} className="text-center">
          <div id={id} className="text-4xl md:text-5xl font-black text-primary font-heading">{fallback}</div>
          <div className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">{label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── FLOATING CATEGORY NAV ────────────────────────────────────────────────
function FloatingCategoryNav() {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = CATEGORY_DATA.map((c) => document.getElementById(c.anchor)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function scrollTo(anchor: string) {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
      }`}
    >
      <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl border border-slate-200 p-3 min-w-[170px]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">Jump to</span>
        <div className="flex flex-col gap-0.5">
          {CATEGORY_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => scrollTo(cat.anchor)}
              aria-label={`Jump to ${cat.name}`}
              className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left w-full transition-all duration-200 ${
                activeId === cat.anchor ? "bg-slate-100" : "hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-200 ${activeId === cat.anchor ? "scale-125" : ""}`}
                style={{ backgroundColor: cat.dotColor }}
              />
              <span className={`text-xs font-semibold whitespace-nowrap leading-none ${activeId === cat.anchor ? "text-slate-900" : "text-slate-500"}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function Services() {
  // keep original SERVICES referenced to satisfy "keep all existing imports"
  const _ = SERVICES;
  const __ = SERVICE_CATEGORIES;
  const ___ = getWhatsAppLink;
  void _; void __; void ___;

  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  function openLightbox(images: LightboxImage[], index: number) {
    setLightbox({ images, index });
  }

  function scrollToCategory(anchor: string) {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const totalServices = CATEGORY_DATA.reduce((acc, c) => acc + c.services.length, 0);

  return (
    <Layout>
      <SEO
        title="HVAC, Solar, Plumbing & More Services in Los Angeles"
        description="Professional HVAC, solar, plumbing, electrical, landscaping, irrigation and smart home services in Los Angeles. 39 services across 7 categories. Licensed technicians, same-day service. Call (818) 400-0227."
        canonical="/services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "BERNARDINO MARTIN Home Services",
          description: "Complete home services for Los Angeles homeowners",
          numberOfItems: totalServices,
          itemListElement: CATEGORY_DATA.flatMap((cat, ci) =>
            cat.services.map((svc, si) => ({
              "@type": "ListItem",
              position: ci * 10 + si + 1,
              name: svc.name,
              url: `https://bernardinomartinhvac.com/services/${svc.slug}`,
            }))
          ),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 pt-28 pb-16">
        {/* Hero background video — shows all services in motion */}
        <video
          src="/videos/svc-hvac.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-950/85 to-slate-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 mb-6">
            {totalServices} Services &bull; 7 Categories &bull; Los Angeles
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white font-heading leading-none tracking-tight mb-4">
            Everything Your Home Needs
          </h1>
          <p className="text-3xl md:text-4xl font-black text-blue-400 font-heading mb-6">Under One Roof</p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            From rooftop solar to backyard irrigation — BERNARDINO MARTIN handles every system in your home.
            Licensed, insured, same-day available.
          </p>

          <StatsCounter />

          {/* Pill bar */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {CATEGORY_DATA.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToCategory(cat.anchor)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.dotColor }} />
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BRAND LOGOS STRIP ────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-white py-5" aria-label="Trusted brands we service">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted Brands We Service
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee" style={{ width: "fit-content" }}>
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <div key={i} className="flex-shrink-0 w-40 h-16 bg-white rounded-xl border border-slate-200 flex items-center justify-center px-4 hover:shadow-md transition-shadow">
                  <span className="text-lg font-extrabold tracking-tight text-center" style={{ color: brand.color }}>{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 CATEGORY SECTIONS ──────────────────────────────── */}
      {CATEGORY_DATA.map((cat) => {
        const Icon = cat.icon;
        const iconBg = cat.gradientFrom.replace("from-", "bg-").replace("-600", "-600").replace("-500", "-500");
        const catImages: LightboxImage[] = cat.services.map((s) => ({ src: s.image, alt: s.name }));
        return (
          <section key={cat.id} id={cat.anchor} className={`${cat.bgClass} scroll-mt-24`} aria-labelledby={`${cat.id}-heading`}>
            {/* Full-screen video banner */}
            <CategoryBannerVideo cat={cat} Icon={Icon} />

            {/* Services grid */}
            <div className="py-10 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {cat.services.map((svc, svcIdx) => (
                    <ServiceCard key={svc.slug} svc={svc} categoryBg={iconBg}
                      onImageClick={() => openLightbox(catImages, svcIdx)} />
                  ))}
                </div>
              </div>
            </div>

            {/* Outdoor project type showcase — extra composite sections */}
            {cat.id === "outdoor" && (
              <div className="px-4 pb-12 bg-white border-t border-green-100">
                <div className="max-w-7xl mx-auto pt-10">
                  <div className="text-center mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-green-600">Real Los Angeles Properties</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 font-heading">Our Outdoor Work</h3>
                    <p className="text-slate-500 mt-2 max-w-xl mx-auto">From fresh sod to full hardscape — see the outdoor transformations we deliver across Greater Los Angeles.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                      { label: "Lawn & Turf", sub: "San Augustine & RTF Sod · Grass repair · Leveling", img: "/images/svc-sod-installation.png", link: "/services/outdoor-sod", color: "bg-green-600" },
                      { label: "Garden & Planting", sub: "Seasonal plants · Trees · Garden bed design", img: "/images/svc-planting.png", link: "/services/outdoor-planting", color: "bg-emerald-600" },
                      { label: "Hardscape & Concrete", sub: "Driveways · Patios · Stamped concrete · Pool decks", img: "/images/svc-landscaping.png", link: "/services/outdoor-hardscape", color: "bg-teal-600" },
                    ].map((item) => (
                      <Link key={item.label} href={item.link} className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block">
                        <div className="aspect-[4/3] overflow-hidden">
                          <AdaptiveImage src={item.img} alt={item.label}
                            className="h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <span className={`inline-block ${item.color} text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2`}>{item.label}</span>
                          <p className="text-white/85 text-sm leading-relaxed">{item.sub}</p>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 text-green-700 text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn More →
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Smart Irrigation", sub: "App-controlled watering · Rachio & Rain Bird · Water savings up to 50%", img: "/images/svc-smart-irrigation.png", link: "/services/outdoor-irrigation", color: "bg-cyan-600" },
                      { label: "Full Landscaping Design", sub: "Custom LA landscape design · Drought-tolerant · Native California plants", img: "/images/svc-landscaping.png", link: "/services/outdoor-landscaping", color: "bg-green-700" },
                    ].map((item) => (
                      <Link key={item.label} href={item.link} className="group relative rounded-2xl overflow-hidden bg-slate-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block">
                        <div className="aspect-[16/7] overflow-hidden">
                          <AdaptiveImage src={item.img} alt={item.label}
                            className="h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <span className={`inline-block ${item.color} text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2`}>{item.label}</span>
                          <p className="text-white/85 text-sm leading-relaxed">{item.sub}</p>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 text-green-700 text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn More →
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* ── LANDSCAPE MATERIALS & SUPPLIES ──────────────────────── */}
                  <div className="mt-14 pt-12 border-t border-green-100">
                    {/* Hero banner */}
                    <div className="relative rounded-2xl overflow-hidden mb-10">
                      <img
                        src="/images/sod-materials.png"
                        alt="Bernardino Martin landscape materials yard with fleet vehicles"
                        className="w-full h-56 md:h-72 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent flex flex-col justify-center px-8 md:px-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">Quality Guaranteed</span>
                        <h3 className="text-2xl md:text-4xl font-black text-white font-heading leading-tight mb-2">
                          Landscape Materials<br className="hidden md:block" />&amp; Supplies
                        </h3>
                        <p className="text-slate-300 text-sm md:text-base max-w-sm mb-5">
                          Decorative ground cover, woodchips &amp; recycled wood — delivered in 500 lb quantities across Greater LA.
                        </p>
                        <a
                          href="tel:8184000227"
                          className="inline-flex items-center gap-2 self-start rounded-full bg-green-500 hover:bg-green-400 px-5 py-2.5 text-sm font-bold text-white transition-colors"
                        >
                          <Phone className="h-4 w-4" /> Order: (818) 400-0227
                        </a>
                      </div>
                    </div>

                    {/* Section intro */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-slate-900">
                        Available Products{" "}
                        <span className="text-slate-400 font-normal text-sm">— 500 LBS per order</span>
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Choose your color and material type. Free bulk delivery estimates available.
                      </p>
                    </div>

                    {/* Product grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {LANDSCAPE_PRODUCTS.map((product, idx) => (
                        <div
                          key={product.img}
                          className="group rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <button
                            type="button"
                            aria-label={`View ${product.alt} fullscreen`}
                            onClick={() => openLightbox(LANDSCAPE_LIGHTBOX, idx)}
                            className="relative aspect-[4/3] overflow-hidden bg-slate-100 w-full cursor-zoom-in focus:outline-none block"
                          >
                            <img
                              src={product.img}
                              alt={product.alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 shadow-sm">
                              <span
                                className="inline-block h-3 w-3 rounded-full border border-white/60 shadow-sm flex-shrink-0"
                                style={{ backgroundColor: product.colorHex }}
                              />
                              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide leading-none">
                                {product.colorLabel}
                              </span>
                            </div>
                            <div className="absolute top-2 right-2 rounded-full bg-[#0a2342] px-2.5 py-1">
                              <span className="text-[10px] font-black text-green-400 tracking-wider">500 LBS</span>
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2.5 shadow-lg">
                                <Maximize2 className="h-5 w-5 text-slate-900" />
                              </div>
                            </div>
                          </button>
                          <div className="p-3.5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-0.5">{product.type}</p>
                            <p className="text-sm font-bold text-slate-900 leading-snug mb-2.5">{product.name}</p>
                            <a
                              href="tel:8184000227"
                              className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 hover:bg-green-700 px-3 py-2 text-xs font-bold text-white transition-colors"
                            >
                              <Phone className="h-3 w-3" /> Get Quote
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stats strip */}
                    <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl bg-slate-50 border border-slate-100 p-5">
                      {[
                        { val: "3", label: "Material Types" },
                        { val: "8", label: "Color Variants" },
                        { val: "500 LBS", label: "Per Order" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <p className="text-xl md:text-2xl font-black text-slate-900 font-heading">{s.val}</p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <Link
                        href="/services/outdoor-sod"
                        className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-6 py-2.5 text-sm font-bold text-green-700 hover:bg-green-100 transition-colors"
                      >
                        <Sprout className="h-4 w-4" /> View SOD Installation Details
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA strip */}
            <div className={`bg-gradient-to-r ${cat.gradientFrom} ${cat.gradientTo} bg-opacity-10 py-5 px-4`}>
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white font-semibold text-sm md:text-base">
                  Need {cat.name} services? We&apos;re available same-day.
                </p>
                <div className="flex gap-3 shrink-0">
                  <a href="tel:+18184000227" className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                    Call (818) 400-0227
                  </a>
                  <Link href="/quote" className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-white/30 transition-colors">
                    Get Free Quote
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── FINANCING SECTION (kept from original) ────────────── */}
      <section className="border-y border-blue-100 bg-blue-50 py-14">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Payment Options</span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Flexible Financing Available</h2>
            <p className="mt-2 text-sm text-slate-500">Get the service you need today — pay over time.</p>
          </div>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-slate-600">
            We understand that home repairs and upgrades can be unexpected. That&apos;s why BERNARDINO MARTIN offers flexible
            financing options to qualified customers — whether you&apos;re replacing your HVAC system, installing solar, or
            upgrading your plumbing, we can help you find a payment plan that fits your budget.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {["0% Interest Promotions", "Quick Approval Process", "Flexible Monthly Payments"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" /> {item}
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

      {/* ── VIEW ALL LINK ─────────────────────────────────────── */}
      <div className="bg-white py-8 text-center border-t border-slate-100">
        <p className="text-slate-500 text-sm mb-4">Looking for a specific service?</p>
        <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          Contact us and we&apos;ll find the right solution <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Floating category nav */}
      <FloatingCategoryNav />

      {/* Fullscreen lightbox */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </Layout>
  );
}
