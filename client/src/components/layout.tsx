import { Link, useLocation } from "wouter";
import { Phone, Menu, X, Calendar, MessageCircle, Sun, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { COMPANY_PHONE, COMPANY_NAME, getWhatsAppLink } from "@/lib/constants";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

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
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Top Bar - Trust & Quick Contact */}
      <div className="bg-primary text-primary-foreground py-2 text-xs md:text-sm font-medium">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
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
        className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100" : "bg-white border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-2 rounded-lg group-hover:shadow-lg transition-all duration-300">
                <Sun className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none text-slate-900 tracking-tight">Bernardino Martin</span>
                <span className="text-xs font-semibold text-primary tracking-widest uppercase">HVAC</span>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary font-semibold" : "text-slate-600"
                }`}>
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="flex flex-col items-end mr-2 group">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">24/7 Service</span>
              <span className="text-lg font-bold font-heading text-slate-900 group-hover:text-primary transition-colors">{COMPANY_PHONE}</span>
            </a>
            
            <Button size="lg" className="bg-primary hover:bg-blue-700 shadow-lg shadow-blue-500/20" asChild>
              <Link href="/booking">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Book Online</span>
                </div>
              </Link>
            </Button>

            <Button size="icon" className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20" asChild>
              <a href={getWhatsAppLink("Hi, I have a question about your HVAC/Solar services.")} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
             <a href={getWhatsAppLink("Hi, I have a question about your HVAC/Solar services.")} target="_blank" rel="noopener noreferrer">
               <Button size="icon" className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-sm border-0">
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
                  <Link href="/">
                    <a className="flex items-center gap-2 mb-6">
                      <div className="bg-primary text-white p-2 rounded-md">
                        <Sun className="h-5 w-5" />
                      </div>
                      <span className="font-heading font-bold text-lg">Bernardino Martin HVAC</span>
                    </a>
                  </Link>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a className={`text-lg font-medium py-2 border-b border-gray-100 ${
                        location === link.href ? "text-primary" : "text-slate-600"
                      }`}>
                        {link.label}
                      </a>
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 mt-4">
                    <Button size="lg" className="w-full bg-primary" asChild>
                      <Link href="/booking">Book Appointment</Link>
                    </Button>
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white border-0" asChild>
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

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4 text-white">
                <Sun className="h-6 w-6 text-primary" />
                <span className="font-heading font-bold text-xl leading-tight">Bernardino Martin<br/>HVAC</span>
              </div>
              <p className="text-sm leading-relaxed mb-4 text-slate-400">
                BERNARDINO MARTIN'S Heating Air Conditioning, Solar. Top-rated HVAC, Solar, and Plumbing services in Los Angeles.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                <span>Licensed, Bonded & Insured</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/services"><a className="hover:text-primary transition-colors">AC Repair & Installation</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary transition-colors">Heating Services</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary transition-colors">Solar Panel Installation</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary transition-colors">Maintenance Tune-Ups</a></Link></li>
                <li><Link href="/services"><a className="hover:text-primary transition-colors">Plumbing & Pipe Work</a></Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Service Areas</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/service-areas"><a className="hover:text-primary transition-colors">Los Angeles</a></Link></li>
                <li><Link href="/service-areas"><a className="hover:text-primary transition-colors">Santa Monica</a></Link></li>
                <li><Link href="/service-areas"><a className="hover:text-primary transition-colors">Pasadena</a></Link></li>
                <li><Link href="/service-areas"><a className="hover:text-primary transition-colors">Beverly Hills</a></Link></li>
                <li><Link href="/service-areas"><a className="hover:text-primary transition-colors">All Locations</a></Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 font-heading">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="hover:text-white transition-colors text-lg font-bold">{COMPANY_PHONE}</a>
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                   <span>Available 24/7 for Emergency</span>
                </li>
              </ul>
              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full bg-primary hover:bg-blue-600" asChild>
                  <Link href="/booking">Book Appointment</Link>
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white border-0" asChild>
                   <a href={getWhatsAppLink("Hi, I have a question about your services.")} target="_blank" rel="noopener noreferrer">
                     <MessageCircle className="mr-2 h-4 w-4" />
                     Chat on WhatsApp
                   </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} BERNARDINO MARTIN'S Heating Air Conditioning, Solar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
