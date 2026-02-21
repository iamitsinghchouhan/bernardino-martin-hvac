import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PROMOS, SERVICES, COMPANY_PHONE, COMPANY_NAME, getWhatsAppLink } from "@/lib/constants";
import { ArrowRight, Check, Star, Clock, Calendar, MessageCircle, AlertTriangle, Droplets, Shield, Activity } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { lazy, Suspense } from "react";
const ProjectGallery = lazy(() => import("@/components/project-gallery").then(m => ({ default: m.ProjectGallery })));

export default function Home() {
  return (
    <Layout>
      <SEO 
        title="Los Angeles HVAC, Solar & Plumbing Services" 
        description={`${COMPANY_NAME} — Licensed & insured heating, air conditioning, solar panel installation & plumbing in Los Angeles. 24/7 emergency service. Call (818) 356-3468 for a free estimate.`}
      />
      
      {/* Hero Section - Using Real Job Photo */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/real-solar-install.webp" 
            alt="Bernardino Martin HVAC Installation Team" 
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl animate-in slide-in-from-left-10 duration-700 fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-sm font-medium text-slate-200">Licensed, Bonded & Insured #109283</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-6">
              BERNARDINO MARTIN'S <br/>
              <span className="text-primary-foreground text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-400">Heating, Air Conditioning, Solar</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-lg leading-relaxed shadow-black/50 drop-shadow-sm">
              Your trusted Los Angeles experts for residential & commercial HVAC, Solar, and Plumbing. Real work, honest pricing, and quality results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20" asChild>
                <Link href="/booking">
                  Book Appointment
                </Link>
              </Button>
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-secondary hover:bg-secondary/90 text-white border-0 shadow-xl shadow-secondary/20" asChild>
                <a href={getWhatsAppLink("Hello! I'm interested in booking a service.")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Chat
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
                <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full min-h-[220px]">
                  <Badge variant="secondary" className="mb-4 bg-primary/5 text-primary hover:bg-primary/10 border-primary/10 px-3 py-1 text-sm font-bold">
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
                    <span className="flex items-center text-secondary font-bold">
                      Claim Now <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Signs You Need AC Repair */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-6">
              <Badge className="bg-red-50 text-red-600 border-red-200 hover:bg-red-50 px-3 py-1 mb-2">Warning Signs</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                7 Signs You Need Immediate AC Repair
              </h2>
              <p className="text-lg text-slate-600">
                Don't wait for a complete breakdown. If you notice any of these symptoms, your system needs professional attention immediately.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Warm air blowing from vents",
                  "Poor airflow or weak circulation",
                  "Frequent cycling on and off",
                  "High indoor humidity",
                  "Water leaks around the unit",
                  "Bad odors (musty or burning)",
                  "Unusual loud noises (grinding or squealing)"
                ].map((sign, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="bg-red-100 p-1.5 rounded-full text-red-600 mt-0.5">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-slate-800">{sign}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20 w-full sm:w-auto text-lg" asChild>
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
                    <Phone className="mr-2 h-5 w-5" /> Schedule Emergency Repair
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
               <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-3xl transform -rotate-3 z-0"></div>
               <div className="relative z-10 aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                  <img src="/images/real-diagnostics.webp" alt="HVAC Technician diagnosing AC problem" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
               </div>
               
               {/* Floating Stats */}
               <div className="absolute bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-4 animate-in slide-in-from-bottom-10 border border-slate-100">
                 <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Activity className="h-8 w-8" />
                 </div>
                 <div>
                    <div className="font-black text-2xl text-slate-900">Same-Day</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Service Available</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
              Our Services
            </h2>
            <p className="text-lg text-slate-600">
              From emergency repairs to energy-efficient solar installations and underground plumbing, our certified technicians handle it all.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 6).map((service) => (
              <Card key={service.id} className="group overflow-hidden border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col bg-white">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width={640}
                    height={480}
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {service.duration}
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-secondary mb-4 bg-secondary/5 w-fit px-3 py-1.5 rounded-md">
                    <Check className="h-4 w-4" /> 
                    <span>{service.price}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 mt-auto flex gap-3">
                  <Button className="flex-1 bg-slate-900 group-hover:bg-primary transition-colors" asChild>
                    <Link href={`/booking?service=${service.id}`}>Book Now</Link>
                  </Button>
                  <Button variant="outline" size="icon" className="border-secondary/20 text-secondary hover:bg-secondary/5" asChild>
                    <a href={getWhatsAppLink(`Hi, I'm interested in your ${service.title} service.`)} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:text-primary hover:border-primary font-bold h-14 px-8" asChild>
               <Link href="/services">View All 14 Services</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Premium Moen Smart Valve Feature */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-48 -mt-48 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-sky-300 font-bold text-sm">
                    <Droplets className="h-4 w-4" /> Smart Plumbing Solutions
                 </div>
                 <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                   Protect Your Home with Moen Smart Water Shutoff
                 </h2>
                 <p className="text-lg text-slate-300 leading-relaxed">
                   Catastrophic water damage is preventable. As authorized installers, we bring you the Moen Flo Smart Water Monitor and Shutoff. 
                   It monitors your entire home's water system in real-time, detecting leaks as small as a drop per minute.
                 </p>
                 
                 <ul className="space-y-4 pt-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 p-1.5 rounded-full text-primary mt-1">
                         <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">Automatic Shutoff</span>
                        <span className="text-slate-400 text-sm">Automatically turns off water if a major leak is detected.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 p-1.5 rounded-full text-primary mt-1">
                         <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">App Monitoring</span>
                        <span className="text-slate-400 text-sm">Track water usage and get alerts directly on your phone.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-primary/20 p-1.5 rounded-full text-primary mt-1">
                         <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">Insurance Discounts</span>
                        <span className="text-slate-400 text-sm">Many homeowners insurance providers offer discounts for installing this device.</span>
                      </div>
                    </li>
                 </ul>
                 
                 <div className="pt-6">
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 h-14" asChild>
                       <Link href="/booking?service=plumbing-underground">Request Installation Quote</Link>
                    </Button>
                 </div>
              </div>
              <div className="w-full lg:w-1/2">
                 <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-700 group">
                    <img src="/images/real-trenching.webp" alt="Plumbing Installation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" width={1920} height={1080} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                          <span className="font-bold text-white">Moen Authorized Installer</span>
                          <Shield className="h-6 w-6 text-sky-400" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Work Gallery Section */}
      <Suspense fallback={<div className="py-24 bg-white" />}>
        <ProjectGallery />
      </Suspense>

      {/* Premium Maintenance Plan */}
      <section className="py-24 bg-slate-50 relative">
         <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1.5 mb-4 text-sm font-bold">VIP Membership</Badge>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
                Premium HVAC Maintenance Plan
              </h2>
              <p className="text-lg text-slate-600">
                Join the Bernardino Martin Comfort Club and protect your investment. Regular maintenance extends system life, reduces energy bills, and prevents costly breakdowns.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
               <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
                  <div className="md:w-2/5 bg-slate-900 text-white p-10 flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{backgroundImage: "url('/images/real-ac-service.webp')", backgroundSize: "cover"}}></div>
                     <div className="relative z-10 text-center">
                        <div className="inline-block bg-primary/20 text-sky-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                           Comfort Club
                        </div>
                        <div className="text-5xl font-black mb-2">$19<span className="text-xl text-slate-400 font-medium">/mo</span></div>
                        <p className="text-slate-300 text-sm mb-8">Billed annually at $228/year</p>
                        
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 shadow-lg shadow-primary/20" asChild>
                           <Link href="/booking?service=hvac-maintenance">Join the Club</Link>
                        </Button>
                     </div>
                  </div>
                  <div className="md:w-3/5 p-10 bg-white">
                     <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">What's Included?</h3>
                     <ul className="space-y-4">
                        {[
                           "Two comprehensive tune-ups per year (Spring AC, Fall Heating)",
                           "Priority scheduling for emergency services",
                           "15% discount on all repairs and parts",
                           "No emergency service fees (after hours or weekends)",
                           "Comprehensive safety inspections",
                           "Extended lifespan of your equipment"
                        ].map((feature, i) => (
                           <li key={i} className="flex items-start gap-3">
                              <div className="bg-secondary/10 p-1 rounded-full text-secondary shrink-0 mt-1">
                                 <Check className="h-4 w-4" />
                              </div>
                              <span className="text-slate-700 font-medium">{feature}</span>
                           </li>
                        ))}
                     </ul>
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
                   src="/images/technician.webp" 
                   alt="Friendly Bernardino Martin Technician" 
                   className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto relative z-10 border-4 border-white"
                   loading="lazy"
                   width={1920}
                   height={1080}
                 />
                 <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3">
                    <div className="bg-secondary/10 p-2 rounded-full text-secondary">
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
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-2">
                Why Choose Bernardino Martin HVAC?
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
                Your Trusted Local Partners for a Comfortable Home
              </h2>
              <p className="text-lg text-slate-600">
                We are a locally owned and operated business committed to honest pricing, quality workmanship, and treating your home with respect.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Licensed, Bonded & Insured (#109283)",
                  "Top-Rated on Google & Yelp",
                  "Upfront Pricing - No Hidden Fees",
                  "Same-Day Emergency Service",
                  "Certified Solar, Plumbing & HVAC Technicians"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                    <div className="bg-secondary/10 text-secondary p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
                    <Phone className="mr-2 h-5 w-5" /> Call {COMPANY_PHONE}
                  </a>
                </Button>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-0 shadow-lg shadow-secondary/20" asChild>
                  <a href={getWhatsAppLink("Hi, I have a few questions about your services.")} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Reinforcement */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 px-4 py-1.5 mb-4 text-sm font-bold">Customer Reviews</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-slate-600">
              Real feedback from homeowners and businesses across Los Angeles who trust us with their comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Maria G.",
                location: "Glendale, CA",
                service: "AC Installation",
                review: "Bernardino and his team were incredible. They installed a brand new AC system in one day and the pricing was very fair. Our house has never been more comfortable. Highly recommend!",
                rating: 5,
              },
              {
                name: "James T.",
                location: "Burbank, CA",
                service: "Solar Panel Installation",
                review: "We wanted to go solar and got quotes from several companies. BM HVAC was the most transparent and affordable. The installation was clean, professional, and our electric bill dropped significantly.",
                rating: 5,
              },
              {
                name: "Patricia L.",
                location: "San Fernando Valley",
                service: "Emergency Heating Repair",
                review: "Our heater broke on a cold night and they came out the same evening. Fixed the problem quickly and didn't overcharge us. This is a company that actually cares about their customers.",
                rating: 5,
              },
            ].map((t, i) => (
              <Card key={i} className="bg-white border-slate-100 shadow-md hover:shadow-lg transition-shadow" data-testid={`card-testimonial-${i}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm">"{t.review}"</p>
                  <div className="border-t pt-4">
                    <div className="font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.service} &bull; {t.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational / Advice Content */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1.5 mb-4 text-sm font-bold">Expert Tips</Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
              HVAC Tips & Energy Savings Guide
            </h2>
            <p className="text-lg text-slate-600">
              Expert advice from our certified technicians to help you save money and keep your systems running efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-slate-100 shadow-md" data-testid="card-tips-0">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Maintenance Best Practices</h3>
                </div>
                <ul className="space-y-2.5">
                  {["Change air filters every 1-3 months", "Schedule professional tune-ups twice a year", "Keep outdoor units clear of debris and vegetation", "Check thermostat batteries and calibration annually", "Inspect ductwork for leaks and seal gaps"].map((tip, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-100 shadow-md" data-testid="card-tips-1">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                    <Activity className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Energy Efficiency Tips</h3>
                </div>
                <ul className="space-y-2.5">
                  {["Install a programmable or smart thermostat", "Seal windows and doors to prevent air leaks", "Use ceiling fans to assist air circulation", "Consider upgrading to a high-efficiency HVAC system", "Add insulation to attic and crawl spaces"].map((tip, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-slate-100 shadow-md" data-testid="card-tips-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-red-100 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">When to Call a Professional</h3>
                </div>
                <ul className="space-y-2.5">
                  {["Unusual noises from your HVAC unit", "Inconsistent temperatures between rooms", "System cycling on and off frequently", "Spike in energy bills without usage changes", "Visible ice buildup on refrigerant lines"].map((tip, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-semibold" asChild>
              <Link href="/quote">Get a Free Expert Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Financing / Payment Options */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2 space-y-6">
                <Badge className="bg-secondary/20 text-green-300 border-secondary/40">Flexible Payment Options</Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                  Affordable Comfort, Your Way
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Major upgrades and installations shouldn't break the bank. We offer flexible payment solutions so you can invest in your home's comfort without the stress.
                </p>

                <ul className="space-y-4 pt-2">
                  {[
                    { title: "Transparent Upfront Pricing", desc: "No hidden fees or surprise charges. Know the full cost before work begins." },
                    { title: "Flexible Payment Plans", desc: "Spread the cost of larger projects into manageable monthly payments." },
                    { title: "Free Estimates on Major Projects", desc: "Get a detailed written quote before making any commitment." },
                    { title: "Seasonal Promotions & Discounts", desc: "Take advantage of our monthly specials to save on services." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-secondary/20 p-1.5 rounded-full text-secondary mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">{item.title}</span>
                        <span className="text-slate-400 text-sm">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg shadow-secondary/20" asChild>
                    <Link href="/quote">Get a Free Quote</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-white/10" asChild>
                    <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
                      <Phone className="mr-2 h-5 w-5" /> Discuss Options
                    </a>
                  </Button>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 space-y-6">
                  <h3 className="text-xl font-bold text-white text-center">Popular Upgrade Projects</h3>
                  {[
                    { project: "Central AC Installation", range: "Starting from $3,500", tag: "Most Popular" },
                    { project: "Solar Panel System", range: "Custom quote with rebates", tag: "Best Value" },
                    { project: "Complete HVAC Replacement", range: "Starting from $5,000", tag: "Long-Term Savings" },
                    { project: "Ductless Mini-Split System", range: "Starting from $2,500", tag: "Energy Efficient" },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                      <div>
                        <div className="font-semibold text-white text-sm">{p.project}</div>
                        <div className="text-xs text-slate-400">{p.range}</div>
                      </div>
                      <Badge className="bg-primary/20 text-sky-300 border-primary/40 text-xs">{p.tag}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency / Priority Service */}
      <section className="py-16 bg-red-50 border-t border-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 bg-red-100 p-5 rounded-2xl">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-2">
                Need Emergency Service?
              </h2>
              <p className="text-slate-600 mb-1">
                No heat? AC failure? Water leak? We offer same-day emergency service across Los Angeles — including nights and weekends.
              </p>
              <p className="text-sm text-slate-500">
                Priority scheduling available for Comfort Club members at no extra charge.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-500/20 h-12 px-6" asChild>
                <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5" /> Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-red-200 text-red-700 hover:bg-red-100 font-semibold" asChild>
                <Link href="/quote">Request Priority Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('/images/hero-home.webp')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Schedule your service today and take advantage of our monthly specials. Fast, reliable, and always professional.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-slate-100" asChild>
              <Link href="/booking">Book Online Now</Link>
            </Button>
            <Button size="lg" className="h-14 px-10 text-lg font-bold bg-secondary text-white hover:bg-secondary/90 border-0" asChild>
              <a href={getWhatsAppLink("Hello! I'm interested in booking a service.")} target="_blank" rel="noopener noreferrer">
                 <MessageCircle className="mr-2 h-5 w-5" />
                 Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Phone({ className }: { className?: string }) {
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
