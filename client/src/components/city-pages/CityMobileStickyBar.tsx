import { Phone, Calendar } from "lucide-react";

type CityMobileStickyBarProps = {
  phoneHref: string;
  onBookNow: () => void;
};

/** Fixed to the bottom of the viewport, mobile only. Respects iOS safe-area insets and stays
    slim (a single row of compact buttons) so it never competes with the quick-quote dialog it
    opens — that renders in a centered Radix Dialog above everything, so there's no overlap to
    manage beyond keeping this bar itself short.

    `layout.tsx` also renders a sitewide floating "Call Now" pill (bottom-6 right-6, z-50) after
    scroll, on every page — it isn't scoped to redesignV2 pages so it can't be removed here. Its
    small corner footprint sits inside this bar's full-width bottom strip on mobile, so this bar's
    z-index must clear z-50 to make sure it — not the smaller, now-redundant pill underneath —
    wins pointer events in that shared region. */
export function CityMobileStickyBar({ phoneHref, onBookNow }: CityMobileStickyBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-60 flex gap-2 border-t border-slate-200 bg-white/95 px-3 pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <a
        href={phoneHref}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 py-3 text-sm font-bold text-primary"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call Now
      </a>
      <button
        type="button"
        onClick={onBookNow}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white"
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        Book Now
      </button>
    </div>
  );
}
