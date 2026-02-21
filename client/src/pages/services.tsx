import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES, getWhatsAppLink } from "@/lib/constants";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, MessageCircle, Clock } from "lucide-react";

export default function Services() {
  return (
    <Layout>
      <SEO title="HVAC, Solar & Plumbing Services in Los Angeles" description="AC repair, heating installation, solar panel systems & plumbing services in Los Angeles. Licensed technicians, same-day service & free estimates. Call (818) 356-3468." />
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('/images/hero-home.webp')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-white">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Professional HVAC, Solar, and Plumbing solutions. Quality workmanship and transparent pricing you can trust.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <Card key={service.id} className="group overflow-hidden border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col bg-white">
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
                  <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {service.duration}
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight pt-1">
                      {service.title}
                    </CardTitle>
                  </div>
                  <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-secondary bg-secondary/10 w-fit px-3 py-1.5 rounded-md">
                    <Check className="h-4 w-4" /> 
                    <span>{service.price}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 mt-auto flex gap-3 border-t border-slate-100 mt-4 pt-4">
                  <Button className="flex-1 bg-slate-900 group-hover:bg-primary transition-colors font-semibold shadow-md" asChild>
                    <Link href={`/booking?service=${service.id}`}>Book Now</Link>
                  </Button>
                  <Button variant="outline" size="icon" className="border-secondary/20 text-secondary hover:bg-secondary/5 hover:text-secondary hover:border-secondary/30 transition-colors" asChild>
                    <a href={getWhatsAppLink(`Hi, I'm interested in your ${service.title} service.`)} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
