import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ExternalLink, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// Real, verified against the business's own Google Business Profile (screenshot confirmed
// earlier: 5.0, 17 reviews). Update these two values if the real figures change — never invent
// individual reviews below when the CMS has none; see the no-real-reviews-yet state further down.
const REAL_RATING = 5.0;
const REAL_REVIEW_COUNT = 17;
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Bernardino+Martin+HVAC";

type ReviewItem = {
  id?: number;
  customerName?: string;
  name?: string;
  rating: number;
  review?: string;
  text?: string;
  service: string;
  location?: string;
};

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

/** A single spotlight card that auto-rotates through real CMS reviews once the business has
    entered any — no multi-column height matching, no overflow-hidden marquee fighting a fixed
    height. A short crossfade between reviews (not a full-content-height animation), so it can
    never bleed into the next section the way the scrolling column version did.

    There is no fallback of invented reviews here on purpose: the CMS reviews table is currently
    empty (nobody has entered real customer reviews yet), and presenting fabricated names/quotes
    as "Verified Customer Reviews" is exactly the kind of manufactured social proof the FTC's
    rules on fake reviews prohibit. Until real reviews exist, this shows the real, verified
    aggregate rating from the business's own Google Business Profile instead — true today, and
    it costs nothing to update the two constants above if that number changes. */
export function ReviewSlider() {
  const { data } = useQuery<ReviewItem[]>({ queryKey: ["/api/cms/reviews"] });
  const reviews = data ?? [];
  const hasRealReviews = reviews.length > 0;

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!hasRealReviews) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % reviews.length);
        setVisible(true);
      }, 400);
    }, 3800);
    return () => window.clearInterval(id);
  }, [hasRealReviews, reviews.length]);

  const current = hasRealReviews
    ? {
        name: reviews[index].customerName ?? reviews[index].name ?? "Customer",
        location: reviews[index].location ?? "Los Angeles, CA",
        rating: reviews[index].rating,
        text: reviews[index].review ?? reviews[index].text ?? "",
      }
    : null;

  return (
    <section id="reviews" className="bg-zinc-900 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">Our Neighbors Say It Best</p>
            <h2 className="font-sans text-3xl font-bold text-white sm:text-4xl">What Our Customers Say</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-0.5 text-[var(--rb-orange)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm font-bold text-white">{REAL_RATING.toFixed(1)} on Google</span>
              <span className="text-sm text-white/50">&bull;</span>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                {REAL_REVIEW_COUNT} Google Reviews
              </a>
            </div>
            <Button size="lg" className="mt-6 bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
              <Link href="/contact">
                Work With Our Team
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {hasRealReviews && current ? (
            <div
              className="rounded-2xl bg-white p-8 shadow-2xl transition-opacity duration-400"
              style={{ opacity: visible ? 1 : 0, minHeight: "230px" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 via-white to-blue-100 text-sm font-bold text-slate-700">
                  {initials(current.name)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{current.name}</p>
                  <p className="text-xs text-slate-500">{current.location}</p>
                </div>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-slate-800">&ldquo;{current.text}&rdquo;</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-400">Verified homeowner</span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center shadow-2xl" style={{ minHeight: "230px" }}>
              <div className="flex justify-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-8 w-8 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 text-4xl font-bold text-slate-900">{REAL_RATING.toFixed(1)}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">Based on {REAL_REVIEW_COUNT} Google reviews</p>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              >
                Read our reviews on Google
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
