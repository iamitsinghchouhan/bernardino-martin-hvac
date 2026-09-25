import { ReviewSlider } from "@/components/ReviewSlider";
import { BRAND_LOGOS } from "@/lib/constants";
import type { CityData } from "@/data/cities/types";

type CitySocialProofProps = {
  cityData: CityData;
};

/** New trust section for redesignV2 city pages, placed early to reassure quickly rather than
    carry the main content of the page. Reuses the homepage's own ReviewSlider (now showing the
    real verified aggregate rather than fabricated reviews — see ReviewSlider.tsx) and brand
    marquee as-is; the only new piece is a short photo strip, which gracefully omits itself for
    any city without real galleryImages yet rather than padding the section with a repeated or
    stock photo. */
export function CitySocialProof({ cityData }: CitySocialProofProps) {
  const galleryPhotos = cityData.galleryImages ?? [];

  return (
    <>
      <ReviewSlider />

      {galleryPhotos.length > 0 && (
        <section className="bg-white py-10">
          <div className="container mx-auto px-4" data-aos="fade-up">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Real Jobs in {cityData.city}
            </p>
            <div className="no-scrollbar mx-auto flex max-w-4xl gap-4 overflow-x-auto pb-2">
              {galleryPhotos.map((src) => (
                <div key={src} className="h-40 w-56 shrink-0 overflow-hidden rounded-xl border border-slate-200">
                  <img
                    src={src}
                    alt={`Bernardino Martin job in ${cityData.city}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="group overflow-hidden border-y border-slate-100 bg-white py-10">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500" data-aos="fade-up">
          We Work On What You Actually Have
        </p>
        <div className="animate-marquee flex w-max items-center gap-16 group-hover:[animation-play-state:paused]" style={{ animationDuration: "22s" }}>
          {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
            <img
              key={`${brand}-${i}`}
              src={`/images/brands/${brand}.svg`}
              alt={`${brand} HVAC equipment brand`}
              loading="lazy"
              className="h-8 w-auto shrink-0 md:h-9"
            />
          ))}
        </div>
      </section>
    </>
  );
}
