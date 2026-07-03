import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";

const FALLBACK_REVIEWS = [
  {
    name: "Michael R.",
    rating: 5,
    text: "Amazing HVAC service! Fast, professional, and affordable.",
    service: "HVAC Repair",
  },
  {
    name: "Sarah L.",
    rating: 5,
    text: "They installed our solar system perfectly. Highly recommended!",
    service: "Solar Installation",
  },
  {
    name: "David K.",
    rating: 5,
    text: "Quick AC repair and great customer service.",
    service: "AC Repair",
  },
  {
    name: "Jessica M.",
    rating: 5,
    text: "Our landscaping looks incredible now!",
    service: "Landscaping",
  },
  {
    name: "Patricia G.",
    rating: 5,
    text: "The team fixed our plumbing issue the same day and left everything spotless.",
    service: "Plumbing",
  },
  {
    name: "Daniel S.",
    rating: 5,
    text: "Professional technicians, fair pricing, and clear communication from start to finish.",
    service: "HVAC Installation",
  },
  {
    name: "Emily T.",
    rating: 5,
    text: "Our smart irrigation system is saving water and keeping the yard beautiful.",
    service: "Irrigation",
  },
  {
    name: "Carlos V.",
    rating: 5,
    text: "They upgraded our electrical panel and EV charger with clean, code-compliant work.",
    service: "Electrical",
  },
  {
    name: "Amanda C.",
    rating: 5,
    text: "Excellent furnace tune-up. The house feels warmer and our system runs quietly now.",
    service: "Heating",
  },
  {
    name: "Robert H.",
    rating: 5,
    text: "We finally have strong WiFi in every room thanks to their network setup team.",
    service: "Networking",
  },
  {
    name: "Melissa J.",
    rating: 5,
    text: "Very responsive and respectful crew. They explained every option before starting.",
    service: "Home Services",
  },
  {
    name: "Kevin P.",
    rating: 5,
    text: "Our new mini-split works perfectly and the install was incredibly clean.",
    service: "Mini-Split",
  },
  {
    name: "Nadia W.",
    rating: 5,
    text: "The outdoor lighting and planting design made our whole front yard feel elevated.",
    service: "Outdoor Design",
  },
  {
    name: "Brian D.",
    rating: 5,
    text: "Same-day service really meant same-day. They showed up fast and solved the issue.",
    service: "Emergency HVAC",
  },
  {
    name: "Sophia E.",
    rating: 5,
    text: "Great people, beautiful craftsmanship, and everything was completed on schedule.",
    service: "Project Installation",
  },
  {
    name: "Jonathan A.",
    rating: 5,
    text: "Our energy bills dropped after the HVAC optimization work. Worth every penny.",
    service: "Optimization",
  },
  {
    name: "Linda F.",
    rating: 5,
    text: "The quote was honest, the workmanship was excellent, and there were no surprises.",
    service: "Estimate & Install",
  },
  {
    name: "Ethan B.",
    rating: 5,
    text: "They transformed an unused backyard corner into a polished, relaxing garden area.",
    service: "Garden Bed Design",
  },
  {
    name: "Grace N.",
    rating: 5,
    text: "We trust Bernardino Martin for every major home system now. Reliable and skilled.",
    service: "Full-Service Home Care",
  },
  {
    name: "Mark Y.",
    rating: 5,
    text: "From consultation to final walkthrough, the whole experience felt premium.",
    service: "Customer Experience",
  },
];

type ReviewItem = {
  id?: number;
  customerName?: string;
  name?: string;
  rating: number;
  review?: string;
  text?: string;
  service: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ReviewSlider() {
  const { data } = useQuery<ReviewItem[]>({
    queryKey: ["/api/cms/reviews"],
  });

  const reviews = (data && data.length
    ? data.map((item) => ({
        name: item.customerName ?? item.name ?? "Customer",
        rating: item.rating,
        text: item.review ?? item.text ?? "",
        service: item.service,
      }))
    : FALLBACK_REVIEWS);

  const loopedReviews = [...reviews, ...reviews];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <style>{`
        @keyframes review-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
            <img
              src="/images/google-logo.png"
              alt="Google logo"
              loading="lazy"
              decoding="async"
              className="h-5 w-auto"
            />
            <span>Verified Reviews</span>
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl font-heading font-bold text-slate-900">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Real feedback from homeowners across Los Angeles who trust us for comfort, efficiency, and quality work.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent md:w-24" />

          <div className="group overflow-hidden">
            <div
              className="flex w-max gap-5 py-2 group-hover:[animation-play-state:paused]"
              style={{
                animation: `review-marquee ${reviews.length * 3}s linear infinite`,
              }}
            >
              {loopedReviews.map((review, index) => (
                <article
                  key={`${review.name}-${index}`}
                  className="w-[280px] shrink-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl md:w-[340px]"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 via-white to-emerald-100 text-sm font-bold text-slate-700">
                        {initials(review.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{review.name}</p>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-600">
                          {review.service}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                      <img
                        src="/images/google-logo.png"
                        alt="Google logo"
                        loading="lazy"
                        decoding="async"
                        className="h-4 w-auto"
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm leading-7 text-slate-600">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
