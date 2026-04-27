import { Button } from "@/components/ui/button";
import type { CityData } from "@/data/cities/types";
import { Phone } from "lucide-react";
import { Link } from "wouter";

type CityPageHeroProps = {
  cityData: CityData;
};

export default function CityPageHero({ cityData }: CityPageHeroProps) {
  const phoneHref = `tel:${cityData.localPhone.replace(/\D/g, "")}`;

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
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100">
            {cityData.city} HVAC Services
          </span>
          <h1 className="mt-6 text-4xl font-heading font-black tracking-tight text-white md:text-6xl">
            Heating and Air Conditioning in {cityData.city}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl">
            Licensed local help for {cityData.city} homes and light commercial spaces, with {cityData.responseTime.toLowerCase()} response times and service built for {cityData.climate.toLowerCase()}.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3">
              <div className="text-lg font-bold text-white">{cityData.responseTime}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-200">Typical response</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3">
              <div className="text-lg font-bold text-white">{cityData.population}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-200">Population served</div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3">
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
