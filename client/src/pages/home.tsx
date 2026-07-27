import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { ReviewSlider } from "@/components/ReviewSlider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  PROMOS,
  SERVICES,
  SERVICE_CATEGORIES,
  COMPANY_PHONE,
  COMPANY_FULL,
  getWhatsAppLink,
} from "@/lib/constants";
import { buildVideoObjectSchema } from "@/lib/video-schema";
import allCities from "@/data/cities/all-cities";
import { PROJECTS } from "@/data/projects";
import {
  ArrowRight,
  Check,
  Phone,
  AlertTriangle,
  MapPin,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Clock,
  Siren,
  Play,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";
import { ImageLightbox, type LightboxImage } from "@/components/image-lightbox";
import { Link } from "wouter";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ProjectGallery = lazy(() => import("@/components/project-gallery").then((m) => ({ default: m.ProjectGallery })));
const ServiceAreasMap = lazy(() => import("@/components/service-areas-map").then((m) => ({ default: m.ServiceAreasMap })));

const BRAND_LOGOS = [
  "carrier", "trane", "lennox", "mitsubishi", "daikin", "goodman", "lg", "rheem", "york", "bosch",
];

const findService = (id: string) => {
  const service = SERVICES.find((s) => s.id === id);
  if (!service) throw new Error(`Unknown service id: ${id}`);
  return service;
};

const EXTRA_CITY_LINKS = [
  { city: "Burbank", slug: "hvac-burbank" },
  { city: "Pasadena", slug: "hvac-pasadena" },
];
const TOTAL_CITY_PAGES = allCities.length + EXTRA_CITY_LINKS.length;

/* ─── Walk Through The House — 5 rotating images per room ─── */
const ROOMS = [
  {
    number: "01",
    label: "Outside",
    headline: "We start where your neighbors can see",
    images: [
      "/images/real-solar-install.webp",
      "/images/hero-bm-solar-roof.png",
      "/images/hero-bm-vehicles.png",
      "/images/solar-techs-rooftop-1.jpg",
      "/images/real-rooftop-hvac.webp",
    ],
    inset: "/images/solar-panel-cleaning.png",
    services: [findService("solar-install"), findService("hvac-repair"), findService("outdoor-irrigation")],
  },
  {
    number: "02",
    label: "Living Room",
    headline: "Heating and cooling for every room",
    images: [
      "/images/hvac-tech-minisplit.png",
      "/images/hvac-tech-homeowner.png",
      "/images/thermostat-nest-install.png",
      "/images/real-diagnostics.webp",
      "/images/hvac-tech-tablet.png",
    ],
    inset: "/images/hvac-tech-filter.png",
    services: [findService("hvac-ductless"), findService("hvac-thermostat"), findService("hvac-maintenance")],
  },
  {
    number: "03",
    label: "Kitchen",
    headline: "Modern plumbing, leak-proofed",
    images: [
      "/images/moen-smart-water-shutoff.webp",
      "/images/real-piping.webp",
      "/images/real-pipe-repair.webp",
      "/images/svc-plumbing.webp",
      "/images/real-trenching.webp",
    ],
    inset: "/images/real-piping.webp",
    services: [findService("plumbing-shutoff"), findService("plumbing-general")],
  },
  {
    number: "04",
    label: "Bathroom",
    headline: "Real pipe work, done right",
    images: [
      "/images/real-copper-welding.webp",
      "/images/svc-plumbing.webp",
      "/images/real-pipe-repair.webp",
      "/images/moen-smart-water-shutoff.webp",
      "/images/real-piping.webp",
    ],
    inset: "/images/real-copper-welding.webp",
    services: [findService("plumbing-jet-cleanup"), findService("plumbing-general")],
  },
  {
    number: "05",
    label: "Utility Room",
    headline: "Safe, licensed electrical work",
    images: [
      "/images/services/electrical-hero.png",
      "/images/services/electrical-ev-charger.png",
      "/images/svc-electrical.png",
      "/images/real-rooftop-hvac.webp",
      "/images/real-crane-lift.webp",
    ],
    inset: "/images/services/electrical-ev-charger.png",
    services: [findService("electrical-panel"), findService("electrical-general")],
  },
  {
    number: "06",
    label: "Backyard",
    headline: "Your outdoor space, transformed",
    images: [
      "/images/hero-bm-irrigation.png",
      "/images/landscape-feature.jpg",
      "/images/svc-landscaping.png",
      "/images/svc-sod-installation.png",
      "/images/svc-planting.png",
    ],
    inset: "/images/svc-planting.png",
    services: [findService("outdoor-landscaping"), findService("outdoor-sod"), findService("outdoor-planting")],
  },
  {
    number: "07",
    label: "Smart Home",
    headline: "The future of your home, wired right",
    images: [
      "/images/hero-bm-smart-home.png",
      "/images/thermostat-nest-app.png",
      "/images/services/network-smarthome.png",
      "/images/services/network-panel.png",
      "/images/services/network-wifi.png",
    ],
    inset: "/images/thermostat-nest-install.png",
    services: [findService("tech-network"), findService("tech-smarthome"), findService("tech-smart-network")],
  },
];

/* ─── Reel videos for compact video strip ─── */
const REEL_VIDEOS = [
  { src: "/videos/hvac-tech-inspecting.mp4", label: "HVAC Inspection", thumb: "/images/hvac-tech-tablet.png" },
  { src: "/videos/hvac-repair-outdoor.mp4", label: "AC Repair", thumb: "/images/hvac-tech-gauges.png" },
  { src: "/videos/hvac-tech-ac-outdoor.mp4", label: "AC Service", thumb: "/images/hero-bm-ac-units.png" },
  { src: "/videos/hvac-tech-driveway.mp4", label: "Service Call", thumb: "/images/hero-bm-vehicles.png" },
  { src: "/videos/solar-panel-install.mp4", label: "Solar Install", thumb: "/images/hero-bm-solar-roof.png" },
  { src: "/videos/solar-la.mp4", label: "Solar LA", thumb: "/images/solar-panel-cleaning.png" },
  { src: "/videos/plumbing-la.mp4", label: "Plumbing", thumb: "/images/real-piping.webp" },
  { src: "/videos/landscaping-la.mp4", label: "Landscaping", thumb: "/images/svc-landscaping.png" },
  { src: "/videos/irrigation-la.mp4", label: "Irrigation", thumb: "/images/hero-bm-irrigation.png" },
  { src: "/videos/network-la.mp4", label: "Smart Home", thumb: "/images/hero-bm-smart-home.png" },
  { src: "/videos/electrical-la.mp4", label: "Electrical", thumb: "/images/services/electrical-hero.png" },
  { src: "/videos/reel-ultra-realistic.mp4", label: "Behind The Scenes", thumb: "/images/real-solar-install.webp" },
];

const FEEL_WORDS = ["comfortable", "efficient", "protected", "powered", "confident"];

const FEEL_GALLERY_IMAGES = [
  { src: "/images/hero-bm-vehicles.png", alt: "Bernardino Martin arriving at your home" },
  { src: "/images/real-solar-install.webp", alt: "Real solar panel installation in Los Angeles" },
  { src: "/images/hero-bm-ac-units.png", alt: "HVAC inspection by Bernardino Martin" },
  { src: "/images/real-copper-welding.webp", alt: "Copper pipe welding work" },
  { src: "/images/hero-bm-solar-roof.png", alt: "Solar panel installation on LA home" },
  { src: "/images/services/electrical-hero.png", alt: "Licensed electrical panel work" },
  { src: "/images/hero-bm-irrigation.png", alt: "Smart irrigation system in action" },
  { src: "/images/hvac-tech-attic-flex-duct.webp", alt: "Custom ductwork fabrication" },
];

/* ─── Active-room tracker for the sticky numbered list ─── */
function useActiveSection(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.slice(0, count).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  return { refs, active };
}

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* Mounts its children only once the placeholder scrolls near the viewport. Keeps heavy
   below-the-fold widgets — the Leaflet map plus its 300KB+ of map tiles and the vendor-maps
   chunk — out of the initial page load, so mobile users who never scroll there pay nothing. */
function DeferUntilNearViewport({
  children,
  placeholder,
  rootMargin = "400px",
}: {
  children: React.ReactNode;
  placeholder: React.ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);
  return (
    <div ref={ref} className="h-full w-full">
      {show ? children : placeholder}
    </div>
  );
}

function CountUpStat({ end, label }: { end: number; label: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let attempts = 0;
    const tryInit = () => {
      const CountUp = (window as any).countUp?.CountUp;
      if (CountUp && spanRef.current) {
        new CountUp(spanRef.current, end, { duration: 1.6 }).start();
        return;
      }
      attempts += 1;
      if (attempts < 20) setTimeout(tryInit, 150);
    };
    tryInit();
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-display text-4xl md:text-5xl text-white">
        <span ref={spanRef}>0</span>+
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">{label}</div>
    </div>
  );
}

function ClickableImage({ src, alt, className, onClick }: { src: string; alt: string; className?: string; onClick?: () => void }) {
  const webpSrc = toWebp(src);
  return (
    <button type="button" onClick={onClick} className="group relative block h-full w-full cursor-zoom-in focus:outline-none" aria-label={`View ${alt} fullscreen`}>
      <picture>
        {!src.endsWith(".webp") && <source srcSet={webpSrc} type="image/webp" />}
        <img src={src} alt={alt} loading="lazy" decoding="async" className={className ?? "h-full w-full object-cover"} />
      </picture>
      {onClick && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 shadow-lg">
            <Maximize2 className="h-4 w-4 text-slate-900" />
          </div>
        </div>
      )}
    </button>
  );
}

/* ─── Full-bleed editorial statement break ─── */
function StatementBreak({ dark, text }: { dark?: boolean; text: string }) {
  return (
    <section className={dark ? "bg-slate-950 py-28 text-white" : "border-y border-slate-100 bg-white py-28 text-slate-950"}>
      <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
        <p className="text-display mx-auto max-w-4xl text-3xl md:text-5xl lg:text-6xl">{text}</p>
      </div>
    </section>
  );
}

/* ─── Compact multi-video reel section (horizontal scroll strip) ─── */
function VideoReelSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const reelSchema = buildVideoObjectSchema({
    name: "Bernardino Martin HVAC, Solar & Plumbing Services Showcase",
    description: "A showcase of HVAC, solar, plumbing, electrical, landscaping, irrigation, and network installation work performed by Bernardino Martin in Los Angeles.",
    thumbnailUrl: "/images/real-solar-install.webp",
    contentUrl: "/videos/hvac-repair-outdoor.mp4",
  });

  return (
    <section className="bg-slate-950 py-12">
      <script type="application/ld+json">{JSON.stringify(reelSchema)}</script>

      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-white/65">Our Work In Motion</p>
            <h2 className="text-display text-2xl text-white md:text-3xl">Watch us in action</h2>
          </div>
          <p className="hidden text-xs text-white/65 sm:block">Scroll to explore →</p>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-3">
          {REEL_VIDEOS.map((v) => (
            <button
              key={v.src}
              type="button"
              onClick={() => setActiveVideo(v.src)}
              className="group relative h-44 w-72 shrink-0 overflow-hidden rounded-xl bg-slate-800"
              aria-label={`Play ${v.label} video`}
            >
              <picture>
                {!v.thumb.endsWith(".webp") && <source srcSet={toWebp(v.thumb)} type="image/webp" />}
                <img
                  src={v.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-50"
                />
              </picture>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                  <Play className="h-5 w-5 fill-white text-white" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-white drop-shadow">{v.label}</span>
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 transition-all group-hover:ring-secondary/50" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-none bg-black p-0">
          <VisuallyHidden>
            <DialogTitle>Service video</DialogTitle>
          </VisuallyHidden>
          {activeVideo && (
            <video key={activeVideo} controls autoPlay playsInline className="w-full">
              <source src={activeVideo} type="video/mp4" />
              <track kind="captions" src="/captions.vtt" srcLang="en" label="English" default />
            </video>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ─── Auto-rotating room image slideshow (3-second interval) ─── */
/* Only 3 images rendered at a time (prev/curr/next) to avoid loading all 5 at once */
function toWebp(src: string) {
  return src.replace(/\.(png|jpg|jpeg)$/i, ".webp");
}

function RoomImageSlideshow({ images, headline }: { images: string[]; headline: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((prev) => (prev + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  const n = images.length;
  const prevIdx = (idx - 1 + n) % n;
  const nextIdx = (idx + 1) % n;
  const inWindow = new Set([prevIdx, idx, nextIdx]);

  return (
    <>
      {images.map((src, i) => {
        if (!inWindow.has(i)) return null;
        const webpSrc = toWebp(src);
        return (
          <picture key={src}>
            {!src.endsWith(".webp") && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={src}
              alt={headline}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          </picture>
        );
      })}
    </>
  );
}

/* ─── Scroll-linked horizontal photo gallery with a changing "feel" word ─── */
function FeelGallery({ onImageClick }: { onImageClick: (index: number) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth + 64, 0);
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
      setWordIndex(Math.min(FEEL_WORDS.length - 1, Math.floor(progress * FEEL_WORDS.length)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop: scroll-linked pinned horizontal gallery */}
      <section ref={sectionRef} className="relative hidden bg-white lg:block" style={{ height: "200vh" }}>
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <p className="mb-10 text-2xl text-slate-500">
            Your home will feel <span className="text-display inline text-slate-950">{FEEL_WORDS[wordIndex]}</span>
          </p>
          <div ref={trackRef} className="flex w-max gap-6 px-8 will-change-transform">
            {FEEL_GALLERY_IMAGES.map((img, i) => (
              <div key={img.src} className={`h-64 w-80 shrink-0 overflow-hidden rounded-2xl shadow-xl ${i % 2 === 0 ? "-rotate-2" : "rotate-2"}`}>
                <ClickableImage src={img.src} alt={img.alt} className="h-full w-full object-cover" onClick={() => onImageClick(i)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: simple swipeable strip */}
      <section className="bg-white py-16 lg:hidden">
        <p className="mb-6 px-4 text-xl text-slate-500">
          Your home will feel <span className="text-display inline text-slate-950">{FEEL_WORDS[2]}</span>
        </p>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2">
          {FEEL_GALLERY_IMAGES.map((img, i) => (
            <div key={img.src} className="h-48 w-64 shrink-0 overflow-hidden rounded-2xl shadow-lg">
              <ClickableImage src={img.src} alt={img.alt} className="h-full w-full object-cover" onClick={() => onImageClick(i)} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const { refs: roomRefs, active: activeRoom } = useActiveSection(ROOMS.length);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroMuted, setHeroMuted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [textFaded, setTextFaded] = useState(false);
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  function openLightbox(images: LightboxImage[], index: number) {
    setLightbox({ images, index });
  }

  /* Hero video: plays on ALL screen sizes, but is loaded lazily — only after the page has
     finished loading and the main thread goes idle — so it never competes with the critical
     resources that decide FCP/LCP/TBT. Until it can play, the preloaded poster image stays
     visible (it's the painted LCP), and if the video ever fails to load the image simply
     remains. Tries to play WITH sound first; browsers that block unmuted autoplay reject the
     play() promise, and only then do we fall back to a muted autoplay (with the toggle
     reflecting the actual muted state either way). */
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    let cancelled = false;

    const startVideo = () => {
      if (cancelled || !video) return;
      video.muted = false;
      const p = video.play();
      const onPlaying = () => {
        if (cancelled) return;
        setVideoReady(true);
        // Fade the text (and its darkening overlay) out the moment the video actually starts playing.
        setTextFaded(true);
      };
      if (p !== undefined) {
        p.then(onPlaying).catch(() => {
          if (cancelled || !video) return;
          video.muted = true;
          setHeroMuted(true);
          video.play().then(onPlaying).catch(() => {});
        });
      }
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

  /* Bring the text back once the video completes its first full loop, then leave it alone —
     the video has the `loop` attribute so `ended` never fires; instead we watch for
     currentTime wrapping from near-the-end back to near-zero via timeupdate. */
  useEffect(() => {
    if (!videoReady) return;
    const video = heroVideoRef.current;
    if (!video) return;

    let prevTime = 0;
    let hasLooped = false;

    const handleTimeUpdate = () => {
      const curr = video.currentTime;
      if (!hasLooped && prevTime > 1 && curr < 0.5) {
        hasLooped = true;
        setTextFaded(false);
      }
      prevTime = curr;
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [videoReady]);

  const toggleHeroMute = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    const next = !heroMuted;
    video.muted = next;
    if (!next) video.play().catch(() => {});
    setHeroMuted(next);
  };


  const allCityLinks = [...allCities.map((c) => ({ city: c.city, slug: c.slug })), ...EXTRA_CITY_LINKS];

  return (
    <Layout>
      <SEO
        title="Los Angeles HVAC, Solar & Plumbing Services"
        description={`${COMPANY_FULL} — Licensed & insured heating, air conditioning, solar panel installation & plumbing in Los Angeles. 24/7 emergency service. Call (818) 400-0227 for a free estimate.`}
      />

      {/* ══════════ HERO — full-screen video background ══════════ */}
      {/* Height fits within the viewport under the fixed chrome (banner + top bar + header ≈ 148px),
          with a min-height so the content never gets clipped in short/landscape viewports. svh keeps
          it stable while mobile browser bars show/hide. */}
      <section className="relative min-h-[560px] h-[calc(100svh-148px)] w-full overflow-hidden bg-slate-950 text-white" data-testid="hero-section">
        {/* Always-visible background image = the painted LCP and a guaranteed fallback if the video
            can't load. Preloaded in index.html, so it appears almost immediately. */}
        <img
          src="/images/hero-home.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Background video — loaded lazily (see effect) and fades in over the image once it can play,
            on every screen size. No autoPlay attribute: playback is started from JS after idle. */}
        <video
          ref={heroVideoRef}
          loop
          playsInline
          muted={heroMuted}
          preload="none"
          poster="/images/hero-home.webp"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          <source src="/videos/hero-home.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays — only needed to keep the text readable, so they fade out together
            with the text (video plays at full, unfiltered brightness while the text is hidden)
            and fade back in together with the text after one loop. */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${textFaded ? "opacity-0" : "opacity-100"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/25" />
        </div>

        {/* Content — fades out the instant the video starts playing, fades back in once the
            video completes one full loop (see effects above), then stays visible. */}
        <div
          className={`relative z-10 flex h-full flex-col justify-center transition-opacity duration-1000 ${
            textFaded ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="container mx-auto px-4 pt-8 md:pt-16">
            <p className="mb-3 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/70 sm:text-xs sm:tracking-[0.3em]">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Los Angeles Home Services
            </p>

            <h1 className="text-display text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl" data-testid="text-hero-title">
              <span className="block">YOUR HOME</span>
              <span className="block text-right text-secondary md:pl-24">DESERVES THE BEST</span>
            </h1>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-heading text-xl font-black text-white">BERNARDINO MARTIN</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">Heating &bull; Air Conditioning &bull; Solar</span>
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                  From rooftop to foundation, we handle everything — real work, honest pricing, quality results across Los Angeles.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="hover-scale h-14 px-8 text-base font-bold bg-white text-slate-950 hover:bg-white/90" asChild data-testid="button-hero-call">
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`} aria-label="Call Now for 24/7 service">
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Call Now
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="hover-scale h-14 px-8 text-base font-bold border-white/30 text-white hover:bg-white/10" asChild data-testid="button-hero-book">
                  <Link href="/booking">
                    <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                    Book Online
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {[
                { icon: ShieldCheck, label: "Licensed, Bonded & Insured" },
                { icon: Clock, label: "Same-Day Service" },
                { icon: Siren, label: "24/7 Emergency Response" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-2 text-sm font-semibold text-white/80">
                  <item.icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sound toggle — moved to top-right, a clear open area of the frame with nothing else
            behind it, and given a solid background + ring so it stays readable over any part
            of the video (bright sky, dark asphalt, etc). Only shown once video is playing. */}
        {videoReady && (
          <button
            type="button"
            onClick={toggleHeroMute}
            aria-label={heroMuted ? "Unmute background video" : "Mute background video"}
            className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-slate-950/80 px-4 py-2 text-xs font-bold text-white shadow-lg ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-slate-950"
          >
            {heroMuted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
            {heroMuted ? "Sound Off" : "Sound On"}
          </button>
        )}
      </section>

      {/* ══════════ VIDEO REEL STRIP (compact) ══════════ */}
      <VideoReelSection />

      {/* ══════════ STATS TICKER ══════════ */}
      <div className="w-full border-b border-slate-800 bg-slate-950 py-4">
        <div className="container mx-auto grid grid-cols-1 gap-3 px-4 text-center sm:grid-cols-3 sm:text-left">
          <p className="text-sm font-bold text-white/80">{SERVICES.length} services across {SERVICE_CATEGORIES.length} specialty categories</p>
          <p className="text-sm font-bold text-white/80 sm:text-center">{TOTAL_CITY_PAGES} Los Angeles-area cities served</p>
          <p className="text-sm font-bold text-white/80 sm:text-right">Licensed, bonded &amp; insured since day one</p>
        </div>
      </div>

      {/* ══════════ CURRENT OFFERS ══════════ */}
      <section className="border-b border-slate-100 bg-slate-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PROMOS.map((promo, i) => (
              <Link
                key={i}
                href={`/booking${promo.code ? `?promo=${promo.code}` : ""}`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div>
                  <span className="mb-1 inline-block rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-bold text-primary">{promo.title}</span>
                  <p className="text-sm font-semibold text-slate-800">{promo.sub || promo.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-secondary transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STATEMENT BREAK 1 ══════════ */}
      <StatementBreak dark text="Real work. Honest pricing. Quality results." />

      {/* ══════════ SCROLL-LINKED "FEEL" GALLERY ══════════ */}
      <FeelGallery onImageClick={(i) => openLightbox(FEEL_GALLERY_IMAGES, i)} />

      {/* ══════════ MISSION STATEMENT ══════════ */}
      <StatementBreak text="Bernardino Martin is a licensed Los Angeles contractor for HVAC, solar, plumbing, electrical, landscaping, and smart home services." />

      {/* ══════════ WALK THROUGH THE HOUSE (auto-rotating images) ══════════ */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl" data-aos="fade-up">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Walk Through The House</p>
            <h2 className="text-display text-4xl md:text-6xl text-slate-950">Every room. One trusted team.</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
            {/* Sticky numbered list — desktop only */}
            <div className="hidden lg:block">
              <div className="sticky top-32 space-y-5">
                {ROOMS.map((room, i) => (
                  <div key={room.number} className={`room-nav-item flex items-baseline gap-4 ${i === activeRoom ? "is-active" : ""}`}>
                    <span className="text-display text-2xl">{room.number}</span>
                    <span className="text-lg font-semibold">{room.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stacked room content with auto-rotating images */}
            <div className="space-y-28">
              {ROOMS.map((room, i) => (
                <div
                  key={room.number}
                  ref={(el) => {
                    roomRefs.current[i] = el;
                  }}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
                >
                  <p className="text-display mb-2 text-sm text-primary lg:hidden">
                    {room.number} — {room.label}
                  </p>

                  {/* Main image area with auto-rotating slideshow */}
                  <div data-aos="fade-up" className="relative aspect-[4/3]">
                    <div
                      className="group relative h-full w-full overflow-hidden rounded-2xl cursor-zoom-in"
                      onClick={() => openLightbox(room.images.map((s) => ({ src: s, alt: room.headline })), 0)}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${room.label} images fullscreen`}
                      onKeyDown={(e) => e.key === "Enter" && openLightbox(room.images.map((s) => ({ src: s, alt: room.headline })), 0)}
                    >
                      <RoomImageSlideshow images={room.images} headline={room.headline} />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white font-medium">
                          <Maximize2 className="h-3 w-3" /> View
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openLightbox([{ src: room.inset, alt: `${room.headline} — detail` }], 0)}
                      className="group absolute -bottom-6 -right-6 hidden h-28 w-36 overflow-hidden rounded-xl border-4 border-white shadow-xl sm:block cursor-zoom-in"
                      aria-label="View detail image fullscreen"
                    >
                      <picture>
                        {!room.inset.endsWith(".webp") && <source srcSet={toWebp(room.inset)} type="image/webp" />}
                        <img src={room.inset} alt={`${room.headline} detail`} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      </picture>
                    </button>
                  </div>

                  <div data-aos="fade-up" data-aos-delay="100">
                    <h3 className="text-2xl font-bold text-slate-950 md:text-3xl">{room.headline}</h3>
                    <ul className="mt-5 space-y-3">
                      {room.services.map((service) => (
                        <li key={service.id} className="flex items-start gap-3">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                          <div>
                            <span className="font-semibold text-slate-900">{service.title}</span>
                            <span className="block text-sm text-slate-500">{service.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 bg-slate-950 hover:bg-primary" asChild>
                      <Link href={`/booking?service=${room.services[0].id}`}>
                        Book {room.label} Service
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BRAND LOGOS ══════════ */}
      <section className="group overflow-hidden border-b border-slate-100 bg-white py-14">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-600">Brands We Service</p>
        <div className="animate-marquee flex w-max items-center gap-16 group-hover:[animation-play-state:paused]" style={{ animationDuration: "22s" }}>
          {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
            <img
              key={`${brand}-${i}`}
              src={`/images/brands/${brand}.svg`}
              alt={`${brand} HVAC equipment brand`}
              loading="lazy"
              className="brand-logo h-7 w-auto shrink-0 md:h-8"
            />
          ))}
        </div>
      </section>

      {/* ══════════ STATEMENT BREAK 2 ══════════ */}
      <StatementBreak text="Licensed. Bonded. Insured." />

      {/* ══════════ REVIEWS ══════════ */}
      <ReviewSlider />

      {/* ══════════ REAL WORK GALLERY ══════════ */}
      <Suspense fallback={<div className="bg-white py-24" />}>
        <ProjectGallery />
      </Suspense>

      {/* ══════════ PEACE OF MIND: MEMBERSHIP + FINANCING ══════════ */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Peace of Mind</p>
            <h2 className="text-display text-4xl md:text-6xl text-slate-950">Membership. Financing. Fair pricing.</h2>
          </div>

          <div className="mx-auto mb-12 max-w-4xl" data-aos="fade-up">
            <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl md:flex-row">
              <div className="relative flex flex-col justify-center bg-slate-950 p-10 text-center text-white md:w-2/5">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">Comfort Club</div>
                <div className="mt-4 text-5xl font-black">
                  $19<span className="text-xl font-medium text-white/65">/mo</span>
                </div>
                <p className="mb-8 mt-2 text-sm text-white/50">Billed annually at $228/year</p>
                <Button className="w-full bg-white text-slate-950 hover:bg-white/90" asChild>
                  <Link href="/booking?service=hvac-maintenance">Join the Club</Link>
                </Button>
              </div>
              <div className="bg-white p-10 md:w-3/5">
                <h3 className="mb-6 border-b pb-4 text-2xl font-bold text-slate-900">What's Included?</h3>
                <ul className="space-y-4">
                  {[
                    "Two comprehensive tune-ups per year (Spring AC, Fall Heating)",
                    "Priority scheduling for emergency services",
                    "15% discount on all repairs and parts",
                    "No emergency service fees (after hours or weekends)",
                    "Comprehensive safety inspections",
                    "Extended lifespan of your equipment",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                      <span className="font-medium text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-5xl rounded-3xl bg-slate-950 p-10 text-white" data-aos="fade-up">
            <div className="flex flex-col items-center gap-12 lg:flex-row">
              <div className="w-full space-y-5 lg:w-1/2">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">Flexible Payment Options</p>
                <h3 className="text-2xl font-bold">Affordable comfort, your way</h3>
                <p className="leading-relaxed text-white/60">
                  Major upgrades and installations shouldn't break the bank. We offer flexible payment
                  solutions so you can invest in your home's comfort without the stress.
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    { title: "Transparent Upfront Pricing", desc: "No hidden fees or surprise charges." },
                    { title: "Flexible Payment Plans", desc: "Spread the cost of larger projects." },
                    { title: "Free Estimates on Major Projects", desc: "Detailed written quotes before commitment." },
                    { title: "Seasonal Promotions & Discounts", desc: "Save with our monthly specials." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                      <div>
                        <span className="block font-bold text-white">{item.title}</span>
                        <span className="text-sm text-white/50">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button size="lg" className="bg-white text-slate-950 hover:bg-white/90" asChild>
                    <Link href="/quote">Get a Free Quote</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <a href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`}>
                      <Phone className="mr-2 h-5 w-5" aria-hidden="true" /> Discuss Options
                    </a>
                  </Button>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
                  {[
                    { project: "Central AC Installation", range: "Starting from $3,500" },
                    { project: "Solar Panel System", range: "Custom quote with rebates" },
                    { project: "Complete HVAC Replacement", range: "Starting from $5,000" },
                    { project: "Ductless Mini-Split System", range: "Starting from $2,500" },
                  ].map((p) => (
                    <div key={p.project} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{p.project}</div>
                        <div className="text-xs text-white/50">{p.range}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ EDUCATIONAL TIPS ══════════ */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Expert Tips</p>
            <h2 className="text-display text-4xl md:text-6xl text-slate-950">HVAC tips & energy savings.</h2>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Maintenance Best Practices",
                tips: ["Change air filters every 1-3 months", "Schedule professional tune-ups twice a year", "Keep outdoor units clear of debris and vegetation", "Check thermostat batteries and calibration annually", "Inspect ductwork for leaks and seal gaps"],
              },
              {
                title: "Energy Efficiency Tips",
                tips: ["Install a programmable or smart thermostat", "Seal windows and doors to prevent air leaks", "Use ceiling fans to assist air circulation", "Consider upgrading to a high-efficiency HVAC system", "Add insulation to attic and crawl spaces"],
              },
              {
                title: "When to Call a Professional",
                tips: ["Unusual noises from your HVAC unit", "Inconsistent temperatures between rooms", "System cycling on and off frequently", "Spike in energy bills without usage changes", "Visible ice buildup on refrigerant lines"],
              },
            ].map((card, i) => (
              <div key={card.title} data-aos="fade-up" data-aos-delay={i * 150} className="rounded-2xl border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {card.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold" asChild>
              <Link href="/quote">Get a Free Expert Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICE AREAS ══════════ */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/50">Where We Work</p>
            <h2 className="text-display text-4xl md:text-6xl">Serving Greater Los Angeles.</h2>
            <div className="mt-8 flex justify-center gap-12">
              <CountUpStat end={SERVICES.length} label="Services" />
              <CountUpStat end={SERVICE_CATEGORIES.length} label="Categories" />
              <CountUpStat end={TOTAL_CITY_PAGES} label="Cities Served" />
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-aos="fade-right" className="relative h-[400px] overflow-hidden rounded-2xl border border-white/10 md:h-[480px]">
              <DeferUntilNearViewport
                placeholder={
                  <div className="flex h-full w-full items-center justify-center bg-white/5">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-transparent" />
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center bg-white/5">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-transparent" />
                    </div>
                  }
                >
                  <ServiceAreasMap />
                </Suspense>
              </DeferUntilNearViewport>
            </div>
            <div data-aos="fade-left" className="max-h-[480px] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="grid grid-cols-2 gap-3">
                {allCityLinks.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="group flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
                    {c.city}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ EMERGENCY SERVICE ══════════ */}
      <section className="border-t border-red-100 bg-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row" data-aos="fade-up">
            <div className="shrink-0 rounded-2xl bg-red-100 p-5">
              <AlertTriangle className="h-12 w-12 text-red-600" aria-hidden="true" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">Need Emergency Service?</h2>
              <p className="mb-1 text-slate-600">No heat? AC failure? Water leak? We offer same-day emergency service across Los Angeles — including nights and weekends.</p>
              <p className="text-sm text-slate-600">Priority scheduling available for Comfort Club members at no extra charge.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button size="lg" className="h-12 bg-red-600 px-6 font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-700" asChild>
                <a href={`tel:${COMPANY_PHONE.replace(/\D/g, "")}`} aria-label="Call Now for emergency service">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" /> Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-red-200 font-semibold text-red-700 hover:bg-red-100" asChild>
                <Link href="/quote">Request Priority Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="relative overflow-hidden bg-slate-950 py-28 text-center text-white">
        <div className="container relative z-10 mx-auto px-4" data-aos="zoom-in">
          <h2 className="text-display mx-auto max-w-3xl text-4xl md:text-7xl">Ready to upgrade your home?</h2>
          <p className="mx-auto mb-10 mt-6 max-w-xl text-lg text-white/60">
            Schedule your service today and take advantage of our monthly specials. Fast, reliable, and always professional.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-slate-950 hover:bg-white/90" asChild>
              <Link href="/booking">Book Online Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-white/30 text-white hover:bg-white/10" asChild>
              <a href={getWhatsAppLink("Hello! I'm interested in booking a service.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp to book a service">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Fullscreen image lightbox */}
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
