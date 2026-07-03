import { Link, useLocation } from "wouter";
import { Phone, Menu, Calendar, MessageCircle, ShieldCheck, AlertCircle, Instagram, Facebook, Youtube, ChevronDown } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { COMPANY_PHONE, COMPANY_NAME, COMPANY_FULL, getWhatsAppLink } from "@/lib/constants";
import { trackEvent } from "@/hooks/use-analytics";
const ChatWidget = lazy(() => import("@/components/chat-widget").then(m => ({ default: m.ChatWidget })));

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

const FOOTER_SERVICE_AREAS = [
  { href: "/hvac-burbank", label: "Burbank" },
  { href: "/hvac-glendale", label: "Glendale" },
  { href: "/hvac-pasadena", label: "Pasadena" },
  { href: "/hvac-san-fernando-valley", label: "San Fernando Valley" },
  { href: "/hvac-santa-monica", label: "Santa Monica" },
  { href: "/hvac-hollywood", label: "Hollywood" },
  { href: "/hvac-north-hollywood", label: "North Hollywood" },
  { href: "/hvac-van-nuys", label: "Van Nuys" },
  { href: "/hvac-chatsworth", label: "Chatsworth" },
  { href: "/hvac-northridge", label: "Northridge" },
  { href: "/hvac-reseda", label: "Reseda" },
  { href: "/hvac-canoga-park", label: "Canoga Park" },
  { href: "/hvac-woodland-hills", label: "Woodland Hills" },
  { href: "/hvac-calabasas", label: "Calabasas" },
  { href: "/hvac-sherman-oaks", label: "Sherman Oaks" },
  { href: "/hvac-studio-city", label: "Studio City" },
  { href: "/hvac-encino", label: "Encino" },
  { href: "/hvac-tarzana", label: "Tarzana" },
  { href: "/hvac-west-hills", label: "West Hills" },
  { href: "/hvac-redondo-beach", label: "Redondo Beach" },
  { href: "/hvac-hermosa-beach", label: "Hermosa Beach" },
  { href: "/hvac-playa-del-rey", label: "Playa del Rey" },
  { href: "/hvac-inglewood", label: "Inglewood" },
  { href: "/hvac-culver-city", label: "Culver City" },
  { href: "/hvac-torrance", label: "Torrance" },
  { href: "/hvac-malibu", label: "Malibu" },
  { href: "/hvac-long-beach", label: "Long Beach" },
  { href: "/hvac-gardena", label: "Gardena" },
  { href: "/hvac-hawthorne", label: "Hawthorne" },
  { href: "/hvac-manhattan-beach", label: "Manhattan Beach" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  // The home hero is a full-bleed video — float a transparent nav over it until the user scrolls.
  // Every other page keeps the solid header (it has no video to float over).
  const isHomeHero = location === "/" && !isScrolled;

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

  type NavChild = { href: string; label: string; desc: string };
  type NavSection = { title: string; links: { href: string; label: string }[] };
  type NavItem = { href: string; label: string; children?: NavChild[]; sections?: NavSection[] };

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    {
      href: "/services",
      label: "Services",
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
        ]},
        { title: "Technology", links: [
          { href: "/services/tech-network", label: "Network Cabling" },
          { href: "/services/tech-smarthome", label: "Smart Home" },
          { href: "/services/tech-nest", label: "Google Nest" },
        ]},
      ],
    },
    {
      href: "/booking",
      label: "Customer Tools",
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
      children: [
        { href: "/about", label: "About Us", desc: "Learn about Bernardino Martin" },
        { href: "/service-areas", label: "Service Areas", desc: "See the cities we serve" },
        { href: "/contact", label: "Contact Us", desc: "Reach our team directly" },
      ],
    },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold">
      Skip to main content
    </a>
    <div className="flex flex-col min-h-screen font-sans">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2.5 text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-2 px-4 text-center" role="alert">
        <AlertCircle className="h-4 w-4 animate-pulse shrink-0" aria-hidden="true" />
        <span>24/7 Emergency Service Available in Los Angeles &mdash; <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} className="underline hover:text-red-100 transition-colors">{COMPANY_PHONE}</a></span>
      </div>

      {/* Top Bar - Trust & Quick Contact */}
      <div className="bg-slate-950 text-slate-300 py-2 text-xs font-bold uppercase tracking-wider">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
            <span>Licensed, Bonded &amp; Insured</span>
          </div>
          <div className="hidden md:flex gap-4">
            <span>Commercial &amp; Residential</span>
            <span>Serving Greater Los Angeles</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isHomeHero
            ? "bg-slate-950/80 border-transparent"
            : isScrolled
              ? "bg-white border-slate-200 shadow-sm"
              : "bg-white border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="BERNARDINO MARTIN Heating Air Conditioning Solar - Home">
              <img src="/logo-bm.webp" alt="BERNARDINO MARTIN Heating Air Conditioning Solar logo" className="h-14 w-14 object-contain rounded-lg bg-white p-1 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300" loading="eager" fetchPriority="high" width={128} height={128} />
              <div className="flex flex-col">
                <span className={`font-heading font-black text-lg leading-none tracking-tight ${isHomeHero ? "text-white text-shadow-hero" : "text-slate-950"}`}>BERNARDINO MARTIN</span>
                <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isHomeHero ? "text-white/90 text-shadow-hero" : "text-green-700"}`}>Heating &bull; Air Conditioning &bull; Solar</span>
              </div>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive =
                location === item.href ||
                item.children?.some((child) => location === child.href || location === child.href.split("#")[0]) ||
                item.sections?.some((s) => s.links.some((l) => location === l.href));

              if (!item.children && !item.sections) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={location === item.href ? "page" : undefined}
                    className={`border-b-2 pb-1 text-sm font-bold transition-colors hover:text-primary ${
                      isHomeHero
                        ? `text-shadow-hero ${isActive ? "border-white text-white" : "border-transparent text-white"}`
                        : isActive ? "border-primary text-primary" : "border-transparent text-slate-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="group relative py-7">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 border-b-2 pb-1 text-sm font-bold transition-colors hover:text-primary ${
                      isHomeHero
                        ? `text-shadow-hero ${isActive ? "border-white text-white" : "border-transparent text-white"}`
                        : isActive ? "border-primary text-primary" : "border-transparent text-slate-700"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  {item.sections ? (
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[760px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-xl border border-slate-900/10 bg-white p-5 shadow-xl">
                        <div className="grid grid-cols-7 gap-4">
                          {item.sections.map((section) => (
                            <div key={section.title}>
                              <div className="text-[10px] font-black uppercase tracking-wider text-green-700 mb-2">{section.title}</div>
                              <ul className="space-y-1">
                                {section.links.map((link) => (
                                  <li key={link.href}>
                                    <Link href={link.href} className="block rounded px-2 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary">
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <Link href="/services" className="text-xs font-bold text-primary hover:underline">View all 39 services →</Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-xl border border-slate-900/10 bg-white p-3 shadow-xl">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-4 py-3 transition-colors hover:bg-slate-50"
                          >
                            <div className="text-sm font-bold text-slate-950">{child.label}</div>
                            <div className="mt-1 text-xs leading-5 text-slate-500">{child.desc}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} className={`flex flex-col items-end mr-2 group ${isHomeHero ? "text-shadow-hero" : ""}`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isHomeHero ? "text-white/90" : "text-slate-600"}`}>24/7 Service</span>
              <span className={`text-lg font-black font-heading group-hover:text-primary transition-colors ${isHomeHero ? "text-white" : "text-slate-950"}`}>{COMPANY_PHONE}</span>
            </a>

            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
              <Link href="/booking">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Book Online</span>
                </div>
              </Link>
            </Button>

            <Button size="icon" className="bg-green-700 hover:bg-green-800 shadow-lg shadow-green-700/20" asChild>
              <a href={getWhatsAppLink("Hi, I have a question about your HVAC/Solar services.")} onClick={() => trackEvent("whatsapp_click")} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
             <a href={getWhatsAppLink("Hi, I have a question about your HVAC/Solar services.")} onClick={() => trackEvent("whatsapp_click")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
               <Button size="icon" className="rounded-full bg-green-700 hover:bg-green-800 text-white shadow-sm border-0" aria-hidden="true" tabIndex={-1}>
                 <MessageCircle className="h-5 w-5" aria-hidden="true" />
               </Button>
             </a>
             <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} aria-label={`Call us at ${COMPANY_PHONE}`}>
               <Button size="icon" variant="outline" className={`rounded-full hover:bg-primary/10 ${isHomeHero ? "border-white/40 text-white" : "border-primary/20 text-primary"}`} aria-hidden="true" tabIndex={-1}>
                 <Phone className="h-5 w-5" aria-hidden="true" />
               </Button>
             </a>
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`-mr-2 ${isHomeHero ? "text-white hover:bg-white/10 hover:text-white" : ""}`} aria-label="Open navigation menu">
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]" aria-label="Navigation menu">
                <nav className="flex flex-col gap-6 mt-10" aria-label="Mobile navigation">
                  <Link href="/" className="flex items-center gap-2 mb-6">
                      <img src="/logo-bm.webp" alt="BERNARDINO MARTIN Heating Air Conditioning Solar logo" className="h-12 w-12 object-contain rounded-lg bg-white p-1 shadow-sm border border-gray-100" loading="eager" fetchPriority="high" width={128} height={128} />
                      <div className="flex flex-col">
                        <span className="font-heading font-black text-lg text-slate-950">BERNARDINO MARTIN</span>
                        <span className="text-[9px] font-bold text-secondary tracking-[0.15em] uppercase">Heating &bull; Air Conditioning &bull; Solar</span>
                      </div>
                  </Link>
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-gray-100 pb-3">
                      <Link
                        href={item.href}
                        aria-current={location === item.href ? "page" : undefined}
                        className={`block py-2 text-lg font-bold ${
                          location === item.href ? "text-primary" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {item.sections ? (
                        <div className="mt-2 space-y-3 pl-4">
                          {item.sections.map((section) => (
                            <div key={section.title}>
                              <div className="text-[10px] font-black uppercase tracking-wider text-secondary mb-1">{section.title}</div>
                              {section.links.map((link) => (
                                <Link key={link.href} href={link.href} className="block rounded px-2 py-1.5 text-sm font-semibold text-slate-600 hover:text-primary">
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                          <Link href="/services" className="block text-xs font-bold text-primary pt-1">View all 39 services →</Link>
                        </div>
                      ) : item.children ? (
                        <div className="mt-2 space-y-2 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
                            >
                              <div className="font-semibold text-slate-700">{child.label}</div>
                              <div className="mt-1 text-xs leading-5 text-slate-500">{child.desc}</div>
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  <div className="flex flex-col gap-3 mt-4">
                    <Button size="lg" className="w-full bg-primary" asChild>
                      <Link href="/booking">Book Appointment</Link>
                    </Button>
                    <Button size="lg" className="w-full bg-green-700 hover:bg-green-800 text-white border-0" asChild>
                      <a href={getWhatsAppLink("Hi, I'd like to book an appointment.")} onClick={() => trackEvent("whatsapp_click")} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Chat
                      </a>
                    </Button>
                    <Button size="lg" variant="secondary" className="w-full bg-slate-900 text-white hover:bg-slate-800" asChild>
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
        className={`fixed bottom-6 right-[5.75rem] z-50 transition-all duration-300 ${
          isScrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <a href="tel:+18184000227" onClick={() => trackEvent("phone_click")} className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm text-white font-bold shadow-lg transition hover:bg-red-700 sm:px-5 sm:text-base">
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </div>

      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4 text-white">
                <img src="/logo-bm.webp" alt="BERNARDINO MARTIN Heating Air Conditioning Solar logo" className="h-16 w-16 object-contain rounded-lg bg-white p-1.5 shadow-md" loading="lazy" width={128} height={128} />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg leading-tight">BERNARDINO MARTIN</span>
                  <span className="text-[10px] font-semibold text-secondary tracking-[0.2em] uppercase">Heating &bull; Air Conditioning &bull; Solar</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4 text-slate-400">
                BERNARDINO MARTIN - Heating, Air Conditioning, Solar. Top-rated HVAC, Solar, and Plumbing services in Los Angeles.
              </p>
              <p className="text-sm leading-relaxed mb-4 text-slate-200">
                Serving Los Angeles, Burbank, Glendale, Pasadena, and San Fernando Valley.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>Licensed, Bonded & Insured</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Our Services</h3>
              <ul className="space-y-1.5 text-sm">
                <li className="text-[10px] font-black text-secondary uppercase tracking-wider mb-0.5">HVAC</li>
                <li><Link href="/services/hvac-repair" className="hover:text-secondary transition-colors">AC Repair & Diagnostics</Link></li>
                <li><Link href="/services/hvac-install-ac" className="hover:text-secondary transition-colors">AC Installation</Link></li>
                <li><Link href="/services/hvac-maintenance" className="hover:text-secondary transition-colors">Maintenance Tune-Up</Link></li>
                <li className="text-[10px] font-black text-secondary uppercase tracking-wider pt-2 mb-0.5">Plumbing</li>
                <li><Link href="/services/plumbing-general" className="hover:text-secondary transition-colors">General Plumbing</Link></li>
                <li><Link href="/services/plumbing-water-heater" className="hover:text-secondary transition-colors">Water Heater</Link></li>
                <li><Link href="/services/plumbing-sewer" className="hover:text-secondary transition-colors">Sewer Services</Link></li>
                <li className="text-[10px] font-black text-secondary uppercase tracking-wider pt-2 mb-0.5">Solar & More</li>
                <li><Link href="/services/solar-install" className="hover:text-secondary transition-colors">Solar Installation</Link></li>
                <li><Link href="/services/electrical-panel" className="hover:text-secondary transition-colors">Electrical Panel</Link></li>
                <li><Link href="/services/outdoor-landscaping" className="hover:text-secondary transition-colors">Landscaping</Link></li>
                <li className="pt-2"><Link href="/services" className="font-bold text-secondary hover:text-secondary/80 transition-colors">View all 39 services →</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Service Areas</h3>
              <ul className="columns-2 space-y-2 text-sm">
                <li><a href="/hvac-glendale" className="hover:text-secondary transition-colors">Glendale</a></li>
                <li><a href="/hvac-san-fernando-valley" className="hover:text-secondary transition-colors">San Fernando Valley</a></li>
                <li><a href="/hvac-santa-monica" className="hover:text-secondary transition-colors">Santa Monica</a></li>
                <li><a href="/hvac-hollywood" className="hover:text-secondary transition-colors">Hollywood</a></li>
                <li><a href="/hvac-north-hollywood" className="hover:text-secondary transition-colors">North Hollywood</a></li>
                <li><a href="/hvac-van-nuys" className="hover:text-secondary transition-colors">Van Nuys</a></li>
                <li><a href="/hvac-chatsworth" className="hover:text-secondary transition-colors">Chatsworth</a></li>
                <li><a href="/hvac-northridge" className="hover:text-secondary transition-colors">Northridge</a></li>
                <li><a href="/hvac-reseda" className="hover:text-secondary transition-colors">Reseda</a></li>
                <li><a href="/hvac-canoga-park" className="hover:text-secondary transition-colors">Canoga Park</a></li>
                <li><a href="/hvac-woodland-hills" className="hover:text-secondary transition-colors">Woodland Hills</a></li>
                <li><a href="/hvac-calabasas" className="hover:text-secondary transition-colors">Calabasas</a></li>
                <li><a href="/hvac-sherman-oaks" className="hover:text-secondary transition-colors">Sherman Oaks</a></li>
                <li><a href="/hvac-studio-city" className="hover:text-secondary transition-colors">Studio City</a></li>
                <li><a href="/hvac-encino" className="hover:text-secondary transition-colors">Encino</a></li>
                <li><a href="/hvac-tarzana" className="hover:text-secondary transition-colors">Tarzana</a></li>
                <li><a href="/hvac-west-hills" className="hover:text-secondary transition-colors">West Hills</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-secondary shrink-0" />
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} onClick={() => trackEvent("phone_click")} className="hover:text-white transition-colors text-lg font-bold">{COMPANY_PHONE}</a>
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-secondary"></div>
                   <span>Available 24/7 for Emergency</span>
                </li>
              </ul>
              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" asChild>
                  <Link href="/payment">Pay Invoice Online</Link>
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/booking">Book Appointment</Link>
                </Button>
                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" asChild>
                  <Link href="/quote">Get a Free Quote</Link>
                </Button>
                <Button className="w-full bg-green-700 hover:bg-green-800 text-white border-0" asChild>
                   <a href={getWhatsAppLink("Hi, I have a question about your services.")} onClick={() => trackEvent("whatsapp_click")} target="_blank" rel="noopener noreferrer">
                     <MessageCircle className="mr-2 h-4 w-4" />
                     Chat on WhatsApp
                   </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4 font-heading text-sm uppercase tracking-wider">Popular Service Pages</h3>
              <ul className="columns-2 sm:columns-3 gap-4 space-y-1.5 text-xs text-slate-400">
                {FOOTER_SERVICE_PAGES.map((page) => (
                  <li key={page.href}><a href={page.href} className="hover:text-secondary transition-colors">{page.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-heading text-sm uppercase tracking-wider">All Service Areas We Cover</h3>
              <ul className="columns-2 sm:columns-3 gap-4 space-y-1.5 text-xs text-slate-400">
                {FOOTER_SERVICE_AREAS.map((area) => (
                  <li key={area.href}><a href={area.href} className="hover:text-secondary transition-colors">{area.label}</a></li>
                ))}
                <li><Link href="/service-areas" className="font-semibold text-secondary hover:text-secondary/80 transition-colors">View All Areas →</Link></li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center mt-8">
            Proudly serving Los Angeles, Burbank, Glendale, Pasadena, Santa Monica, the San Fernando Valley, and the South Bay - including Redondo Beach, Hermosa Beach, Manhattan Beach, Torrance, and Long Beach.
          </p>

          <div className="pt-8 pb-20 border-t border-slate-800 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} {COMPANY_FULL}. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://www.youtube.com/@bernardinomartinhvac" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="YouTube" data-testid="link-youtube"><Youtube className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/bernardinomartinsolar/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Instagram" data-testid="link-instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.facebook.com/profile.php?id=61551460556076" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Facebook" data-testid="link-facebook"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
