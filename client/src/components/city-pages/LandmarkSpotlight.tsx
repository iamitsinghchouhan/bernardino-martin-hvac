import { MapPin } from "lucide-react";

type LandmarkPhoto = { src: string; alt: string; caption: string };

/** Opt-in — renders nothing when no landmarkPhoto is provided, so cities without a confirmed
    real photo yet (still on the generic fallback) show no gap in the page. */
export function LandmarkSpotlight({ landmarkPhoto }: { landmarkPhoto?: LandmarkPhoto }) {
  if (!landmarkPhoto) return null;

  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10">
          <div className="relative">
            <img
              src={landmarkPhoto.src}
              alt={landmarkPhoto.alt}
              loading="lazy"
              decoding="async"
              className="h-[320px] w-full object-cover md:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Local to You
              </div>
              <p className="mt-3 max-w-2xl text-lg font-semibold leading-relaxed text-white md:text-2xl">
                {landmarkPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
