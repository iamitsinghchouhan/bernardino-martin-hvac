import { useState } from "react";
import type { CityData } from "@/data/cities/types";

type CitySeasonalTabsProps = {
  cityData: CityData;
};

/** redesignV2's visual treatment for "Seasonal in {city}" — the seasonalNotes copy itself is
    already written and approved per city; this only changes the presentation from a static card
    grid to a click-to-switch tab selector. Only renders tabs for seasons the city actually has
    data for (most cities have 2 of 4, not all 4) — no placeholder tabs for missing seasons. */
export function CitySeasonalTabs({ cityData }: CitySeasonalTabsProps) {
  const notes = cityData.seasonalNotes ?? [];
  const [active, setActive] = useState(0);

  if (notes.length === 0) return null;
  const current = notes[active] ?? notes[0];

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Plan Ahead</p>
            <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-4xl">
              Seasonal in {cityData.city}
            </h2>
          </div>

          <div className="mt-8 flex justify-center gap-2" data-aos="fade-up" data-aos-delay="100">
            {notes.map((note, i) => (
              <button
                key={note.season}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] transition-colors ${
                  i === active
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {note.season}
              </button>
            ))}
          </div>

          <div
            key={current.season}
            className="animate-in fade-in mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{current.season} in {cityData.city}</p>
            <p className="mt-3 text-lg leading-8 text-slate-700">{current.focus}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
