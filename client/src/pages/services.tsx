import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/constants";
import type { Service, ServiceCategory } from "@/lib/constants";
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
import { CATEGORY_DATA } from "@/data/service-catalog";
import { AdaptiveImage } from "@/components/services/AdaptiveImage";
import { CategoryBannerVideo } from "@/components/services/CategoryBannerVideo";
import { ServiceCardTile } from "@/components/services/ServiceCardTile";

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
                    <ServiceCardTile key={svc.slug} svc={svc} categoryBg={iconBg}
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
                      { label: "Hardscape & Concrete", sub: "Driveways · Patios · Stamped concrete · Pool decks", img: "/images/hardscape/hardscape-pool-deck-european-fan-sunrise.webp", link: "/services/outdoor-hardscape", color: "bg-teal-600" },
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
                      <picture>
                        <source srcSet="/images/sod-materials.webp" type="image/webp" />
                        <img
                          src="/images/sod-materials.png"
                          alt="Bernardino Martin landscape materials yard with fleet vehicles"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-56 md:h-72 object-cover object-center"
                        />
                      </picture>
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
                            <picture>
                              <source srcSet={product.img.replace(/\.png$/i, ".webp")} type="image/webp" />
                              <img
                                src={product.img}
                                alt={product.alt}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </picture>
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

                  {/* ── HARDSCAPE & CONCRETE ──────────────────────────────────── */}
                  <div className="mt-14 pt-12 border-t border-green-100">
                    {/* Hero banner */}
                    <div className="relative rounded-2xl overflow-hidden mb-10">
                      <img
                        src="/images/hardscape/hardscape-banner-workers.webp"
                        alt="Bernardino Martin crew installing a paver patio and retaining wall by a backyard pool"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-56 md:h-72 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent flex flex-col justify-center px-8 md:px-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">Built to Last. Designed to Impress.</span>
                        <h3 className="text-2xl md:text-4xl font-black text-white font-heading leading-tight mb-2">
                          Hardscape &amp;<br className="hidden md:block" />Concrete
                        </h3>
                        <p className="text-slate-300 text-sm md:text-base max-w-sm mb-5">
                          Stamped concrete driveways, patios, retaining walls, and pool decks — dozens of pattern and color combinations.
                        </p>
                        <a
                          href="tel:8184000227"
                          className="inline-flex items-center gap-2 self-start rounded-full bg-teal-500 hover:bg-teal-400 px-5 py-2.5 text-sm font-bold text-white transition-colors"
                        >
                          <Phone className="h-4 w-4" /> Free Estimate: (818) 400-0227
                        </a>
                      </div>
                    </div>

                    {/* Pattern preview grid */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-slate-900">Popular Patterns</h4>
                      <p className="text-sm text-slate-500 mt-1">Every pattern is available in a range of integral colors — see the full picker on the service page.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {[
                        { label: "Ashlar Slate", img: "/images/hardscape/hardscape-pattern-ashlar-slate.webp" },
                        { label: "Flagstone", img: "/images/hardscape/hardscape-pattern-flagstone.webp" },
                        { label: "Wood Plank", img: "/images/hardscape/hardscape-pattern-wood-plank.webp" },
                        { label: "Herringbone", img: "/images/hardscape/hardscape-pattern-herringbone.webp" },
                        { label: "London Cobble", img: "/images/hardscape/hardscape-pattern-london-cobble.webp" },
                        { label: "European Fan", img: "/images/hardscape/hardscape-pattern-european-fan.webp" },
                      ].map((pattern) => (
                        <Link
                          key={pattern.label}
                          href="/services/outdoor-hardscape"
                          className="group rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 block"
                        >
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={pattern.img}
                              alt={`${pattern.label} stamped concrete pattern`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-2.5 text-center">
                            <p className="text-xs font-bold text-slate-700 group-hover:text-teal-700 transition-colors">{pattern.label}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <Link
                        href="/services/outdoor-hardscape"
                        className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-6 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-100 transition-colors"
                      >
                        <Home className="h-4 w-4" /> View Hardscape &amp; Concrete Details
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
