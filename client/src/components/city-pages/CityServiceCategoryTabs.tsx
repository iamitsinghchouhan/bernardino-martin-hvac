import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Maximize2 } from "lucide-react";
import { CATEGORY_DATA } from "@/data/service-catalog";
import { AdaptiveImage } from "@/components/services/AdaptiveImage";
import type { LightboxImage } from "@/components/image-lightbox";

/** Category-tab + master-detail service browser. Click a category, one large photo shows
    above a compact list of that category's services; click a service in the list to bring
    ITS photo up large instead. Same click-to-swap interaction language as CityGalleryShowcase
    and outdoor-hardscape.tsx's look-picker, applied to the services catalog — replaces the
    old approach of literally reusing /services' 7-stacked-video-banner layout, which read as
    a repeat of a page visitors may have already seen. */
export function CityServiceCategoryTabs({ cityName, onImageClick }: {
  cityName: string;
  onImageClick: (images: LightboxImage[], index: number) => void;
}) {
  const [categoryId, setCategoryId] = useState(CATEGORY_DATA[0].id);
  const [serviceIdx, setServiceIdx] = useState(0);

  const category = CATEGORY_DATA.find((c) => c.id === categoryId) ?? CATEGORY_DATA[0];
  const service = category.services[serviceIdx];
  const categoryImages: LightboxImage[] = category.services.map((s) => ({ src: s.image, alt: s.name }));

  function selectCategory(id: string) {
    setCategoryId(id);
    setServiceIdx(0);
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Explore Our Work</p>
            <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-5xl">Every Service, One Tap Away</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Pick a category, then a service, to see real photos from jobs we've done in {cityName} and across Los Angeles.
            </p>
          </div>

          {/* Category tabs */}
          <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="100">
            {CATEGORY_DATA.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                aria-pressed={cat.id === categoryId}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  cat.id === categoryId
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                <cat.icon className="h-4 w-4" aria-hidden="true" />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Focus photo + service list, master-detail */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-stretch" data-aos="fade-up" data-aos-delay="150">
            <button
              type="button"
              onClick={() => onImageClick(categoryImages, serviceIdx)}
              className="group relative block overflow-hidden rounded-3xl border border-slate-200 shadow-lg"
              aria-label={`View ${service.name} fullscreen`}
            >
              <AdaptiveImage
                src={service.image}
                alt={service.name}
                className="h-[320px] w-full lg:h-full"
                imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                  <Maximize2 className="h-3 w-3" aria-hidden="true" /> Fullscreen
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <p className="text-lg font-bold text-white">{service.name}</p>
                <p className="mt-1 text-sm text-white/80">{service.desc}</p>
              </div>
            </button>

            <div className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <ul className="flex-1 space-y-1">
                {category.services.map((svc, i) => (
                  <li key={svc.slug}>
                    <button
                      type="button"
                      onClick={() => setServiceIdx(i)}
                      aria-pressed={i === serviceIdx}
                      className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors ${
                        i === serviceIdx ? "bg-white shadow-sm" : "hover:bg-white/60"
                      }`}
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                        <AdaptiveImage src={svc.image} alt={svc.name} className="h-full w-full" imgClassName="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">{svc.name}</p>
                        <p className="text-xs text-slate-500">{svc.duration}</p>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-secondary">{svc.price}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <Link
                href={`/booking?service=${service.slug}&city=${encodeURIComponent(cityName)}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Book {service.name}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
