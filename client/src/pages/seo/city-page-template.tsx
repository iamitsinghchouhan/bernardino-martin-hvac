import { useMemo, useState } from "react";
import CityPageHero from "@/components/city-pages/CityPageHero";
import { LandmarkSpotlight } from "@/components/city-pages/LandmarkSpotlight";
import { CityGalleryShowcase } from "@/components/city-pages/CityGalleryShowcase";
import { CityServicesShowcase } from "@/components/city-pages/CityServicesShowcase";
import { CityQuickQuoteWidget } from "@/components/city-pages/CityQuickQuoteWidget";
import { CityMobileStickyBar } from "@/components/city-pages/CityMobileStickyBar";
import InternalCityLinks from "@/components/city-pages/InternalCityLinks";
import ServiceSlider from "@/components/ServiceSlider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { getCityBreadcrumbSchema } from "@/components/city-pages/CityBreadcrumb";
import { ImageLightbox, type LightboxImage } from "@/components/image-lightbox";
import allCities from "@/data/cities/all-cities";
import type { CityData } from "@/data/cities/types";
import { MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

type CityPageTemplateProps = {
  cityData: CityData;
  /** Pilot redesign opt-in — defaults to false so every other city page renders exactly as it
      does today until individually approved and flipped on. Only hvac-inglewood.tsx passes this. */
  redesign?: boolean;
  /** Visual redesign V2 opt-in — full-bleed hero, inline quick-quote widget, mobile sticky bar.
      Independent of `redesign`; defaults to false everywhere except the pilot cities. */
  redesignV2?: boolean;
  headline?: { eyebrow: string; title: string };
  statement?: string;
};

const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: "1858 West 83rd Street",
  addressLocality: "Los Angeles",
  addressRegion: "CA",
  postalCode: "90047",
  addressCountry: "US",
};

export default function CityPageTemplate({ cityData, redesign = false, redesignV2 = false, headline, statement }: CityPageTemplateProps) {
  const canonical = `https://bernardinomartinhvac.com/${cityData.slug}`;
  const image = `/images/cities/${cityData.imageFile}`;
  const phoneHref = `tel:${cityData.localPhone.replace(/\D/g, "")}`;

  // Shared between the hero's "Book Now" CTA and the mobile sticky bar's "Book Now" button, so
  // both open the exact same quick-quote widget instance rather than each owning a separate copy.
  const [quoteOpen, setQuoteOpen] = useState(false);

  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);
  function openLightbox(images: LightboxImage[], index: number) {
    setLightbox({ images, index });
  }

  // Every distinct location photo for this city, landmark first, de-duplicated by src — the
  // landmark photo, galleryImages[0], and the hero image are the same file by convention, so
  // without this a visitor could see the identical photo rendered 3 times on one page.
  const locationPhotos: LightboxImage[] = useMemo(() => {
    const seen = new Set<string>();
    const list: LightboxImage[] = [];
    if (cityData.landmarkPhoto) {
      list.push({ src: cityData.landmarkPhoto.src, alt: cityData.landmarkPhoto.alt });
      seen.add(cityData.landmarkPhoto.src);
    }
    (cityData.galleryImages ?? []).forEach((src) => {
      if (seen.has(src)) return;
      seen.add(src);
      list.push({ src, alt: `Bernardino Martin on the job in ${cityData.city}` });
    });
    return list;
  }, [cityData]);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `Bernardino Martin HVAC - ${cityData.city}`,
      image: `https://bernardinomartinhvac.com${image}`,
      description: cityData.description,
      telephone: cityData.localPhone,
      address: businessAddress,
      url: canonical,
      areaServed: {
        "@type": "City",
        name: cityData.city,
      },
      serviceType: [
        "HVAC Repair",
        "Air Conditioning Installation",
        "Heating Service",
        "HVAC Maintenance",
      ],
      priceRange: "$$",
    },
    getCityBreadcrumbSchema(cityData.city, `/${cityData.slug}`),
  ];

  return (
    <Layout>
      <SEO
        title={`HVAC Services in ${cityData.city}, CA | Bernardino Martin`}
        description={cityData.metaDescription}
        keywords={cityData.metaKeywords}
        canonical={canonical}
        image={image}
        structuredData={structuredData}
      />

      <CityPageHero
        cityData={cityData}
        redesign={redesign}
        redesignV2={redesignV2}
        headline={headline}
        statement={statement}
        onOpenQuote={() => setQuoteOpen(true)}
      />

      <LandmarkSpotlight
        landmarkPhoto={cityData.landmarkPhoto}
        onImageClick={locationPhotos.length > 0 ? () => openLightbox(locationPhotos, 0) : undefined}
      />

      {redesign ? (
        <CityGalleryShowcase
          cityName={cityData.city}
          images={locationPhotos.slice(1)}
          onImageClick={(i) => openLightbox(locationPhotos, i + 1)}
        />
      ) : (
        cityData.galleryImages && cityData.galleryImages.length > 0 && (
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">On the Job</p>
                  <h2 className="mt-3 text-3xl font-heading font-bold text-slate-950 md:text-4xl">
                    Real Work in {cityData.city}
                  </h2>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cityData.galleryImages.map((src, i) => (
                    <div key={src} className="aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
                      <img
                        src={src}
                        alt={`Bernardino Martin technicians on a service call in ${cityData.city}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      )}

      {redesign && (
        <section className="bg-slate-950 py-24 text-white">
          <div className="container mx-auto px-4 text-center" data-aos="zoom-in">
            <p className="text-display mx-auto max-w-4xl text-3xl md:text-5xl">
              {statement ?? "Real work. Honest pricing. Quality results."}
            </p>
          </div>
        </section>
      )}

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {redesign ? (
              <div data-aos="fade-up">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{headline?.eyebrow ?? cityData.region}</p>
                <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-5xl">
                  {headline?.title ?? `HVAC Services in ${cityData.city}`}
                </h2>
              </div>
            ) : (
              <h2 className="text-3xl font-heading font-bold text-slate-950 md:text-4xl">
                HVAC Services in {cityData.city}
              </h2>
            )}
            <p className="mt-5 text-lg leading-8 text-slate-700">
              {cityData.description}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3" data-aos={redesign ? "fade-up" : undefined} data-aos-delay={redesign ? "100" : undefined}>
              <div className={`rounded-2xl bg-slate-50 p-5 ${redesign ? "transition-all hover:-translate-y-0.5 hover:shadow-lg" : ""}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Population</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{cityData.population}</p>
              </div>
              <div className={`rounded-2xl bg-slate-50 p-5 ${redesign ? "transition-all hover:-translate-y-0.5 hover:shadow-lg" : ""}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Climate</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{cityData.climate}</p>
              </div>
              <div className={`rounded-2xl bg-slate-50 p-5 ${redesign ? "transition-all hover:-translate-y-0.5 hover:shadow-lg" : ""}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Response Time</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{cityData.responseTime}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr,0.85fr]" data-aos={redesign ? "fade-up" : undefined} data-aos-delay={redesign ? "150" : undefined}>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-slate-900">Neighborhoods and ZIP codes we cover</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cityData.serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cityData.zipCodes.map((zipCode) => (
                    <span
                      key={zipCode}
                      className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"
                    >
                      {zipCode}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Local details that matter</h3>
                <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
                  {cityData.notableLandmarks.map((landmark) => (
                    <li key={landmark} className={`flex items-start gap-3 ${redesign ? "-mx-2 rounded-lg px-2 transition-colors hover:bg-slate-50" : ""}`}>
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{landmark}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cityData.localLife && (
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="max-w-2xl" data-aos="fade-up">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Local Life</p>
                <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-4xl">
                  Life in {cityData.city}
                </h2>
              </div>
              <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
                <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">The Landscape</h3>
                    <p className="mt-3 text-base leading-7 text-slate-700">{cityData.localLife.nature}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">The Community</h3>
                    <p className="mt-3 text-base leading-7 text-slate-700">{cityData.localLife.community}</p>
                  </div>
                </div>
                <div
                  className="flex items-center rounded-3xl bg-slate-950 p-8 text-white"
                  data-aos="zoom-in"
                  data-aos-delay="150"
                >
                  <p className="text-display text-xl leading-9 md:text-2xl">
                    {cityData.localLife.howWeHelp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CityServicesShowcase
        cityName={cityData.city}
        climateLabel={cityData.climate}
        commonServices={cityData.commonServices}
        redesign={redesign}
      />

      {!redesign && <ServiceSlider />}

      {cityData.seasonalNotes && cityData.seasonalNotes.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="max-w-2xl" data-aos="fade-up">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Plan Ahead</p>
                <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-4xl">
                  Seasonal in {cityData.city}
                </h2>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2" data-aos="fade-up" data-aos-delay="100">
                {cityData.seasonalNotes.map((note) => (
                  <div
                    key={note.season}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{note.season}</p>
                    <p className="mt-2 text-base leading-7 text-slate-700">{note.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-gradient-to-r from-primary to-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center" data-aos={redesign ? "zoom-in" : undefined}>
            {redesign ? (
              <h2 className="text-display text-4xl md:text-6xl">
                Ready for professional HVAC service in {cityData.city}?
              </h2>
            ) : (
              <h2 className="text-3xl font-heading font-bold md:text-4xl">
                Ready for professional HVAC service in {cityData.city}?
              </h2>
            )}
            <p className="mt-4 text-lg leading-8 text-slate-100">
              Call us today for a free quote. We help homes in {cityData.city} with repairs, replacements, tune-ups, and honest recommendations built around the property.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-white font-semibold text-primary hover:bg-slate-100" asChild>
                <a href={phoneHref}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild>
                <Link href={`/booking?city=${encodeURIComponent(cityData.city)}`}>
                  Schedule Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <InternalCityLinks currentCity={cityData} allCities={allCities} />

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {redesignV2 && (
        <>
          <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogTitle>Get Your Free Quote in {cityData.city}</DialogTitle>
              <CityQuickQuoteWidget
                cityName={cityData.city}
                commonServices={cityData.commonServices}
                onSubmitted={() => setQuoteOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <CityMobileStickyBar phoneHref={phoneHref} onBookNow={() => setQuoteOpen(true)} />
        </>
      )}
    </Layout>
  );
}
