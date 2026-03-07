import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, SERVICE_CATEGORIES, getWhatsAppLink } from "@/lib/constants";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, MessageCircle, Clock, Smartphone, Droplets, ShieldCheck, DollarSign } from "lucide-react";

export default function Services() {
  return (
    <Layout>
      <SEO title="HVAC, Solar, Plumbing & More Services in Los Angeles" description="HVAC, plumbing, electrical, solar, landscaping, irrigation & network services in Los Angeles. Licensed technicians, same-day service & free estimates. Call (818) 400-0227." />
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('/images/hero-home.webp')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-white">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Professional home, outdoor, and technology solutions. Quality workmanship and transparent pricing you can trust.
          </p>
        </div>
      </section>

      {/* Services by Category */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          {SERVICE_CATEGORIES.map((category) => {
            const categoryServices = SERVICES.filter(s => s.category === category);
            if (categoryServices.length === 0) return null;
            return (
              <div key={category}>
                <div className="mb-16" data-testid={`section-category-${category.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                  <div className="mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-3" data-testid={`text-category-${category.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                      {category}
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categoryServices.map((service) => (
                      <Card key={service.id} className="group overflow-hidden border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col bg-white" data-testid={`card-service-${service.id}`}>
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                            decoding="async"
                            width={640}
                            height={480}
                          />
                          <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> {service.duration}
                          </div>
                        </div>
                        
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="p-2.5 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                              <service.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight pt-1">
                              {service.title}
                            </CardTitle>
                          </div>
                          <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm font-bold text-secondary bg-secondary/10 w-fit px-3 py-1.5 rounded-md">
                            <Check className="h-4 w-4" aria-hidden="true" /> 
                            <span>{service.price}</span>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="p-6 pt-0 mt-auto flex gap-3 border-t border-slate-100 mt-4 pt-4">
                          <Button className="flex-1 bg-slate-900 group-hover:bg-primary transition-colors font-semibold shadow-md" asChild>
                            <Link href={`/booking?service=${service.id}`} data-testid={`button-book-${service.id}`}>Book Now</Link>
                          </Button>
                          <Button variant="outline" size="icon" className="border-secondary/20 text-secondary hover:bg-secondary/5 hover:text-secondary hover:border-secondary/30 transition-colors" asChild>
                            <a href={getWhatsAppLink(`Hi, I'm interested in your ${service.title} service.`)} target="_blank" rel="noopener noreferrer" aria-label={`Chat about ${service.title} on WhatsApp`}>
                              <MessageCircle className="h-5 w-5" aria-hidden="true" />
                            </a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>

                {category === "Outdoor & Property" && (
                  <div className="mb-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 border border-blue-100 shadow-sm" data-testid="section-smart-irrigation-info">
                    <div className="max-w-4xl mx-auto">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-primary text-white shadow-md">
                          <Smartphone className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">
                          Smart Irrigation & Smart Valve Technology
                        </h3>
                      </div>
                      <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8">
                        Our smart irrigation systems connect to your phone so you can monitor and control your water usage from anywhere. The Moen Smart Water Shutoff Valve detects leaks instantly and automatically shuts off your water supply to prevent costly damage — giving you peace of mind whether you're home or away.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                          <Smartphone className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
                          <h4 className="font-bold text-slate-900 mb-1">Mobile Monitoring</h4>
                          <p className="text-sm text-slate-600">Control your irrigation and water shutoff from your smartphone, anywhere in the world.</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                          <Droplets className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
                          <h4 className="font-bold text-slate-900 mb-1">Automatic Leak Detection</h4>
                          <p className="text-sm text-slate-600">Smart sensors detect leaks instantly and shut off water automatically to prevent damage.</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                          <ShieldCheck className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
                          <h4 className="font-bold text-slate-900 mb-1">Insurance Discounts</h4>
                          <p className="text-sm text-slate-600">Many insurance companies offer discounts when you install smart water monitoring devices.</p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                          <DollarSign className="h-8 w-8 text-secondary mb-3" aria-hidden="true" />
                          <h4 className="font-bold text-slate-900 mb-1">Save on Water Bills</h4>
                          <p className="text-sm text-slate-600">Intelligent scheduling and zone control reduces water waste and lowers your monthly bills.</p>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <Button className="bg-primary hover:bg-primary/90 font-semibold shadow-md" asChild>
                          <Link href="/booking?service=smart-irrigation" data-testid="button-book-smart-irrigation-cta">Schedule Installation</Link>
                        </Button>
                        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5" asChild>
                          <a href={getWhatsAppLink("Hi, I'd like to learn more about smart irrigation and smart valve technology.")} target="_blank" rel="noopener noreferrer" data-testid="button-whatsapp-smart-irrigation">
                            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Ask Us About It
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
