import { MapPin, Maximize2 } from "lucide-react";

type LandmarkPhoto = { src: string; alt: string; caption: string };

/** Opt-in — renders nothing when no landmarkPhoto is provided, so cities without a confirmed
    real photo yet (still on the generic fallback) show no gap in the page. onImageClick is
    optional so existing callers (Burbank/Pasadena) that don't pass it keep working unchanged. */
export function LandmarkSpotlight({ landmarkPhoto, onImageClick }: { landmarkPhoto?: LandmarkPhoto; onImageClick?: () => void }) {
  if (!landmarkPhoto) return null;

  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10" data-aos="fade-up">
          <div
            className="group relative"
            onClick={onImageClick}
            role={onImageClick ? "button" : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            aria-label={onImageClick ? `View ${landmarkPhoto.alt} fullscreen` : undefined}
            onKeyDown={onImageClick ? (e) => e.key === "Enter" && onImageClick() : undefined}
          >
            <img
              src={landmarkPhoto.src}
              alt={landmarkPhoto.alt}
              loading="lazy"
              decoding="async"
              className={`h-[320px] w-full object-cover transition-transform duration-500 md:h-[440px] ${onImageClick ? "cursor-zoom-in group-hover:scale-105" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            {onImageClick && (
              <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                  <Maximize2 className="h-3 w-3" aria-hidden="true" /> View Fullscreen
                </span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Local to You
              </div>
              <p className="text-display mt-3 max-w-2xl text-2xl leading-tight text-white md:text-4xl">
                {landmarkPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
