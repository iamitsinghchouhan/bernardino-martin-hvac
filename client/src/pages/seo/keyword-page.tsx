import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { COMPANY_PHONE } from "@/lib/constants";
import {
  ArrowRight,
  Check,
  Clock3,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { Link } from "wouter";

export type KeywordImage = {
  src: string;
  alt: string;
};

export type KeywordPageData = {
  slug: string;
  title: string;
  metaDescription: string;
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: KeywordImage;
  introHeading: string;
  introParagraphs: [string, string, string];
  galleryHeading: string;
  galleryImages: KeywordImage[];
  systemsHeading: string;
  systemsIntro: string;
  systems: Array<{ title: string; description: string }>;
  inlineHeading: string;
  inlineBody: string;
  inlineImage: KeywordImage;
  servicesHeading: string;
  services: string[];
  trustHeading: string;
  trustPoints: Array<{ title: string; description: string }>;
  ctaHeading: string;
  ctaBody: string;
};

export function KeywordServicePage({ page }: { page: KeywordPageData }) {
  return (
    <Layout>
      <SEO title={page.title} description={page.metaDescription} />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${page.heroImage.src}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-blue-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(96,165,250,0.3),_transparent_35%)]" />
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-100">
              {page.heroLabel}
            </div>
            <h1 className="mt-6 text-4xl font-heading font-black leading-tight md:text-6xl">
              {page.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
              {page.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100" asChild>
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
                <Link href="/booking">
                  Book Online
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-8 shadow-sm md:p-10">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-heading font-bold text-slate-900 md:text-4xl">
                {page.introHeading}
              </h2>
              <div className="mt-6 space-y-6 text-base leading-8 text-slate-700 md:text-lg">
                {page.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Project Gallery
              </p>
              <h2 className="mt-3 text-3xl font-heading font-bold text-slate-900 md:text-4xl">
                {page.galleryHeading}
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {page.galleryImages.map((image, index) => (
                <article
                  key={`${image.src}-${index}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-6 text-slate-600">{image.alt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Systems
              </p>
              <h2 className="mt-3 text-3xl font-heading font-bold text-slate-900 md:text-4xl">
                {page.systemsHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                {page.systemsIntro}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {page.systems.map((system) => (
                  <div
                    key={system.title}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-3 text-primary">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {system.title}
                      </h3>
                    </div>
                    <p className="mt-4 leading-7 text-slate-600">
                      {system.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src={page.inlineImage.src}
                alt={page.inlineImage.alt}
                className="aspect-[5/6] h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <img
                src={page.inlineImage.src}
                alt={page.inlineImage.alt}
                className="aspect-[5/4] h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Built For Results
              </p>
              <h2 className="mt-3 text-3xl font-heading font-bold text-slate-900 md:text-4xl">
                {page.inlineHeading}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                {page.inlineBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Same-day scheduling available
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  Los Angeles service coverage
                </div>
                <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  Clean professional installs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm md:p-10">
            <h2 className="text-3xl font-heading font-bold text-slate-900 md:text-4xl">
              {page.servicesHeading}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.services.map((service) => (
                <div
                  key={service}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-base font-medium leading-7 text-slate-700">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
              Why Choose Us
            </p>
            <h2 className="mt-3 text-3xl font-heading font-bold md:text-4xl">
              {page.trustHeading}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {page.trustPoints.map((point, index) => {
                const icons = [ShieldCheck, Clock3, Star, Phone] as const;
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={point.title}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <div className="inline-flex rounded-2xl bg-white/10 p-3 text-sky-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{point.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">
                      {point.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-blue-900/20 p-8 text-center ring-1 ring-white/15 md:p-12">
            <h2 className="text-3xl font-heading font-bold md:text-5xl">
              {page.ctaHeading}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-100">
              {page.ctaBody}
            </p>
            <p className="mt-3 text-lg font-semibold text-white">Call 818-400-0227</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100" asChild>
                <a href="tel:+18184000227">Call 818-400-0227</a>
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
    </Layout>
  );
}
