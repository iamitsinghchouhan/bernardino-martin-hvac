import { useState, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import {
  Clock,
  DollarSign,
  Shield,
  Star,
  Check,
  Volume2,
  VolumeX,
  Phone,
  Calendar,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export interface RelatedService {
  name: string;
  slug: string;
}

export interface CityLink {
  city: string;
  slug: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface PatternOption {
  name: string;
  description: string;
}

export interface ServiceDetailTemplateProps {
  serviceName: string;
  slug: string;
  category: string;
  categoryColor: "blue" | "orange" | "amber" | "cyan" | "yellow" | "green" | "purple";
  heroVideo: string;
  heroImage: string;
  tagline: string;
  overview: string[];
  keyBenefits: string[];
  whatWeInclude: string[];
  duration: string;
  startingPrice: string;
  relatedServices: RelatedService[];
  cityLinks: CityLink[];
  faqs: FAQ[];
  /** Optional — for services with material/finish choices (e.g. stamped concrete integral colors). Renders a swatch grid after Key Benefits. */
  colorOptions?: ColorOption[];
  /** Optional — for services with texture/pattern choices (e.g. stamp mat patterns). Renders alongside colorOptions. */
  patternOptions?: PatternOption[];
}

const COLOR_MAP = {
  blue:   { bg: "bg-blue-600",   light: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200",   ring: "ring-blue-600"   },
  orange: { bg: "bg-orange-600", light: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", ring: "ring-orange-600" },
  amber:  { bg: "bg-amber-500",  light: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  ring: "ring-amber-500"  },
  cyan:   { bg: "bg-cyan-600",   light: "bg-cyan-50",   text: "text-cyan-700",   border: "border-cyan-200",   ring: "ring-cyan-600"   },
  yellow: { bg: "bg-yellow-500", light: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", ring: "ring-yellow-500" },
  green:  { bg: "bg-green-600",  light: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  ring: "ring-green-600"  },
  purple: { bg: "bg-purple-600", light: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", ring: "ring-purple-600" },
};

const ALL_CITY_LINKS: CityLink[] = [
  { city: "Los Angeles", slug: "hvac-los-angeles" },
  { city: "Burbank", slug: "hvac-burbank" },
  { city: "Glendale", slug: "hvac-glendale" },
  { city: "Pasadena", slug: "hvac-pasadena" },
  { city: "San Fernando Valley", slug: "hvac-san-fernando-valley" },
  { city: "Santa Monica", slug: "hvac-santa-monica" },
  { city: "Hollywood", slug: "hvac-hollywood" },
  { city: "North Hollywood", slug: "hvac-north-hollywood" },
  { city: "Van Nuys", slug: "hvac-van-nuys" },
  { city: "Chatsworth", slug: "hvac-chatsworth" },
  { city: "Northridge", slug: "hvac-northridge" },
  { city: "Reseda", slug: "hvac-reseda" },
  { city: "Canoga Park", slug: "hvac-canoga-park" },
  { city: "Woodland Hills", slug: "hvac-woodland-hills" },
  { city: "Calabasas", slug: "hvac-calabasas" },
  { city: "Sherman Oaks", slug: "hvac-sherman-oaks" },
  { city: "Studio City", slug: "hvac-studio-city" },
  { city: "Encino", slug: "hvac-encino" },
  { city: "Tarzana", slug: "hvac-tarzana" },
  { city: "West Hills", slug: "hvac-west-hills" },
  { city: "Redondo Beach", slug: "hvac-redondo-beach" },
  { city: "Hermosa Beach", slug: "hvac-hermosa-beach" },
  { city: "Playa del Rey", slug: "hvac-playa-del-rey" },
  { city: "Inglewood", slug: "hvac-inglewood" },
  { city: "Culver City", slug: "hvac-culver-city" },
  { city: "Torrance", slug: "hvac-torrance" },
  { city: "Malibu", slug: "hvac-malibu" },
  { city: "Long Beach", slug: "hvac-long-beach" },
  { city: "Gardena", slug: "hvac-gardena" },
  { city: "Hawthorne", slug: "hvac-hawthorne" },
  { city: "Manhattan Beach", slug: "hvac-manhattan-beach" },
];

export function ServiceDetailTemplate({
  serviceName,
  slug,
  category,
  categoryColor,
  heroVideo,
  heroImage,
  tagline,
  overview,
  keyBenefits,
  whatWeInclude,
  duration,
  startingPrice,
  relatedServices,
  cityLinks,
  faqs,
  colorOptions,
  patternOptions,
}: ServiceDetailTemplateProps) {
  const [muted, setMuted] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const colors = COLOR_MAP[categoryColor];
  const displayCities = cityLinks.length > 0 ? cityLinks : ALL_CITY_LINKS;

  const seoTitle = `${serviceName} in Los Angeles, CA`;
  const seoDescription = `Professional ${serviceName} in Los Angeles. ${tagline}. Licensed & insured technicians. Same-day service available. Call (818) 400-0227.`;

  const SITE_URL = "https://bernardinomartinhvac.com";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceName,
      provider: {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#business`,
        name: "Bernardino Martin Home Services",
        telephone: "+18184000227",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
      areaServed: { "@type": "City", name: "Los Angeles" },
      description: seoDescription,
      url: `${SITE_URL}/services/${slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: serviceName, item: `${SITE_URL}/services/${slug}` },
      ],
    },
    ...(faqs.length > 0 ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    }] : []),
  ];

  function handleMuteToggle() {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroVideoRef.current.muted;
    }
    setMuted((prev) => !prev);
  }

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={`/services/${slug}`}
        structuredData={structuredData}
      />

      {/* ─── SECTION 1: HERO ─────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-slate-900" aria-label={`${serviceName} hero`}>
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted={muted}
          playsInline
          poster={heroImage}
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={`${serviceName} service video`}
        >
          <source src={heroVideo} type="video/mp4" />
          <track kind="captions" src="/captions.vtt" srcLang="en" label="English" default />
        </video>
        <div className="absolute inset-0 bg-slate-900/65" />

        <div className="relative z-10 w-full pb-16 pt-36 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /></li>
                <li className="text-white font-medium">{serviceName}</li>
              </ol>
            </nav>

            <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-3 ${colors.text} bg-white/15 backdrop-blur-sm w-fit px-3 py-1 rounded-full`}>
              {category}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-heading leading-tight">
              {serviceName}
            </h1>
            <p className="text-xl text-white/85 mb-8 max-w-2xl leading-relaxed">
              {tagline}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Clock className="h-4 w-4" aria-hidden="true" /> {duration}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                <DollarSign className="h-4 w-4" aria-hidden="true" /> {startingPrice}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Shield className="h-4 w-4" aria-hidden="true" /> Licensed &amp; Insured
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/booking?service=${slug}`}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition-colors"
              >
                <Calendar className="h-5 w-5" aria-hidden="true" /> Book Now
              </Link>
              <a
                href="tel:+18184000227"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition-colors"
              >
                <Phone className="h-5 w-5" aria-hidden="true" /> Call (818) 400-0227
              </a>
            </div>
          </div>
        </div>

        {/* Unmute toggle */}
        <button
          type="button"
          onClick={handleMuteToggle}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm px-4 py-2 text-white text-sm font-medium hover:bg-black/70 transition-colors"
        >
          {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
          <span>{muted ? "Sound Off" : "Sound On"}</span>
        </button>
      </section>

      {/* ─── SECTION 2: OVERVIEW ─────────────────────────────── */}
      <section id="overview" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left: text */}
            <div className="lg:col-span-2">
              <p className={`text-xs font-bold uppercase tracking-[0.3em] ${colors.text} mb-3`}>
                {category}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                About {serviceName}
              </h2>
              <div className="space-y-5">
                {overview.map((para, i) => (
                  <p key={i} className="text-base md:text-lg text-slate-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: info card */}
            <div className={`${colors.light} ${colors.border} border rounded-2xl p-6 sticky top-24`}>
              <h3 className="text-lg font-bold text-slate-900 mb-5">Service Details</h3>
              <div className="space-y-4 mb-6">
                {[
                  { Icon: Clock,       label: "Typical Duration", value: duration,           bg: colors.bg },
                  { Icon: DollarSign,  label: "Starting Price",   value: startingPrice,      bg: colors.bg },
                  { Icon: Shield,      label: "Certification",    value: "Licensed & Insured", bg: "bg-green-600" },
                  { Icon: Star,        label: "Rating",           value: "5-Star Rated",      bg: "bg-amber-500" },
                  { Icon: Check,       label: "Availability",     value: "Same-Day Available", bg: "bg-blue-600" },
                ].map(({ Icon, label, value, bg }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`${bg} p-2 rounded-lg shrink-0`}>
                      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{label}</p>
                      <p className="text-sm font-bold text-slate-900">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href={`/booking?service=${slug}`}
                className={`flex items-center justify-center gap-2 ${colors.bg} text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity w-full`}
              >
                <Calendar className="h-4 w-4" aria-hidden="true" /> Book Appointment
              </Link>
              <a
                href="tel:+18184000227"
                className="flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors w-full mt-3 text-sm"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> (818) 400-0227
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHAT'S INCLUDED ─────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What&apos;s Included</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Everything covered in every {serviceName} appointment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whatWeInclude.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="bg-green-100 p-1.5 rounded-full shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                </div>
                <span className="text-slate-700 text-sm font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: KEY BENEFITS ─────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Why Choose Us for {serviceName}
            </h2>
            <p className="text-slate-500 mt-2">Bernardino Martin — trusted by 5,000+ Los Angeles homeowners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {keyBenefits.map((benefit, i) => (
              <div key={i} className={`${colors.light} ${colors.border} border rounded-xl p-5 flex items-start gap-4`}>
                <div className={`${colors.bg} p-2.5 rounded-lg shrink-0 mt-0.5`}>
                  <Check className="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed text-sm md:text-base">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4.5: COLOR & PATTERN OPTIONS (only for services that have them) ─── */}
      {(colorOptions?.length || patternOptions?.length) ? (
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Color &amp; Pattern Options</h2>
              <p className="text-slate-500 mt-2 max-w-xl mx-auto">
                Every {serviceName.toLowerCase()} project is customized to your home. Here are the finishes most requested by Los Angeles homeowners.
              </p>
            </div>

            {colorOptions && colorOptions.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-bold text-slate-900 mb-5 text-center">Integral Colors</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
                  {colorOptions.map((c) => (
                    <div key={c.name} className="text-center">
                      <div
                        className="aspect-square rounded-xl border border-slate-200 shadow-sm mb-2"
                        style={{ backgroundColor: c.hex }}
                        role="img"
                        aria-label={`${c.name} color swatch`}
                      />
                      <p className="text-xs font-semibold text-slate-700">{c.name}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 text-center mt-5 max-w-lg mx-auto">
                  Swatches are a close approximation for planning — bring your final color choice to your on-site estimate, since cured concrete tone can vary slightly with mix and finish.
                </p>
              </div>
            )}

            {patternOptions && patternOptions.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-5 text-center">Stamp Patterns</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {patternOptions.map((p) => (
                    <div key={p.name} className="bg-white rounded-xl p-5 border border-slate-200">
                      <p className="font-bold text-slate-900 mb-1">{p.name}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* ─── SECTION 5: VIDEO SHOWCASE ───────────────────────── */}
      <section className="bg-slate-900 overflow-hidden" aria-label="Service video showcase">
        <div className="relative max-h-[55vh] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={heroImage}
            preload="none"
            className="w-full h-full object-cover"
            aria-label={`${serviceName} technicians at work`}
            style={{ minHeight: "320px", maxHeight: "55vh" }}
          >
            <source src={heroVideo} type="video/mp4" />
            <track kind="captions" src="/captions.vtt" srcLang="en" label="English" default />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
            <p className="text-white/75 text-sm px-6 pb-6 max-w-xl">
              Watch our {serviceName.toLowerCase()} technicians delivering top-quality service across Los Angeles
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: RELATED SERVICES ─────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
              You Might Also Need
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {relatedServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-primary/30 hover:shadow-md transition-all group block"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                    {svc.name}
                  </h3>
                  <span className="text-xs text-primary font-semibold flex items-center gap-1">
                    Learn More <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SECTION 7: CITY COVERAGE ────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Serving All of Los Angeles
            </h2>
            <p className="text-slate-500 mt-2">
              {serviceName} available throughout Greater Los Angeles
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {displayCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className={`${colors.light} ${colors.text} ${colors.border} border px-4 py-2 rounded-full text-sm font-semibold hover:shadow-sm transition-shadow`}
              >
                {city.city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FAQs ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-slate-900 text-sm md:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: FINAL CTA ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-blue-800 to-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book {serviceName}?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Same-day service available across Los Angeles. Licensed, insured, and 5-star rated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/booking?service=${slug}`}
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition-colors"
            >
              <Calendar className="h-5 w-5" aria-hidden="true" /> Book Now
            </Link>
            <a
              href="tel:+18184000227"
              className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/30 transition-colors"
            >
              <Phone className="h-5 w-5" aria-hidden="true" /> (818) 400-0227
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
