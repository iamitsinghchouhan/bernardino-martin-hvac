import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { SERVICES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";

export default function Services() {
  return (
    <Layout>
      <SEO title="Services" description="Comprehensive HVAC and Solar services including installation, repair, and maintenance." />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-heading font-bold mb-12 text-center">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <service.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <Check className="h-4 w-4" /> {service.price}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/booking?service=${service.id}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
