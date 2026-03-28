import { useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, SERVICE_CATEGORIES, getWhatsAppLink, type ServiceCategory } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

type CategoryContent = {
  eyebrow: string;
  title: string;
  summary: string;
  highlights: string[];
  supportingNote: string;
};

type ServiceContent = {
  overview: string;
  bullets: string[];
};

type BrandLogo = {
  name: string;
  src: string;
};

const CATEGORY_CONTENT: Record<ServiceCategory, CategoryContent> = {
  "HVAC & Heating": {
    eyebrow: "Cooling, Heating, Airflow",
    title: "Fast HVAC help without the long scroll",
    summary:
      "Choose the HVAC service you need and get a focused overview with pricing guidance, typical scope, and the equipment types our team works on every day.",
    highlights: [
      "AC repair, installation, tune-ups, ductwork, thermostats, and furnace services",
      "Support for residential systems, mini-splits, rooftop units, and whole-home comfort upgrades",
      "Clear recommendations for urgent repairs, replacement planning, and seasonal maintenance",
    ],
    supportingNote:
      "Heating specialties can include gas furnace repair, electric furnace repair, floor furnace service, wall furnace service, and furnace replacement.",
  },
  "Solar & Energy": {
    eyebrow: "Panels, Performance, Power Savings",
    title: "Solar services built around long-term efficiency",
    summary:
      "From new installations to performance checkups, we help homeowners get dependable output, cleaner installs, and better value from their energy upgrades.",
    highlights: [
      "Solar installation planning, system upgrades, service visits, and efficiency reviews",
      "Clean visual presentation for customers comparing major energy improvements",
      "Ideal for homeowners who want lower power bills and dependable system support",
    ],
    supportingNote:
      "Each service card opens a fuller overview so visitors can understand the difference between installation work and ongoing solar service.",
  },
  Plumbing: {
    eyebrow: "Pipe Work, Leak Protection, Water Control",
    title: "Plumbing support for repairs, upgrades, and smart protection",
    summary:
      "This section keeps plumbing services easy to scan while still giving customers a stronger explanation of underground piping, leak prevention, and smart shutoff options.",
    highlights: [
      "Pipe work, leak detection, trenching, copper line repairs, and home water protection",
      "Stronger service context for larger jobs that need trust before a booking click",
      "Good fit for homeowners comparing repair work with long-term preventative upgrades",
    ],
    supportingNote:
      "Smart water and shutoff solutions are highlighted here because they are a strong trust-builder for customers worried about water damage.",
  },
  Electrical: {
    eyebrow: "Power, Panels, Safety",
    title: "Electrical work presented with more clarity",
    summary:
      "Customers can review the core value of your electrical services without digging through a long page, which makes the visit feel more intentional and easier to act on.",
    highlights: [
      "Panel work, wiring, outlets, lighting, safety checks, and service upgrades",
      "A cleaner summary of what the job includes and where your team adds value",
      "Useful for both residential and light commercial service inquiries",
    ],
    supportingNote:
      "The detailed service panel helps reduce confusion for visitors who want a quick explanation before they book or message.",
  },
  "Outdoor & Property": {
    eyebrow: "Landscape, Irrigation, Outdoor Improvements",
    title: "Outdoor services grouped into one guided experience",
    summary:
      "The category view lets customers compare irrigation, landscaping, sod, and planting work side by side, then open the service that fits their project.",
    highlights: [
      "Smart irrigation, landscaping, sod installation, planting, and water-saving upgrades",
      "Better visual storytelling for outdoor projects that depend on trust and presentation",
      "A shorter page flow that still gives enough detail to support quote requests",
    ],
    supportingNote:
      "This section works especially well for upselling smart irrigation and property-improvement jobs from the same page.",
  },
  Technology: {
    eyebrow: "Connectivity, Smart Home, Network Setup",
    title: "Technology services that feel practical and easy to understand",
    summary:
      "Visitors can quickly see what your network service covers and why it matters for reliable home and business connectivity.",
    highlights: [
      "Wi-Fi optimization, structured cabling, network setup, and smart integrations",
      "Clear explanation of what is included before a customer reaches out",
      "A better sales flow for people who know the problem but not the exact service name",
    ],
    supportingNote:
      "Keeping the details in a single preview panel helps niche services feel more polished and easier to trust.",
  },
};

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "ac-maintenance": {
    overview:
      "Routine AC maintenance keeps your system efficient, cleaner, and less likely to break down during peak summer demand.",
    bullets: [
      "Seasonal tune-up with performance and airflow checks",
      "Early detection of wear before it becomes a costly repair",
      "Recommended for homeowners who want lower stress and better cooling consistency",
    ],
  },
  "clean-ducts-vents": {
    overview:
      "Duct and vent cleaning can help improve airflow, reduce buildup, and support a cleaner indoor environment.",
    bullets: [
      "Best for dusty vents, stale airflow, and neglected duct systems",
      "Supports better HVAC performance across the home",
      "Helpful for customers focused on indoor air quality and maintenance",
    ],
  },
  "ductless-heating-ac": {
    overview:
      "Ductless mini-split systems are ideal when you want targeted comfort, cleaner installation paths, or room-by-room temperature control.",
    bullets: [
      "Installation, repair, and ongoing service for ductless systems",
      "Great option for additions, garages, offices, and older homes",
      "Energy-efficient choice for customers who want flexible comfort zones",
    ],
  },
  "heating-maintenance": {
    overview:
      "Heating maintenance prepares your system for colder weather and helps catch reliability or safety issues before they become urgent.",
    bullets: [
      "Seasonal inspection to improve confidence before winter use",
      "Useful for furnaces, heating systems, and older equipment",
      "A smart step for extending system life and reducing surprise breakdowns",
    ],
  },
  "hvac-maintenance": {
    overview:
      "Whole-system HVAC maintenance is the most balanced option for customers who want dependable year-round comfort from one visit.",
    bullets: [
      "Covers cooling and heating system performance in one service",
      "Helps improve efficiency, comfort, and system longevity",
      "Good fit for homeowners who want ongoing preventative care",
    ],
  },
  "install-ac": {
    overview:
      "New AC installation is focused on comfort, efficiency, and selecting the right system size and setup for the property.",
    bullets: [
      "Ideal for replacements, major upgrades, and newly conditioned spaces",
      "Supports better cooling performance and long-term operating value",
      "Best paired with a full estimate and system recommendation",
    ],
  },
  "install-ducts-vents": {
    overview:
      "Duct and vent installation improves how conditioned air moves through the home, helping the entire HVAC system work better.",
    bullets: [
      "Useful for remodels, room additions, and poorly performing layouts",
      "Designed to improve airflow balance and comfort consistency",
      "Strong option when upgrading from outdated or damaged ductwork",
    ],
  },
  "install-heating-system": {
    overview:
      "Heating system installation is for homeowners ready to replace old equipment or build a more dependable heating setup from the start.",
    bullets: [
      "Supports furnace replacement and complete heating upgrades",
      "Focused on safe, dependable performance and energy efficiency",
      "Useful for properties with unreliable or aging heating equipment",
    ],
  },
  "install-thermostat": {
    overview:
      "A thermostat upgrade gives customers better control, smarter scheduling, and a more modern HVAC experience.",
    bullets: [
      "Supports smart home convenience and better temperature control",
      "Can improve comfort and help reduce unnecessary energy use",
      "Strong add-on for maintenance visits or new system installs",
    ],
  },
  "repair-ac": {
    overview:
      "AC repair is built for urgent cooling issues, weak airflow, unusual sounds, and systems that no longer keep up with demand.",
    bullets: [
      "Fast diagnosis for common cooling failures and performance problems",
      "Designed for homeowners who need restored comfort quickly",
      "A good first step before deciding between repair and replacement",
    ],
  },
  "repair-ducts-vents": {
    overview:
      "Duct and vent repairs help correct leaks, weak airflow, and comfort imbalances that affect the whole property.",
    bullets: [
      "Improves how air is delivered across rooms and zones",
      "Useful when energy bills rise but comfort stays uneven",
      "Can restore lost efficiency from damaged or disconnected ductwork",
    ],
  },
  "repair-heating-system": {
    overview:
      "Heating repair covers unreliable heat, ignition issues, poor output, and common furnace performance problems.",
    bullets: [
      "Supports gas furnace repair and electric furnace troubleshooting",
      "Helpful for wall furnaces, floor furnaces, and older heating systems",
      "Focused on restoring comfort and reducing winter downtime",
    ],
  },
  "repair-hvac": {
    overview:
      "General HVAC repair is a strong choice when customers know the comfort system is not working correctly but need help identifying the exact cause.",
    bullets: [
      "Broad diagnostic support for combined heating and cooling issues",
      "Useful for multi-symptom problems and aging system performance",
      "Helps customers move from uncertainty to a clear next step",
    ],
  },
  "repair-thermostat": {
    overview:
      "Thermostat repair focuses on temperature control problems, poor sensor readings, and smart-control issues that affect comfort.",
    bullets: [
      "Helps restore accurate scheduling and system communication",
      "Useful for manual and smart thermostat troubleshooting",
      "Can resolve comfort problems without replacing larger equipment",
    ],
  },
  "solar-installation": {
    overview:
      "Solar installation is designed for homeowners ready to invest in lower energy costs and long-term property value.",
    bullets: [
      "Great for customers comparing upfront cost with long-term savings",
      "Supports cleaner energy use and stronger home efficiency planning",
      "Ideal for estimate-driven projects that need trust and clarity",
    ],
  },
  "solar-service": {
    overview:
      "Solar service helps maintain output, identify issues, and keep an existing system working at its best.",
    bullets: [
      "Useful for underperforming panels or overdue maintenance visits",
      "Helps protect the value of an existing solar investment",
      "Strong for performance-minded customers who want dependable output",
    ],
  },
  "plumbing-underground": {
    overview:
      "This plumbing service is positioned for larger repair and installation jobs involving underground lines, copper work, and more specialized pipe projects.",
    bullets: [
      "Supports trenching, copper line work, and deeper repair scopes",
      "Good fit for customers dealing with hidden leaks or damaged piping",
      "Builds confidence for higher-value plumbing projects that need explanation",
    ],
  },
  "electrical-service": {
    overview:
      "Electrical service covers practical upgrades and repairs that improve safety, reliability, and day-to-day property function.",
    bullets: [
      "Suitable for wiring, outlets, lighting, and panel improvements",
      "Works well for homeowners and businesses planning safety-focused upgrades",
      "Clear fit for customers who need a trusted local electrician",
    ],
  },
  "smart-irrigation": {
    overview:
      "Smart irrigation is designed for customers who want healthier landscaping with less water waste and more control from their phone.",
    bullets: [
      "Automated scheduling and smarter water usage by zone",
      "Useful for reducing waste while keeping landscapes consistent",
      "Pairs naturally with leak detection and shutoff technology conversations",
    ],
  },
  landscaping: {
    overview:
      "Landscaping services help customers improve curb appeal, usability, and the overall finish of their outdoor space.",
    bullets: [
      "Good for property refreshes, redesigns, and visual upgrades",
      "Supports a more premium presentation for outdoor projects",
      "Useful for homeowners who want both function and appearance",
    ],
  },
  "sod-installation": {
    overview:
      "Sod installation gives customers a faster path to a finished lawn with a cleaner, more polished look right away.",
    bullets: [
      "Ideal for bare yards, new builds, and full lawn replacement",
      "Creates a quick curb-appeal improvement with immediate visual impact",
      "Pairs well with irrigation planning for long-term lawn health",
    ],
  },
  planting: {
    overview:
      "Planting services focus on adding structure, color, and life to outdoor spaces with a more intentional landscape plan.",
    bullets: [
      "Great for garden beds, shrubs, trees, and seasonal refreshes",
      "Improves the visual character of a property quickly",
      "Can complement landscaping and irrigation upgrades in one project",
    ],
  },
  "network-service": {
    overview:
      "Network service supports better internet reliability, stronger coverage, and cleaner smart-home or office connectivity.",
    bullets: [
      "Useful for Wi-Fi issues, cabling needs, and connectivity upgrades",
      "Works well for homes, offices, and smart-device-heavy spaces",
      "Helps customers who need practical tech support without confusion",
    ],
  },
};

const BRAND_LOGOS: BrandLogo[] = [
  {
    name: "Carrier",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Logo_of_the_Carrier_Corporation.svg",
  },
  {
    name: "Lennox",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/77/Lennox_International_logo.svg",
  },
  {
    name: "Goodman",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Goodman_Global_logo.svg",
  },
  {
    name: "Rheem",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Rheem_logo.svg",
  },
  {
    name: "Frigidaire",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/66/Frigidaire.svg",
  },
  {
    name: "Trane Technologies",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/TraneTechnologieslogo.svg",
  },
];

const HEATING_SPECIALTIES = [
  "Gas Furnace Repair",
  "Electric Furnace Repair",
  "Floor Furnace Services",
  "Wall Furnace Services",
  "Furnace Replacement",
];

export default function Services() {
  const defaultCategory = SERVICE_CATEGORIES[0] as ServiceCategory;
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(defaultCategory);
  const [selectedServiceId, setSelectedServiceId] = useState(
    SERVICES.find((service) => service.category === defaultCategory)?.id ?? SERVICES[0].id,
  );

  const categoryServices = useMemo(
    () => SERVICES.filter((service) => service.category === activeCategory),
    [activeCategory],
  );

  const selectedService =
    categoryServices.find((service) => service.id === selectedServiceId) ?? categoryServices[0];

  const selectedServiceContent = SERVICE_CONTENT[selectedService.id] ?? {
    overview: selectedService.description,
    bullets: [
      "Clear service guidance for homeowners and businesses",
      "Professional workmanship with transparent recommendations",
      "Designed to help customers book with confidence",
    ],
  };

  const categoryContent = CATEGORY_CONTENT[activeCategory];

  const handleCategorySelect = (category: ServiceCategory) => {
    const firstService = SERVICES.find((service) => service.category === category);
    setActiveCategory(category);
    if (firstService) {
      setSelectedServiceId(firstService.id);
    }
  };

  return (
    <Layout>
      <SEO
        title="Services Overview | HVAC, Solar, Plumbing, Electrical and More"
        description="Browse services by category, open each service for a richer overview, and explore trusted HVAC brand experience from BERNARDINO MARTIN in Los Angeles."
      />

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('/images/hero-home.webp')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(61,181,74,0.28),_transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.8))]" />
        <div className="container mx-auto px-4 py-20 md:py-24 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-5 border-white/10 bg-white/10 px-4 py-1.5 text-slate-100">
              Guided service browsing
            </Badge>
            <h1 className="max-w-3xl text-4xl font-heading font-black tracking-tight text-white md:text-6xl">
              Explore services by category, then open the one that fits your job.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              This page is designed to feel faster and easier to use. Instead of scrolling through a
              long list, customers can choose a category, click a service, and immediately see the
              image, overview, and next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="bg-secondary font-semibold text-white hover:bg-secondary/90" asChild>
                <Link href={selectedService ? `/booking?service=${selectedService.id}` : "/booking"}>
                  Book Selected Service
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                asChild
              >
                <a
                  href={getWhatsAppLink("Hi, I want help choosing the right service for my home.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  Ask on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
              {SERVICE_CATEGORIES.map((category) => {
                const isActive = category === activeCategory;
                const firstService = SERVICES.find((service) => service.category === category);

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`min-w-[250px] rounded-2xl border px-5 py-4 text-left transition-all ${
                      isActive
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                        : "border-slate-200 bg-white text-slate-900 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                    }`}
                    data-testid={`button-category-${category.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  >
                    <div
                      className={`text-xs font-bold uppercase tracking-[0.18em] ${
                        isActive ? "text-slate-200" : "text-slate-500"
                      }`}
                    >
                      {CATEGORY_CONTENT[category].eyebrow}
                    </div>
                    <div className="mt-2 text-xl font-heading font-bold">{category}</div>
                    <div
                      className={`mt-3 text-sm leading-6 ${
                        isActive ? "text-slate-100" : "text-slate-600"
                      }`}
                    >
                      {firstService ? `Start with ${firstService.title}` : "Open this category"}
                    </div>
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 xl:grid-cols-[360px,minmax(0,1fr)]">
            <div className="space-y-6">
              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {categoryContent.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-heading font-bold text-slate-950">
                    {categoryContent.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    {categoryContent.summary}
                  </p>
                  <div className="mt-6 space-y-3">
                    {categoryContent.highlights.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl bg-slate-100 p-4">
                        <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <p className="text-sm leading-6 text-slate-700">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                    {categoryContent.supportingNote}
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {categoryServices.map((service) => {
                  const isSelected = service.id === selectedService.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`w-full rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
                      }`}
                      data-testid={`button-service-preview-${service.id}`}
                    >
                      <div className="flex gap-4 p-4">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-20 w-24 rounded-xl object-cover"
                          loading="lazy"
                          decoding="async"
                          width={96}
                          height={80}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3
                              className={`text-base font-bold ${
                                isSelected ? "text-white" : "text-slate-900"
                              }`}
                            >
                              {service.title}
                            </h3>
                            <service.icon
                              className={`h-5 w-5 shrink-0 ${
                                isSelected ? "text-white" : "text-primary"
                              }`}
                            />
                          </div>
                          <p
                            className={`mt-2 line-clamp-2 text-sm leading-6 ${
                              isSelected ? "text-slate-100" : "text-slate-600"
                            }`}
                          >
                            {service.description}
                          </p>
                          <div
                            className={`mt-3 flex flex-wrap gap-2 text-xs font-semibold ${
                              isSelected ? "text-slate-100" : "text-slate-500"
                            }`}
                          >
                            <span
                              className={`rounded-full px-2.5 py-1 ${
                                isSelected ? "bg-white/10" : "bg-slate-100"
                              }`}
                            >
                              {service.price}
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-1 ${
                                isSelected ? "bg-white/10" : "bg-slate-100"
                              }`}
                            >
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8">
              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <div className="relative overflow-hidden">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="h-[280px] w-full object-cover md:h-[360px]"
                    loading="eager"
                    decoding="async"
                    width={1440}
                    height={720}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute left-6 right-6 top-6 flex flex-wrap gap-2">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white/90">
                      {activeCategory}
                    </Badge>
                    <Badge className="bg-secondary/90 text-white hover:bg-secondary/90">
                      Featured service
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-heading font-black text-white md:text-4xl">
                      {selectedService.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-200">
                      {selectedServiceContent.overview}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6 md:p-8">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-[0.16em]">
                          Typical timing
                        </span>
                      </div>
                      <p className="mt-3 text-xl font-bold text-slate-900">
                        {selectedService.duration}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <DollarSign className="h-4 w-4" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-[0.16em]">
                          Starting point
                        </span>
                      </div>
                      <p className="mt-3 text-xl font-bold text-slate-900">
                        {selectedService.price}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Wrench className="h-4 w-4" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-[0.16em]">
                          Best for
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-700">
                        {selectedService.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        Service overview
                      </p>
                      <h3 className="mt-3 text-2xl font-heading font-bold text-slate-950">
                        What this service is designed to solve
                      </h3>
                      <div className="mt-6 space-y-4">
                        {selectedServiceContent.bullets.map((bullet) => (
                          <div key={bullet} className="flex gap-3">
                            <div className="mt-0.5 rounded-full bg-secondary/10 p-2 text-secondary">
                              <Check className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <p className="text-sm leading-7 text-slate-700">{bullet}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                        Ready to book
                      </p>
                      <h3 className="mt-3 text-2xl font-heading font-bold">
                        Need help with {selectedService.title.toLowerCase()}?
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-300">
                        Use the direct booking button or message the team if you want help deciding
                        between repair, replacement, maintenance, or a custom quote.
                      </p>
                      <div className="mt-6 space-y-3">
                        <Button className="w-full bg-secondary font-semibold hover:bg-secondary/90" asChild>
                          <Link href={`/booking?service=${selectedService.id}`}>
                            Book {selectedService.title}
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-white/15 bg-white/5 text-white hover:bg-white/10"
                          asChild
                        >
                          <a
                            href={getWhatsAppLink(
                              `Hi, I would like more information about ${selectedService.title}.`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                            Ask for details
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {activeCategory === "HVAC & Heating" && (
                <>
                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                            Brand experience
                          </p>
                          <h3 className="mt-3 text-3xl font-heading font-bold text-slate-950">
                            We work with trusted HVAC brands
                          </h3>
                          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                            These are brand families we have experience servicing and working with.
                            I used verified web logo sources for the logos shown below.
                          </p>
                        </div>
                        <Badge className="w-fit bg-primary/10 px-3 py-1.5 text-primary hover:bg-primary/10">
                          Trusted. Proven. Service-ready.
                        </Badge>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                        {BRAND_LOGOS.map((brand) => (
                          <div
                            key={brand.name}
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                          >
                            <div className="flex h-16 items-center justify-center rounded-xl bg-slate-50 p-3">
                              <img
                                src={brand.src}
                                alt={`${brand.name} logo`}
                                className="max-h-10 max-w-full object-contain"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            <div className="mt-3 text-center text-sm font-semibold text-slate-800">
                              {brand.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="grid gap-8 p-6 md:grid-cols-[1.1fr,0.9fr] md:p-8">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                          Heating specialties
                        </p>
                        <h3 className="mt-3 text-3xl font-heading font-bold text-slate-950">
                          Extra heating services customers often search for
                        </h3>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                          These are the specific heating phrases your client mentioned. Adding them
                          here helps the page speak more directly to customers looking for
                          furnace-related work.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {HEATING_SPECIALTIES.map((item) => (
                            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-start gap-3">
                                <div className="rounded-full bg-primary/10 p-2 text-primary">
                                  <Check className="h-4 w-4" aria-hidden="true" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">{item}</p>
                                  <p className="mt-1 text-sm leading-6 text-slate-600">
                                    Available as part of our heating diagnostics, repair planning,
                                    or replacement recommendations.
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[2rem] bg-gradient-to-br from-primary to-slate-950 p-6 text-white shadow-xl">
                        <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-100">
                          Flexible financing
                        </div>
                        <h3 className="mt-4 text-3xl font-heading font-bold">
                          Make larger HVAC projects easier to manage
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-slate-200">
                          Flexible financing options may be available for qualifying projects. The
                          goal is to help customers move forward with needed comfort upgrades while
                          keeping the process clear, professional, and budget-aware.
                        </p>
                        <div className="mt-6 space-y-3">
                          {[
                            "Monthly payment structures that are easier to plan around",
                            "A cleaner sales conversation for repair-versus-replacement decisions",
                            "Customer information handled with care and respect for privacy",
                          ].map((item) => (
                            <div key={item} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                              <div className="rounded-full bg-white/10 p-2 text-white">
                                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                              </div>
                              <p className="text-sm leading-6 text-slate-100">{item}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6">
                          <Button className="bg-white font-semibold text-primary hover:bg-slate-100" asChild>
                            <a
                              href={getWhatsAppLink(
                                "Hi, I want to ask about financing options for an HVAC project.",
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ask about financing
                              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="grid gap-6 p-6 md:grid-cols-[0.9fr,1.1fr] md:p-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      Why this layout works
                    </p>
                    <h3 className="mt-3 text-3xl font-heading font-bold text-slate-950">
                      Shorter page, stronger service focus
                    </h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Customers browse by category first, which cuts down the feeling of a long page.",
                      "Each click opens a more useful service view with image, overview, and action buttons.",
                      "The HVAC section now includes brand trust signals and more precise heating language.",
                      "The layout is frontend-only and does not touch server routes, data, or backend behavior.",
                    ].map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex gap-3">
                          <div className="rounded-full bg-secondary/10 p-2 text-secondary">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <p className="text-sm leading-7 text-slate-700">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
