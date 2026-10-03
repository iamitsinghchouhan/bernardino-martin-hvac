import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type CityComfortClubProps = {
  cityName: string;
  /** Opens the shared quick-quote widget pre-selected to the real "hvac-maintenance" SERVICES
      entry — the same service the homepage's own "Join the Club" CTA routes to via
      /booking?service=hvac-maintenance. */
  onOpenQuote?: (serviceId?: string) => void;
};

/** City-page promo for the real, already-live Comfort Club plan (see client/src/pages/home.tsx,
    "COMFORT CLUB MEMBERSHIP" section) — same price, terms, and benefits, just reframed for this
    city. Nothing here is invented: $19/mo, $228/year billed annually, two tune-ups a year,
    priority emergency scheduling, 15% off repairs/parts. */
export function CityComfortClub({ cityName, onOpenQuote }: CityComfortClubProps) {
  return (
    <section className="bg-white py-16" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:flex-row">
          <div className="flex w-full flex-col justify-center bg-[var(--rb-green-text)] p-8 text-center text-white sm:w-2/5 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Comfort Club</p>
            <div className="mt-3 text-5xl font-black">
              $19<span className="text-lg font-medium text-white/60">/mo</span>
            </div>
            <p className="mt-2 text-xs text-white/50">Billed annually at $228/year</p>
            <Button
              className="mt-6 bg-[var(--rb-orange-dark)] font-semibold hover:bg-[var(--rb-orange-darker)]"
              onClick={() => onOpenQuote?.("hvac-maintenance")}
            >
              Join the Club
            </Button>
          </div>
          <div className="w-full p-8 sm:w-3/5 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Membership</p>
            <h3 className="mt-2 text-xl font-bold text-slate-950">
              {cityName} members skip the wait and save on every visit.
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                "Two tune-ups a year (Spring AC, Fall Heating)",
                "Priority scheduling for emergency service",
                "15% off all repairs and parts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
