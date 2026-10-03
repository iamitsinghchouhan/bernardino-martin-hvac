import type { CityData } from "@/data/cities/types";

type CityLifeEditorialProps = {
  cityData: CityData;
};

/** redesignV2's visual treatment for "Life in {city}" — the copy itself (localLife.nature/
    community/howWeHelp) is already written and approved per city; this only changes how it's
    presented: two large photo-backed editorial panels instead of plain white cards, and a
    full-bleed statement panel for howWeHelp instead of a boxed quote. Renders nothing if the
    city has no localLife data yet, same as the non-V2 section. */
export function CityLifeEditorial({ cityData }: CityLifeEditorialProps) {
  if (!cityData.localLife) return null;

  const heroPhoto = `/images/cities/${cityData.imageFile}`;
  const secondPhoto = cityData.galleryImages?.find((src) => !src.endsWith(cityData.imageFile)) ?? heroPhoto;

  return (
    <section className="bg-[var(--rb-green-text)]">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl" data-aos="fade-up">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">Local Life</p>
          <h2 className="text-display mt-3 text-3xl text-white md:text-5xl">Life in {cityData.city}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* No darkening scrim on the photo itself, per request — legibility comes from
            text-shadow-hero on the copy instead. */}
        <div className="relative isolate min-h-[360px] overflow-hidden" data-aos="fade-up" data-aos-delay="100">
          <img
            src={heroPhoto}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative flex h-full min-h-[360px] flex-col justify-end p-8 text-shadow-hero md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white">The Landscape</p>
            <p className="mt-3 max-w-md text-lg leading-8 text-white">{cityData.localLife.nature}</p>
          </div>
        </div>

        <div className="relative isolate min-h-[360px] overflow-hidden" data-aos="fade-up" data-aos-delay="150">
          <img
            src={secondPhoto}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative flex h-full min-h-[360px] flex-col justify-end p-8 text-shadow-hero md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--rb-orange)]">The Community</p>
            <p className="mt-3 max-w-md text-lg leading-8 text-white">{cityData.localLife.community}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[var(--rb-orange-dark)] py-20" data-aos="zoom-in">
        <div className="container mx-auto px-4">
          <p className="text-display mx-auto max-w-4xl text-center text-2xl leading-tight text-white md:text-4xl">
            {cityData.localLife.howWeHelp}
          </p>
        </div>
      </div>
    </section>
  );
}
