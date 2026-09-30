import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CityData } from "@/data/cities/types";

type CityFAQProps = {
  cityData: CityData;
  /** The genuinely-local Q&A(s) for this city, drawn from its already-approved localLife content
      — e.g. Malibu's salt-air question. Kept small (the doc: "2-3 genuinely local ones, not 6")
      and passed in per city rather than authored generically, so nothing here is a city-name
      swapped into a template question. */
  localFaqs?: { q: string; a: string }[];
};

/** City FAQ — same visual/interaction pattern as the homepage's own FAQ accordion (custom
    toggle, not the shadcn Accordion primitive, to stay visually consistent with what's already
    shipped and seen by real visitors). Assembles: one question genuinely answered from this
    city's real responseTime, two shared factual questions matching the site's existing,
    already-true answers (24/7 emergency, real business hours), a general-but-real permits answer
    (matching the honest, already-live copy in service-detail/heating-furnace-replacement.tsx —
    not a city-specific permit claim that isn't backed by anything), then any locally-written
    questions passed in. */
export function CityFAQ({ cityData, localFaqs = [] }: CityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: { q: string; a: string }[] = [
    {
      q: `How fast can you get to ${cityData.city}?`,
      a: `Typical response time in ${cityData.city} is ${cityData.responseTime.toLowerCase()} for standard requests, faster for emergencies. Call us and we'll give you a real estimate for your specific address.`,
    },
    ...localFaqs,
    {
      q: `Do you offer emergency service in ${cityData.city}?`,
      a: `Yes — we offer 24/7 emergency service for urgent HVAC and plumbing issues in ${cityData.city}, nights and weekends included.`,
    },
    {
      q: `What are your service hours in ${cityData.city}?`,
      a: "We're available Monday through Saturday, 7AM–8PM, for scheduled service, with 24/7 emergency coverage on top of that.",
    },
    {
      q: `Do you handle permits for work in ${cityData.city}?`,
      a: "When a job requires a permit, we handle the entire process on your behalf — submitting the application, scheduling the required inspection, and keeping the job open until it's signed off.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center" data-aos="fade-up">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">Good to Know</p>
            <h2 className="text-display text-3xl text-slate-950 md:text-4xl">
              {cityData.city} Questions, Answered
            </h2>
          </div>
          <div className="space-y-3" data-aos="fade-up" data-aos-delay="100">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="text-sm font-bold text-slate-900 sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openIndex === i && (
                  <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
