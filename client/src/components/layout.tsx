import { Link, useLocation } from "wouter";
import { Phone, Menu, X, Calendar, MessageCircle, Sun, ShieldCheck, AlertCircle, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { COMPANY_PHONE, COMPANY_NAME, getWhatsAppLink } from "@/lib/constants";
const ChatWidget = lazy(() => import("@/components/chat-widget").then(m => ({ default: m.ChatWidget })));

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/service-areas", label: "Service Areas" },
    { href: "/payment", label: "Pay Online" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2.5 text-xs md:text-sm font-bold flex justify-center items-center gap-2 px-4 text-center">
        <AlertCircle className="h-4 w-4 animate-pulse shrink-0" />
        <span>24/7 EMERGENCY SERVICE AVAILABLE IN LOS ANGELES — <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="underline hover:text-red-100 transition-colors">{COMPANY_PHONE}</a></span>
      </div>

      {/* Top Bar - Trust & Quick Contact */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs md:text-sm font-medium">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            <span>Licensed, Bonded & Insured #109283</span>
          </div>
          <div className="hidden md:flex gap-4">
            <span>Commercial & Residential</span>
            <span>Serving Greater Los Angeles</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100" : "bg-white border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
              <img src="/logo-bm.webp" alt="BM Logo" className="h-14 w-14 object-contain rounded-lg bg-white p-1 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300" loading="eager" fetchPriority="high" width={128} height={128} />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none text-primary tracking-tight">Bernardino Martin</span>
                <span className="text-[10px] font-semibold text-secondary tracking-[0.2em] uppercase">Heating &bull; AC &bull; Solar</span>
              </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary font-semibold" : "text-slate-600"
                }`}>
                  {link.label}
              </Link>
            ))}
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
             <a href={getWhatsAppLink("Hi, I have a question about your HVAC/Solar services.")} target="_blank" rel="noopener noreferrer">
               <Button size="icon" className="rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-sm border-0">
                 <MessageCircle className="h-5 w-5" />
               </Button>
             </a>
             <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
               <Button size="icon" variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/10">
                 <Phone className="h-5 w-5" />
               </Button>
             </a>
             <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-mr-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-10">
                  <Link href="/" className="flex items-center gap-2 mb-6">
                      <img src="/logo-bm.webp" alt="BM Logo" className="h-12 w-12 object-contain rounded-lg bg-white p-1 shadow-sm border border-gray-100" loading="eager" fetchPriority="high" width={128} height={128} />
                      <span className="font-heading font-bold text-lg text-primary">Bernardino Martin HVAC</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={`text-lg font-medium py-2 border-b border-gray-100 ${
                        location === link.href ? "text-primary" : "text-slate-600"
                      }`}>
                        {link.label}
                    </Link>
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

      <main className="flex-1">
        {children}
      </main>

      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4 text-white">
                <img src="/logo-bm.webp" alt="BM Logo" className="h-16 w-16 object-contain rounded-lg bg-white p-1.5 shadow-md" loading="lazy" width={128} height={128} />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-lg leading-tight">Bernardino Martin</span>
                  <span className="text-[10px] font-semibold text-secondary tracking-[0.2em] uppercase">Heating &bull; AC &bull; Solar</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4 text-slate-400">
                BERNARDINO MARTIN'S Heating Air Conditioning, Solar. Top-rated HVAC, Solar, and Plumbing services in Los Angeles.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                <ShieldCheck className="h-4 w-4" />
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
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
               <a href="#" className="hover:text-secondary transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
               <a href="#" className="hover:text-secondary transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
               <a href="#" className="hover:text-secondary transition-colors" aria-label="Pinterest">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 20.5A7.4 7.4 0 0 1 7.3 16c.3-1.6 1.4-6.4 1.4-6.4.3-.9 1-1 1-1 .7 0 1.2.6 1.2 1.6 0 2.2-1.3 5.4-1.3 5.4-.2.8.5 1.5 1.3 1.5 1.7 0 3-2.6 3-5.7 0-3.3-2.3-5.4-5.6-5.4-3.5 0-5.8 2.6-5.8 5.6 0 1 .4 2.2.9 2.8.1.1.1.2 0 .4l-.3 1.2c0 .1-.2.2-.3.1C3.8 14.5 3 12 3 9.4 3 5.4 6 2 10.5 2c3.7 0 6.5 2.6 6.5 6 0 3.7-2.3 6.7-5.5 6.7-.9 0-1.8-.5-2.1-1.1 0 0-.5 1.8-.6 2.3-.2.8-.7 1.8-1 2.4"/></svg>
               </a>
               <a href="#" className="hover:text-secondary transition-colors" aria-label="TikTok">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
               </a>
               <a href="#" className="hover:text-secondary transition-colors" aria-label="Twitter / X"><Twitter className="h-5 w-5" /></a>
               <a href="#" className="hover:text-secondary transition-colors" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
