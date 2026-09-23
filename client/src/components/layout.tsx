import { Link, useLocation } from "wouter";
import { Phone, Menu, ShieldCheck, AlertCircle, Instagram, Facebook, Youtube, MapPin, Clock, MessageCircle, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { COMPANY_PHONE, COMPANY_FULL, getWhatsAppLink, CITIES, CITY_PAGE_LINKS } from "@/lib/constants";
import { trackEvent } from "@/hooks/use-analytics";
const ChatWidget = lazy(() => import("@/components/chat-widget").then(m => ({ default: m.ChatWidget })));

type NavChild = { href: string; label: string; desc: string };
type NavSection = { title: string; links: { href: string; label: string }[] };
type NavItem = {
  href: string;
  label: string;
  kind: "link" | "anchor" | "mega" | "dropdown";
  sections?: NavSection[];
  children?: NavChild[];
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", kind: "link" },
  {
    href: "/services",
    label: "Services",
    kind: "mega",
    sections: [
      { title: "HVAC", links: [
        { href: "/services/hvac-repair", label: "AC Repair & Diagnostics" },
        { href: "/services/hvac-install-ac", label: "AC Installation" },
        { href: "/services/hvac-maintenance", label: "Maintenance Tune-Up" },
      ]},
      { title: "Heating", links: [
        { href: "/services/heating-gas-furnace", label: "Gas Furnace" },
        { href: "/services/heating-electric-furnace", label: "Electric Furnace" },
        { href: "/services/heating-furnace-replacement", label: "Furnace Replacement" },
      ]},
      { title: "Solar", links: [
        { href: "/services/solar-install", label: "Solar Installation" },
        { href: "/services/solar-maintenance", label: "Solar Maintenance" },
        { href: "/services/solar-inverter", label: "Inverter Services" },
      ]},
      { title: "Plumbing", links: [
        { href: "/services/plumbing-general", label: "General Plumbing" },
        { href: "/services/plumbing-water-heater", label: "Water Heater" },
        { href: "/services/plumbing-sewer", label: "Sewer Services" },
      ]},
      { title: "Electrical", links: [
        { href: "/services/electrical-panel", label: "Panel Upgrade" },
        { href: "/services/electrical-general", label: "General Electrical" },
        { href: "/services/electrical-ev-charger", label: "EV Charger" },
      ]},
      { title: "Outdoor", links: [
        { href: "/services/outdoor-landscaping", label: "Landscaping" },
        { href: "/services/outdoor-sod", label: "Sod Installation" },
        { href: "/services/outdoor-irrigation", label: "Smart Irrigation" },
        { href: "/services/outdoor-hardscape", label: "Hardscape & Concrete" },
      ]},
      { title: "Technology", links: [
        { href: "/services/tech-network", label: "Network Cabling" },
        { href: "/services/tech-smarthome", label: "Smart Home" },
        { href: "/services/tech-nest", label: "Google Nest" },
      ]},
      { title: "Home Services", links: [
        { href: "/services/home-cleaning", label: "Home Cleaning" },
        { href: "/services/moving-help", label: "Moving Help" },
        { href: "/services/handyman", label: "Handyman" },
      ]},
    ],
  },
  { href: "/#our-work", label: "Our Work", kind: "anchor" },
  { href: "/#reviews", label: "Reviews", kind: "anchor" },
  {
    href: "/booking",
    label: "Customer Tools",
    kind: "dropdown",
    children: [
      { href: "/booking", label: "Book Online", desc: "Schedule a service appointment" },
      { href: "/quote", label: "Request Quote", desc: "Ask for a project estimate" },
      { href: "/payment", label: "Pay Online", desc: "Pay your invoice online" },
      { href: "/dashboard", label: "Customer Dashboard", desc: "Check invoices and reminders" },
    ],
  },
  {
    href: "/about",
    label: "Company",
    kind: "dropdown",
    children: [
      { href: "/about", label: "About Us", desc: "Learn about Bernardino Martin" },
      { href: "/service-areas", label: "Service Areas", desc: "See the cities we serve" },
      { href: "/contact", label: "Contact Us", desc: "Reach our team directly" },
    ],
  },
  { href: "/contact", label: "Contact Us", kind: "link" },
];

const FOOTER_SERVICE_PAGES = [
  { href: "/hvac-los-angeles", label: "HVAC Los Angeles" },
  { href: "/solar-installation-los-angeles", label: "Solar Installation LA" },
  { href: "/plumbing-los-angeles", label: "Plumbing Los Angeles" },
  { href: "/electrical-services-los-angeles", label: "Electrical Services LA" },
  { href: "/landscaping-los-angeles", label: "Landscaping Los Angeles" },
  { href: "/irrigation-los-angeles", label: "Irrigation Los Angeles" },
  { href: "/network-installation-los-angeles", label: "Network Installation LA" },
  { href: "/air-conditioning-service-los-angeles", label: "Air Conditioning Service LA" },
  { href: "/ac-repair-los-angeles", label: "AC Repair Los Angeles" },
  { href: "/mini-split-service-los-angeles", label: "Mini-Split Service LA" },
  { href: "/furnace-service-los-angeles", label: "Furnace Service LA" },
  { href: "/heat-pump-los-angeles", label: "Heat Pump Los Angeles" },
  { href: "/solar-optimization-los-angeles", label: "Solar Optimization LA" },
  { href: "/plumbing-service-los-angeles", label: "Plumbing Service LA" },
  { href: "/landscaping-services-los-angeles", label: "Landscaping Services LA" },
  { href: "/sod-installation-los-angeles", label: "Sod Installation LA" },
  { href: "/planters-landscaping-los-angeles", label: "Planters & Landscaping LA" },
  { href: "/network-repair-los-angeles", label: "Network Repair Los Angeles" },
  { href: "/new-installation-los-angeles", label: "New Installation LA" },
];

// Derived from the same CITIES/CITY_PAGE_LINKS single source of truth used by the homepage
// service-area map and /service-areas — so the footer can never drift out of sync again.
const FOOTER_SERVICE_AREAS = CITIES.map((city) => ({ href: CITY_PAGE_LINKS[city], label: city }));

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestPhone, setRequestPhone] = useState("");
  const [requestServiceType, setRequestServiceType] = useState("");
  const [requestAddress, setRequestAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  const handleRequestSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: requestServiceType || "General Service Request",
          propertyType: "Residential",
          description: requestMessage || "Service request from sticky form",
          fullName: requestName,
          phone: requestPhone,
          email: requestEmail,
          address: requestAddress,
          urgency: "standard",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      trackEvent("quote_requested", requestServiceType || "General Service Request");
      setRequestStatus("success");
      setRequestName("");
      setRequestEmail("");
      setRequestPhone("");
      setRequestServiceType("");
      setRequestAddress("");
      setRequestMessage("");
    } catch (error) {
      setRequestStatus("error");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 bg-[var(--rb-orange)] text-white px-4 py-2 rounded-md font-semibold">
      Skip to main content
    </a>
    <div className="rebrand flex flex-col min-h-screen font-sans">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2.5 text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2 px-4 text-center" role="alert">
        <AlertCircle className="h-4 w-4 animate-pulse shrink-0" aria-hidden="true" />
        <span>24/7 Emergency Service Available in Los Angeles &mdash; <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} className="underline hover:text-red-100 transition-colors">{COMPANY_PHONE}</a></span>
      </div>

      {/* Top Bar — service area, trust, hours, emergency call */}
      <div className="border-b border-slate-100 bg-white py-2 text-xs font-semibold text-slate-600">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-x-6 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[var(--rb-orange)]" aria-hidden="true" />
              Los Angeles &amp; Surrounding Areas
            </span>
            <span className="hidden items-center gap-1.5 md:flex">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--rb-orange)]" aria-hidden="true" />
              Licensed &amp; Insured &amp; Trusted
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 sm:flex">
              <Clock className="h-3.5 w-3.5 text-[var(--rb-orange)]" aria-hidden="true" />
              Mon&ndash;Sat: 7AM&ndash;8PM
            </span>
            <a
              href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}
              onClick={() => trackEvent("phone_click")}
              className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 font-bold text-white hover:bg-red-700 transition-colors"
            >
              Emergency? Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-50 w-full bg-white border-b transition-shadow duration-300 ${
          isScrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="BERNARDINO MARTIN - Home">
            <img
              src="/images/rebrand/logo-redesign.webp"
              alt="BERNARDINO MARTIN — Comfort, Energy, Care, For Life"
              className="h-14 w-auto object-contain"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Nav — flat links, plus a full mega-menu (Services) and two simple dropdowns */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (item.kind === "link" && location === item.href) ||
                item.children?.some((c) => location === c.href) ||
                item.sections?.some((s) => s.links.some((l) => location === l.href));
              const className = `flex items-center gap-1 text-sm font-bold transition-colors hover:text-[var(--rb-orange)] ${
                isActive ? "text-[var(--rb-orange)]" : "text-[var(--rb-navy)]"
              }`;

              if (item.kind === "mega" && item.sections) {
                return (
                  <div key={item.href} className="group relative py-7">
                    <Link href={item.href} aria-current={isActive ? "page" : undefined} className={className}>
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                    </Link>
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[780px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-xl border border-slate-900/10 bg-white p-5 shadow-xl">
                        <div className="grid grid-cols-4 gap-5">
                          {item.sections.map((section) => (
                            <div key={section.title}>
                              <div className="mb-2 text-[10px] font-black uppercase tracking-wider text-[var(--rb-orange)]">{section.title}</div>
                              <ul className="space-y-1">
                                {section.links.map((link) => (
                                  <li key={link.href}>
                                    <Link href={link.href} className="block rounded px-2 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-[var(--rb-orange)]">
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <Link href="/services" className="text-xs font-bold text-[var(--rb-orange)] hover:underline">View all 39 services →</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.kind === "dropdown" && item.children) {
                return (
                  <div key={item.href} className="group relative py-7">
                    <Link href={item.href} aria-current={isActive ? "page" : undefined} className={className}>
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                    </Link>
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-xl border border-slate-900/10 bg-white p-3 shadow-xl">
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href} className="block rounded-lg px-4 py-3 transition-colors hover:bg-slate-50">
                            <div className="text-sm font-bold text-[var(--rb-navy)]">{child.label}</div>
                            <div className="mt-0.5 text-xs leading-5 text-slate-500">{child.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return item.kind === "link" ? (
                <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={className}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={item.href} className={className}>
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} className="flex items-center gap-2 mr-1 group">
              <Phone className="h-4 w-4 text-[var(--rb-orange)]" aria-hidden="true" />
              <span className="text-lg font-black font-sans text-[var(--rb-navy)] group-hover:text-[var(--rb-orange)] transition-colors">{COMPANY_PHONE}</span>
            </a>
            <Button size="lg" className="bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)] shadow-lg shadow-orange-500/20" asChild>
              <Link href="/quote">
                Get a Free Estimate
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
             <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} aria-label={`Call us at ${COMPANY_PHONE}`}>
               <Button size="icon" variant="outline" className="rounded-full border-[var(--rb-orange)]/30 text-[var(--rb-orange)] hover:bg-[var(--rb-orange)]/10" aria-hidden="true" tabIndex={-1}>
                 <Phone className="h-5 w-5" aria-hidden="true" />
               </Button>
             </a>
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2 text-[var(--rb-navy)]" aria-label="Open navigation menu">
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]" aria-label="Navigation menu">
                <nav className="flex flex-col gap-1 mt-10" aria-label="Mobile navigation">
                  <Link href="/" className="mb-6 flex items-center">
                    <img src="/images/rebrand/logo-redesign.webp" alt="BERNARDINO MARTIN logo" className="h-12 w-auto object-contain" loading="eager" fetchPriority="high" />
                  </Link>
                  {NAV_ITEMS.map((item) => {
                    const isActive =
                      (item.kind === "link" && location === item.href) ||
                      item.children?.some((c) => location === c.href) ||
                      item.sections?.some((s) => s.links.some((l) => location === l.href));
                    const linkClassName = `block py-3 text-lg font-bold ${isActive ? "text-[var(--rb-orange)]" : "text-[var(--rb-navy)]"}`;

                    if (item.kind === "mega" && item.sections) {
                      return (
                        <div key={item.href} className="border-b border-gray-100 py-1">
                          <Link href={item.href} className={linkClassName}>{item.label}</Link>
                          <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-3 pl-1">
                            {item.sections.map((section) => (
                              <div key={section.title}>
                                <div className="mb-1 text-[10px] font-black uppercase tracking-wider text-[var(--rb-orange)]">{section.title}</div>
                                {section.links.map((link) => (
                                  <Link key={link.href} href={link.href} className="block py-1 text-sm font-semibold text-slate-600 hover:text-[var(--rb-orange)]">
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                          <Link href="/services" className="block pb-2 text-xs font-bold text-[var(--rb-orange)]">View all 39 services →</Link>
                        </div>
                      );
                    }

                    if (item.kind === "dropdown" && item.children) {
                      return (
                        <div key={item.href} className="border-b border-gray-100 py-1">
                          <Link href={item.href} className={linkClassName}>{item.label}</Link>
                          <div className="mb-3 space-y-1 pl-1">
                            {item.children.map((child) => (
                              <Link key={child.href} href={child.href} className="block rounded-lg px-2 py-2 hover:bg-slate-50">
                                <div className="text-sm font-bold text-slate-700">{child.label}</div>
                                <div className="text-xs text-slate-500">{child.desc}</div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return item.kind === "link" ? (
                      <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={`${linkClassName} border-b border-gray-100`}>
                        {item.label}
                      </Link>
                    ) : (
                      <a key={item.href} href={item.href} className={`${linkClassName} border-b border-gray-100`}>
                        {item.label}
                      </a>
                    );
                  })}
                  <div className="flex flex-col gap-3 mt-6">
                    <Button size="lg" className="w-full bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
                      <Link href="/quote">Get a Free Estimate</Link>
                    </Button>
                    <Button size="lg" className="w-full bg-green-700 hover:bg-green-800 text-white border-0" asChild>
                      <a href={getWhatsAppLink("Hi, I'd like to book an appointment.")} onClick={() => trackEvent("whatsapp_click")} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Chat
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full border-[var(--rb-navy)] text-[var(--rb-navy)]" asChild>
                      <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call {COMPANY_PHONE}
                      </a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1" id="main-content">
        {children}

        <section className="mx-auto max-w-4xl rounded-xl border border-primary/20 bg-white/95 p-6 shadow-lg my-10">
          <h2 className="text-2xl font-semibold mb-4">Request a Service Quote</h2>
          <p className="mb-6 text-slate-600">Fill this form and we’ll contact you in 15 minutes. This form is available on all pages for fast local lead capture.</p>
          <form onSubmit={handleRequestSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input required className="rounded-lg border border-slate-300 p-2" placeholder="Full Name" value={requestName} onChange={(e) => setRequestName(e.target.value)} />
            <input required type="email" className="rounded-lg border border-slate-300 p-2" placeholder="Email" value={requestEmail} onChange={(e) => setRequestEmail(e.target.value)} />
            <input required className="rounded-lg border border-slate-300 p-2" placeholder="Phone" value={requestPhone} onChange={(e) => setRequestPhone(e.target.value)} />
            <input className="rounded-lg border border-slate-300 p-2" placeholder="Address" value={requestAddress} onChange={(e) => setRequestAddress(e.target.value)} />
            <input className="rounded-lg border border-slate-300 p-2 md:col-span-2" placeholder="Service Type (HVAC, Solar, Plumbing, etc.)" value={requestServiceType} onChange={(e) => setRequestServiceType(e.target.value)} />
            <textarea className="rounded-lg border border-slate-300 p-2 md:col-span-2" rows={4} placeholder="Short description of your request" value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} />
            <button type="submit" className="md:col-span-2 rounded-lg bg-primary py-2 px-4 text-white hover:bg-primary/90" disabled={requestStatus === "pending"}>
              {requestStatus === "pending" ? "Sending..." : "Submit Request"}
            </button>
            {requestStatus === "success" && <p className="md:col-span-2 text-sm text-green-700">Thank you! Your service request has been submitted.</p>}
            {requestStatus === "error" && <p className="md:col-span-2 text-sm text-red-700">Submission failed. Please try again or call us directly.</p>}
          </form>
        </section>
      </main>

      {/* Hidden at the very top of the page — every page already has its own prominent Call CTA there */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isScrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a href="tel:+18184000227" onClick={() => trackEvent("phone_click")} aria-label="Call for a free consultation" className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm text-white font-bold shadow-lg transition hover:bg-red-700 sm:px-5 sm:text-base">
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </div>

      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>

      <footer className="bg-white text-slate-600 py-12 border-t border-slate-200" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/images/rebrand/logo-redesign.webp" alt="BERNARDINO MARTIN logo" className="h-16 w-auto object-contain mb-4" loading="lazy" />
              <p className="text-sm leading-relaxed mb-4 text-slate-500">
                BERNARDINO MARTIN &mdash; Comfort, Energy, Care, For Life. Top-rated HVAC, Solar, Plumbing, Electrical &amp; home services in Los Angeles.
              </p>
              <p className="text-sm leading-relaxed mb-4 text-slate-700">
                Serving Los Angeles, Burbank, Glendale, Pasadena, and San Fernando Valley.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--rb-orange)]">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>Licensed, Bonded & Insured</span>
              </div>
            </div>

            <div>
              <h3 className="text-[var(--rb-navy)] font-bold mb-4 font-sans">Quick Links</h3>
              <ul className="space-y-1.5 text-sm">
                <li><Link href="/" className="hover:text-[var(--rb-orange)] transition-colors">Home</Link></li>
                <li><Link href="/services" className="hover:text-[var(--rb-orange)] transition-colors">Services</Link></li>
                <li><a href="/#our-work" className="hover:text-[var(--rb-orange)] transition-colors">Our Work</a></li>
                <li><a href="/#reviews" className="hover:text-[var(--rb-orange)] transition-colors">Reviews</a></li>
                <li><Link href="/about" className="hover:text-[var(--rb-orange)] transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--rb-orange)] transition-colors">Contact Us</Link></li>
                <li><Link href="/booking" className="hover:text-[var(--rb-orange)] transition-colors">Book Online</Link></li>
                <li><Link href="/quote" className="hover:text-[var(--rb-orange)] transition-colors">Get a Free Estimate</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[var(--rb-navy)] font-bold mb-4 font-sans">Our Services</h3>
              <ul className="space-y-1.5 text-sm">
                <li><Link href="/services/hvac-repair" className="hover:text-[var(--rb-orange)] transition-colors">HVAC Repair &amp; Install</Link></li>
                <li><Link href="/services/solar-install" className="hover:text-[var(--rb-orange)] transition-colors">Solar Installation</Link></li>
                <li><Link href="/services/plumbing-general" className="hover:text-[var(--rb-orange)] transition-colors">Plumbing</Link></li>
                <li><Link href="/services/electrical-general" className="hover:text-[var(--rb-orange)] transition-colors">Electrical</Link></li>
                <li><Link href="/services/outdoor-landscaping" className="hover:text-[var(--rb-orange)] transition-colors">Landscaping</Link></li>
                <li><Link href="/services/home-cleaning" className="hover:text-[var(--rb-orange)] transition-colors">Home Cleaning</Link></li>
                <li><Link href="/services/moving-help" className="hover:text-[var(--rb-orange)] transition-colors">Moving Help</Link></li>
                <li><Link href="/services/handyman" className="hover:text-[var(--rb-orange)] transition-colors">Handyman</Link></li>
                <li className="pt-2"><Link href="/services" className="font-bold text-[var(--rb-orange)] hover:text-[var(--rb-orange-dark)] transition-colors">View all 39 services →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[var(--rb-navy)] font-bold mb-4 font-sans">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[var(--rb-orange)] shrink-0" />
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} className="hover:text-[var(--rb-orange)] transition-colors text-lg font-bold text-[var(--rb-navy)]">{COMPANY_PHONE}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[var(--rb-orange)] shrink-0" />
                  <span>Mon&ndash;Sat: 7AM&ndash;8PM<br />24/7 Emergency Service</span>
                </li>
              </ul>
              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full bg-slate-100 hover:bg-slate-200 text-[var(--rb-navy)]" asChild>
                  <Link href="/payment">Pay Invoice Online</Link>
                </Button>
                <Button className="w-full bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" asChild>
                  <Link href="/booking">Book Appointment</Link>
                </Button>
                <Button className="w-full bg-green-700 hover:bg-green-800 text-white border-0" asChild>
                   <a href={getWhatsAppLink("Hi, I have a question about your services.")} onClick={() => trackEvent("whatsapp_click")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp with a question">
                     <MessageCircle className="mr-2 h-4 w-4" />
                     Chat on WhatsApp
                   </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-[var(--rb-navy)] font-bold mb-4 font-sans text-sm uppercase tracking-wider">Popular Service Pages</h3>
              <ul className="columns-2 sm:columns-3 gap-4 text-xs text-slate-500">
                {FOOTER_SERVICE_PAGES.map((page) => (
                  <li key={page.href}><a href={page.href} className="hover:text-[var(--rb-orange)] transition-colors block py-1.5">{page.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[var(--rb-navy)] font-bold mb-4 font-sans text-sm uppercase tracking-wider">All Service Areas We Cover</h3>
              <ul className="columns-2 sm:columns-3 gap-4 text-xs text-slate-500">
                {FOOTER_SERVICE_AREAS.map((area) => (
                  <li key={area.href}><a href={area.href} className="hover:text-[var(--rb-orange)] transition-colors block py-1.5">{area.label}</a></li>
                ))}
                <li><Link href="/service-areas" className="font-semibold text-[var(--rb-orange)] hover:text-[var(--rb-orange-dark)] transition-colors block py-1.5">View All Areas →</Link></li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center mt-8">
            Proudly serving Los Angeles, Burbank, Glendale, Pasadena, Santa Monica, the San Fernando Valley, and the South Bay - including Redondo Beach, Hermosa Beach, Manhattan Beach, Torrance, and Long Beach.
          </p>

          <div className="pt-8 pb-20 border-t border-slate-200 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} {COMPANY_FULL}. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="https://www.youtube.com/@bernardinomartinhvac" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--rb-orange)] transition-colors" aria-label="YouTube" data-testid="link-youtube"><Youtube className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/bernardinomartinsolar/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--rb-orange)] transition-colors" aria-label="Instagram" data-testid="link-instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.facebook.com/profile.php?id=61551460556076" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--rb-orange)] transition-colors" aria-label="Facebook" data-testid="link-facebook"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
