import { PROMOS } from "@/lib/constants";
import { PromoBadge } from "@/components/city-pages/PromoBadge";
import { Button } from "@/components/ui/button";

type CityCurrentOffersProps = {
  cityName: string;
  /** Opens the shared quick-quote widget, no service forced — these offers span diagnostics,
      repairs, and tune-ups, so the visitor picks what applies. */
  onOpenQuote?: (serviceId?: string) => void;
};

/** Real, currently-honored offers (client/src/lib/constants.ts PROMOS), surfaced through the same
    PromoBadge component used for the hero's trust badges — one badge system, not a one-off. No
    countdown timer, no scarcity copy, no invented expiry date: if PROMOS is ever empty, this
    section renders nothing rather than force a claim. */
export function CityCurrentOffers({ cityName, onOpenQuote }: CityCurrentOffersProps) {
  if (PROMOS.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Current Offers</p>
            <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-4xl">
              Offers for {cityName} Homeowners
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
            {PROMOS.map((promo) => (
              <div
                key={promo.code}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <PromoBadge label={promo.title} tone="light" />
                <p className="mt-4 text-sm font-semibold text-slate-900">{promo.description}</p>
                {promo.sub && <p className="mt-1 text-xs text-slate-500">{promo.sub}</p>}
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  Code: {promo.code}
                </p>
                <Button
                  variant="outline"
                  className="mt-auto w-fit"
                  onClick={() => onOpenQuote?.()}
                >
                  Redeem This Offer
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
