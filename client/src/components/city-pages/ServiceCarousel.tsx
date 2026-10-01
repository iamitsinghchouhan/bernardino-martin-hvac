import { AdaptiveImage } from "@/components/services/AdaptiveImage";
import { PromoBadge } from "@/components/city-pages/PromoBadge";

/** "Most-Requested Services in {city}" — horizontal-scroll carousel with real pricing and an
    optional promo badge. `badgeLabel` should only ever be set when a real, currently-active
    offer applies to that exact service — never a fabricated claim. */
export type CarouselService = {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  nowPrice: string;
  note?: string;
  badgeLabel?: string;
};

type ServiceCarouselProps = {
  cityName: string;
  services: CarouselService[];
  onBook: (serviceId: string) => void;
};

export function ServiceCarousel({ cityName, services, onBook }: ServiceCarouselProps) {
  if (services.length === 0) return null;

  return (
    <section className="pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-[30px]">
            Most-Requested Services in {cityName}
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Real pricing, real availability — book in under a minute.
          </p>
        </div>

        <div className="no-scrollbar flex snap-x gap-4.5 overflow-x-auto pb-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="relative w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-md"
            >
              {svc.badgeLabel && (
                <div className="absolute left-2.5 top-2.5 z-10">
                  <PromoBadge label={svc.badgeLabel} tone="light" />
                </div>
              )}
              <div className="aspect-[4/3] overflow-hidden">
                <AdaptiveImage
                  src={svc.imageSrc}
                  alt={svc.imageAlt}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-[15px] font-semibold leading-tight">{svc.name}</h3>
                <div className="my-2 flex items-baseline gap-2">
                  <span className="text-[19px] font-extrabold text-primary">{svc.nowPrice}</span>
                </div>
                {svc.note && <p className="mb-3 text-[11.5px] font-semibold text-secondary">{svc.note}</p>}
                <button
                  type="button"
                  onClick={() => onBook(svc.id)}
                  className="w-full rounded-lg bg-primary py-2.5 text-[13.5px] font-bold text-white transition hover:brightness-110"
                >
                  Book This
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
