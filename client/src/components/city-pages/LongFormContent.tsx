import { useState } from "react";

/** The bottom-of-page collapsible SEO block — presents the existing localLife + seasonalNotes
    content (already written per city) with real H3 subheadings, clipped with a "Read more"
    expand. Presentation wrapper only — content comes entirely from props. */
type LongFormContentProps = {
  cityName: string;
  nature: string;
  community: string;
  howWeHelp: string;
  seasonalNotes: { season: string; focus: string }[];
  servicesByCategory: string;
};

export function LongFormContent({
  cityName,
  nature,
  community,
  howWeHelp,
  seasonalNotes,
  servicesByCategory,
}: LongFormContentProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <h2 className="mb-4 font-heading text-2xl font-bold text-primary md:text-[28px]">
          Life in {cityName} — HVAC, Solar &amp; More
        </h2>

        <div
          className={`relative overflow-hidden transition-[max-height] duration-300 ${
            expanded ? "max-h-none" : "max-h-[260px]"
          }`}
        >
          <p className="mb-2.5 text-[14.5px] text-muted-foreground">{nature}</p>

          <h3 className="mb-2.5 mt-5 text-lg font-semibold text-primary">Who we serve</h3>
          <p className="mb-2.5 text-[14.5px] text-muted-foreground">{community}</p>

          <h3 className="mb-2.5 mt-5 text-lg font-semibold text-primary">How we help</h3>
          <p className="mb-2.5 text-[14.5px] text-muted-foreground">{howWeHelp}</p>

          {seasonalNotes.length > 0 && (
            <>
              <h3 className="mb-2.5 mt-5 text-lg font-semibold text-primary">Seasonal notes</h3>
              <ul className="list-disc pl-5">
                {seasonalNotes.map((note) => (
                  <li key={note.season} className="mb-2.5 text-[14.5px] text-muted-foreground">
                    <strong>{note.season}</strong> — {note.focus}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3 className="mb-2.5 mt-5 text-lg font-semibold text-primary">Services by category</h3>
          <p className="mb-2.5 text-[14.5px] text-muted-foreground">{servicesByCategory}</p>

          {!expanded && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"
            />
          )}
        </div>

        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-4 rounded-lg border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
          >
            Read More
          </button>
        )}
      </div>
    </section>
  );
}
