import { Link, useLocation } from "wouter";
import { Phone, Menu, Calendar, MessageCircle, ShieldCheck, AlertCircle, Instagram, Facebook, Youtube, ChevronDown } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { EasterBanner, EasterEggs, EasterStyles } from "@/components/easter-animation";
import { COMPANY_PHONE, COMPANY_NAME, COMPANY_FULL, getWhatsAppLink } from "@/lib/constants";
const ChatWidget = lazy(() => import("@/components/chat-widget").then(m => ({ default: m.ChatWidget })));

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

  const navItems = [
    { href: "/", label: "Home" },
    {
      href: "/services",
      label: "Services",
      children: [
        { href: "/services#hvac", label: "HVAC & Heating", desc: "Cooling, heating, ducts and thermostats" },
        { href: "/services#solar", label: "Solar & Energy", desc: "Panels, maintenance and solar-powered systems" },
        { href: "/services#plumbing", label: "Plumbing", desc: "General plumbing, jet cleanup and shutoff valves" },
        { href: "/services#electrical", label: "Electrical", desc: "Panel upgrades and residential electrical work" },
        { href: "/services#outdoor", label: "Outdoor & Property", desc: "Landscaping, sod, planting and irrigation" },
        { href: "/services#technology", label: "Technology", desc: "Network wiring and smart home connectivity" },        { href: "/hvac-los-angeles", label: "HVAC Los Angeles", desc: "Local HVAC services" },
        { href: "/solar-installation-los-angeles", label: "Solar Los Angeles", desc: "Local solar installations" },
        { href: "/plumbing-los-angeles", label: "Plumbing Los Angeles", desc: "Local plumbing services" },
        { href: "/electrical-services-los-angeles", label: "Electrical Los Angeles", desc: "Local electrical services" },
        { href: "/landscaping-los-angeles", label: "Landscaping Los Angeles", desc: "Local landscaping services" },
        { href: "/irrigation-los-angeles", label: "Irrigation Los Angeles", desc: "Local irrigation services" },
        { href: "/network-installation-los-angeles", label: "Network Installation Los Angeles", desc: "Local network services" },      ],
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
      <EasterStyles />
      <EasterBanner />
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2.5 text-xs md:text-sm font-bold flex justify-center items-center gap-2 px-4 text-center" role="alert">
        <AlertCircle className="h-4 w-4 animate-pulse shrink-0" aria-hidden="true" />
        <span>24/7 EMERGENCY SERVICE AVAILABLE IN LOS ANGELES - <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="underline hover:text-red-100 transition-colors">{COMPANY_PHONE}</a></span>
      </div>

      {/* Top Bar - Trust & Quick Contact */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs md:text-sm font-medium">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-400" aria-hidden="true" />
            <span>Licensed, Bonded & Insured</span>
          </div>
          <div className="hidden md:flex gap-4">
            <span>Commercial & Residential</span>
            <span>Serving Greater Los Angeles</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header 
        className={`sticky top-0 z-50 relative w-full transition-all duration-300 border-b ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100" : "bg-white border-transparent"
        }`}
      >
        <EasterEggs container="nav" />
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="BERNARDINO MARTIN Heating Air Conditioning Solar - Home">
              <img src="/logo-bm.webp" alt="BERNARDINO MARTIN Heating Air Conditioning Solar logo" className="h-14 w-14 object-contain rounded-lg bg-white p-1 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300" loading="eager" fetchPriority="high" width={128} height={128} />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none text-primary tracking-tight">BERNARDINO MARTIN</span>
                <span className="text-[10px] font-semibold text-secondary tracking-[0.2em] uppercase">Heating &bull; Air Conditioning &bull; Solar</span>
              </div>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive =
                location === item.href ||
                item.children?.some((child) => location === child.href || location === child.href.split("#")[0]);

              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={location === item.href ? "page" : undefined}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary font-semibold" : "text-slate-600"
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
                    className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary font-semibold" : "text-slate-600"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>
                  <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-[340px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 transition-colors hover:bg-slate-50"
                        >
                          <div className="text-sm font-semibold text-slate-900">{child.label}</div>
                          <div className="mt-1 text-xs leading-5 text-slate-500">{child.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="flex flex-col items-end mr-2 group">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">24/7 Service</span>
              <span className="text-lg font-bold font-heading text-slate-900 group-hover:text-primary transition-colors">{COMPANY_PHONE}</span>
            </a>
            
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
              <Link href="/booking">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Book Online</span>
                </div>
              </Link>
            </Button>

            <Button size="icon" className="bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20" asChild>
              <a href={getWhatsAppLink("Hi, I have a question about your HVAC/Solar services.")} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
             <a href={getWhatsAppLink("Hi, I have a question about your HVAC/Solar services.")} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
               <Button size="icon" className="rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-sm border-0" aria-hidden="true" tabIndex={-1}>
                 <MessageCircle className="h-5 w-5" aria-hidden="true" />
               </Button>
             </a>
             <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} aria-label={`Call us at ${COMPANY_PHONE}`}>
               <Button size="icon" variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/10" aria-hidden="true" tabIndex={-1}>
                 <Phone className="h-5 w-5" aria-hidden="true" />
               </Button>
             </a>
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2" aria-label="Open navigation menu">
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]" aria-label="Navigation menu">
                <nav className="flex flex-col gap-6 mt-10" aria-label="Mobile navigation">
                  <Link href="/" className="flex items-center gap-2 mb-6">
                      <img src="/logo-bm.webp" alt="BERNARDINO MARTIN Heating Air Conditioning Solar logo" className="h-12 w-12 object-contain rounded-lg bg-white p-1 shadow-sm border border-gray-100" loading="eager" fetchPriority="high" width={128} height={128} />
                      <div className="flex flex-col">
                        <span className="font-heading font-bold text-lg text-primary">BERNARDINO MARTIN</span>
                        <span className="text-[9px] font-semibold text-secondary tracking-[0.15em] uppercase">Heating &bull; Air Conditioning &bull; Solar</span>
                      </div>
                  </Link>
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-gray-100 pb-3">
                      <Link
                        href={item.href}
                        aria-current={location === item.href ? "page" : undefined}
                        className={`block py-2 text-lg font-medium ${
                          location === item.href ? "text-primary" : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {item.children ? (
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
                    <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-white border-0" asChild>
                      <a href={getWhatsAppLink("Hi, I'd like to book an appointment.")} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Chat
                      </a>
                    </Button>
                    <Button size="lg" variant="secondary" className="w-full bg-slate-900 text-white hover:bg-slate-800" asChild>
                      <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
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

      <div className="fixed bottom-24 right-4 sm:bottom-4 sm:right-24 z-50">
        <a href="tel:+18184000227" className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-white font-bold shadow-lg transition hover:bg-red-700">
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
              <h3 className="text-white font-bold mb-4 font-heading">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services" className="hover:text-secondary transition-colors">AC Repair & Installation</Link></li>
                <li><Link href="/services" className="hover:text-secondary transition-colors">Heating Services</Link></li>
                <li><Link href="/services" className="hover:text-secondary transition-colors">Solar Panel Installation</Link></li>
                <li><Link href="/services" className="hover:text-secondary transition-colors">Maintenance Tune-Ups</Link></li>
                <li><Link href="/services" className="hover:text-secondary transition-colors">Plumbing & Pipe Work</Link></li>
                <li><a href="/hvac-los-angeles" className="hover:text-secondary transition-colors">HVAC Los Angeles</a></li>
                <li><a href="/solar-installation-los-angeles" className="hover:text-secondary transition-colors">Solar Installation LA</a></li>
                <li><a href="/plumbing-los-angeles" className="hover:text-secondary transition-colors">Plumbing Los Angeles</a></li>
                <li><a href="/electrical-services-los-angeles" className="hover:text-secondary transition-colors">Electrical Services LA</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Service Areas</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/service-areas" className="hover:text-secondary transition-colors">Los Angeles</Link></li>
                <li><Link href="/service-areas" className="hover:text-secondary transition-colors">Santa Monica</Link></li>
                <li><Link href="/service-areas" className="hover:text-secondary transition-colors">Pasadena</Link></li>
                <li><Link href="/service-areas" className="hover:text-secondary transition-colors">Beverly Hills</Link></li>
                <li><Link href="/service-areas" className="hover:text-secondary transition-colors">All Locations</Link></li>
                <li><a href="/hvac-burbank" className="hover:text-secondary transition-colors">HVAC Burbank</a></li>
                <li><a href="/hvac-glendale" className="hover:text-secondary transition-colors">HVAC Glendale</a></li>
                <li><a href="/hvac-pasadena" className="hover:text-secondary transition-colors">HVAC Pasadena</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-secondary shrink-0" />
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="hover:text-white transition-colors text-lg font-bold">{COMPANY_PHONE}</a>
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
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border-0" asChild>
                   <a href={getWhatsAppLink("Hi, I have a question about your services.")} target="_blank" rel="noopener noreferrer">
                     <MessageCircle className="mr-2 h-4 w-4" />
                     Chat on WhatsApp
                   </a>
                </Button>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            Proudly serving Los Angeles, Burbank, Glendale, Pasadena, Santa Monica, and the entire San Fernando Valley.
          </p>

          <div className="pt-8 pb-20 border-t border-slate-800 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} {COMPANY_FULL}. All rights reserved.</p>
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
