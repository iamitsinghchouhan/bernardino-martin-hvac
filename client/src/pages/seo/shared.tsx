import { Button } from "@/components/ui/button";
import { COMPANY_PHONE } from "@/lib/constants";
import {
  Check,
  Clock,
  MapPin,
  Phone,
  Shield,
  Star,
} from "lucide-react";
import { Link } from "wouter";

export type SeoLink = {
  href: string;
  label: string;
};

type WhyChooseItem = {
  icon: typeof Shield;
  title: string;
  description: string;
};

const defaultWhyChooseItems: WhyChooseItem[] = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description:
      "Our team completes every project with professional standards, clean workmanship, and full respect for your home.",
  },
  {
    icon: Clock,
    title: "Same-Day Service",
    description:
      "We move quickly when comfort, safety, or system downtime is affecting your day.",
  },
  {
    icon: Star,
    title: "All Brands Serviced",
    description:
      "We work on major residential and light commercial equipment from established manufacturers across Los Angeles.",
  },
  {
    icon: Phone,
    title: "Upfront Pricing",
    description:
      "Clear recommendations and transparent pricing help you make confident decisions before work begins.",
  },
];

export const losAngelesAreas: SeoLink[] = [
  { href: "/service-areas", label: "Hollywood" },
  { href: "/service-areas", label: "Silver Lake" },
  { href: "/service-areas", label: "Echo Park" },
  { href: "/service-areas", label: "Koreatown" },
  { href: "/service-areas", label: "Mid-Wilshire" },
  { href: "/service-areas", label: "Westwood" },
  { href: "/service-areas", label: "Brentwood" },
  { href: "/service-areas", label: "Santa Monica" },
  { href: "/service-areas", label: "Culver City" },
  { href: "/service-areas", label: "Inglewood" },
  { href: "/hvac-glendale", label: "Glendale" },
  { href: "/hvac-burbank", label: "Burbank" },
  { href: "/hvac-pasadena", label: "Pasadena" },
  { href: "/service-areas", label: "San Fernando Valley" },
  { href: "/service-areas", label: "North Hollywood" },
  { href: "/service-areas", label: "Van Nuys" },
  { href: "/service-areas", label: "Chatsworth" },
  { href: "/service-areas", label: "Woodland Hills" },
  { href: "/service-areas", label: "Calabasas" },
];

export function SeoHero({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-gradient-to-br from-primary via-blue-700 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em]">
            {badge}
          </div>
          <h1 className="mt-6 text-4xl font-heading font-black leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-slate-100"
              asChild
            >
              <a href="tel:+18184000227">
                <Phone className="mr-2 h-5 w-5" />
                Call {COMPANY_PHONE}
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10"
              asChild
            >
              <Link href="/booking">Book Online</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeoIntro({
  paragraphs,
}: {
  paragraphs: [string, string, string];
}) {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-6 text-base leading-8 text-slate-700 md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SeoServicesList({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <section className="bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-slate-900 md:text-4xl">
            {heading}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-slate-700">
                  <strong className="font-semibold text-slate-900">{item}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeoWhyChoose({
  heading,
  items = defaultWhyChooseItems,
}: {
  heading: string;
  items?: WhyChooseItem[];
}) {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-slate-900 md:text-4xl">
            {heading}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeoServiceAreas({
  heading,
  areas,
}: {
  heading: string;
  areas: SeoLink[];
}) {
  return (
    <section className="bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-slate-900 md:text-4xl">
            {heading}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={`${area.href}-${area.label}`}
                href={area.href}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 transition-colors hover:border-primary/30 hover:text-primary"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{area.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SeoRelatedLinks({
  heading = "Helpful Local Links",
  links,
}: {
  heading?: string;
  links: SeoLink[];
}) {
  return (
    <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-xl font-semibold text-slate-900">{heading}</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SeoCtaBanner({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-blue-900/20 p-8 text-center ring-1 ring-white/15 md:p-12">
          <h2 className="text-3xl font-heading font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-slate-100">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-slate-100"
              asChild
            >
              <a href="tel:+18184000227">Call Now</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10"
              asChild
            >
              <Link href="/booking">Book Online</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CityBreadcrumb({ city }: { city: string }) {
  return (
    <div className="mb-6 text-sm font-medium text-slate-200">
      <Link href="/hvac-los-angeles" className="hover:text-white">
        Los Angeles
      </Link>
      <span className="mx-2 text-slate-300">{">"}</span>
      <span>{city}</span>
    </div>
  );
}

export function CityProblems({
  city,
  problems,
}: {
  city: string;
  problems: Array<{ title: string; description: string }>;
}) {
  return (
    <section className="bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-heading font-bold text-slate-900 md:text-4xl">
            Common HVAC Problems in {city} Homes
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {problem.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {problem.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
