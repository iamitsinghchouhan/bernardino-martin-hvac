import { useState } from "react";
import { Maximize2 } from "lucide-react";

type GalleryPhoto = { src: string; alt: string };

/** Generic stage labels — describe the TYPE of shot, not invented facts about any specific
    city, so this component works unmodified once more cities get their own photo sets. */
const STAGE_LABELS = ["On the Way In", "On the Job", "Dialed In", "Around the Neighborhood"];

/** Click-to-swap photo picker, same interaction pattern as outdoor-hardscape.tsx's
    HardscapeShowcase look-picker. Renders nothing if there are no non-landmark gallery photos
    for this city yet. */
export function CityGalleryShowcase({ cityName, images, onImageClick }: {
  cityName: string;
  images: GalleryPhoto[];
  onImageClick: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const current = images[active];
  const label = STAGE_LABELS[active] ?? `View ${active + 1}`;

  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">On the Job in {cityName}</p>
            <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-5xl">Real {cityName}. Real Work.</h2>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="100">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  i === active
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                {STAGE_LABELS[i] ?? `View ${i + 1}`}
              </button>
            ))}
          </div>

          <div className="group relative mt-8 overflow-hidden rounded-3xl border border-slate-200 shadow-lg" data-aos="fade-up" data-aos-delay="150">
            <button
              type="button"
              onClick={() => onImageClick(active)}
              className="relative block w-full cursor-zoom-in"
              aria-label={`View ${current.alt} fullscreen`}
            >
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                loading="lazy"
                decoding="async"
                className="h-[340px] w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[480px]"
              />
              <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                  <Maximize2 className="h-3 w-3" aria-hidden="true" /> Fullscreen
                </span>
              </div>
            </button>
            <div className="bg-white p-5 text-center">
              <p className="text-sm font-semibold text-slate-900">{label}</p>
              <p className="mt-1 text-xs text-slate-500">Bernardino Martin, on location in {cityName}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
