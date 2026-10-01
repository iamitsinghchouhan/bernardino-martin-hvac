import { AdaptiveImage } from "@/components/services/AdaptiveImage";

/** "Services in {city}" — photo-forward tile grid with real starting prices, mirroring the
    "Shop by Room" pattern. `priceLabel` must come from the real SERVICES catalog — "Free
    Estimate" for any service without a confirmed price, never an invented number. */
export type ServiceTile = {
  name: string;
  meta: string;
  priceLabel: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type ServiceTileGridProps = {
  cityName: string;
  tiles: ServiceTile[];
};

export function ServiceTileGrid({ cityName, tiles }: ServiceTileGridProps) {
  if (tiles.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-[30px]">
            HVAC, Solar &amp; Plumbing Services in {cityName}
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Every trade this area needs, from one local team.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {tiles.map((tile) => (
            <a
              key={tile.name}
              href={tile.href}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <AdaptiveImage
                  src={tile.imageSrc}
                  alt={tile.imageAlt}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-3.5 pb-4 pt-3.5">
                <h3 className="text-[14.5px] font-semibold leading-tight">{tile.name}</h3>
                <p className="mt-0.5 text-[11.5px] text-muted-foreground">{tile.meta}</p>
                <p className="mt-1.5 text-xs font-bold text-secondary">{tile.priceLabel}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
