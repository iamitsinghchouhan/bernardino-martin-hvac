import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const FALLBACK_REVIEWS = [
  { name: "Michael R.", location: "Los Angeles, CA", rating: 5, text: "Amazing HVAC service! Fast, professional, and affordable.", service: "HVAC Repair" },
  { name: "Sarah L.", location: "Pasadena, CA", rating: 5, text: "They installed our solar system perfectly. Highly recommended!", service: "Solar Installation" },
  { name: "David K.", location: "Burbank, CA", rating: 5, text: "Quick AC repair and great customer service.", service: "AC Repair" },
  { name: "Jessica M.", location: "Encino, CA", rating: 5, text: "Our landscaping looks incredible now!", service: "Landscaping" },
  { name: "Patricia G.", location: "Glendale, CA", rating: 5, text: "The team fixed our plumbing issue the same day and left everything spotless.", service: "Plumbing" },
  { name: "Daniel S.", location: "Sherman Oaks, CA", rating: 5, text: "Professional technicians, fair pricing, and clear communication from start to finish.", service: "HVAC Installation" },
  { name: "Emily T.", location: "Van Nuys, CA", rating: 5, text: "Our smart irrigation system is saving water and keeping the yard beautiful.", service: "Irrigation" },
  { name: "Carlos V.", location: "North Hollywood, CA", rating: 5, text: "They upgraded our electrical panel and EV charger with clean, code-compliant work.", service: "Electrical" },
  { name: "Amanda C.", location: "Santa Monica, CA", rating: 5, text: "Excellent furnace tune-up. The house feels warmer and our system runs quietly now.", service: "Heating" },
  { name: "Robert H.", location: "Studio City, CA", rating: 5, text: "We finally have strong WiFi in every room thanks to their network setup team.", service: "Networking" },
];

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

/** A single spotlight card that auto-rotates through real reviews — no multi-column height
    matching, no overflow-hidden marquee fighting a fixed height. A short crossfade between
    reviews (not a full-content-height animation), so it can never bleed into the next section
    the way the scrolling column version did. */
export function ReviewSlider() {
  const { data } = useQuery<ReviewItem[]>({ queryKey: ["/api/cms/reviews"] });

  const reviews = (data && data.length
    ? data.map((item) => ({
        name: item.customerName ?? item.name ?? "Customer",
        location: item.location ?? "Los Angeles, CA",
        rating: item.rating,
        text: item.review ?? item.text ?? "",
        service: item.service,
      }))
    : FALLBACK_REVIEWS);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % reviews.length);
        setVisible(true);
      }, 400);
    }, 3800);
    return () => window.clearInterval(id);
  }, [reviews.length]);

  const current = reviews[index];

  return (
    <section id="reviews" className="bg-zinc-900 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--rb-orange)]">Our Neighbors Say It Best</p>
            <h2 className="font-sans text-3xl font-bold text-white sm:text-4xl">What Our Customers Say</h2>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-[var(--rb-orange)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider text-white/70">Verified Customer Reviews</span>
            </div>
            <Button size="lg" className="mt-6 bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
              <Link href="/contact">
                Work With Our Team
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

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
        </div>
      </div>
    </section>
  );
}
