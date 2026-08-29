import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CityBreadcrumb } from "@/components/city-pages/CityBreadcrumb";
import type { CityData } from "@/data/cities/types";
import { Phone, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";

type CityPageHeroProps = {
  cityData: CityData;
  /** Pilot redesign opt-in — defaults to false so every other city keeps the current
      full-bleed video hero. When true, renders a slow-zoom photo hero with the city's real
      video featured as a distinct floating card instead (see below). */
  redesign?: boolean;
};

export default function CityPageHero({ cityData, redesign = false }: CityPageHeroProps) {
  const phoneHref = `tel:${cityData.localPhone.replace(/\D/g, "")}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  if (redesign) {
    // Only feature the video card when this city has its own real, dedicated clip — the
    // shared generic-area-hero.mp4 fallback isn't worth a spotlight slot of its own.
    const hasRealVideo = cityData.videoFile !== "generic-area-hero.mp4";

    function toggleMute() {
      const video = videoRef.current;
      if (!video) return;
      const next = !video.muted;
      video.muted = next;
      setMuted(next);
    }

    return (
      <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-slate-950 text-white md:min-h-[760px]">
        {/* Slow cinematic zoom on the city's real photo — the page's visual anchor */}
        <img
          src={`/images/cities/${cityData.imageFile}`}
          alt={`${cityData.city} HVAC service area`}
          className="animate-kenburns absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

        <div className="container relative z-10 mx-auto px-4 pb-16 pt-32 md:pb-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl" data-aos="fade-up">
              <CityBreadcrumb cityName={cityData.city} cityPath={`/${cityData.slug}`} />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                {cityData.city} HVAC Service
              </p>
              <h1 className="text-display mt-4 text-4xl text-white md:text-6xl">
                HVAC Services in {cityData.city}, CA
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 md:text-lg">
                Licensed local help for {cityData.city} homes and light commercial spaces, with {cityData.responseTime.toLowerCase()} response times and service built for {cityData.climate.toLowerCase()}.
              </p>

              {/* Slim inline stat strip instead of 3 boxed pills */}
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-slate-200">
                <span>{cityData.responseTime} response</span>
                <span className="text-white/30">&bull;</span>
                <span>{cityData.population} population served</span>
                <span className="text-white/30">&bull;</span>
                <span>ZIP {cityData.zipCodes[0]}</span>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-white font-semibold text-primary hover:bg-slate-100" asChild>
                  <Link href="/quote">Get Free Quote</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild>
                  <a href={phoneHref}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Floating video card — the city's own real footage, featured as a signature
                element rather than a generic full-bleed background loop. */}
            {hasRealVideo && (
              <div className="w-full max-w-sm shrink-0 lg:w-96" data-aos="fade-up" data-aos-delay="200">
                <div className="group relative overflow-hidden rounded-2xl border-4 border-white/90 shadow-2xl">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={`/images/cities/${cityData.imageFile}`}
                    className="h-56 w-full object-cover md:h-64"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  >
                    <source src={`/videos/cities/${cityData.videoFile}`} type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                  >
                    {muted ? <VolumeX className="h-3.5 w-3.5" aria-hidden="true" /> : <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />}
                    {muted ? "Sound Off" : "Sound On"}
                  </button>
                </div>
                <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  Watch Us at Work in {cityData.city}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0">
        <img
          src={`/images/cities/${cityData.imageFile}`}
          alt={`${cityData.city} HVAC service area`}
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={`/images/cities/${cityData.imageFile}`}
        className="absolute inset-0 h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      >
        <source src={`/videos/cities/${cityData.videoFile}`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-blue-950/55" />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <CityBreadcrumb cityName={cityData.city} cityPath={`/${cityData.slug}`} />
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100" data-aos="fade-up">
            {cityData.city} HVAC Service
          </p>
          <h1 className="text-display mt-6 text-4xl text-white md:text-6xl" data-aos="fade-up" data-aos-delay="100">
            HVAC Services in {cityData.city}, CA
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl" data-aos="fade-up" data-aos-delay="150">
            Licensed local help for {cityData.city} homes and light commercial spaces, with {cityData.responseTime.toLowerCase()} response times and service built for {cityData.climate.toLowerCase()}.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 transition-colors hover:bg-white/15">
              <div className="text-lg font-bold text-white">{cityData.responseTime}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-200">Typical response</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 transition-colors hover:bg-white/15">
              <div className="text-lg font-bold text-white">{cityData.population}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-200">Population served</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 transition-colors hover:bg-white/15">
              <div className="text-lg font-bold text-white">{cityData.zipCodes[0]}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-200">Primary ZIP</div>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-white font-semibold text-primary hover:bg-slate-100" asChild>
              <Link href="/quote">Get Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild>
              <a href={phoneHref}>
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
