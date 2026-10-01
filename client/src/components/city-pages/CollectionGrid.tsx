import { AdaptiveImage } from "@/components/services/AdaptiveImage";

/** "Popular in {city}" — larger photo cards for this city's real commonServices. Distinct from
    ServiceTileGrid (full catalog, small tiles): this highlights the handful of services this
    specific city actually calls for most. */
export type CollectionCard = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type CollectionGridProps = {
  cityName: string;
  cards: CollectionCard[];
};

export function CollectionGrid({ cityName, cards }: CollectionGridProps) {
  if (cards.length === 0) return null;

  return (
    <section className="pb-16 md:pb-20">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-[30px]">
            Popular in {cityName}
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            What homeowners here book most.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-md"
            >
              <AdaptiveImage
                src={card.imageSrc}
                alt={card.imageAlt}
                className="absolute inset-0 h-full w-full"
                imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <h3 className="text-[17px] font-semibold">{card.title}</h3>
                <p className="text-xs text-white/85">{card.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
