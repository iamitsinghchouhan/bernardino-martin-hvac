import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { ReviewSlider } from "@/components/ReviewSlider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { COMPANY_PHONE, getWhatsAppLink, BRAND_LOGOS } from "@/lib/constants";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Settings,
  Star,
  MapPin,
  Play,
  Fan,
  Sun,
  Droplets,
  Zap,
  TreePine,
  Sparkles,
  Truck,
  Wrench,
  Wifi,
  Leaf,
  Heart,
  Home as HomeIcon,
  Send,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Users,
  Maximize2,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link } from "wouter";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/hooks/use-analytics";

const ServiceAreasMap = lazy(() => import("@/components/service-areas-map").then((m) => ({ default: m.ServiceAreasMap })));

const HERO_TRUST = [
  { icon: Settings, label: "Fast Response" },
  { icon: ShieldCheck, label: "Honest Pricing" },
  { icon: Star, label: "Quality Work" },
  { icon: MapPin, label: "Local LA Team" },
];

const SERVICE_TILES = [
  { title: "HVAC", desc: "Cooling & Heating", href: "/services/hvac-repair", img: "/images/rebrand/tile-hvac.webp", icon: Fan },
  { title: "Solar", desc: "Energy Solutions", href: "/services/solar-install", img: "/images/rebrand/tile-solar.webp", icon: Sun },
  { title: "Plumbing", desc: "Repairs & Installations", href: "/services/plumbing-general", img: "/images/rebrand/tile-plumbing.webp", icon: Droplets },
  { title: "Electrical", desc: "Safe & Reliable", href: "/services/electrical-general", img: "/images/rebrand/tile-electrical.webp", icon: Zap },
  { title: "Landscaping", desc: "Beautiful Outdoors", href: "/services/outdoor-landscaping", img: "/images/rebrand/tile-landscaping.webp", icon: TreePine },
  { title: "Technology", desc: "Smart Home & Networking", href: "/services/tech-smarthome", img: "/images/services/network-smarthome.webp", icon: Wifi },
  { title: "Home Cleaning", desc: "A Cleaner, Healthier Home", href: "/services/home-cleaning", img: "/images/rebrand/tile-cleaning.webp", icon: Sparkles },
  { title: "Moving Help", desc: "Moving & Packing", href: "/services/moving-help", img: "/images/rebrand/tile-moving.webp", icon: Truck },
  { title: "Handyman", desc: "General Home Help", href: "/services/handyman", img: "/images/rebrand/tile-handyman.webp", icon: Wrench },
];

const SEASONS = [
  { icon: "/images/rebrand/season-summer.webp", label: "Summer", desc: "AC Tune-Ups", href: "/services/hvac-maintenance" },
  { icon: "/images/rebrand/season-fall.webp", label: "Fall", desc: "Home Prep", href: "/services/heating-gas-furnace" },
  { icon: "/images/rebrand/season-winter.webp", label: "Winter", desc: "Heating & More", href: "/services/hvac-repair" },
  { icon: "/images/rebrand/season-spring.webp", label: "Spring", desc: "Clean & Refresh", href: "/services/outdoor-irrigation" },
];

const FAQS = [
  { q: "Are you licensed and insured?", a: "Yes — Bernardino Martin is fully licensed, bonded, and insured for HVAC, solar, plumbing, electrical, and general home services across Los Angeles." },
  { q: "Do you offer emergency service?", a: "Yes, we offer 24/7 emergency service for urgent HVAC and plumbing issues, nights and weekends included." },
  { q: "What areas do you serve?", a: "We serve Los Angeles and the greater San Fernando Valley — see our full list of service areas below, or call us to confirm your neighborhood." },
  { q: "How do I get a quote?", a: "Call us, chat on WhatsApp, or fill out our online quote form and we'll get back to you to schedule a visit." },
];

const GALLERY_ITEMS = [
  { title: "Solar Installation", location: "Los Angeles, CA", img: "/images/rebrand/gallery-solar-install.webp", desc: "Rooftop solar panel installation for a Los Angeles home." },
  { title: "Solar Maintenance", location: "Los Angeles, CA", img: "/images/rebrand/gallery-solar-maintenance.webp", desc: "Professional solar panel cleaning to keep energy output at its peak." },
  { title: "Landscape Design", location: "Los Angeles, CA", img: "/images/rebrand/gallery-landscape.webp", desc: "Full landscape and hardscape design for a Los Angeles property." },
  { title: "Mini-Split Service", location: "Los Angeles, CA", img: "/images/rebrand/gallery-minisplit.webp", desc: "Ductless mini-split maintenance and service for year-round comfort." },
  { title: "Smart Network Install", location: "Los Angeles, CA", img: "/images/services/smart-network-solutions.webp", desc: "Structured wiring and network cabinet installation for a smart home." },
  { title: "Smart Irrigation", location: "Los Angeles, CA", img: "/images/rebrand/gallery-irrigation.webp", desc: "Solar-powered smart irrigation controller setup for efficient watering." },
];

const SIDE_PHOTOS = [
  { src: "/images/rebrand/mood-living-room.webp", alt: "Comfortable living room" },
  { src: "/images/rebrand/mood-backyard.webp", alt: "Landscaped backyard" },
  { src: "/images/rebrand/mood-electrical-panel.webp", alt: "Electrical panel service" },
  { src: "/images/rebrand/mood-bathroom.webp", alt: "Bathroom remodel" },
  { src: "/images/rebrand/mood-backyard-evening.webp", alt: "Backyard patio in the evening" },
  { src: "/images/rebrand/mood-solar-roof.webp", alt: "Solar panels on a rooftop" },
];

const REEL_VIDEOS = [
  { src: "/videos/reel-hvac-family.mp4", label: "Home Comfort", thumb: "/images/rebrand/tile-electrical.webp" },
  { src: "/videos/reel-ac-inspect.mp4", label: "AC Inspection", thumb: "/images/rebrand/tile-hvac.webp" },
  { src: "/videos/reel-ac-condenser-circle.mp4", label: "Condenser Service", thumb: "/images/rebrand/tile-plumbing.webp" },
  { src: "/videos/solar-irrigation-real.mp4", label: "Solar Irrigation", thumb: "/images/rebrand/thumb-solar-irrigation.webp" },
];

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function useVideoDuration(src: string) {
  const [duration, setDuration] = useState<number | null>(null);
  useEffect(() => {
    const probe = document.createElement("video");
    probe.preload = "metadata";
    probe.src = src;
    const onLoaded = () => setDuration(probe.duration);
    probe.addEventListener("loadedmetadata", onLoaded);
    return () => probe.removeEventListener("loadedmetadata", onLoaded);
  }, [src]);
  return duration;
}

/* ─── "What can we help you with today?" — auto-scrolling strip of bigger tiles.
   Scrolled via JS (scrollLeft on a real overflow-x-auto container) rather than a CSS
   transform animation — a transform-animated element never reports a "stable" bounding box,
   which makes its contents unreliable (or impossible) to click. A real scroll position keeps
   every tile genuinely clickable at all times, and doubles as touch/drag-scrollable on mobile
   where there's no hover to pause on. Clicking a tile opens a big preview with a button through
   to that service's page, rather than navigating immediately — satisfies both "view it big" and
   "go to the page". */
function ServicesMarquee() {
  const [active, setActive] = useState<(typeof SERVICE_TILES)[number] | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const looped = [...SERVICE_TILES, ...SERVICE_TILES];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = scrollerRef.current;
    if (!el) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      const halfway = el.scrollWidth / 2;
      if (el.scrollLeft >= halfway) {
        el.scrollLeft -= halfway;
      } else {
        el.scrollLeft += 1;
      }
    }, 40);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="services-grid" className="border-b border-slate-100 bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-sans text-3xl font-bold text-[var(--rb-navy)] sm:text-4xl">What can we help you with today?</h2>
          <p className="mt-2 text-slate-500">One trusted team. Many solutions. Click a service to view it and open its page.</p>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
        className="no-scrollbar overflow-x-auto"
      >
        <div className="flex w-max gap-6 px-4">
          {looped.map((tile, i) => (
            <button
              key={`${tile.href}-${i}`}
              type="button"
              onClick={() => setActive(tile)}
              className="group/tile w-80 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="relative block h-80 w-full overflow-hidden">
                <img src={tile.img} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover/tile:scale-105" />
                <span className="absolute inset-0 bg-black/0 transition-colors group-hover/tile:bg-black/20" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover/tile:opacity-100">
                  <Maximize2 className="h-4 w-4 text-slate-900" aria-hidden="true" />
                </span>
              </span>
              <span className="flex items-center gap-2.5 p-5">
                <tile.icon className="h-6 w-6 shrink-0 text-[var(--rb-orange)]" aria-hidden="true" />
                <span>
                  <span className="block text-base font-bold text-[var(--rb-navy)]">{tile.title}</span>
                  <span className="block text-sm text-slate-500">{tile.desc}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-2xl overflow-hidden border-none bg-white p-0">
          <VisuallyHidden>
            <DialogTitle>{active?.title}</DialogTitle>
          </VisuallyHidden>
          {active && (
            <div>
              <img src={active.img} alt={active.title} className="max-h-[55vh] w-full object-cover" />
              <div className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[var(--rb-navy)]">{active.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{active.desc}</p>
                </div>
                <Button className="bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
                  <Link href={active.href}>
                    View Service Page
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ─── Real-work gallery — dark, with prev/next arrows ─── */
function WorkGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<(typeof GALLERY_ITEMS)[number] | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="our-work" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">Our Work Speaks For Itself</p>
            <h2 className="font-sans text-3xl font-bold text-[var(--rb-navy)] md:text-4xl">Real Work. Real Homes. Real Results.</h2>
            <p className="mt-2 text-slate-500">Proudly caring for homes throughout Los Angeles.</p>
          </div>
          <Button variant="outline" className="border-slate-200 text-[var(--rb-navy)] hover:bg-slate-50" asChild>
            <Link href="/services">
              View Full Gallery
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="relative">
          <div ref={scrollerRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {GALLERY_ITEMS.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setLightbox(item)}
                className="group relative h-64 w-72 shrink-0 snap-start overflow-hidden rounded-2xl shadow-sm"
                aria-label={`View project: ${item.title}`}
              >
                <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <span className="absolute bottom-3 left-3">
                  <span className="block text-xs font-bold uppercase tracking-wider text-white">{item.title}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-xs text-white/70">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {item.location}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll gallery left"
            className="absolute -left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:text-[var(--rb-orange)] md:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll gallery right"
            className="absolute -right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md hover:text-[var(--rb-orange)] md:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border-none bg-white p-0">
          <VisuallyHidden>
            <DialogTitle>{lightbox?.title}</DialogTitle>
          </VisuallyHidden>
          {lightbox && (
            <div>
              <img src={lightbox.img} alt={lightbox.title} className="max-h-[60vh] w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--rb-orange)]">{lightbox.location}</p>
                <h3 className="mt-1 text-xl font-bold text-[var(--rb-navy)]">{lightbox.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{lightbox.desc}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ─── Video reel (left, navy) + vertically auto-scrolling reviews (right) ─── */
/** Full-width video showcase — one large featured player plus a row of properly-sized
    (not tiny) thumbnails underneath. Reviews live in their own separate full-width section
    right below this one (see ReviewSlider) rather than squeezed into a side-by-side column,
    which was fighting against both the video content and the review list's own natural sizing. */
function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const activeDuration = useVideoDuration(activeVideo ?? REEL_VIDEOS[0].src);

  const [featured, setFeatured] = useState(0);
  const featuredVideo = REEL_VIDEOS[featured];
  const featuredDuration = useVideoDuration(featuredVideo.src);

  const [lightboxPhoto, setLightboxPhoto] = useState<(typeof SIDE_PHOTOS)[number] | null>(null);

  return (
    <section id="see-us-in-action" className="bg-[var(--rb-navy)] py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">The Bernardino Difference</p>
          <h2 className="font-sans text-3xl font-bold text-white sm:text-4xl">See Us in Action</h2>
          <p className="mt-2 text-white/70">Meet the people, see the projects, and discover why homeowners keep us on speed dial.</p>
          <Button size="lg" className="mt-5 bg-white text-[var(--rb-navy)] hover:bg-white/90" onClick={() => setActiveVideo(featuredVideo.src)}>
            Watch Videos
            <Play className="ml-2 h-4 w-4 fill-current" aria-hidden="true" />
          </Button>
        </div>

        {/* Real project photos flank the video, edge-to-edge like a background panel — not
            individual rounded cards — so the section doesn't read as empty navy space on wide
            screens. Clickable through to a full-screen view. None of these six are used
            anywhere else on the homepage. */}
        <div className="mx-auto grid grid-cols-1 items-stretch gap-0 lg:grid-cols-[1fr_2.3fr_1fr]">
          <div className="hidden lg:flex lg:flex-col">
            {SIDE_PHOTOS.slice(0, 3).map((p) => (
              <button key={p.src} type="button" onClick={() => setLightboxPhoto(p)} className="group relative min-h-0 flex-1 overflow-hidden" aria-label={`View full-screen: ${p.alt}`}>
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                  <Maximize2 className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>

          <div className="px-4 py-6 lg:px-6">
            {/* Plays muted and auto-advances to the next clip on its own — no click needed.
                Same physical slot either way, so nothing resizes when it starts playing. The
                only way to get sound is the fullscreen button, which opens the real video with
                audio and controls (autoplay-with-sound from page load would just get blocked by
                the browser anyway). */}
            <div className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video
                key={featuredVideo.src}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
                onEnded={() => setFeatured((f) => (f + 1) % REEL_VIDEOS.length)}
              >
                <source src={featuredVideo.src} type="video/mp4" />
              </video>
              <button
                type="button"
                onClick={() => setActiveVideo(featuredVideo.src)}
                aria-label={`Watch ${featuredVideo.label} full screen with sound`}
                className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-xs font-bold text-white shadow-lg ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-black/80"
              >
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                Full Screen
              </button>
              <span className="pointer-events-none absolute bottom-4 left-4 rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold text-white/90">
                {featuredVideo.label}
              </span>
              {featuredDuration !== null && (
                <span className="pointer-events-none absolute bottom-4 right-4 rounded-md bg-black/70 px-3 py-1.5 text-sm font-bold text-white">
                  {formatDuration(featuredDuration)}
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {REEL_VIDEOS.map((v, i) => (
                <button
                  key={v.src}
                  type="button"
                  onClick={() => setFeatured(i)}
                  aria-label={`Preview ${v.label} video`}
                  className={`group relative aspect-video overflow-hidden rounded-xl ring-2 transition-all ${i === featured ? "ring-[var(--rb-orange)]" : "ring-transparent hover:ring-white/40"}`}
                >
                  <img src={v.thumb} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  {i !== featured && <span className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/15" />}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 text-left text-[11px] font-bold text-white">
                    {v.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-col">
            {SIDE_PHOTOS.slice(3, 6).map((p) => (
              <button key={p.src} type="button" onClick={() => setLightboxPhoto(p)} className="group relative min-h-0 flex-1 overflow-hidden" aria-label={`View full-screen: ${p.alt}`}>
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                  <Maximize2 className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!lightboxPhoto} onOpenChange={() => setLightboxPhoto(null)}>
        <DialogContent className="max-w-5xl overflow-hidden border-none bg-black p-0">
          <VisuallyHidden>
            <DialogTitle>{lightboxPhoto?.alt}</DialogTitle>
          </VisuallyHidden>
          {lightboxPhoto && (
            <img src={lightboxPhoto.src} alt={lightboxPhoto.alt} className="max-h-[85vh] w-full object-contain" />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-none bg-black p-0">
          <VisuallyHidden>
            <DialogTitle>Service video</DialogTitle>
          </VisuallyHidden>
          {activeVideo && (
            <div className="relative">
              <video key={activeVideo} controls autoPlay playsInline className="w-full">
                <source src={activeVideo} type="video/mp4" />
                <track kind="captions" src="/captions.vtt" srcLang="en" label="English" default />
              </video>
              {activeDuration !== null && (
                <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-bold text-white">
                  {formatDuration(activeDuration)}
                </span>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default function Home() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    let cancelled = false;

    const startVideo = () => {
      if (cancelled || !video) return;
      // Browsers only allow autoplay with sound for visitors who already have enough
      // engagement with this site (per-browser, not something we can control) — try
      // unmuted first so audio plays for those visitors, and fall back to muted
      // autoplay (universally allowed) when the browser rejects it.
      video.muted = false;
      video
        .play()
        .then(() => { if (!cancelled) { setVideoReady(true); setIsHeroMuted(false); } })
        .catch(() => {
          if (cancelled || !video) return;
          video.muted = true;
          video
            .play()
            .then(() => { if (!cancelled) { setVideoReady(true); setIsHeroMuted(true); } })
            .catch(() => {});
        });
    };

    const schedule = () => {
      const ric: (cb: () => void) => void =
        (window as any).requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 1500));
      ric(startVideo);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
    };
  }, []);

  function toggleHeroMute() {
    const video = heroVideoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setIsHeroMuted(next);
  }

  return (
    <Layout>
      <SEO
        title="Los Angeles HVAC, Solar, Electrical & Plumbing | Bernardino Martin"
        description="Licensed HVAC, solar, electrical, plumbing, landscaping & home services serving Los Angeles and the San Fernando Valley. 24/7 emergency service. Call (818) 400-0227."
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <div className="rebrand">
        {/* ══════════ HERO ══════════ */}
        <section className="relative overflow-hidden bg-[var(--rb-navy)] text-white">
          <img
            src="/images/rebrand/hero-redesign.webp"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <video
            ref={heroVideoRef}
            loop
            muted={isHeroMuted}
            playsInline
            preload="none"
            poster="/images/rebrand/hero-redesign.webp"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
          >
            <source src="/videos/hero-redesign.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={toggleHeroMute}
            aria-label={isHeroMuted ? "Unmute background video" : "Mute background video"}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-lg ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-black/80"
          >
            {isHeroMuted ? (
              <VolumeX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          <div className="relative z-10 container mx-auto px-4 py-20 sm:py-28">
            {/* No darkening scrim on the video itself (kept clear, per request) — legibility
                comes from a text-shadow on the copy instead, which inherits to every child here. */}
            <div className="max-w-xl text-shadow-hero">
              <h1 className="text-display text-4xl leading-[1.05] sm:text-6xl">
                <span className="block text-white">Your Home.</span>
                <span className="block text-[var(--rb-orange)]">Our Priority.</span>
              </h1>
              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-white/85 sm:text-base">
                HVAC &bull; Solar &bull; Plumbing &bull; Electrical &bull; Landscaping &bull; Cleaning &amp; More
              </p>
              <p className="mt-4 max-w-md text-white/75">
                From rooftop to foundation, we keep your home comfortable, efficient and beautiful — all year round.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-13 bg-[var(--rb-orange)] px-7 font-bold hover:bg-[var(--rb-orange-dark)]" asChild>
                  <Link href="/quote">
                    Get a Free Estimate
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <a
                  href="#see-us-in-action"
                  onClick={(e) => { e.preventDefault(); document.getElementById("see-us-in-action")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-md border border-white/40 px-7 font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Play className="h-4 w-4 fill-white" aria-hidden="true" />
                  Watch Our Story
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {HERO_TRUST.map((item) => (
                  <span key={item.label} className="flex items-center gap-2 text-sm font-semibold text-white/80">
                    <item.icon className="h-4 w-4 text-[var(--rb-orange)]" aria-hidden="true" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("our-work")?.scrollIntoView({ behavior: "smooth" })}
            className="group absolute bottom-6 right-6 z-10 hidden items-center gap-3 rounded-full bg-black/35 py-2 pl-2 pr-5 shadow-lg ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-black/50 hover:ring-white/40 sm:flex"
            aria-label="See our work in action"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--rb-orange)] shadow-md transition-transform group-hover:scale-110">
              <Play className="ml-0.5 h-4 w-4 fill-white text-white" aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap text-sm font-bold text-white">See Our Work in Action</span>
          </button>

          {/* Small trust card, top-right corner. Deliberately does NOT show a specific "5.0 Google
              rating (N reviews)" figure — there's no real aggregate rating on file to back that
              number, and it's the kind of specific third-party claim worth getting right rather
              than inventing. "5-Star Service" is a description, not a cited statistic. */}
          <div className="absolute right-4 top-20 z-10 hidden w-56 rounded-2xl bg-black/40 p-4 shadow-lg ring-1 ring-white/20 backdrop-blur-md sm:block lg:right-6 lg:top-24">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--rb-orange)]">Trusted Locally</p>
            <p className="mt-1 text-base font-bold text-white">5-Star Service</p>
            <div className="mt-1.5 flex items-center gap-0.5 text-[var(--rb-orange)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" aria-hidden="true" />
              ))}
            </div>
            <div className="my-2.5 h-px bg-white/15" />
            <p className="text-xs italic leading-relaxed text-white/80">&ldquo;Reliable, professional, and incredibly easy to work with.&rdquo;</p>
            <a
              href="#reviews"
              onClick={(e) => { e.preventDefault(); document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-2.5 inline-block text-xs font-bold text-white hover:text-[var(--rb-orange)] transition-colors"
            >
              Read homeowner stories →
            </a>
          </div>
        </section>

        {/* ══════════ WHAT CAN WE HELP YOU WITH TODAY (bigger, auto-scrolling) ══════════ */}
        <ServicesMarquee />

        {/* ══════════ 4 PROMO CARDS ══════════ */}
        <section className="bg-white py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/services/solar-install" className="group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1" style={{ backgroundColor: "var(--rb-green-bg)" }}>
                <Leaf className="mb-4 h-8 w-8" style={{ color: "var(--rb-green-text)" }} aria-hidden="true" />
                <h3 className="font-sans text-base font-bold text-[var(--rb-navy)]">Save Energy</h3>
                <p className="mt-1.5 text-sm text-slate-600">Lower your Utility Bills with modern solutions.</p>
                <span className="mt-4 flex items-center gap-1 text-xs font-bold" style={{ color: "var(--rb-green-text)" }}>
                  Learn About Solar <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>

              <Link href="/services/hvac-maintenance" className="group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1" style={{ backgroundColor: "var(--rb-peach-bg)" }}>
                <Heart className="mb-4 h-8 w-8" style={{ color: "var(--rb-peach-text)" }} aria-hidden="true" />
                <h3 className="font-sans text-base font-bold text-[var(--rb-navy)]">Stay Comfortable</h3>
                <p className="mt-1.5 text-sm text-slate-600">Reliable HVAC for every season.</p>
                <span className="mt-4 flex items-center gap-1 text-xs font-bold" style={{ color: "var(--rb-peach-text)" }}>
                  Explore HVAC <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>

              <Link href="/services" className="group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1" style={{ backgroundColor: "var(--rb-blue-bg)" }}>
                <HomeIcon className="mb-4 h-8 w-8" style={{ color: "var(--rb-blue-text)" }} aria-hidden="true" />
                <h3 className="font-sans text-base font-bold text-[var(--rb-navy)]">One Team for Your Home</h3>
                <p className="mt-1.5 text-sm text-slate-600">Repairs, upgrades, cleaning &amp; more.</p>
                <span className="mt-4 flex items-center gap-1 text-xs font-bold" style={{ color: "var(--rb-blue-text)" }}>
                  See All Services <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>

              <div className="relative overflow-hidden rounded-2xl bg-[var(--rb-navy)]">
                <img
                  src="/images/rebrand/call-photo.webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: "88% center" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 bg-gradient-to-r from-[var(--rb-navy)] via-[var(--rb-navy)]/95 to-transparent p-6">
                  <h3 className="font-sans text-base font-bold text-white">Need Help Now?</h3>
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`} onClick={() => trackEvent("phone_click")} className="mt-3 flex items-center gap-2 text-lg font-black text-white hover:text-[var(--rb-orange)] transition-colors">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--rb-orange)]">
                      <Phone className="h-4 w-4 text-white" aria-hidden="true" />
                    </span>
                    {COMPANY_PHONE}
                  </a>
                  <a href={getWhatsAppLink("Hi, I need help now.")} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    We're here to help!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ STATEMENT BREAK ══════════ */}
        <section className="bg-[var(--rb-navy)] py-20 text-center text-white" data-aos="zoom-in">
          <div className="container mx-auto px-4">
            <p className="text-display mx-auto max-w-3xl text-3xl leading-tight sm:text-5xl">
              One Call. Every Solution. <span className="text-[var(--rb-orange)]">Total Peace of Mind.</span>
            </p>
          </div>
        </section>

        {/* ══════════ REAL WORK GALLERY ══════════ */}
        <WorkGallery />

        {/* ══════════ SEE US IN ACTION (video reel) ══════════ */}
        <VideoShowcase />

        {/* ══════════ REVIEWS (3-column vertical auto-scroll wall) ══════════ */}
        <ReviewSlider />

        {/* ══════════ SEASONAL / OFFERS / ESTIMATE ══════════ */}
        <section className="grid grid-cols-1 bg-white lg:grid-cols-3">
          <div className="flex min-h-[420px] flex-col justify-center border-b border-slate-100 p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">Year-Round Care</p>
            <h3 className="font-sans text-xl font-bold text-[var(--rb-navy)]">Seasonal Services</h3>
            <p className="mt-1 text-sm text-slate-500">We've got you covered year-round.</p>
            <div className="mt-8 grid grid-cols-2 gap-5">
              {SEASONS.map((s) => (
                <Link key={s.label} href={s.href} className="group flex flex-col items-center text-center">
                  <span className="mb-2.5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white shadow-sm transition-transform group-hover:scale-105">
                    <img src={s.icon} alt="" aria-hidden="true" loading="lazy" className="h-[130%] w-[130%] object-cover" />
                  </span>
                  <span className="text-sm font-bold text-[var(--rb-navy)]">{s.label}</span>
                  <span className="text-xs leading-tight text-slate-500">{s.desc}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col justify-center border-b border-slate-100 p-8 sm:p-10 lg:border-b-0 lg:border-r">
            <img src="/images/rebrand/icon-offers.webp" alt="" aria-hidden="true" loading="lazy" className="mb-4 h-12 w-12 object-contain" />
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">Limited Time</p>
            <h3 className="font-sans text-xl font-bold text-[var(--rb-navy)]">Special Offers</h3>
            <p className="mt-1 text-sm text-slate-500">Fresh offers and seasonal savings for the care your home needs today.</p>
            <div className="mt-8 flex items-center gap-6">
              <Button className="bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
                <Link href="/booking">
                  View Offers
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <img src="/images/rebrand/badge-save-now.webp" alt="Save now on seasonal offers" loading="lazy" className="h-28 w-28 object-contain" />
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col justify-center p-8 sm:p-10">
            <div className="mb-5 flex items-center justify-center rounded-xl bg-slate-50 p-3">
              <img src="/images/rebrand/promo-online-booking.webp" alt="Easy online booking" loading="lazy" decoding="async" className="h-44 w-auto object-contain" />
            </div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">Let's Get Started</p>
            <h3 className="font-sans text-xl font-bold text-[var(--rb-navy)]">Get a Free Estimate</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {["Quick, friendly response", "No obligation, ever", "Tailored to your home"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--rb-orange)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="mt-5 w-fit bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
              <Link href="/quote">
                Request an Estimate
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ══════════ COMFORT CLUB MEMBERSHIP ══════════ */}
        <section className="bg-white py-16" data-aos="fade-up">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 shadow-sm sm:flex-row">
              <div className="flex w-full flex-col justify-center bg-[var(--rb-navy)] p-8 text-center text-white sm:w-2/5 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Comfort Club</p>
                <div className="mt-3 text-5xl font-black">
                  $19<span className="text-lg font-medium text-white/60">/mo</span>
                </div>
                <p className="mt-2 text-xs text-white/50">Billed annually at $228/year</p>
                <Button className="mt-6 bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
                  <Link href="/booking?service=hvac-maintenance">Join the Club</Link>
                </Button>
              </div>
              <div className="w-full p-8 sm:w-3/5 sm:p-10">
                <h3 className="text-xl font-bold text-[var(--rb-navy)]">Skip the wait. Save on every visit.</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Two tune-ups a year (Spring AC, Fall Heating)",
                    "Priority scheduling for emergency service",
                    "15% off all repairs and parts",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--rb-orange)]" aria-hidden="true" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ BRANDS WE SERVICE (full color) ══════════ */}
        <section className="group overflow-hidden border-y border-slate-100 bg-white py-12">
          <h2 className="mb-8 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Brands We Service</h2>
          <div className="animate-marquee flex w-max items-center gap-16 group-hover:[animation-play-state:paused]" style={{ animationDuration: "22s" }}>
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
              <img key={`${brand}-${i}`} src={`/images/brands/${brand}.svg`} alt={`${brand} HVAC equipment brand`} loading="lazy" className="h-8 w-auto shrink-0 md:h-9" />
            ))}
          </div>
        </section>

        {/* ══════════ SERVICE AREAS ══════════ */}
        <section className="bg-[var(--rb-navy)] py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/60">Where We Work</p>
              <h2 className="font-sans text-3xl font-bold sm:text-4xl">Serving Greater Los Angeles</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/10 md:h-[420px]">
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center bg-white/5">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-transparent" />
                    </div>
                  }
                >
                  <ServiceAreasMap />
                </Suspense>
              </div>
              <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { city: "Los Angeles", slug: "hvac-los-angeles" },
                    { city: "Burbank", slug: "hvac-burbank" },
                    { city: "Glendale", slug: "hvac-glendale" },
                    { city: "Pasadena", slug: "hvac-pasadena" },
                    { city: "Santa Monica", slug: "hvac-santa-monica" },
                    { city: "Hollywood", slug: "hvac-hollywood" },
                    { city: "Sherman Oaks", slug: "hvac-sherman-oaks" },
                    { city: "Van Nuys", slug: "hvac-van-nuys" },
                    { city: "Encino", slug: "hvac-encino" },
                    { city: "Studio City", slug: "hvac-studio-city" },
                  ].map((c) => (
                    <Link key={c.slug} href={`/${c.slug}`} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--rb-orange)]" aria-hidden="true" />
                      {c.city}
                    </Link>
                  ))}
                  <Link href="/service-areas" className="col-span-2 flex items-center justify-center gap-1 rounded-lg border border-white/10 px-3 py-2.5 text-sm font-bold text-[var(--rb-orange)] transition-colors hover:border-white/30">
                    View All Service Areas
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ FAQ ══════════ */}
        <section className="bg-white py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-8 text-center" data-aos="fade-up">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">Good to Know</p>
              <h2 className="font-sans text-3xl font-bold text-[var(--rb-navy)]">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3" data-aos="fade-up">
              {FAQS.map((faq, i) => (
                <div key={faq.q} className="overflow-hidden rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="text-sm font-bold text-[var(--rb-navy)] sm:text-base">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ BOTTOM STATS BAR ══════════ */}
        <section className="border-t border-slate-100 bg-white py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Users, title: "Family-Owned & Operated", sub: "Serving LA Since Day One" },
                { icon: ShieldCheck, title: "Licensed & Insured", sub: "Your Home Is Safe With Us" },
                { icon: MapPin, title: "Serving Los Angeles", sub: "& Surrounding Areas" },
                { icon: Leaf, title: "Eco-Friendly Solutions", sub: "For a Brighter Tomorrow" },
              ].map((stat) => (
                <div key={stat.title} className="flex items-center gap-3.5 text-left">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50">
                    <stat.icon className="h-6 w-6 text-[var(--rb-orange)]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-base font-bold text-[var(--rb-navy)]">{stat.title}</p>
                    <p className="text-sm text-slate-500">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 flex items-center justify-center gap-3 whitespace-nowrap font-serif text-2xl italic text-slate-400 sm:text-3xl md:text-4xl">
              Building Better Homes Together <Heart className="h-6 w-6 shrink-0 fill-current text-[var(--rb-orange)] sm:h-7 sm:w-7" aria-hidden="true" />
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
