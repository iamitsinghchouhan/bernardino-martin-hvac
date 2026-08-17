import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/constants";
import { CATEGORY_DATA, type CategoryMeta } from "@/data/service-catalog";
import { CategoryBannerVideo } from "@/components/services/CategoryBannerVideo";
import { ServiceCardTile } from "@/components/services/ServiceCardTile";
import { ImageLightbox, type LightboxImage } from "@/components/image-lightbox";
import { useInView } from "@/hooks/use-in-view";
import { CityServiceCategoryTabs } from "./CityServiceCategoryTabs";

type CityServicesShowcaseProps = {
  cityName: string;
  climateLabel?: string;
  /** cityData.commonServices — titles matched against SERVICES for the highlighted cards. */
  commonServices: string[];
  /** Pilot redesign opt-in — swaps the repeated 7-category video-banner block (identical to
      /services' own layout) for a category-tab + master-detail service browser. Defaults to
      false so every other city keeps the current block unchanged. */
  redesign?: boolean;
};

/** One category's video + card grid, mounted only once scrolled near the viewport. The video
    element itself (CategoryBannerVideo) is reused completely unmodified from /services — lazy
    loading here works by deferring when it MOUNTS, not by changing how it behaves once mounted.
    A same-sized placeholder prevents layout shift while waiting. */
function LazyCategorySection({ cat, onImageClick }: { cat: CategoryMeta; onImageClick: (images: LightboxImage[], index: number) => void }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const Icon = cat.icon;
  const iconBg = cat.gradientFrom.replace("from-", "bg-");
  const catImages: LightboxImage[] = cat.services.map((s) => ({ src: s.image, alt: s.name }));

  return (
    <section id={cat.anchor} className={`${cat.bgClass} scroll-mt-24`} aria-labelledby={`${cat.id}-heading`}>
      <div ref={ref}>
        {inView ? (
          <CategoryBannerVideo cat={cat} Icon={Icon} />
        ) : (
          <div className="relative flex h-[380px] items-center justify-center bg-slate-900 md:h-[460px]">
            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm">
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              <span className="text-lg font-bold text-white">{cat.name}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cat.services.map((svc, svcIdx) => (
              <ServiceCardTile key={svc.slug} svc={svc} categoryBg={iconBg} onImageClick={() => onImageClick(catImages, svcIdx)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CityServicesShowcase({ cityName, climateLabel, commonServices, redesign = false }: CityServicesShowcaseProps) {
  const highlighted = commonServices
    .map((title) => SERVICES.find((s) => s.title === title))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);
  function openLightbox(images: LightboxImage[], index: number) {
    setLightbox({ images, index });
  }

  return (
    <>
      {/* Core Service Mix — genuinely unique per city, driven by cityData.commonServices */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl" data-aos="fade-up">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Core Service Mix</p>
              <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-5xl">
                Services Available in {cityName}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                These are the services homeowners in {cityName} request most often when they need reliable comfort, better airflow, and cleaner system performance.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {highlighted.map((service) => (
                <div key={service.id} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" data-aos="fade-up">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>

                  <ul className="mt-5 space-y-2">
                    {service.bullets.slice(0, 3).map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
                      {service.price}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {service.duration}
                    </span>
                  </div>

                  <div className="mt-6">
                    <Button service={service} cityName={cityName} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Every service, with the same real photos used on the main /services page (identical
          images across every city page by design — same crews, same equipment). Redesigned
          cities get a compact category-tab browser instead of /services' own 7-stacked-banner
          layout, so the page doesn't read as a repeat of a page a visitor may have just seen. */}
      {redesign ? (
        <CityServiceCategoryTabs cityName={cityName} onImageClick={openLightbox} />
      ) : (
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-6xl" data-aos="fade-up">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Everything We Offer</p>
              <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-5xl">
                Every Service Available in {cityName}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                The full Bernardino Martin lineup, sized for {(climateLabel ?? "local conditions").toLowerCase()} — same trusted crews and transparent pricing, wherever you are in {cityName}.
              </p>
            </div>
          </div>
          {CATEGORY_DATA.map((cat) => (
            <LazyCategorySection key={cat.id} cat={cat} onImageClick={openLightbox} />
          ))}
        </section>
      )}

      {/* Full catalog — link chips only (not full descriptions), grouped by category */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900">
              Every Service We Offer in {cityName}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Beyond our most-requested work above, we also handle the full range of home services below.
            </p>
            <div className="mt-6 space-y-5">
              {SERVICE_CATEGORIES.map((category) => {
                const categoryServices = SERVICES.filter((s) => s.category === category);
                if (categoryServices.length === 0) return null;
                return (
                  <div key={category}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{category}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {categoryServices.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

function Button({ service, cityName }: { service: (typeof SERVICES)[number]; cityName: string }) {
  return (
    <Link
      href={`/booking?service=${service.id}&city=${encodeURIComponent(cityName)}`}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary/90"
    >
      Request Service
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
