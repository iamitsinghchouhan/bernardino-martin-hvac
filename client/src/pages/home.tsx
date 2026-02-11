import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PROMOS, SERVICES, COMPANY_PHONE } from "@/lib/constants";
import { ArrowRight, Check, Star, Clock, Calendar } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <Layout>
      <SEO 
        title="Home" 
        description="Top-rated HVAC and Solar services in Los Angeles. Get 10% off AC repair, heating services, and solar installation. Call (818) 356-3468 today!"
      />
      
      {/* Hero Section - Using Real Job Photo */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/real-solar-install.png" 
            alt="LA Solar & HVAC Experts Installation Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl animate-in slide-in-from-left-10 duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm font-medium text-blue-100">Licensed, Bonded & Insured #109283</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
              Expert <span className="text-primary-foreground text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">HVAC & Solar</span> Services in Los Angeles
            </h1>
            
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-lg leading-relaxed shadow-black/50 drop-shadow-sm">
              Real work, real results. We specialize in residential and commercial installations, repairs, and energy upgrades.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-blue-600 shadow-xl shadow-blue-900/20" asChild>
                <Link href="/booking">
                  Book Appointment
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm" asChild>
                <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  {COMPANY_PHONE}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promos Section */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 relative z-20">
            {PROMOS.map((promo, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-primary to-green-500" />
                <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full min-h-[220px]">
                  <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 px-3 py-1 text-sm font-bold">
                    {promo.title}
                  </Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {promo.sub || "Limited Time Offer"}
                  </h3>
                  <p className="text-slate-600 mb-6 font-medium">
                    {promo.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 w-full flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>CODE: {promo.code}</span>
                    <span className="flex items-center text-green-600 font-bold">
                      Claim Now <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
              Our Services
            </h2>
            <p className="text-lg text-slate-600">
              From emergency repairs to energy-efficient solar installations, our certified technicians handle it all with precision and care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Card key={service.id} className="group overflow-hidden border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {service.duration}
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-4">
                    <Check className="h-4 w-4" /> 
                    <span>{service.price}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 mt-auto">
                  <Button className="w-full bg-slate-900 group-hover:bg-primary transition-colors" asChild>
                    <Link href={`/booking?service=${service.id}`}>Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:text-primary hover:border-primary" asChild>
               <Link href="/services">View All Services</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Real Work Gallery Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Recent Projects</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">See our certified technicians in action. We take pride in our clean, professional installations across Los Angeles.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-xl aspect-square md:aspect-auto md:h-64 lg:col-span-2">
              <img src="/images/real-crane-lift.png" alt="Crane lifting HVAC unit" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <span className="text-white font-bold text-lg">Commercial Installation</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl aspect-square md:h-64">
              <img src="/images/real-diagnostics.png" alt="HVAC Diagnostics" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <span className="text-white font-bold">Diagnostics</span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl aspect-square md:h-64">
              <img src="/images/real-ductwork.png" alt="Ductwork Installation" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <span className="text-white font-bold">Ductwork</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Trust Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="relative">
                 <div className="absolute -inset-4 bg-primary/10 rounded-3xl transform rotate-2"></div>
                 <img 
                   src="/images/technician.png" 
                   alt="Friendly HVAC Technician" 
                   className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto relative z-10 border-4 border-white"
                 />
                 <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <Star className="h-6 w-6 fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">5-Star Rated</div>
                      <div className="text-xs text-slate-500">Google & Yelp</div>
                    </div>
                 </div>
               </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-primary font-bold text-sm mb-2">
                Why Choose LA Solar & HVAC?
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                Your Trusted Local Partners for a Comfortable Home
              </h2>
              <p className="text-lg text-slate-600">
                We are a locally owned and operated business committed to honest pricing, quality workmanship, and treating your home with respect.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Licensed, Bonded & Insured (#123456)",
                  "Top-Rated on Google & Yelp",
                  "Upfront Pricing - No Hidden Fees",
                  "Same-Day Emergency Service",
                  "Certified Solar & HVAC Technicians"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                    <div className="bg-green-100 text-green-600 p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Button size="lg" className="bg-primary hover:bg-blue-700 shadow-lg shadow-blue-500/20" asChild>
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
                    Call {COMPANY_PHONE}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('/images/hero-home.png')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule your service today and take advantage of our monthly specials. Fast, reliable, and always professional.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-slate-100" asChild>
              <Link href="/booking">Book Online Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
