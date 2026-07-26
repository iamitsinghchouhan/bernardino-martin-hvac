import CityPageHero from "@/components/city-pages/CityPageHero";
import CityServices from "@/components/city-pages/CityServices";
import InternalCityLinks from "@/components/city-pages/InternalCityLinks";
import ServiceSlider from "@/components/ServiceSlider";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import allCities from "@/data/cities/all-cities";
import type { CityData } from "@/data/cities/types";
import { MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

type CityPageTemplateProps = {
  cityData: CityData;
};

const businessAddress = {
  "@type": "PostalAddress",
  streetAddress: "1858 West 83rd Street",
  addressLocality: "Los Angeles",
  addressRegion: "CA",
  postalCode: "90047",
  addressCountry: "US",
};

export default function CityPageTemplate({ cityData }: CityPageTemplateProps) {
  const canonical = `https://bernardinomartinhvac.com/${cityData.slug}`;
  const image = `/images/cities/${cityData.imageFile}`;
  const phoneHref = `tel:${cityData.localPhone.replace(/\D/g, "")}`;

  const structuredData = {
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
  };

  return (
    <Layout>
      <SEO
        title={`HVAC Services in ${cityData.city} - Bernardino Martin Heating & Cooling`}
        description={cityData.metaDescription}
        keywords={cityData.metaKeywords}
        canonical={canonical}
        image={image}
        structuredData={structuredData}
      />

      <CityPageHero cityData={cityData} />

      {cityData.galleryImages && cityData.galleryImages.length > 0 && (
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
      )}

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-heading font-bold text-slate-950 md:text-4xl">
              HVAC Services in {cityData.city}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              {cityData.description}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Population</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{cityData.population}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Climate</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{cityData.climate}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Response Time</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{cityData.responseTime}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
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
                    <li key={landmark} className="flex items-start gap-3">
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

      <CityServices cityData={cityData} />

      <ServiceSlider />

      <section className="bg-gradient-to-r from-primary to-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-heading font-bold md:text-4xl">
              Ready for professional HVAC service in {cityData.city}?
            </h2>
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
    </Layout>
  );
}
